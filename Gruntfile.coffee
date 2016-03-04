module.exports = (grunt) ->

	grunt.initConfig

		aws: grunt.file.readJSON('aws.json')
		
		# first, clean out everything in the /build folder
		clean: ["build"]

		# copy some files from /source to /build exactly how they are
		copy:
			images:
				expand: true
				cwd: 'source/images/'
				src: ['**']
				dest: 'build/images/'
			css:
				expand: true
				cwd: 'source/styles/'
				src: ['**']
				dest: 'build/'
			js:
				expand: true
				cwd: 'source/scripts/'
				src: ['**']
				dest: 'build/'

		# compile our html
		jade:
			run:
				expand: true
				cwd: 'source/pages/'
				src: ['**/*.jade']
				dest: 'build/'
				ext: '.html'

		# start a tiny webserver at localhost:8000
		connect:
			server:
				options:
					base: 'build'
					open: true # opens your website in the browser immediately
					hostname: '0.0.0.0' # lets you access your site from the network, look up your ip addy using "ifconfig" on mac

		# when there are any changes, reload the page (requires livereload extension)
		watch:
			options:
				livereload: true
			files: ['source/**/*']
			tasks: ['clean', 'copy', 'jade']

		# deploy to s3
		s3:
			options:
				key: '<%= aws.key %>'
				secret: '<%= aws.secret %>'
				bucket: '<%= aws.bucket %>'
				access: 'public-read'
			deploy:
				upload: [
					src: 'build/**/*.*'
					rel: 'build/'
					dest: '/'
				]

	grunt.loadNpmTasks('grunt-contrib-clean')
	grunt.loadNpmTasks('grunt-contrib-copy')
	grunt.loadNpmTasks('grunt-contrib-jade')
	grunt.loadNpmTasks('grunt-contrib-connect')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-s3')	

	# compiles the site and sets up a local server
	# run this task with "grunt"
	grunt.registerTask('default', ['clean', 'copy', 'jade', 'connect', 'watch'])

	# compiles the site and sends it to Amazon S3 (see readme for directions)
	# run this task with "grunt deploy"
	grunt.registerTask('deploy', ['clean', 'copy', 'jade', 's3'])
	