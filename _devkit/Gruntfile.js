'use strict';
module.exports = function (grunt) {

   // Load grunt tasks automatically
   require('load-grunt-tasks')(grunt);

   // Time how long tasks take. Can help when optimizing build times
   require('time-grunt')(grunt);

   var config = {
      // Configurable paths
      Version: '1.0.0',
      appPath: '../..',
      distPath: '..',
      img: 'img',
      css: 'css'
   };

   grunt.initConfig({
      config: config,
      //autoshot
      //---------------------------
      autoshot: {
         dist: {
            options: {
               path: '<%= config.distPath %>/screenshots/',
               remote: {
                  files: [
                     {src: "http://", dest: "entry-a.jpg", delay: 3000}
                  ]
               },
               //viewport: ['320x480', '480x320', '320x568', '568x320', '375x667', '667x375', '414x736', '736x414', '768x1024', '1024x768', '1440x900', '2560x1600', '384x640', '640x384', '602x963', '963x602', '600x960', '960x600', '800x1280', '1280x800', '1280x850', '1020x600']
               viewport: ['1280x800', '1280x850', '1020x600']
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
            browsers: ['last 2 version', 'android 2.3', 'ie 8', 'ie 9']
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

      //ファイルをつなぎ合わせる
      //---------------------------
      concat: {
         //<%= config.css %>
         dist_css: {
            src: [
               '<%= config.distPath %>/<%= config.css %>/base/**/*.css'
            ],
            dest: '<%= config.distPath %>/<%= config.css %>/base.min.css'
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
            'destCSS': '<%= config.distPath %>/sass/_sprite_positions.scss',
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
            destCss: '<%= config.distPath %>/sass/fonts', // スタイルの書き出し先
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
          'replace:comment',
          'prettify'
       ]);


   grunt.registerTask('imgmin', [
      //'svgmin',
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

};
