module.exports = function (grunt) {
  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      "my_target": {
        "files": {
          'demo/js/CloudroomVideoSDK.min.js': ['src/init.js','src/error.js','src/callback.js','src/live.js','src/sdk.js']
        }
      }
    },
	 concat: {
      "my_target": {
        "files": {
          'demo/js/CloudroomVideoSDK.js': ['src/init.js','src/error.js','src/callback.js','src/live.js','src/sdk.js']
        }
      }
    },
	jsdoc : {
        dist : {
            src: ['src/init.js','src/error.js','src/callback.js','src/live.js'], 
            options: {
                destination: 'demo/doc'
            }
        }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-jsdoc');
  // 默认任务
  //grunt.registerTask('default', []);
  grunt.registerTask('default', ['concat','uglify','jsdoc']);
 // grunt.registerTask('default', ['jsdoc']);
}