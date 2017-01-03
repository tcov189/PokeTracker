module.exports = function(grunt) {

  grunt.initConfig({
    less: {        
        poketracker: {
            banner: 'PokeTracker CSS',
            src: 'src/less/poketracker/poketracker.less',
            dest: 'css/poketracker.css'
        },
        pokedex: {
            banner: 'Pokedex CSS',
            src: 'src/less/pokedex/pokedex.less',
            dest: 'css/pokedex.css'
        },
        pokeinfo: {
            banner: 'Pokeinfo CSS',
            src: 'src/less/pokeinfo/pokeinfo.less',
            dest: 'css/pokeinfo.css'
        }
    },
    autoprefixer: {
        options: {
          // Task-specific options go here.
        },
        files: {
          src: 'css/*.css'
        },
      },
    cssmin: {
      poketracker: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['poketracker.css', '!poketracker.min.css'],
          dest: 'css',
          ext: '.min.css'
        }]
      },
      pokedex: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['pokedex.css', '!pokedex.min.css'],
          dest: 'css',
          ext: '.min.css'
        }]
      },
     pokeinfo: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['pokeinfo.css', '!pokeinfo.min.css'],
          dest: 'css',
          ext: '.min.css'
        }]
      }
    },
      
    uglify: {
        options: {
          mangle: false,
          quoteStyle: 1
        },
        my_target: {
          expand: true,
          cwd: 'src/js',
          src: '**/*.js',
          dest: 'src/js_min'
        }
    },
    
    concat: {                
        dist_poketracker: {
          src: [
              'src/js_min/third_party/jquery-2.2.4.min.js', 'src/js_min/getVersion.js', 'src/js_min/pkmn/pkmn.js', 'src/js_min/pkmn/regions/*.js' , 'src/js_min/locations/location_construc.js', 'src/js_min/locations/xy/*.js', 'src/js_min/display_info.js'
          ],
          dest: 'js/poketracker.min.js',
        },
        dev_poketracker: {
         src: [
             'src/js/third_party/jquery-2.2.4.min.js', 'src/js/getVersion.js', 'src/js/pkmn/pkmn.js', 'src/js/pkmn/regions/*.js' , 'src/js/locations/location_construc.js', 'src/js/locations/xy/*.js', 'src/js/display_info.js' ],
          dest: 'js/poketracker.js', 
        },
        dist_pokedex: {
            src: [
                'src/js_min/third_party/jquery-2.2.4.min.js', 'src/js_min/pkmn/pkmn.js', 'src/js_min/pkmn/regions/*.js','src/js_min/pokedex.js', 'src/js_min/filter.js'
            ],
            dest: 'js/pokedex.min.js'            
        },
        dev_pokedex: {
            src: ['src/js/third_party/jquery-2.2.4.min.js', 'src/js/pkmn/pkmn.js', 'src/js/pkmn/regions/*.js','src/js/pokedex.js', 'src/js/filter.js'],
            dest: 'js/pokedex.js'
        },
        dist_pokeinfo: {
          src: [
              'src/js_min/third_party/jquery-2.2.4.min.js', 'src/js_min/pkmn/pkmn.js', 'src/js_min/pkmn/regions/*.js'
          ],
          dest: 'js/pokeinfo.min.js',
        },
        dev_pokeinfo: {
         src: [
             'src/js/third_party/jquery-2.2.4.min.js', 'src/js/pkmn/pkmn.js', 'src/js/pkmn/regions/*.js' 
         ],
          dest: 'js/pokeinfo.js', 
        },
        dev_home: {
            src: ['src/js_min/third_party/jquery-2.2.4.min.js', 'src/js_min/getVersion.js', 'src/js_min/homeFunctions.js'],
            dest: 'js/home.js'
        }
    },
      
    imagemin: {
      dynamic: {                         
          files: [{
            expand: true,                  
            cwd: 'images',                 
            src: ['**/*.{png,jpg,gif}'],   
            dest: 'images'
          }]
        }
    },
    clean: {
      js_min: ["src/js_min"]      
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('default', ['less', 'autoprefixer', 'cssmin', 'uglify', 'concat', 'clean']);  
  grunt.registerTask('mincss', ['less', 'autoprefixer', 'cssmin']);
  grunt.registerTask('minjs', ['uglify','concat']);
  
  //Poketracker
  grunt.registerTask('poketracker-lessDev', ['less:poketracker','autoprefixer',]);
  grunt.registerTask('poketracker-lessDist', ['poketracker-lessDev', 'autoprefixer', 'cssmin:poketracker'])
  grunt.registerTask('poketracker-jsDev', ['concat:dev_poketracker']);
  grunt.registerTask('poketracker-jsDist', ['uglify','concat:dist_poketracker'])
    
  //Pokedex
  grunt.registerTask('pdx-lessDev', ['less:pokedex', 'autoprefixer',]);
  grunt.registerTask('pdx-lessDist', ['pdx-lessDev','autoprefixer', 'cssmin:pokedex']);
  grunt.registerTask('pdx-jsDev', ['concat:dev_pokedex']);
  grunt.registerTask('pdx-jsDist', ['uglify','concat:dist_pokedex']);
    
  //Pokeinfo
  grunt.registerTask('pinfo-lessDev', ['less:pokeinfo', 'autoprefixer',]);
  grunt.registerTask('pinfo-lessDist', ['pinfo-lessDev','autoprefixer', 'cssmin:pokeinfo']);
  grunt.registerTask('pinfo-jsDev', ['concat:dev_pokeinfo']);
  grunt.registerTask('pinfo-jsDist', ['uglify','concat:dist_pokeinfo']);
    
  //Home
  grunt.registerTask('home-jsDev', ['concat:dev_home']);
  grunt.registerTask('home-jsDist', ['uglify','concat:dist_home']);
};