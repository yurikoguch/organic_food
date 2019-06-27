'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var server = browserSync.create();
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

function reloadBR(done) {
    server.reload();
    done();
}

gulp.task('html:build', () => {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(server.stream());
});

gulp.task('js:build', () => {
    return gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(server.stream());
});

gulp.task('style:build', () => {
    return gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(server.stream());
});

gulp.task('image:build', () => {
    return gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(server.stream());
});

gulp.task('fonts:build', () => {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', gulp.series(
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build', (done) => {
        done();
    }
));

gulp.task('watch', function() {
    gulp.watch([path.watch.html], gulp.series('html:build', reloadBR));
    gulp.watch([path.watch.style], gulp.series('style:build', reloadBR));
    gulp.watch([path.watch.js], gulp.series('js:build', reloadBR));
    gulp.watch([path.watch.img], gulp.series('image:build', reloadBR));
    gulp.watch([path.watch.fonts], gulp.series('fonts:build', reloadBR));
    return;

});

gulp.task('webserver', (done) => {
    server.init(config);
    done();
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', gulp.series('build', 'webserver', 'watch', (done) => {
    done();
}));