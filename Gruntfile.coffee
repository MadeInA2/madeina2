module.exports = (grunt) ->

	grunt.initConfig

		aws: grunt.file.readJSON('aws.json')
		
		s3:
			options:
				key: '<%= aws.key %>'
				secret: '<%= aws.secret %>'
				bucket: '<%= aws.bucket %>'
				access: 'public-read'
			deploy:
				upload: [
					src: 'dist/**/*.*'
					dest: '/'
				]

	grunt.loadNpmTasks('grunt-s3')

	grunt.registerTask('deploy', ['s3'])
	