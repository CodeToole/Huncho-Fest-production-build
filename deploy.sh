#!/usr/bin/env bash
set -e

# ==========================================
# Huncho Fest - Google Cloud Run & Firebase Deploy Script (Bash)
# ==========================================

# 1. Variables
export PROJECT_ID="huncho-fest-project"
export REGION="us-central1"
export REPO_NAME="huncho-fest-repo"
export SERVICE_NAME="huncho-fest-backend"
export IMAGE_TAG="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${SERVICE_NAME}:latest"

echo ">>> [1/6] Setting active GCP project: $PROJECT_ID"
gcloud config set project $PROJECT_ID

echo ">>> [2/6] Enabling required GCP services..."
gcloud services enable \
    run.googleapis.com \
    artifactregistry.googleapis.com \
    cloudbuild.googleapis.com

echo ">>> [3/6] Ensuring Artifact Registry repository exists..."
gcloud artifacts repositories create $REPO_NAME \
    --repository-format=docker \
    --location=$REGION \
    --description="Docker repository for Huncho Fest" \
    --quiet || true

echo ">>> [4/6] Building and pushing container image via Cloud Build..."
gcloud builds submit --tag $IMAGE_TAG

echo ">>> [5/6] Deploying container image to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --image $IMAGE_TAG \
    --region $REGION \
    --platform managed \
    --port 8080 \
    --allow-unauthenticated \
    --set-env-vars NODE_ENV=production

echo ">>> [6/6] Deploying Firebase Hosting rewrites..."
firebase deploy --only hosting --project $PROJECT_ID

echo ">>> Deployment completed successfully!"
