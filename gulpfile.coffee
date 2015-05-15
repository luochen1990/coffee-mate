require './helpers'

build_mate = coffee_builder('coffee-mate', standalone: 'CoffeeMate')
build_global = coffee_builder('global', standalone: '__CoffeeMate')

gulp.task 'build', ['clean'], ->
	build_mate.build()
	build_global.build()

gulp.task 'watch', ['build'], ->
	build_mate.watch()
	build_global.watch()
#	gulp.watch 'src', ['build']

gulp.task('default', ['build', 'watch'])
