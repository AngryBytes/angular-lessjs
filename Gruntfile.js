module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        lessPkg: grunt.file.readJSON('node_modules/less/package.json'),
        meta: {
            license: '<%= _.pluck(pkg.licenses, "type").join(", ") %>',
            copyright: 'Copyright (c) 2009-<%= grunt.template.today("yyyy") %>',
            banner: '/*!\n' +
                ' * angular-lessjs v<%= pkg.version %>\n' +
                ' * <%= meta.copyright %>, <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
                ' *\n' +
                ' * Less - <%= lessPkg.description %> v<%= lessPkg.version %> - http://lesscss.org\n' +
                ' * <%= meta.copyright %>, <%= lessPkg.author.name %> <<%= lessPkg.author.email %>>\n' +
                ' *\n' +
                ' * Licensed under the <%= meta.license %> License.\n' +
                ' */\n\n' +
                ' /**\n' +
                ' * @license <%= meta.license %>\n' +
                ' */\n\n'
        },
        browserify: {
            main: {
                src: ['./lib/index.js'],
                dest: './dist/angular-lessjs.js',
                options: {
                    exclude: ["promise"],
                    require: ["promise/polyfill.js"]
                }
            }
        },
        uglify: {
            main: {
                src: ['<%= browserify.main.dest %>'],
                dest: 'dist/angular-lessjs.min.js',
                options: {
                    banner: '<%= meta.banner %>',
                    mangle: true,
                    compress: {
                        pure_getters: true
                    }
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['browserify', 'uglify']);
};
