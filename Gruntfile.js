var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');
var livereloadMiddleware = function(connect, options){
    var _staticPath = path.resolve(options.directory);
    return [serveStatic(_staticPath), serveIndex(_staticPath)]
};

module.exports = function(grunt) {
	
	grunt.loadNpmTasks('grunt-include-source');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('connect-livereload');
	grunt.loadNpmTasks('serve-static');
	grunt.loadNpmTasks('serve-index');

	grunt.initConfig({
	  includeSource: {
			options: {
		    basePath: '',
		    baseUrl: '.',
		    templates: {
		      html: {
		        js: '<script src="{filePath}"></script>',
		        css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
		      }
		    }
			},
		  myTarget: {
		    files: {
		      'app/index.html': 'temp/index.tpl.html'
		    }
		  }
		},
		connect: {
	    client: {
	      options: {
	        port: 9001,
	        base: {
	          path: '.',
	          options: {
	            index: 'app/index.html'
	          }
	        }
	      }
	    }
	  },
		watch: {
		  client: {
		    files: ['app/**/*', 'app/**/**/*', 'app/**/**/**/*'],
		    tasks: [],
		    options: {
		      livereload:LIVERELOAD_PORT
		    }
		  }
		}
	});

	grunt.registerTask('default', function() {
		console.log('Use "grunt build" to build, "grunt serve" to run.');
	});

	grunt.registerTask('build', ['includeSource']);

	grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
    grunt.task.run([
      'connect:client',
      'watch:client'
    ]);
  });
};