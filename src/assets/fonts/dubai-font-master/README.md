# Dubai Font

[![npm version](https://badge.fury.io/js/dubai-font.svg)](https://www.npmjs.com/package/dubai-font)
[![npm downloads](https://img.shields.io/npm/dt/dubai-font.svg)](https://www.npmjs.com/package/dubai-font)


[![jsdelivr hits](https://data.jsdelivr.com/v1/package/npm/dubai-font/badge)](https://www.jsdelivr.com/package/npm/dubai-font)

This is a web distribution Repository for [Dubai Font](https://dubaifont.com).

**This is not an official repository,** this is just a way to ease installation of Dubai Font for web developers. suitable to be used with [npm](https://www.npmjs.com). `npm install dubai-font --save-dev`

Live Demo: [https://mohannadnaj.github.io/dubai-font/](https://mohannadnaj.github.io/dubai-font/)

## Screenshots

![Screenshot](https://mohannadnaj.github.io/dubai-font/screenshot.png)

## Installation

### *CDN* :

#### jsdelivr:

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/dubai-font@1.0.1/dubai-font/css/dubai-font.css">

#### unpkg:

    <link rel="stylesheet" href="https://unpkg.com/dubai-font@1.0.1/dubai-font/css/dubai-font.css">

#### rawgit:

check out [rtaibah/dubai-font-cdn](https://github.com/rtaibah/dubai-font-cdn/) repoistory.

### *Download*

 - clone this repository or download [ZIP](https://github.com/MohannadNaj/dubai-font/archive/master.zip).
 
 - Copy [dubai-font/](dubai-font/) to your project's public directory.

 - Link to [dubai-font/css/dubai-font.css](dubai-font/css/dubai-font.css) in your markup.

        <link rel="stylesheet" href="dubai-font/css/dubai-font.css">


### *npm*

 - install the package: `npm install dubai-font --save-dev`

 - Copy `node_modules/dubai-font/dubai-font/` to your project's public directory.
 
 - Link to [dubai-font/css/dubai-font.css](dubai-font/css/dubai-font.css) in your markup.

        <link rel="stylesheet" href="dubai-font/css/dubai-font.css">

## Usage

Dubai font has 4 weights: Bold, Medium, Regular, Light.

You can use it by adding the css classes: `font-dubai-bold` , `font-dubai-medium` , `font-dubai-regular` , `font-dubai-light` .


## Copy Recipes
### Gulp

`gulpfile.js` :

    var gulp = require('gulp');

    gulp.task('default', function() {
        gulp.src('node_modules/dubai-font/dubai-font/**/*')
            .pipe(gulp.dest('public'));
    });

### Grunt

`Gruntfile.js` :

    module.exports = function(grunt) {
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.initConfig({
                copy: {
                    dubaiFont: {
                        files: [ {
                            expand: true,
                            cwd: "node_modules/dubai-font/dubai-font",
                            src: ["*.*", "**/*.*"],
                            dest: "public",
                        }]
                    }
                }
        });
        grunt.registerTask('default', ['copy:dubaiFont']);
    };

### Laravel Mix

`webpack.mix.js` :

    let mix = require('laravel-mix');
    mix.copy('node_modules/dubai-font/dubai-font/', 'public/');


## License & Blah blah blah...

 Font files are downloaded from http://www.dubaifont.com and they hold all the rights for this font. Contact [The Executive Council Dubai](https://dubaifont.com/contact).
