###a-blog cmsプレーンテーマ

####主な機能
 - site2015のカスタムフィールド値を引き継ぐ
 - レイアウト機能
 - スタイルガイド
 - コンフィグ設定有り
 - インポートデータ有り

###主なカスタマイズ
 - ユニット ： レスポンシブテーブルなどでテーブルのdivを修正
 - ユニット ： テキストユニットにiframe（レスポンシブ）の入力欄を追加
 - ユニット ： 最大幅が680pxなのでGoogleMapのスタッティックマップを非表示
 - ユニット ： 配置右が連続した場合のclearHiddenを消す(common.js)
 - カスタムユニット ： ボタンを追加
 - ユニットグループ ： 背景有りを追加（.m-col12.box-aなど）
 - レイアウト ： ベースレイアウト（右にコンテンツ、左にサイドナビ
 - レイアウト ： 共通サイドエリア

###初めてこのソースを見る方へ
 - css、jsの追加はcustom.css,custom.jsに記入してください。
 - スタイルガイドをdocsフォルダへまとめています。必要に応じて使用してください。
 - アンダースコアではじまるフォルダ開発用フォルダです、実際にサーバーへアップロードする必要ありません。
 - Sassファイルは各環境でコンパイルしてください。
 - Grunt(build)を使用しなくても動作に問題はありません。圧縮したい場合に使用してください。
 - ソースの圧縮をしたい場合はGruntを使用してください。
 - Guidelines http://www.masizime.com/guideline/
 - sass Mixins https://github.com/tamshow/masizime.sass.mixins
 - テーマダウンロード https://github.com/tamshow/masizime.themes.site2015」
 - スタイルガイドライン http://www.masizime.com/guideline/


####Grunt build後
  - 複数のcssをbase.min.cssにまとめます。
  - htmlのcssファイルのリンクをbase.min.cssへ変更してください。
  - 複数のjsファイルbase.min.jsにまとめます。
  - htmlのjsファイルのリンクをbase.min.jsへ変更してください。

####対応ブラウザ
 - windows mobile
 - android 4.4
 - ie8〜

####使用ツール
 - favicons http://realfavicongenerator.net/
 - PageSpeed Insights https://developers.google.com/speed/pagespeed/insights/
 - モバイル フレンドリー テスト https://www.google.com/webmasters/tools/mobile-friendly/

####IE8
 - svgをpngへ変更
 - 新しいブラウザインストールを促す警告表示
 - レスポンシブしない

####タッチ端末
 - 電話番号をspan.js-tel-linkくくるとTELリンク
 - .js-sp-hoverで疑似的ホバー処理(.sp-hoverが付く)

####デスクトップ
 - 画像リンク半透明



### npm sample

```bash
$ npm install --save -dev
```



### Grunt sample

```bash
$ grunt build
```

```bash
$ grunt sprite
```

```bash
$ grunt imgmin
```

```bash
$ grunt screenshots
```



### hologram sample

```bash
$ bundle install
```

```bash
$ bundle exec hologram _hologram/config.yml
```
