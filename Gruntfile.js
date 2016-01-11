module.exports = function (grunt){
    grunt.initConfig({
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'assets/js',
                    src: ['*.js', '!*.min.js'],
                    dest: 'assets/js',
                    ext: '.min.js'
                }]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'assets/css',
                    ext: '.min.css'
                }]
            }
        },
        concat: {
            js: {
                src: [
                    'assets/components/jquery/dist/jquery.min.js',
                    'assets/components/jquery-maskmoney/dist/jquery.maskMoney.js',
                    'assets/components/bootstrap/dist/js/bootstrap.min.js',
                    'assets/components/angular/angular.min.js',
                    'assets/components/angular-i18n/angular-locale_pt-br.js',
                    'assets/js/main.min.js',
                    'assets/js/directives/mask-money.js'
                ],
                dest: 'assets/built/built.js'
            },
            css:{
                src: [
                    'assets/components/bootstrap/dist/css/bootstrap.min.css',
                    'assets/css/style.min.css'
                ],
                dest: 'assets/built/built.css'
            }
        },
        watch: {
            scripts: {
                files: ['assets/js/**/*.js', '!assets/js/**/*.min.js', 'assets/css/**/*.css', '!assets/css/**/*.min.css'],
                tasks: ['uglify','cssmin', 'concat:js', 'concat:css']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['uglify', 'cssmin','concat', 'watch'])
};