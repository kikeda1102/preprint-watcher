# preprint-watcher

キーワードを登録しておくと、
そのキーワードで arXiv を自動検索してくれる Web アプリ
arXiv を毎日全部見るのは大変なので、興味のあるキーワードだけチェックできる

## TODO

- 登録したキーワードによる検索
  arXiv API のクエリを作る
  何件取るか、何日分取るか考慮

- キーワードの CRUD

  - Create
    キーワード入力時のバリデーション
    Zod を使う
    空白を弾く、unique にする

  - Read: 実装済み

  - Update: 未実装

  - Delete: 実装済み

- ユーザ認証
  next-auth を使う
  google / メール でログインできるようにする

- 検索結果の表示
  どのキーワードで検索に引っかかったのかを表示

## 仕様

ユーザは認証してログイン
ユーザーがログインするたびに検索実行
結果を表示
