'use strict';

const fs = require('fs');
const util = require('./util.js');

exports.image = function(html, image_tags, src, options) {
    image_tags.forEach((image_tag) => {
      const tag = image_tag['tag'];
      const attr = image_tag['attr'];

      // image 주소 추출
      const path_str = util.get_attr(attr, "src");

      if(path_str) {
        // 정확한 path추출
        let path = util.get_clear_path(path_str);

        // 현재 파일기준으로 경로 찾기
        path = util.find_path(options.root, src, path);

        // image 확장자 추출
        const ext = path.split('.')[1];

        if(fs.existsSync(path)) {
          const base64_file = util.replaceDollar(fs.readFileSync(path, "utf-8"));
          html = html.replace(path_str, "data:image/"+ext+";base64,"+util.base64_encode(base64_file));
        } else {
          console.log('Ignore ' + path);
        }
      }
    });
    return html;
};
