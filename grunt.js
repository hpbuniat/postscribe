module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
          banner: '/* <%= pkg.description %>, v<%= pkg.version %> <%= pkg.homepage %>\n' +
                      'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>, MIT license ' +
                      '<%= pkg.licenses[0].url %> */'
        },

        // run jshint on the files, with the options described below. Different globals defined based on file type
        // 'node' for files that are run by node.js (module, process, etc.)
        // 'browser' for files that are run by a browser (window, document, etc.)
        lint: {
            node: ['grunt.js'],
            browser: ['postscribe.js']
        },
        jshint: {
            // Apply to all js files
            options: {
                curly: true,
                eqeqeq: true,
                expr: true,
                forin: true,
                indent: 2,
                latedef: false,
                newcap: true,
                noarg: true,
                noempty: true, // debatable
                sub: true,
                undef: true, // Really. Leave it
                unused: true
            },
            globals: {},
            // Just for the 'node' src files
            node: {
                globals: {console: true, process: true, module:true, require: true, __dirname: true, exports: true}
            },
            // Just for the 'browser' src files
            browser: {
                // Let's be very strict here
                options: {
                    loopfunc: true,
                    expr: true,
                    evil: true, // Reluctantly added
                    eqnull: true
                },
                globals: {}
            }
        },

        // Minify postscribe src to postscribe.min.js, prepending a banner
        min: {
            dist: {
                src: ['<banner:meta.banner>', 'postscribe.js'],
                dest: 'postscribe.min.js'
            }
        },

        qunit: {
            files: ['test/test.html']
        },

        watch: {
            files: ['postscribe.js', 'test/*'],
            tasks: 'lint qunit'
        }

    });

    // Alias test
    grunt.registerTask('test', 'qunit');

    // This is what gets run when you don't specify an argument for grunt.
    grunt.registerTask('default', 'lint test');

};
