module.exports = function(grunt) {
    
    //Load all packages/tasks
    require('load-grunt-tasks')(grunt);     
    
    //=== Configure task here ===//
    grunt.initConfig({
        
        //== Variables
        distPath        : 'src/dist/',
        
        lessPath        : 'src/less/', 
        distCssPath     : '<%= distPath %>css/',
        lessConfigsPath : '<%= lessPath %>configs/',
        
        jsPath          : 'src/js/',
        distScriptsPath : '<%= distPath %>scripts/',
        
        htmlPath        : 'src/html/',
        distHtmlPath    : '<%= distPath %>html/',
        
        thirdPartySrcPath : 'src/third_party/',
        
        projName          : 'PokeTracker',        
        
        //== Get package info
        pkg: grunt.file.readJSON('package.json'),        
        
        
        //== Css Tasks ==//
        
        //= Less Lint - Check for LESS mistakes | less_review
        lesshint: {
            options: {
                lesshintrc      : '<%= lessConfigsPath %><%= pkg.name %>.lesshintrc.json',
                allowWarnings   : false 
            },
            proj: {
                src: ['<%= lessPath %>**/*.less'] 
            },
        },   
        
        //= Less - Compile LESS files into CSS | less_compile
        less:{
            
            //Global less options
            options: {  
                banner              : '/* <%= projName %> v<%= pkg.version %> CSS ',  //Banner 
                ieCompat            : false,    //If true ensure support of ie8
                strictMath          : true,     //Math must be done in parens
                strictUnits         : true,     //Math must be done with like units (px => px)
                plugins             : [
                    new (require('less-plugin-autoprefix'))({browsers: ['last 4 versions']})
                ]
            },                       
            
            //Compile Dev task
            proj: {
                options: {  
                    banner              : "<%= less.options.banner %> Dev */\n",  //Banner                     
                    sourceMap           : true,     //Enable source map
                    outputSourceFiles   : true      //Puts less files into map instead of only referencing them
                },      
                
                //Files
                files: {
                    '<%= distCssPath %><%= pkg.name %>.css' : '<%= lessPath %><%= pkg.name %>.less'
                },
            }
        },       

        //= Css Comb - Rearrange props | css_reorg
        csscomb: {            
            options: {
                config: '<%= lessConfigsPath %><%= pkg.name %>.csscomb.json'
            },
            
            proj: {
                files: {
                    '<%= distCssPath %><%= pkg.name %>.css' : ['<%= distCssPath %><%= pkg.name %>.css'],
                }
            }           
        },               
                
        
        //= Css min - Minify css | css_min
        cssmin: {
            proj: {                
                src     : '<%= distCssPath %><%= pkg.name %>.css',
                dest    : '<%= distCssPath %><%= pkg.name %>.min.css'
            }
        },
        
        //== JS Tasks
        
        //= JSHint - Validate JavaScript | js_review
        jshint: {
            options: {                
                'curly': true,
                'eqeqeq': true
            },
            files: {
              src: ['<%= jsPath %>*.js']
            }   
        },
        
        //= Concat - Concatenate JS files | js_concat
        concat: {            
            proj: {
                src  : ['<%= jsPath %>third_party/*.js', '<%= jsPath %>load_data.js', '<%= jsPath %>dropdowns.js', '<%= jsPath %>get_version.js', '<%= jsPath %>generate_html.js', '<%= jsPath %>alter_catch_status.js', '<%= jsPath %>tab-group.js'],
                dest : '<%= distScriptsPath %><%= pkg.name %>.js'                
            },
            proj_home: {
                src  : ['<%= jsPath %>third_party/*.js', '<%= jsPath %>dropdowns.js', '<%= jsPath %>get_version.js'],
                dest : '<%= distScriptsPath %><%= pkg.name %>_home.js'                
            },
            pokedex: {
                src  : ['<%= jsPath %>third_party/*.js', '<%= jsPath %>generate_pokedex.js', '<%= jsPath %>filter.js', '<%= jsPath %>alter_catch_status.js'],
                dest : '<%= distScriptsPath %><%= pkg.name %>_pokedex.js'                
            }
        },
        
        //= Uglify - Minify js | js_uglify
        uglify: {            
            options: {
                banner              : '//<%= projName %> v<%= pkg.version %>\n',
                beautify            : false,
                compress            : true,
                preserveComments    : false                
            }, 
            proj: {
                files: {
                    '<%= distScriptsPath %><%= pkg.name %>.min.js' : '<%= distScriptsPath %><%= pkg.name %>.js'
                }
            },
            proj_home: {
                files: {
                    '<%= distScriptsPath %><%= pkg.name %>_home.min.js' : '<%= distScriptsPath %><%= pkg.name %>_home.js'
                }
            },
            pokedex: {
                files: {
                    '<%= distScriptsPath %><%= pkg.name %>_pokedex.min.js' : '<%= distScriptsPath %><%= pkg.name %>_pokedex.js'
                }
            }
        },    
        
        //== Utility Tasks
        
        //= Clean - delete files from directories
        clean: {
            css_dir             : ['assets/css/*'],
            dist_css_dir        : ['src/dist/css/*'],
            
            scripts_dir         : ['assets/scripts/*'],
            dist_scripts_dir    : ['src/dist/scripts/*']
        },        
        
        //= Copy - copy files to another location
        copy: {
            css_prod: {
                expand  : true,
                flatten : true,
                filter  : 'isFile',
                src     : '<%= distCssPath %><%= pkg.name %>.min.css',
                dest    : 'assets/css',
                nonull  : true
            },
            css_dev: {
                expand  : true,
                flatten : true,
                filter  : 'isFile',
                src     : ['<%= distCssPath %><%= pkg.name %>.css', '<%= distCssPath %><%= pkg.name %>.css.map'],
                dest    : "assets/css",
                nonull  : true
            },
            scripts_prod: {
                expand  : true,
                flatten : true,
                filter  : 'isFile',
                src     : '<%= distScriptsPath %>*.min.js',
                dest    : 'assets/scripts',
                nonull  : true
            },
            scripts_pokedex_dev: {
                expand  : true,
                flatten : true,
                filter  : 'isFile',
                src     : '<%= distScriptsPath %><%= pkg.name %>_pokedex.js',
                dest    : 'assets/scripts',
                nonull  : true
            },
            scripts_pokedex_prod: {
                expand  : true,
                flatten : true,
                filter  : 'isFile',
                src     : '<%= distScriptsPath %><%= pkg.name %>_pokedex.min.js',
                dest    : 'assets/scripts',
                nonull  : true
            },
            scripts_dev: {
                expand  : true,
                flatten : true,
                filter  : 'isFile',
                src     : '<%= distScriptsPath %>*.js',
                dest    : 'assets/scripts',
                nonull  : true
            },           
            html: {
                expand  : true,
                flatten : true,
                filter  : 'isFile',
                src     : '<%= distHtmlPath %>*.html',
                dest    : '.',
                nonull  : true
            }
        },
        
        //= Watch - run tasks when certain files have been changed
        watch: {
            css_dev: {
                files   : ['src/less/**/*'],
                tasks   : ['css_build_dev']                
            },
            js_dev: {
                files   : ['src/js/*js'],
                tasks   : ['js_build_dev']
            },
            dev: {
                files   : ['src/**', '!src/dist/**'],
                tasks   : ['build_dev']                
            },
            die: {
                options : { spawn: false },
                files   : ['tmp/*'],
                tasks   : ['kill'],
            }
        },
        
        // Environment building
        targethtml: {
            prod: {
                options:{
                    curlyTags: {
                        version : '<%= pkg.version %>'
                    }
                },
                files: {
                    '<%= distHtmlPath %>index.html': '<%= htmlPath %>dev-index.html',
                    '<%= distHtmlPath %>tracker.html': '<%= htmlPath %>tracker.html',
                    '<%= distHtmlPath %>pokedex.html': '<%= htmlPath %>pokedex.html'
                }
            },
            dev: {
                files: {
                    '<%= distHtmlPath %>index.html': '<%= htmlPath %>dev-index.html',
                    '<%= distHtmlPath %>tracker.html': '<%= htmlPath %>tracker.html',
                    '<%= distHtmlPath %>pokedex.html': '<%= htmlPath %>pokedex.html'
                }
            }
        },
        
        bump: {
            options: {
              files: ['package.json'],
              updateConfigs: ['pkg'],
              commit: false,
              commitMessage: 'Release v%VERSION%',
              commitFiles: ['package.json'],
              createTag: false,
              tagName: 'v%VERSION%',
              tagMessage: 'Version %VERSION%',
              push: false,
              pushTo: 'upstream',
              gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
              globalReplace: false,
              prereleaseName: false,
              metadata: '',
              regExp: false
            }
        },
    });                         
    
    //=== Register Tasks here ===//
    
    //CSS Tasks
    grunt.registerTask('less_review', ['lesshint']);
    
    grunt.registerTask('less_compile', ['less:proj']);

    grunt.registerTask('css_reorg', ['csscomb:proj']);
        
    grunt.registerTask('css_min', ['cssmin']);
            
    
    //JS Tasks
    grunt.registerTask('js_uglify', ['uglify']);    
    grunt.registerTask('js_uglify_pokedex', ['uglify:pokedex']);    
    
    grunt.registerTask('js_review', ['jshint']);
    
    grunt.registerTask('js_concat', ['concat']);
    grunt.registerTask('js_concat_pokedex', ['concat:pokedex']);
            
    
    //Utility Tasks       
    grunt.registerTask('css_copy_prod', ['copy:css_prod']);
    grunt.registerTask('css_copy_dev', ['copy:css_dev']);
    
    grunt.registerTask('scripts_copy_prod', ['copy:scripts_prod']);
    grunt.registerTask('scripts_copy_dev', ['copy:scripts_dev']);        
    grunt.registerTask('scripts_copy_pokedex_prod', ['copy:scripts_pokedex_prod']);
    grunt.registerTask('scripts_copy_pokedex_dev', ['copy:scripts_pokedex_dev']);
    
    grunt.registerTask('html_copy_prod', ['copy:html']);
    grunt.registerTask('html_copy_dev', ['copy:html']);
    
    grunt.registerTask('css_clean_dir', ['clean:css_dir']);
    grunt.registerTask('dist_css_clean_dir', ['clean:dist_css_dir']);
    
    grunt.registerTask('scripts_clean_dir', ['clean:scripts_dir']);
    grunt.registerTask('dist_scripts_clean_dir', ['clean:dist_scripts_dir']);
    
    
    grunt.registerTask('css_watch', ['watch:css_dev']);
    grunt.registerTask('js_watch', ['watch:js_dev']);    
    grunt.registerTask('dev_watch', ['watch:dev']);    
    
    grunt.registerTask('kill', function() {
        process.exit(1);
    });
            
    //Build Tasks
    grunt.registerTask('html_build_dev', ['targethtml:dev', 'html_copy_dev']);
    grunt.registerTask('html_build_prod', ['targethtml:prod', 'html_copy_prod']);
    
    grunt.registerTask('css_build_dev', ['dist_css_clean_dir', 'css_clean_dir','less_review', 'less_compile', 'css_reorg', 'css_copy_dev']);
    grunt.registerTask('css_build_prod', ['css_clean_dir', 'less_review', 'less_compile', 'css_reorg', 'css_min', 'css_copy_prod']);    
    
    grunt.registerTask('js_build_dev', ['dist_scripts_clean_dir', 'scripts_clean_dir', 'js_review', 'js_concat', 'scripts_copy_dev']);
    grunt.registerTask('js_build_prod', ['dist_scripts_clean_dir', 'scripts_clean_dir', 'js_review', 'js_concat', 'js_uglify', 'scripts_copy_prod']);
    
    grunt.registerTask('js_build_pokedex_dev', ['js_review', 'js_concat_pokedex', 'scripts_copy_pokedex_dev']);
    grunt.registerTask('js_build_pokedex_prod', ['js_review', 'js_concat_pokedex', 'js_uglify_pokedex', 'scripts_copy_pokedex_prod']);
    
    grunt.registerTask('build_dev', ['css_build_dev', 'js_build_dev', 'html_build_dev']);
    
    grunt.registerTask('build_dev_pokedex', ['css_build_dev', 'js_build_pokedex_dev', 'html_build_dev']);
    grunt.registerTask('build_prod_pokedex', ['css_build_prod', 'js_build_pokedex_prod', 'html_build_prod']);
    
    grunt.registerTask('build_prod-test', ['css_build_prod', 'js_build_prod', 'js_build_pokedex_prod', 'html_build_prod']);
    grunt.registerTask('build_prod-major', ['bump:major', 'build_prod-test']);
    grunt.registerTask('build_prod-minor', ['bump:minor', 'build_prod-test']);
    grunt.registerTask('build_prod-patch', ['bump:patch', 'build_prod-test']);
    

};
