var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'), //合并文件
    autoprefixer = require('gulp-autoprefixer'), //css属性加上浏览器的前缀
    cleanCSS = require('gulp-clean-css');//css压缩

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var sassPath = "static/css/*.scss";

//启动nodemon
gulp.task("node", function () {
    nodemon({
        script: 'app.js',
        ignore: ["gulpfile.js", "node_modules/"],
        env: {
            'NODE_ENV': 'development'
        }
    })
});

//启动browsersync
gulp.task('browsersync',['node'], function () {
    var files = [
        'views/**/*.*',
        'static/**/*.*'
    ];

    browserSync.init({
        proxy: 'http://localhost:8080',
        browser: ["chrome"],
        files: files,
        port: 5000
    });

    gulp.watch(files).on("change", reload);
});

//sass转换
gulp.task('sass', function () {
    return gulp.src(sassPath)
        .pipe(concat('main.scss'))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest('static/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
//监听sass
gulp.task('watch-sass', ['sass'], function () {
    gulp.watch(sassPath, ['sass']);
})

gulp.task('default', ["browsersync", "watch-sass"], function () { });