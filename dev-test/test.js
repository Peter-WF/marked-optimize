/**
 * @authors       Peter 王斐
 * @email         wangfeia@zbj.com
 * @date          2016-08-24 16:18
 * @description
 */


var fs = require("fs");
var renderer = require("../lib/renderer");
var nunjucks = require('nunjucks');


var htmlTmpl = `
<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../lib/style/markdown-css-themes/markdown10.css">
    <link rel="stylesheet" href="../lib/style/highlight-theme/monokai-sublime.css"/>
    <link rel="stylesheet" href="../lib/style/base.css">
    <title>Document</title>
</head>
<body>
{{markdownContent|safe}}
</body>
</html>
`;

// 读取 md
fs.readFile('baseUploader.md', function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("数据读取成功！");
    console.log("--------我是分割线-------------");
    var markdownString = data.toString();

    // Using async version of marked
    renderer(markdownString, function (err, content) {
        if (err) throw err;
        console.log("markdown 转换成功 ！");
        console.log("--------我是分割线-------------")

        // 拼接上下文
        nunjucks.configure({autoescape: true});
        content = nunjucks.renderString(htmlTmpl, {markdownContent: content});

        fs.writeFile('baseUploader.html', content, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("数据写入成功！");
        });
    });
});