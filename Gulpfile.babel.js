import gulp from 'gulp'
import babel from 'gulp-babel'

const task = ::gulp.task,
	src = ::gulp.src,
	dest = ::gulp.dest

task('build', () => src(['src/**/*.js']).pipe(babel()).pipe(dest('lib')))

task('default', ['build'])
