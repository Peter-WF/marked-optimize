/**
 * @authors       Peter 王斐
 * @email         wangfeia@zbj.com
 * @date          2016-08-24 15:59
 * @description
 */
var marked = require('marked');
var MarkedRenderer = marked.Renderer;

var striptags = require('striptags');
var assign = require('object-assign');

var util = require('util');

function Renderer() {
    MarkedRenderer.apply(this);

    this._headingId = {};
}

util.inherits(Renderer, MarkedRenderer);


// Add id attribute to headings
Renderer.prototype.heading = function (text, level) {
    var id = anchorId(striptags(text));
    var headingId = this._headingId;

    // Add a number after id if repeated
    if (headingId[id]) {
        id += '-' + headingId[id]++;
    } else {
        headingId[id] = 1;
    }
    // add headerlink
    return '<a href="#' + id + '" class="headerlink" title="' + striptags(text) + '"><h' + level + ' id="' + id + '">' + text + '</h' + level + '></a>';
};

function anchorId(str) {
    return str;
}

// Synchronous highlighting with highlight.js
marked.setOptions({
    langPrefix: 'hljs lang-',   // 设置前置样式
    gfm: true,  // 启动Github样式的Markdown，请参考 https://help.github.com/articles/github-flavored-markdown/
    pedantic: false,
    sanitize: false,    // 原始输出，忽略HTML标签
    tables: true,   // 支持Github表格，必须打开gfm选项
    breaks: true,   // 支持Github换行符，必须打开gfm选项
    smartLists: true,   // 优化列表输出
    smartypants: true,
    highlight: function (code) {
        var hljs = require('highlight.js');
        hljs.configure({});
        return hljs.highlightAuto(code).value;
    }
});


module.exports = function (data, options, callback) {
    if (callback || typeof options === 'function') {
        // 异步
        if (!callback) {
            callback = options;
            options = null;
        }
        return marked(data, assign({
            renderer: new Renderer()
        }, options), callback);
    } else {
        // 同步
        return marked(data, assign({
            renderer: new Renderer()
        }, options));
    }
};




