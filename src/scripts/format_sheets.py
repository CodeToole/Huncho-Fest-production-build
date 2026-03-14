from google.oauth2 import service_account
from googleapiclient.discovery import build

# Configuration
SPREADSHEET_ID = '1w6hpyBzFOd7nXr859lhchl6rzSfDCeGoZ4Ls2VfuqqQ'
SERVICE_ACCOUNT_FILE = 'service-account.json'

def get_credentials():
    return service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE,
        scopes=['https://www.googleapis.com/auth/spreadsheets']
    )

def format_sheet():
    creds = get_credentials()
    service = build('sheets', 'v4', credentials=creds)

    # Get spreadsheet details to find the first sheet ID
    spreadsheet = service.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
    sheet_id = spreadsheet['sheets'][0]['properties']['sheetId']
    sheet_title = spreadsheet['sheets'][0]['properties']['title']

    print(f"Formatting sheet: {sheet_title} (ID: {sheet_id})")

    # Define headers
    headers = [
        "Timestamp", "Artist Name", "Email", "Phone Number", 
        "Instagram/Social", "Genre", "Status", "Notes", 
        "Submission Type", "Location", "Website/EPK", "Spotify/Soundcloud"
    ]

    # 1. Update Headers if needed
    body = {
        'values': [headers]
    }
    service.spreadsheets().values().update(
        spreadsheetId=SPREADSHEET_ID,
        range=f"'{sheet_title}'!A1",
        valueInputOption='RAW',
        body=body
    ).execute()

    # 2. Apply Formatting: Bold Headers and Freeze Row 1
    requests = [
        # Bold first row
        {
            'repeatCell': {
                'range': {
                    'sheetId': sheet_id,
                    'startRowIndex': 0,
                    'endRowIndex': 1
                },
                'cell': {
                    'userEnteredFormat': {
                        'textFormat': {'bold': True},
                        'backgroundColor': {'red': 0.9, 'green': 0.9, 'blue': 0.9}, # Light gray background
                        'horizontalAlignment': 'CENTER'
                    }
                },
                'fields': 'userEnteredFormat(textFormat,backgroundColor,horizontalAlignment)'
            }
        },
        # Freeze first row
        {
            'updateSheetProperties': {
                'properties': {
                    'sheetId': sheet_id,
                    'gridProperties': {
                        'frozenRowCount': 1
                    }
                },
                'fields': 'gridProperties.frozenRowCount'
            }
        },
        # Auto-resize columns
        {
            'autoResizeDimensions': {
                'dimensions': {
                    'sheetId': sheet_id,
                    'dimension': 'COLUMNS',
                    'startIndex': 0,
                    'endIndex': len(headers)
                }
            }
        }
    ]

    service.spreadsheets().batchUpdate(
        spreadsheetId=SPREADSHEET_ID,
        body={'requests': requests}
    ).execute()

    print("Successfully formatted Google Sheet.")

if __name__ == "__main__":
    format_sheet()
