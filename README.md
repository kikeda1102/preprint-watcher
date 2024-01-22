# preprint-watcher

キーワードを登録しておくと、
そのキーワードで arXiv を自動検索してくれる Web アプリ

arXiv を毎日全部見るのは大変なので、興味のあるキーワードだけチェックできる

## 要件

ユーザは認証してログイン

ユーザーがログインするたびに検索実行

結果を表示

## 技術

Framework: Next.js

DB: SQLite

OR Mapper: Prisma

[arXiv API](https://info.arxiv.org/help/api/index.html)でデータ取得

## 構成

```
.
├── app: ホームページ
│ ├── login: ログイン画面(未作成)
│ └── dashboard: 各ユーザーのページ
├── components: UI 要素を置く場所
├── lib
│ ├── actions.ts: DB 操作、API
│ ├── search-query.ts: 検索クエリを規定するSearchQueryクラスの定義
│ └── prisma.ts: prisma Client の作成
├── ...
```
