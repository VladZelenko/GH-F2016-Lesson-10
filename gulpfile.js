var gulp = require('gulp'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync'),
		del = require('del');

gulp.task("sass", function() {
	return gulp.src('app/sass/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('clean', function() {
	return del.sync('dist');
});


gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});


gulp.task('build', ['clean', 'sass'], function() {

	var buildCss = gulp.src([
		'app/css/main.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

});