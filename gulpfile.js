"use strict";
 
const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
 
const ejs = require("gulp-ejs");
sass.compiler = require("node-sass");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");

function makeCss(){
	return gulp.src(["./src/partials/base.scss","./src/**/*.scss"])
		.pipe(concat("modal.css"))
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(cleanCSS({compatibility: "ie8"}))
		.pipe(gulp.dest("./www/css"));
}

function makePage(){
	return gulp.src("./src/pages/*.html")
		.pipe(ejs())
		.pipe(gulp.dest("./www"));
}

function watch() {

	browserSync.init({
		server: "./www"
	});

	gulp.watch("./src/**/*.html", makePage);
	gulp.watch("./src/**/*.scss", makeCss);
	gulp.watch("./www").on("change", browserSync.reload);
}

// module.exports.makeCss = makeCss;
module.exports.watch = watch;