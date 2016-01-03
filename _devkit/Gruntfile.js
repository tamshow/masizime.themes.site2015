'use strict';
module.exports = function (grunt) {

   // Load grunt tasks automatically
   require('load-grunt-tasks')(grunt);

   // Time how long tasks take. Can help when optimizing build times
   require('time-grunt')(grunt);

   var config = {
      // Configurable paths
      Version: '1.1.0',
      appPath: '../..',
      distPath: '..',
      img: 'img',
      css: 'css',
      js: 'js'
   };

   grunt.initConfig({
      config: config,
      //autoshot
      //---------------------------
      autoshot: {
         dist: {
            options: {
               path: '<%= config.distPath %>/_screenshots/',
               remote: {
                  files: [
                     {src: "http://masizime.com/", dest: "index.jpg", delay: 3000}
                  ]
               },

               //viewport: ['320x480', '480x320', '568x320', '667x375', '768x1024','960x600', '1024x768', '1440x900', '2560x1600']
               viewport: ['320x480', '667x375', '960x600','1024x768', '1440x900', ]
            }
         }
      },


      // テキスト置換
      //---------------------------
      replace: {
         dist: {
            src: ['<%= config.distPath %>/<%= config.css %>/base.min.css'],
            overwrite: true,
            replacements: [
               {
                  from: "<%= config.appPath %>/",
                  to: "<%= config.distPath %>/"
               }]
         },
         comment: {
            src: ['<%= config.distPath %>/**/*.html'],
            overwrite: true,
            replacements: [
               {
                  from: /<!--[^\[]*?-->/g,
                  to: ''
               }]
         }
      },

      // ベンダープレフィックスの調整
      //---------------------------
      autoprefixer: {
         options: {
            browsers: ['last 2 version', 'Firefox ESR','Opera 12.1', 'ie 8', 'ie 9']
         },
         dist: {
            files: [{
               expand: true,
               flatten: true,
               cwd: '<%= config.distPath %>/<%= config.css %>/',
               src: 'base.min.css',
               dest: '<%= config.distPath %>/<%= config.css %>/'
            }]
         }
      },
      //@mediaをまとめる
      //---------------------------
      cmq: {
         options: {log: true},
         dist: {files: {'<%= config.distPath %>/<%= config.css %>/': ['<%= config.distPath %>/<%= config.css %>/base.min.css']}}
      },

      //<%= config.css %>の圧縮
      //---------------------------
      cssmin: {
         dist_base: {
            src: '<%= config.distPath %>/<%= config.css %>/base.min.css',
            dest: '<%= config.distPath %>/<%= config.css %>/base.min.css'
         }
      },

      //jsの圧縮
      //---------------------------
      uglify: {
         dist: {
            files: {
               '<%= config.distPath %>/<%= config.js %>/base.min.js': '<%= config.distPath %>/<%= config.js %>/base.min.js'
            }
         }
      },

      //ファイルをつなぎ合わせる
      //---------------------------
      concat: {
         //<%= config.css %>
         dist_css: {
            src: [
               '<%= config.distPath %>/<%= config.css %>/base/**/*.css'
            ],
            dest: '<%= config.distPath %>/<%= config.css %>/base.min.css'
         },
         dist_js_base: {
            src: [
               '<%= config.distPath %>/<%= config.js %>/base/vendor/**/*.js',
               '<%= config.distPath %>/<%= config.js %>/base/plugin.js',
               '<%= config.distPath %>/<%= config.js %>/base/common.js'
            ],
            dest: '<%= config.distPath %>/<%= config.js %>/base.min.js'
         }
      },


      //<%= config.css %>comb
      //---------------------------
      csscomb: {
         options: {
            config: 'csscomb.json'
         },
         dist: {
            expand: true,
            cwd: '<%= config.distPath %>/<%= config.css %>/',
            src: ['*.css'],
            dest: '<%= config.distPath %>/<%= config.css %>/'
         }
      },

      //svgmin
      //---------------------------
      svgmin: {
         dist: {
            files: [{
               expand: true,
               cwd: '<%= config.distPath %>/<%= config.img %>',
               src: '{,*/}*.svg',
               dest: '<%= config.distPath %>/<%= config.img %>'
            }]
         }
      },

      imagemin: {
         dist: {
            files: [{
               expand: true,
               cwd: '<%= config.distPath %>/<%= config.img %>',
               src: '{,*/}*.{png,jpg,jpeg,gif}',
               dest: '<%= config.distPath %>/<%= config.img %>'
            }]
         }
      },

      //HTML整形
      //---------------------------
      prettify: {
         options: {
            config: '.prettifyrc'
         },
         all: {
            expand: true,
            cwd: '<%= config.distPath %>/',
            ext: '.html',
            src: [
               '**/*.html',
               '!_*/**'
            ],
            dest: '<%= config.distPath %>/'
         }
      },

      //<%= config.css %>Sprite
      //---------------------------
      sprite: {
         'all': {
            'src': ['<%= config.distPath %>/<%= config.img %>/sprites/*.{gif,jpeg,jpg,png}'],
            'destImg': '<%= config.distPath %>/<%= config.img %>/sprite.png',
            'destCSS': '<%= config.distPath %>/_sass/_sprite_positions.scss',
            'imgPath': '<%= config.appPath %>/<%= config.img %>/sprite.png',
            //'algorithm': 'top-down',
            //'algorithm': 'left-right',
            //'algorithm': 'diagonal',
            //'algorithm': 'alt-diagonal',
            'algorithm': 'binary-tree',
            'padding': 0,
            // OPTIONAL: Map variable of each sprite
            'cssVarMap': function (sprite) {
               // `sprite` has `name`, `image` (full path), `x`, `y`
               //   `width`, `height`, `total_width`, `total_height`
               // EXAMPLE: Prefix all sprite names with 'sprite-'
               //sprite.name = 'sprite-' + sprite.name;
            },
            // OPTIONAL: Specify img options
            'imgOpts': {
               'format': 'png',
               'quality': 90,
               'timeout': 10000
            }
         }
      },

      // Web Font
      webfont: {
         icons: {
            src: '<%= config.distPath %>/fonts/svg/*.svg', // svgファイル
            dest: '<%= config.distPath %>/fonts', // 書き出し先
            destCss: '<%= config.distPath %>/_sass/fonts', // スタイルの書き出し先
            options: {
               font: 'base-fonts', // ベース名 (ファイル名など)
               engine: 'node', // エンジン
               hashes: false, // ファイル名にランダム文字列を追加
               stylesheet: 'scss', // スタイルシートの形式
               htmlDemo: true, // htmlを生成するか
               templateOptions: {
                  baseClass: 'icon', // ベースクラス
                  classPrefix: 'icon-' // クラス名プレフィックス
               }
            }
         }
      },


      //cssLint
      //---------------------------
      csslint: {
         strict: {
            options: {
               "important": false,
               "ids": false,                     //Selectors should not contain IDs.
               "unique-headings": false,
               "font-sizes": false,
               "universal-selector": false,
               "regex-selectors": false,
               "vendor-prefix": false,
               "adjoining-classes": false,
               "compatible-vendor-prefixes": false,
               "floats": false,
               "unqualified-attributes": false,
               "box-model": false,
               "duplicate-background-images": false,
               "star-property-hack": false,
               "overqualified-elements": false,
               "gradients": false,
               "display-property-grouping": false,
               "box-sizing": false,
               "outline-none": false,
               "duplicate-properties": false,
               "qualified-headings": false,
               "known-properties": false,
               "text-indent": false
            },
            src: [
               //css/base-reset.css','css/layout.css','css/module.css'
               '<%= config.distPath %>/<%= config.css %>/base/**/*.css'

            ]
         }
      },
      // jsHint
      //-----------------------------
      jshint: {
         all: [
            '<%= config.distPath %>/<%= config.js %>/base/plugin.js',
            '<%= config.distPath %>/<%= config.js %>/base/common.js',
            'Gruntfile.js'
         ]
      }



   });

   grunt.registerTask(
       'build',
       [
          'concat',
          'csscomb:dist',
          'autoprefixer:dist',
          'cmq:dist',
          'replace:dist',
          'cssmin:dist_base',
          'uglify'//,
          //'replace:comment',
          //'prettify'
       ]);


   grunt.registerTask('imgmin', [
      'svgmin',
      //'imagemin'
   ]);

   grunt.registerTask('imgsprite', [
      'sprite'
   ]);

   grunt.registerTask('mywebfont', [
      'webfont'
   ]);

   grunt.registerTask('screenshots', [
      'autoshot'
   ]);
   grunt.registerTask('lint', [
      'csslint'
   ]);
   grunt.registerTask('hint', [
      'jshint'
   ]);

};
