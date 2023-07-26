import requests
import webbrowser

# Streamlabs APIのエンドポイントURL
STREAMLABS_API_URL = 'https://streamlabs.com/api/v2.0/events'

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
def detect_comment_and_redirect():
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    
    # Streamlabs APIに送信するパラメーターを指定
    params = {
        'access_token': access_token,
        'type': 'follows',  # コメント以外のイベントも含まれる可能性があるので、コメントのみに絞る必要がある場合は適宜変更してください
        'limit': 10  # 最新の10件のイベントを取得
    }

    # Streamlabs APIを使用して最新のイベント情報を取得
    response = requests.get(STREAMLABS_API_URL, headers=headers, params=params)
    print(response.text)  # APIの実際のレスポンスを表示
    if response.status_code == 200:
        events = response.json()
        if events and 'data' in events and len(events['data']) > 0:
            for event in events['data']:
                if 'message' in event and 'tts' in event['message']:
                    comment = event['message']['tts']
                    # 特定のコメントが含まれているかチェック
                    if 'your_target_comment' in comment.lower():  # 'your_target_comment'には特定のコメントを指定します
                        # リダイレクトURLを開く
                        redirect_url = 'http://blurbuckets.s3-website-ap-northeast-1.amazonaws.com/'
                        webbrowser.open(redirect_url)
                        print(f'Comment detected: {comment}')
                        break  # 特定のコメントを1つ見つければ終了
            else:
                print('No target comments found.')
        else:
            print('No events found.')
    else:
        print(f'Error fetching events: {response.status_code}')

if __name__ == "__main__":
    detect_comment_and_redirect()
