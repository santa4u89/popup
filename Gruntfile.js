module.exports = function(grunt) {

    grunt.initConfig({
        less: {
            dev: {
                options: {
                  paths: ["less"]
                },
                files: {
                  "css/style.css": "less/style.less"
                }
            }
        },

        jshint: {
            files: ['js/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dest/output.min.js': ['src/input.js']
                }
            }
        },

        esteWatch: {
            options: {
                dirs: [
                    'less/**/'
                ],
                livereload: {
                    enabled: false
                }
            },
            less: function() {
                return 'less';
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'css/style.css',
                        'js/script.js',
                        '*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    port: 9999,
                    server: {
                        baseDir: './'
                    }
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-este-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['less', 'jshint', 'browserSync', 'esteWatch']);
};
