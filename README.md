# preprint-watcher

キーワードを登録しておくと、
そのキーワードで arXiv を自動検索してくれる Web アプリ

arXiv を毎日全部見るのは大変なので、興味のあるキーワードだけチェックできる

## 仕様

ユーザは認証してログイン
ユーザーがログインするたびに検索実行
結果を表示

## 構成

.
├── app: ホームページ
│ ├── login: ログイン画面(未作成)
│ └── overview: 各ユーザーのページ
├── components: UI 要素を置く場所
├── lib
│ ├── actions.ts: DB 操作、API
│ └──prisma.ts: prisma Client の作成
├──
└──
