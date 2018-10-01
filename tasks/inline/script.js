'use strict';

const fs = require('fs');
const util = require('./util.js');

exports.script = function(html, script_tags, src, options) {
    script_tags.forEach((script_tag) => {
      const tag = script_tag['tag'];
      const attr = script_tag['attr'];

      var path = util.get_attr(attr, 'src');

      if (path) {
          // 정확한 path추출
          path = util.get_clear_path(path);

          // 현재 파일기준으로 경로 찾기
          path = util.find_path(options.root, src, path);

        if(fs.existsSync(path)) {
          const content = util.replaceDollar(fs.readFileSync(path, "utf-8"));
          html = html.replace(tag, "<script>" + content);
        } else {
          console.log('Ignore ' + path);
        }
      }
    });
    return html;
};
