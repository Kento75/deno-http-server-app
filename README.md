# deno-http-server-app

Deno を使って HTTP サーバ作成に挑戦

### 何をするか

・TCP サーバ立てる
・TCP クライアント立てる

## セットアップ

```
# Denoをインストール
$ curl -fsSL https://deno.land/x/install/install.sh | sh

# Denoを環境変数に設定
$ vi ~/.bash_profile #--> export PATH="~/.deno/bin:$PATH" を追加
$ source ~/.bash_profile
```

```
# サーバー起動コマンド
$ deno deno-server.ts

# クライアント起動コマンド
$ deno deno-client.ts

# 🦜返しするサーバーの起動コマンド
$ deno http-server.ts

# curlでデータ送信
$ curl localhost:8000 --data-raw "deno de http server"
```
