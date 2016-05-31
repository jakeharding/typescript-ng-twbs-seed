var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var srcmaps = require("gulp-sourcemaps");
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var watchify = require("watchify");
var sass = require("gulp-sass");
var uglyCss = require("gulp-uglifycss");
var pug = require("gulp-pug");

var paths = {
    ts_libs: 'src/ts/libs.ts',
    ts_app: 'src/ts/app.ts',
    js_dest: 'dist/js',
    scss_file: "src/scss/styles.scss",
    css_dest: "dist/css",
    pug_fls: ["src/pug/*", "src/pug/**/*"],
    index_fl: "src/index.pug",
    html_dest: "dist/partials",
}

gulp.task("build_index", function () {
    gulp.src(paths.index_fl)
        .pipe(pug())
        .pipe(gulp.dest("dist"))
})

gulp.task("build_html", ["build_index"], function () {
    gulp.src(paths.pug_fls)
        .pipe(pug())
        .pipe(gulp.dest(paths.html_dest))
})

gulp.task("build_js_libs", function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: [paths.ts_libs],
        cache: {},
        packageCache: {},
    })
    
    .plugin(tsify)
    .bundle()
    .pipe(source('libs.js'))
    .pipe(buffer())
    .pipe(srcmaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(srcmaps.write('./'))
    .pipe(gulp.dest(paths.js_dest));
});

var watched = watchify(browserify({
        basedir: '.',
        debug: true,
        entries: [paths.ts_app],
        cache: {},
        packageCache: {},
    }).plugin(tsify));

function bundleApp() {
    return watched
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(srcmaps.init({loadMaps: true}))
        .pipe(uglify().on('error', gutil.log))
        .pipe(srcmaps.write('./'))
        .pipe(gulp.dest(paths.js_dest));
}

gulp.task("build_styles",  function () {
    gulp.src(paths.scss_file)
        .pipe(sass())
        .pipe(srcmaps.init())
        .pipe(uglyCss())
        .pipe(srcmaps.write('./'))
        .pipe(gulp.dest(paths.css_dest));
})

gulp.task("watch", function () {
    gulp.watch(paths.scss_file, ["build_styles"]);
    gulp.watch(paths.pug_fls, ["build_html"]);
})

gulp.task("build_app", bundleApp);

watched.on("update", bundleApp);
watched.on("log", gutil.log);

gulp.task('init', ['build_js_libs', 'build_app', "build_styles"]);

gulp.task('default', ['build_app', "build_styles", "build_html", "watch"]);