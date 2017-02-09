//used gulp modules
var gulp = require('gulp'),
	notify = require('gulp-notify'),
	sass = require('gulp-sass'), //used in gulp styles task
	jade = require('gulp-jade'), //used in gulp templates task
	imagemin = require('gulp-imagemin'), //used in gulp images task
	autoprefixer = require('gulp-autoprefixer'),
	plumber = require('gulp-plumber'),
	jshint = require('gulp-jshint'),
	cssbeauty = require('gulp-cssbeautify')




//paths config
var config = {
	srcPath: 'src',
	distPath: 'dist',

	src: {
		styles: 	'src/styles/**/**/*.scss',
		templates: 	'src/templates/**/*.jade',
		images: 	'src/images/**',
		fonts: 		'src/fonts/**',
		scripts: 	'src/js/*.js',
		libjs: 		'src/js/lib/**/*.js',
		libcss: 	'src/styles/lib/**/*.scss'

	},

	dist: {
		styles: 	'dist/assets/css',
		images: 	'dist/assets/images/',
		fonts: 		'dist/assets/fonts',
		scripts: 	'dist/assets/js',
		libjs: 		'dist/assets/js/lib',
		libcss: 	'dist/assets/css/lib'

	}
}

//TASKS SETUP//

//compile scss to css (gulp styles)
gulp.task('styles', function() {
	return gulp.src(config.src.styles)
	.pipe(plumber())
	.pipe(sass({ style: 'expanded' }))
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(cssbeauty())
	.pipe(gulp.dest(config.dist.styles)) //create beauty css file
	.pipe(notify({ message: 'Styles task complete!' }))
});

//compile jade to html (gulp templates)
gulp.task('templates', function() {
	return gulp.src(config.src.templates)
	.pipe(plumber())
	.pipe(jade({
		pretty: true,
		self: true
	}))
	.pipe(gulp.dest(config.distPath))
	.pipe(notify({ message: 'Templates task complete!' }))
});

//compile images (gulp images)
gulp.task('images', function() {
	return gulp.src(config.src.images)
	.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
	.pipe(gulp.dest(config.dist.images))
	.pipe(notify({ message: 'Images task complete!' }))
});

//compile fonts (gulp fonts)
gulp.task('fonts', function() {
	return gulp.src(config.src.fonts)
	.pipe(gulp.dest(config.dist.fonts))
	.pipe(notify({ message: 'Fonts task complete!' }))
})

//compile scripts (gulp scripts)
gulp.task('scripts', function() {
  return gulp.src(config.src.scripts)
    .pipe(plumber())
    .pipe( jshint.reporter('default') )
    .pipe( gulp.dest( config.dist.scripts ) )
    .pipe( notify({ message: 'Scripts task complete!' }) );
});

//compile lib (gulp lib - its just a js libs)
gulp.task('libjs', function(){
	return gulp.src(config.src.libjs)
	.pipe(gulp.dest(config.dist.libjs))
	.pipe(notify({ message: 'Libjs transfered!' }));
});

//compile lib (gulp lib - its just a css libs)
gulp.task('libcss', function() {
	return gulp.src(config.src.libcss)
	.pipe(plumber())
	.pipe(sass({ style: 'expanded' }))
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(cssbeauty())
	.pipe(gulp.dest(config.dist.libcss)) //create beauty css file
	.pipe(notify({ message: 'Styles task complete!' }))
});

//watch changes
gulp.task('watch', function() {
	//watch scss files
	gulp.watch(config.src.styles, ['styles']);

	//watch jade files
	gulp.watch(config.src.templates, ['templates']);

	//watch images
	gulp.watch(config.src.images, ['images']);

	//watch fonts
	gulp.watch(config.src.fonts, ['fonts']);

	//watch scripts
	gulp.watch(config.src.scripts, ['scripts']);

	//watch libjs
	gulp.watch(config.src.libjs, ['libjs']);

	//watch libcss
	gulp.watch(config.src.libcss, ['libcss']);

});
