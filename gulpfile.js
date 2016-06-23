'use strict';

var gulp            = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var reactTools      = require('react-tools');
var browserSync     = require('browser-sync');
var $               = gulpLoadPlugins();

var browserSyncOption ={
    server:{
      baseDir: 'src'
    },
    open:true,                  
    port:8090                      
}

function l (){
  console.log.apply(console,arguments);
}




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
    //观察jst
    var watcher = gulp.watch('src/js/components/*.js', ['jst']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running [jst] task...');
    });

    //观察js
    var watcher2 = gulp.watch('src/js/*.js', ['webpack']);
    watcher2.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running [webpack] task...');
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





