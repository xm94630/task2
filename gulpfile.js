'use strict';

/***********************************
 * 模块加载
 ***********************************/
var gulp            = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var reactTools      = require('react-tools');
var browserSync     = require('browser-sync');
var $               = gulpLoadPlugins();

/***********************************
 * 配置（这部分可以考虑放到package.js)
 ***********************************/
var browserSyncOption ={
    server:{
      baseDir: 'src'
    },
    open:true,                  
    port:8090                      
}

/***********************************
 * 自定义函数
 ***********************************/
function l (){
  console.log.apply(console,arguments);
}

/***********************************
 * gulp 任务
 ***********************************/
gulp.task('default',['jst','browserSync','watch'],function(){
});

gulp.task('jst',function(){
  gulp.src('src/js/components/*.js')
    .pipe($.reactify({
      reactTools:reactTools
    }))
    .pipe(gulp.dest('src/js/'))
});

gulp.task('browserSync',function(){
  browserSync(browserSyncOption);
});

gulp.task('watch',function(){

  /*以下有部分可以合并处理*/

  //观察jst
  var watcher = gulp.watch('src/js/components/*.js', ['jst']);
  watcher.on('change', function(event) {
    l('File ' + event.path + ' was ' + event.type + ', running [jst] task...');
  });

  //观察js
  var watcher2 = gulp.watch('src/js/*.js', ['webpack']);
  watcher2.on('change', function(event) {
    l('File ' + event.path + ' was ' + event.type + ', running [webpack] task...');
  });

  //观察css
  var watcher3 = gulp.watch('src/css/*.css', ['jst']);
  watcher3.on('change', function(event) {
    l('File ' + event.path + ' was ' + event.type + ', running [jst] task...');
  });

  //观察html
  var watcher4 = gulp.watch('src/index.html', ['jst']);
  watcher4.on('change', function(event) {
    l('File ' + event.path + ' was ' + event.type + ', running [jst] task...');
  });
});

gulp.task('webpack',function(){
  gulp.src(['src/js/main.js'])
    .pipe($.webpack({
      watch: false,
      module: {
        loaders: [
          { test: /\.css$/, loader: 'style!css' },
        ],
      },
      output: {
        filename: 'app.js',
      }
    }))
    .pipe(gulp.dest('src/js/'));
  gulp.src('src/js/app.js').pipe(browserSync.reload({stream: true}));
});

gulp.task('build',function(){
  gulp.src('src/*.html')
     .pipe(gulp.dest('dist/'))

  gulp.src('src/js/app.js')
      .pipe(gulp.dest('dist/js/'))

  gulp.src('src/js/lib/*.js')
      .pipe(gulp.dest('dist/js/lib'))
});





