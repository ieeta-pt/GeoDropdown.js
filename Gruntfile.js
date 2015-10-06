module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      main: {
        files: {
          'dist/geo-dropdown.min.js': [
            'lib/*',
            'js/GeoDropdown.js', 
            'js/continent.js', 
            'js/country.js', 
            'js/adm1.js', 
            'js/adm2.js', 
            'js/adm3.js', 
            'js/adm4.js', 
            'js/adm5.js', 
            'js/countriesDictionary.js'
          ]
        }
      }
    },

    copy: {
      main: {
        src: 'custom-elements/geo-dropdown.html',
        dest: 'dist/geo-dropdown.html',
        options: {
          process: function (content, srcpath) {
            content = content.replace(/<!--.+?(?=\n)\n/g,'');
            content = content.replace(/<script type=.+?(?=\n)\n/g,'');
            return content.replace('</template>', '</template>\n<script src="geo-dropdown.min.js"></script>');
          },
        },
      },
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true
        },
        files: {
          'dist/geo-dropdown.min.html': 'dist/geo-dropdown.html'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', ['uglify', 'copy']);
  grunt.registerTask('dist', ['default']);
  grunt.registerTask('dist-html', ['default', 'htmlmin']);

};