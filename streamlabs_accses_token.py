import requests

client_id = "4aa9d3a4-c3aa-45d9-9bf5-398dc66b94de"
client_secret = "UY4FuA8aqE2nBawNsNGKJgFMZXCKaHRsJMWZhCY8"

# API認証
auth_url = "https://streamlabs.com/api/v2.0/token"
payload = {
    "grant_type": "client_credentials",
    "client_id": client_id,
    "client_secret": client_secret
}

response = requests.post(auth_url, data=payload)
data = response.json()
access_token = data["access_token"]

print("API Response:")
print(data)

print("Access Token:")
print(access_token)

# これ以降、access_tokenを使ってAPIリクエストを行います
# 例: アラートデータを取得するAPIエンドポイント
alerts_url = "https://streamlabs.com/api/v2.0/alerts"
headers = {
    "Authorization": f"Bearer {access_token}"
}

response = requests.get(alerts_url, headers=headers)
# 必要な処理を行います
