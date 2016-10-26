"use strict";

const build_path = "./build/";
const build_app_path = "./build/app/";
const src_path = "./src/";
const src_app_path = "./src/app/";

const gulp = require("gulp");
const del = require('del');
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");
const tslint = require('gulp-tslint');

/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return del([build_path], cb);
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src(src_path + "**/*.ts")
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report());
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", ["tslint"], () => {
    let tsResult = gulp.src(src_path + "**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write(".", {sourceRoot: src_path}))
        .pipe(gulp.dest(build_path));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", () => {
    return gulp.src([src_path + "**/*", "!**/*.ts"])
        .pipe(gulp.dest(build_path));
});


/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
    return gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest(build_path + "lib"));
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
    gulp.watch([src_path + "**/*.ts"], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch([src_path + "**/*.html", src_path + "**/*.css"], ['resources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
});

/**
 * Build the project.
 */
gulp.task("default", ['compile', 'resources', 'libs'], () => {
    console.log("Building the project ...");
});