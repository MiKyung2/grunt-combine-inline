'use strict';

const fs = require('fs');
const util = require('./util.js');

exports.css = function(html, link_tags, src, options) {
    link_tags.forEach((link_tag) => {
      const tag = link_tag['tag'];
      const attr = link_tag['attr'];

      // rel = 'stylesheet' 가 포함되있는지 확인
      if ( util.get_attr(attr, 'rel') == 'stylesheet' ) {
        var path = util.get_attr(attr, 'href');

        if (path) {
          // 정확한 path추출
          path = util.get_clear_path(path);

          // 현재 파일기준으로 경로 찾기
          path = util.find_path(options.root, src, path);

          if(fs.existsSync(path)) {
            const content = util.replaceDollar(fs.readFileSync(path, "utf-8"));
            html = html.replace(tag, "<style>"+content+"</style>");
          } else {
            console.log('Ignore ' + path);
          }
        }
      }
    });
    return html;
};
