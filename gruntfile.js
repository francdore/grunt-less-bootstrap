module.exports = function(grunt) {

    // Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    "tmp/styles.css": "./src/less/custom.less"
                }
            }
        },
        cssmin: {
            production: {
                expand: false,
                files: {
                    "css/styles.min.css" : "./tmp/styles.css"
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './src/images/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'images/'
                }]
            }
        },
        copy: {
            fonts: {
                expand: true,
                dot: true,
                cwd: './src/fonts/',
                src: [
                    '**/*'
                ],
                dest: './fonts/'
            }
        },
        concat: {
            basic: {
                src: [
                    './node_modules/bootstrap/js/transition.js',
                    './node_modules/bootstrap/js/alert.js',
                    './node_modules/bootstrap/js/button.js',
                    './node_modules/bootstrap/js/carousel.js',
                    './node_modules/bootstrap/js/collapse.js',
                    './node_modules/bootstrap/js/dropdown.js',
                    './node_modules/bootstrap/js/modal.js',
                    './node_modules/bootstrap/js/tooltip.js',
                    './node_modules/bootstrap/js/popover.js',
                    './node_modules/bootstrap/js/scrollspy.js',
                    './node_modules/bootstrap/js/tab.js',
                    './node_modules/bootstrap/js/affix.js'
                ],
                dest: 'tmp/scripts.js',
            },
        },
        uglify: {
            vendorjs: {
                src: './tmp/scripts.js',
                dest: 'js/scripts.min.js'
            },
            appjs: {
                src: './src/js/app.js',
                dest: 'js/app.min.js'
            },
        },
        clean: {
            dev: {
                src: './tmp'
            }
        },
        watch: {
            less: {
                files: ['./src/less/**/*'],
                tasks: ['less', 'cssmin', 'clean']
            },
            imagemin: {
                files: ['./src/images/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },
            fonts: {
                files: ['./src/fonts/**/*'],
                tasks: ['copy']
            },
            concat: {
                files: ['./src/js/app.js'],
                tasks: ['concat', 'uglify', 'clean']
            }
        }
    });

    // Plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Tasks
    grunt.registerTask('default', ['less', 'concat', 'cssmin:production', 'uglify', 'copy:fonts', 'clean', 'imagemin', 'watch']);
    grunt.registerTask('build', ['less', 'copy', 'concat', 'imagemin', 'uglify', 'cssmin:production', 'clean', 'watch']);
};