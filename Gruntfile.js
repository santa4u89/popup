module.exports = function(grunt) {

    grunt.initConfig({
        www: 'www',
        bower: '<%= www %>/bower',
        css: '<%= www %>/css',
        styles: '<%= www %>/less',
        js: '<%= www %>/js',
        less: {
            dev: {
                options: {
                    paths: [
                        "<%= styles %>",
                        '<%= bower %>'
                    ]
                },
                files: {
                  "<%= css %>/style.css": "<%= styles %>/style.less"
                }
            }
        },

        jshint: {
            files: ['<%= js %>/*.js'],
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
                    '<%= js %>/script.min.js': ['<%= js %>/script.js']
                }
            }
        },

        esteWatch: {
            options: {
                dirs: [
                    './',
                    '<%= styles %>/**/'
                ],
                livereload: {
                    enabled: false
                }
            },
            less: function() {
                return 'cssdev';
            },

            js: function() {
                return 'jshint';
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        '<%= css %>/style.css',
                        '<%= js %>/script.js',
                        '<%= www %>/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    port: 8888,
                    open: false,
                    server: {
                        baseDir: '<%= www %>'
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
    grunt.registerTask('cssdev', ['less']);
};
