/*
 * grunt-combine-inline
 * https://github.com/jmk/grunt-combine-inline
 *
 * Copyright (c) 2018 jungmk
 * Licensed under the MIT license.
 */

'use strict';

// 파일을 불러오기위한 라이브러리 로드
const fs = require('fs');

const css = require('./inline/css.js');
const script = require('./inline/script.js');
const image = require('./inline/image.js');
const util = require('./inline/util.js');

module.exports = function(grunt) {
  grunt.registerMultiTask('combine_inline', 'The best Grunt plugin ever.', function() {
    // 리소스를 찾기위한 root path 정의
    const options = this.options({
      root: grunt.option('root')
    });

    // grunt에 입력된 모든 파일을 읽어옴
    this.files.forEach(function(f) {
      f.src.forEach(function(src) {
        // 파일을 읽어서 html에 저장
        let html = grunt.file.read(src);

        // link, script, img 읽어서 변환
        let link_tags = util.find_html_tag(html, "link");
        html = css.css(html, link_tags, src, options);

        let script_tags = util.find_html_tag(html, "script");
        html = script.script(html, script_tags, src, options);

        let image_tags = util.find_html_tag(html, "img");
        html = image.image(html, image_tags, src, options);

        // 수정된 파일 저장
        grunt.file.write(f.dest, html);

        // Print a success message.
        grunt.log.writeln('File "' + f.dest + '" created.');
      });
    });
  });
};
