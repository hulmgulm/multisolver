// PlugIns
const	gulp			= require('gulp'),
		changed			= require('gulp-changed'),
		jshint			= require('gulp-jshint'),
		uglify			= require('gulp-uglify'),
		rename			= require('gulp-rename'),
		imagemin		= require('gulp-imagemin'),
		clean			= require('gulp-clean'),
		htmlmin			= require('gulp-htmlmin'),
		autoprefixer	= require('gulp-autoprefixer'),
		cleanCSS		= require('gulp-clean-css'),
		tslint			= require('gulp-tslint'),
		sourcemaps		= require('gulp-sourcemaps'),
		tsc				= require('gulp-typescript'),
		webserver		= require('gulp-webserver'),
		runSequence		= require('run-sequence'),
		gulpif			= require('gulp-if'),
		tsProject		= tsc.createProject("tsconfig.json");
		Config			= require('./gulpfile.config');

// Load config file
var config = new Config();

// Cleanup
gulp.task('clean', function(cb) {
	return gulp.src(config.pathDest, {read: false})
			.pipe(gulpif(config.clean, clean()));
});

// Lint all TypeScript-files
gulp.task('ts-lint', ['clean'], function () {
	if(config.lint){
		return gulp.src(config.pathSource + '**/*.ts')
				.pipe(tslint({
					formatter: 'prose'
				}))
				.pipe(tslint.report());
	}
});

// Compile TypeScript-files
function Compile(){
	var sourceTsFiles = [	
						config.pathSource + '**/*.ts',				//path to typescript files
						config.pathLibraryTypeScriptDefinitions		//reference to library .d.ts files
					];

	var tsResult = gulp.src(sourceTsFiles)
					   .pipe(sourcemaps.init())
					   .pipe(tsProject());

	tsResult.dts.pipe(gulp.dest(config.pathDest));
	return tsResult.js
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(config.pathDest));
}

gulp.task('compile-ts', ['ts-lint'], function () {
	return Compile();
});

// Copy all required libraries into build directory.
gulp.task("copy-libs", ['compile-ts'], function() {
	if(config.copyLibs){
		return gulp.src([
				'core-js/client/shim.min.js',
				'systemjs/dist/system-polyfills.js',
				'systemjs/dist/system.src.js',
				'reflect-metadata/Reflect.js',
				'rxjs/**',
				'zone.js/dist/**',
				'@angular/**'
			], {cwd: "node_modules/**"})
			.pipe(gulp.dest(config.pathDest + "lib"));
	}
});

// Copy other files
gulp.task('copy-other', ['copy-libs'], function() {
	var filesToCopy = [
		config.pathSource + "systemjs.config.js"
	];

	for(var f = 0; f < filesToCopy.length; f++){
		gulp.src(filesToCopy[f])
			.pipe(gulp.dest(config.pathDest));
	}
});

// Copy (and compress) all images
gulp.task('copy-images', ['copy-other'], function() {
	var imgSrc = config.pathSource + config.pathImages + '**/*',
		imgDst = config.pathDest + config.pathImages;

	gulp.src(imgSrc)
		.pipe(changed(imgDst))
		.pipe(gulpif(config.compressImages, imagemin()))
		.pipe(gulp.dest(imgDst));
});

// Copy (and compress) all CSS-files
gulp.task('copy-css', ['copy-images'], function() {
	return gulp.src(config.pathSource + '**/*.css')
		.pipe(gulpif(config.compressCSS, cleanCSS({debug: false}, function(details) {
			// console.log(details.name + ': ' + details.stats.originalSize);
			// console.log(details.name + ': ' + details.stats.minifiedSize);
		})))
		.pipe(gulp.dest(config.pathDest));
});

// Copy (and compress) all HTML-files
gulp.task('copy-html', ['copy-css'], function() {
	return gulp.src(config.pathSource + '**/*.html')
		.pipe(gulpif(config.compressHTML, htmlmin({
						collapseWhitespace: true,
						caseSensitive: true,
						minifyJS: true,
						removeComments: true
					})))
		.pipe(gulp.dest(config.pathDest));
});

// Compress JavaScript-file
gulp.task('minify-js', ['copy-html'], function() {  
	// Compress all other js files
	return gulp.src(config.pathDest + config.pathApp + '**/*.js')
		.pipe(gulpif(config.compressJS, uglify({
			preserveComments: false
		})))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(config.pathDest + config.pathApp));
});

// Start webserver
gulp.task('webserver', ['minify-js'], function() {
	gulp.src(config.pathDest)
		.pipe(webserver({
		livereload: true,
		directoryListing: false,
		open: true
	}));
});

gulp.task('default', ['webserver'], function(){
	gulp.watch(config.pathSource + '**/*.ts', 
	function(){
		console.log("Changes were made, re-compiling!");
		Compile();
	});
});