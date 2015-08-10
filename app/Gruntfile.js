module.exports = function(grunt) {

    grunt.initConfig({
        homeJsDir: 'public/javascripts/home',
        jsDistDir: 'dist/javascripts/',
        cssDir: 'public/stylesheets/',
        cssDistDir: 'dist/stylesheets/',
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            home: {
                options: {
                    separator: ';' + grunt.util.linefeed,
                    preserveComments : 'all'
                },
                src: ['node_modules/requirejs/require.js',
                    '<%=homeJsDir%>*.js',
                    'node_modules/jquery/dist/jquery.js',
                    'node_modules/underscore/underscore-min.js',
                    'node_modules/backbone/backbone.js',
                    'node_modules/bootstrap/dist/js/bootstrap.js'],
                dest: '<%=jsDistDir%>home.js'
            },
            css: {
                src: ['<%=cssDir%>*.css'/*,
                    'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
                    'node_modules/bootstrap/dist/css/bootstrap.min.css'*/],
                dest: '<%=cssDistDir%><%= pkg.name %>.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%=jsDistDir%>home.min.js': ['<%= concat.home.dest %>']
                }
            }
        },
        cssmin: {
            add_banner: {
                options: {
                    banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: {
                    '<%=cssDistDir%><%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
                }
            }
        },
        watch: {
            files: ['<%=jsDir%>*.js', '<%=cssDir%>*.css'],
            tasks: ['concat', 'uglify', 'cssmin']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
        'concat',
        'uglify',
        'cssmin',
        'watch'
    ]);

};