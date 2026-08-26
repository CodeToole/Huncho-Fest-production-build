# ==========================================
# Huncho Fest - Google Cloud Run & Firebase Deploy Script (PowerShell)
# ==========================================
$ErrorActionPreference = "Stop"

# 1. Variables
$PROJECT_ID = "huncho-fest-project"
$REGION = "us-central1"
$REPO_NAME = "huncho-fest-repo"
$SERVICE_NAME = "huncho-fest-backend"
$IMAGE_TAG = "${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${SERVICE_NAME}:latest"

Write-Host ">>> [1/6] Configuring active GCP project: $PROJECT_ID" -ForegroundColor Cyan
gcloud config set project $PROJECT_ID

Write-Host ">>> [2/6] Enabling required GCP services..." -ForegroundColor Cyan
gcloud services enable `
    run.googleapis.com `
    artifactregistry.googleapis.com `
    cloudbuild.googleapis.com

Write-Host ">>> [3/6] Ensuring Artifact Registry repository exists..." -ForegroundColor Cyan
try {
    gcloud artifacts repositories describe $REPO_NAME --location=$REGION --quiet 2>$null
    Write-Host "Repository $REPO_NAME already exists in $REGION." -ForegroundColor Green
} catch {
    gcloud artifacts repositories create $REPO_NAME `
        --repository-format=docker `
        --location=$REGION `
        --description="Docker repository for Huncho Fest" `
        --quiet
}

Write-Host ">>> [4/6] Building and pushing container image via Cloud Build..." -ForegroundColor Cyan
gcloud builds submit --tag $IMAGE_TAG

Write-Host ">>> [5/6] Deploying container image to Cloud Run..." -ForegroundColor Cyan
gcloud run deploy $SERVICE_NAME `
    --image $IMAGE_TAG `
    --region $REGION `
    --platform managed `
    --port 8080 `
    --allow-unauthenticated `
    --set-env-vars NODE_ENV=production

Write-Host ">>> [6/6] Deploying Firebase Hosting rewrites..." -ForegroundColor Cyan
firebase deploy --only hosting --project $PROJECT_ID

Write-Host ">>> Deployment completed successfully!" -ForegroundColor Green
