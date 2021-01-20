const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso")
const sync = require("browser-sync").create();
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const svgstore = require("gulp-svgstore");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const del = require("del");

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(rename(function(path) {
      if (!path.extname.endsWith('.map')) {
        path.basename += '.min';
      }
    }))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

//html

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"))
}

exports.html = html;

// sprite

const sprite = () => {
  return gulp.src("source/img/icons-svg/*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/icons-svg"))
}

exports.sprite = sprite

// images

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.images = images;

// webp

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series("html"));
  gulp.watch("source/img/icons-svg/*.svg", gulp.series("sprite"));
  gulp.watch([
    "source/fonts/*.{woff,woff2}",
    "source/*.ico"
  ], gulp.series("copyFontsAndIco"));
  gulp.watch("source/img/**/*.{jpg,png,svg}", gulp.series("copyImages"));
  gulp.watch("source/img/**/*.{jpg,png}", gulp.series("createWebp"));
  gulp.watch("build/**").on("change", sync.reload);
}

//copy

const copyFontsAndIco = () => {
  return gulp.src([
      "source/fonts/*.{woff,woff2}",
      "source/*.ico"
    ],
    {
      base: "source"
    })
    .pipe(gulp.dest("build"))
}

exports.copyFontsAndIco = copyFontsAndIco;

//copy

const copyImages = () => {
  return gulp.src(
      "source/img/**/*.{jpg,png,svg}",
    {
      base: "source"
    })
    .pipe(gulp.dest("build"))
}

exports.copyImages = copyImages;

//clean

const clean = () => {
  return del("build");
}

exports.clean = clean;

//build

const build = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    sprite,
    images,
    createWebp,
    copyFontsAndIco
  )
)

exports.build = build;

exports.default = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    sprite,
    createWebp,
    copyFontsAndIco,
    copyImages
  ),
  gulp.series(
    server,
    watcher
  )
)
