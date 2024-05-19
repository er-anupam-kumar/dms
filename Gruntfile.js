module.exports = function(grunt) {
    const sass = require('node-sass');
    grunt.initConfig({
		sass: {
			options: {
                implementation: sass
            },
            dist: {
				options: {
					outputStyle: 'compressed'
				},
                files: [{
                    'src/assets/css/main.css': 'src/assets/scss/main.scss',  							/* 'All main SCSS' */
                    'src/assets/css/color_skins.css': 'src/assets/scss/color_skins.scss', 				/* 'All Color Option' */

                    'src/assets/css/timeline.css': 'src/assets/scss/pages/timeline.scss', 				/* 'Timeline SCSS to CSS' */
                    'src/assets/css/blog.css': 'src/assets/scss/pages/blog.scss', 						/* 'Blog page' */
                    'src/assets/css/inbox.css': 'src/assets/scss/pages/inbox.scss', 					/* 'Email App' */
                    'src/assets/css/rtl.css': 'src/assets/scss/pages/rtl.scss', 						/* 'RTL Support Dashboard scss' */
                    'src/assets/css/ecommerce.css': 'src/assets/scss/pages/ecommerce.scss', 			/* 'eCommerce scss' */
				}]
            }
        }
    });
    grunt.loadNpmTasks("grunt-sass");
    grunt.registerTask("buildcss", ["sass"]);
};
