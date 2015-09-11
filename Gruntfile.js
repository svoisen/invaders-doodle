module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    hostname: "0.0.0.0",
                    port: 3000
                }
            }
        },

        watch: {
            scripts: {
                files: [
                    'src/**/*.js',
                    'src/**/*.jsx',
                    'src/**/*.scss',
                    'index.html'
                ],
                tasks: ['build'],
                options: {
                    interrupt: true
                }
            }
        },

        babel: {
            options: {
                sourceMap: false
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/scripts/',
                    src: ['**/*.es6.js', '**/*.jsx'],
                    dest: 'dist/scripts/',
                    ext: '.js'
                }]
            }
        },

        browserify: {
            dist: {
                src: ['dist/scripts/**/*.js'],
                dest: '<%= pkg.name %>.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('default', ['connect', 'watch']);
    grunt.registerTask('build', ['babel', 'browserify']);
};