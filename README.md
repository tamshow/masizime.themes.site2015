
#a-blog cms初期プレーンテーマ

## サンプル
[http://www.masizime.com/acms/]

- site2015のカスタムフィールド値を引き継ぐ
- レイアウト機能
- ユニット設定
- スタイルガイド
- コンフィグ設定
- インポートデータ


###ソースコード
#### 【Grunt build前】
 - 未圧縮のcssファイルですそのまま使用しても問題ありません。


#### 【Grunt build後】
 - 複数のcssをbase.min.cssにまとめます。
 - htmlのcssファイルのリンクをbase.min.cssへ変更してください。


###コンパイル
Sassファイルは各環境でコンパイルしてください。
ソースの圧縮をしたい場合はGruntを使用してください。



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


### Guidelines
[http://www.masizime.com/guideline/](http://www.masizime.com/guideline/)
#### sass Mixins
[https://github.com/tamshow/masizime.sass.mixins]










