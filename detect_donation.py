import requests
import webbrowser

# Streamlabs APIのエンドポイントURL
STREAMLABS_API_URL = 'https://streamlabs.com/api/v2.0/donations'

# Streamlabs APIのアクセストークン（APIキー）
ACCESS_TOKEN = ''

# API認証
client_id = "4aa9d3a4-c3aa-45d9-9bf5-398dc66b94de"
client_secret = "UY4FuA8aqE2nBawNsNGKJgFMZXCKaHRsJMWZhCY8"

auth_url = "https://streamlabs.com/api/v2.0/token"
payload = {
    "grant_type": "client_credentials",
    "client_id": client_id,
    "client_secret": client_secret
}

response = requests.post(auth_url, data=payload)
data = response.json()
access_token = data["access_token"]

# アクセストークンを表示
print("Access Token:")
print(access_token)

# ドネーションを検知してリダイレクトする関数
def detect_donation_and_redirect():
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    
    # Streamlabs APIに送信するパラメーターを指定
    params = {
        'access_token': access_token
    }

    # Streamlabs APIを使用して最新のドネーション情報を取得
    response = requests.get(STREAMLABS_API_URL, headers=headers, params=params)
    print(response.text)  # APIの実際のレスポンスを表示
    if response.status_code == 200:
        donations = response.json()
        if donations and 'data' in donations and len(donations['data']) > 0:
            latest_donation = donations['data'][0]
            # ドネーション情報を元に特定のURLにリダイレクト
            redirect_url = 'http://blurbuckets.s3-website-ap-northeast-1.amazonaws.com/'
            webbrowser.open(redirect_url)
            print(f'Donation detected: {latest_donation}')
        else:
            print('No donations found.')
    else:
        print(f'Error fetching donations: {response.status_code}')

if __name__ == "__main__":
    detect_donation_and_redirect()
