//
// Mauro Trigo - CityHeroes
//

module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		files: {
			mainFileName: 'moment-datepicker',
			srcDir: './src',
			srcDirJS: './src/js',
			srcDirCSS: './src/css',
			destDir: './dist',
			src: '<%= files.srcDirJS %>/<%= files.mainFileName %>.js',
			destDirJS: '<%= files.destDir %>/js',
			destDirCSS: '<%= files.destDir %>/css',
			destJS: '<%= files.destDirJS %>/<%= files.mainFileName %>.js',
			destCSS: '<%= files.destDirCSS %>/<%= files.mainFileName %>.js'
		},

		// Build tasks

		meta: {
			version: '<%= pkg.version %>',
			banner:
				'// <%= pkg.name %>\n' +
				'// ----------------------------------\n' +
				'// v<%= pkg.version %>\n' +
				'//\n' +
				'// Copyright (c)<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>, <%= pkg.author.organization %>.\n' +
				'// Distributed under <%= pkg.license %> license\n' +
				'\n',
		},

		clean: {
			all: [
				'<%= files.destDir %>',
			]
		},

		preprocess: {
      umd: {
        src: '<%= files.srcDirJS %>/build/umd.js',
        dest: '.tmp/<%= files.mainFileName %>.js'
      },
    },

		concat: {
			options: {
				banner: '<%= meta.banner %>'
			},
			main: {
				src: '<%= preprocess.umd.dest %>',
				dest: '<%= files.destJS %>'
			}
		},

		uglify: {
			main: {
				src: '<%= concat.main.dest %>',
				dest: '<%= files.destDirJS %>/<%= files.mainFileName %>.min.js',
				options: {
					banner: '<%= meta.banner %>',
					sourceMap: '<%= files.destDirJS %>/<%= files.mainFileName %>.min.map',
					sourceMappingURL: '<%= files.mainFileName %>.min.map'
				}
			}
		},

		copy: {
			all: {
				files: [
					{
						expand: true,
						dot: true,
						flatten: true,
						dest: '<%= files.destDirJS %>/ko/',
						src: [
							'<%= files.srcDirJS %>/ko/*.*'
						]
					},
					{
						expand: true,
						dot: true,
						flatten: true,
						dest: '<%= files.destDirCSS %>/',
						src: [
							'<%= files.srcDirCSS %>/*.css'
						]
					}
				]
			}
		},

	});

	grunt.registerTask('build', function (target) {

		grunt.task.run([
			'clean:all',
			'preprocess:umd',
			'concat',
			'uglify',
			'copy:all'
		]);
	});

};