# ZABLOG

## 環境情報

### Node Version

- node：24.18.1

バージョン管理は`mise`、もしくは`.node-version`で管理できるものを使用してください。

### コードエディタ

- VS Code 推奨

### 技術スタック

- [Astro](https://astro.build/)
- [Cloudflare](https://www.cloudflare.com/ja-jp/)

### リンター系

- [Oxlint](https://oxc.rs/docs/guide/usage/linter)
- [CSpell](https://cspell.org/)
- [Markuplint](https://markuplint.dev/ja/)

## ディレクトリ構造

```zsh
/
.
├── README.md
├── dist                  # ビルド出力先
├── public                # 静的配信ディレクトリ（favicon など）
├── src
│   ├── assets
│   │   ├── images        # Astro上で呼び出す画像（CSSなどで呼び出す場合はpublicを使用）
│   │   └── styles
│   ├── components        # 各ページで使い回すコンポーネント
│   ├── constants         # 定数定義
│   ├── pages             # Astroのルーティング用ファイル
│   └── views             # 各ページの実装本体（pagesから参照される）
│       ├── _layouts
│       ├── index.astro
└── その他設定ファイル
```

## 開発サーバー

| コマンド          | 説明                   |
| ----------------- | ---------------------- |
| `npm run dev`     | 開発サーバー起動       |
| `npm run build`   | ビルド                 |
| `npm run preview` | ビルド結果のプレビュー |

## 開発ルール

### 画像ファイル命名ルール

[識別子][連番][状態].[拡張子]の形式

- 識別子
  - figure：図版（グラフ、表、組織図などコンテンツを含むもの）
  - logo：ロゴ
  - banner：リンクバナー（画像のみでリンクとして用いられるもの）
  - logo と banner の両方に当てはまる場合は logo とする
  - icon：アイコン
  - text：特殊フォントなどのテキスト画像。本文中などでテキストとして用いるためのもの。ロゴは別（logo）。
  - hero：メインビジュアル
  - ogp：OGP イメージ（ナンバリングはなし）
  - video：mp4 などの動画
  - meta：サムネイルメタタグ、favicon（ナンバリングはなし）
  - image：上記のどれにも当てはまらない画像一般
- 連番:
  - 01 から開始
  - 識別子ごとにカウントする
    - 例：image_01.png、icon_01.png が存在する
- 状態：色名、PC/SP など
  - PC/SP で異なる画像ファイルを表示する場合は、PC 用画像に\_pc、SP 用画像に\_sp をつける（一方のみにつけることは禁止）
  - 元々同じ画像ファイルを表示していたものが後から出し分けに変更になった場合でも、元々使用していたファイルにも上記のサフィックスをつける

### CSS

Astroファイル内でスコープドスタイルで使用します。

#### クラス名

スコープドのため命名ルールは厳格にしなくて良いですが、原則MindBEMdingを採用します。
https://github.com/manabuyasuda/styleguide/blob/master/how-to-bem.md

クラス名はアッパーキャメルケースで指定します。
`BlockName__ElementName--modifier-name`

#### サイズ指定

基本的には rem での指定をしてください。<br />
border などのブラウザのフォントサイズの変更に依存しないようなプロパティは px で指定してださい。

```scss
.Sample {
	font-size: 1rem;
}
```

### CSS変数

- カラー
- アイコンとして使用するSVG

はCSS変数として登録してから使用してください。

▼参考

```css
:root {
	/* Color  */
	--primary_black: #303030;

	/* Icon */
	--icon-arrow: url('data:image/svg+xml;charset=UTF-8,<svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="1" y1="6" x2="11" y2="6" stroke="black" stroke-width="2" stroke-linecap="round"/><path d="M8 11L12.2929 6.70711C12.6834 6.31658 12.6834 5.68342 12.2929 5.29289L8 1" stroke="black" stroke-width="2" stroke-linecap="round"/></svg>');
}
```

基本的にアイコンをSVGで使用する時は`mask-image`を使用するようにしてください。

```css
.Icon {
	mask-image: var(--icon-arrow);
	mask-repeat: none;
	mask-size: contain;
	mask-position: center;
}
```

### CSSのホバー指定

単純なホバーではなく、メディアクエリーを用いてください。

```css
/* その要素がホバーされる場合 */
@media (hover: hover) {
	&:where(:any-link, :enabled, summary, label):hover {
		color: blue;
	}
}

/* 親のクリッカブル要素がホバーされる場合 */
@media (hover: hover) {
	&:is(:where(:any-link, :enabled, summary, label):hover *) {
		@mixin-content;
	}
}
```

### ブレイクポイント

- PC：960px以上
- SP：959px以下

指定にはコンテナクエリーを使用してください。

▼参考

```css
@container style(--pc: true) {
	color: blue;
}
@container style(--sp: true) {
	color: green;
}
```
