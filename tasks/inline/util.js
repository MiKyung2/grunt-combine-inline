const path = require('path');

exports.find_html_tag = function (src, tagname) {
  // let regex = new RegExp(`<${tagname}(.*?)(\/|>(.*?)<\/${tagname})>`,'g');
  let regex = new RegExp(`<${tagname}(.*?)(|>(.*?)<\/${tagname})>`,'g');
  var line;
  var result = [];

  while((line = regex.exec(src)) !== null) {
    // replace할 tag와 정보를 추출할 attr 저장
    result.push({"tag": line[0], "attr": line[1]});
  }
  return result;
};

// 파일을 받아서 base64로 출력
exports.base64_encode = function(binary) {
  return new Buffer.from(binary).toString('base64');
};

exports.get_attr = function(str, attr) {
  // attr를 받아 그룹값을 저장
  let regex = new RegExp(`${attr}=['"](.*?)['"]`);
  let match = regex.exec(str);

  if (match !== null) {
    // str에서 regex 일치하는 결과값이 존재하면 반환
    if (match.length > 1)
      return match[1];
  }
};

// str의 내용에 $를 $$로 수정
exports.replaceDollar = function(str) {
    return str.replace(/\$/g, '$$$$');
};

exports.get_clear_path = function (url) {
    return url.split('?')[0];
};

exports.find_path = function (root, src, target) {
    var result = "";

    if(target.startsWith("/")) {
        // 절대 경로
        result = root + target;
    } else {
        // 상대 경로
        result = src + "/../" + target;
    }

    return path.normalize(result);
};
