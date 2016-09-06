<!-- toc -->
# BaseUploader 基础上传组件

- **作者：** 基础技术 - 陈曦

- **全站覆盖：** `是`

- **描述：** 上传组件基类，包含了上传所需的基本逻辑。

- **源码位置：** `fis-common/widget/ui/components/uploader-qiniu/baseUploader.js`

- **资源ID：** `common:components/uploader-qiniu/baseUploader`

* **引用方式：** `require("common:components/uploader-qiniu/baseUploader")`

- **内部依赖：** [plupload](https://github.com/moxiecode/plupload) - [中文文档](http://www.uedsc.com/plupload-doc.html)

- **继承：**
```
  ├─ Base（mix：Events、Aspect、Attribute）
  |
  ├─ Widget
  |
  └─ BaseUploader
```

## 调用方式
---

[BaseUploader (基本示例)](http://jsfiddle.net/gebilaoxiong/5couuzoz/23/)

_（请确保在查看示例时本地环境配置了rake-zbj项目）_

## 初始化选项
---

### element

- **必选：** `是`

- **继承：** Widget (arale)

- **说明：** 与Widget关联的DOM元素

- **备注：** 该选项和 template 为二选一。在没有配置 element 时，阿拉蕾会将 template 选项解析为 element 。


### browse_button

- **必选：** `是`

- **说明：** 触发文件选择对话框的DOM元素，当点击该元素后便会弹出文件选择对话框。

- **类型：** `Element|jQuery obj|ID`

### acceptExt

- **默认值：** 默认包含全部类型, 详见备注

- **说明：** 用来限定上传文件的类型，该数组的每个元素为一个对象，该对象有title和extensions两个属性，title为该过滤器的名称，extensions为允许上传文件的扩展名，有多个时使用用逗号隔开。

- **类型：** `Object Array`

- **备注：**

```
    // 现目前支持的所有类型
    [
        { title : "Image files", extensions : "jpg,gif,png,bmp,jpeg,tif,eps" },
        { title : "Zip files", extensions : "zip,rar,7z" },
        { title : "Document files", extensions: "pdf,ppt,pptx,doc,docx,xls,xlsx,page,txt,mht,numbers" },
        { title : "Media files", extensions: "swf,fla,mp3,mp4,m4a,wma,mpg"},
        { title : "Project files", extensions : "dwg,psd,max,ezp,ai,cdr,indd,obj" },
        { title : "Other files",  extensions: "ttc,ttf,otf,key,abr,eip" }
    ]
```



### max_file_size

- **默认值：** `'10mb'`

- **说明：** 用来限定上传文件的大小。值可以为一个数字，单位为b，也可以是一个字符串，由数字和单位组成，如’200kb’。

- **类型：** `String`


### prevent_duplicates

- **默认值：** `true`

- **说明：** 是否允许选取重复的文件，true表示不允许，false表示允许，默认为false。如果两个文件的文件名和大小都相同，则会被认为是重复的文件。

- **类型：** `Boolean`


### count_limit

- **默认值：** `5`

- **说明：** 限定上传文件的个数。

- **类型：** `Number`
  
 
### belongToDomain☆

- **必选：** `是`

- **说明：** 资源所属域（请求token时所需参数）

- **类型：** `String`

- **备注：** 改选项为必须参数，请参考 [_附表1_](baseUpload.md#附表1-《系统名称及所属域对照表》) 做相应配置。


### belongToSystem☆

- **必选：** `是`

- **说明：** 资源所属系统（通过请求token时所需参数）

- **类型：** `String`

- **备注：** 该选项为必须参数，请参考 [_附表1_](baseUpload.md#附表1-《系统名称及所属域对照表》) 做相应配置。


### tokenUrl☆

- **默认值：** `http://192.168.143.0:8087/rms/resource`

- **说明：** 资源管理器接口，用于在文件上传时获取文件的相关信息（存储位置、授权token、预处理类型等）。

- **类型：** `String`

- **备注：** 请将此参数设置为 `window.ZBJInfo.qiniuUploadTokenUrl+'/resource/'`。
 

### runtimes

- **默认值：** `'html5,flash,html4'` 

- **说明：** 用来指定上传方式，指定多个上传方式请使用逗号隔开。上传插件会根据该配置的优先级选择最优的上传方式。

- **类型：** `String`


### drop_element

- **默认值：** `null`

- **说明：** 指定了使用拖拽方式来选择上传文件时的拖拽区域，即可以把文件拖拽到这个区域的方式来选择文件。该参数的值可以为一个DOM元素的id,也可是 DOM元素本身，还可以是一个包括多个DOM元素的数组。如果不设置该参数则拖拽上传功能不可用。目前只有html5上传方式才支持拖拽上传。

- **类型：** `DOM | String | Array`


### multi_selection

- **默认值：** `true`

- **说明：** 是否可以在文件浏览对话框中选择多个文件，true为可以，false为不可以。默认true，即可以选择多个文件。需要注意的是，在某些不支持 多选文件的环境中，默认值是false。比如在ios7的safari浏览器中，由于存在bug，造成不能多选文件。当然，在html4上传方式中，也是无法多选文件的。

- **类型：** `Boolean`


### watermark_type

- **默认值：** `空字符串`

- **说明：** 水印的类型，目前仅支持'imagewatermark'，如果使用默认值或者设置为空则不添加水印。

- **类型：** `String`

- **枚举值：** `'imagewatermark'`



### watermark_img

- **默认值：** `空字符串`

- **说明：** 需要添加到文件中的水印图片地址，可先将水印图片上传至 [八戒云](http://files.dev.zbjdev.com/login.php)。

- **类型：**	`String`


### max_retries

- **默认值：** `1`

- **说明：** 当发生plupload.HTTP_ERROR错误时的重试次数，为0时表示不重试。

- **类型：** `Number`


### chunk_size

- **默认值：** `'4mb'`

- **说明：** 分片上传文件时，每片文件被切割成的大小，为数字时单位为字节。也可以使用一个带单位的字符串，如"200kb"。当该值为0时表示不使用分片上传功能。

- **类型：** `Number | String` 


### url

- **说明：** 服务器端接收和处理上传文件的脚本地址，可以是相对路径(相对于当前调用Plupload的页面)

- **类型：** `String` 

- **备注：** 该配置已经在代码中对https和http做了兼容处理，在初始化阶段会被**重置**为默认值, 修改无效。

- **默认值：**
    ```
    https页面：'https://up.qbox.me'
    http页面： 'http://upload.qiniu.com'
    ```

### onAdd(plupload,filterFiles)

- **默认值：** $.noop

- **描述：** 当文件`添加到上传队列`后触发。

- **类型：** `Function`

- **参数：**
  + **plupload**
      - **说明：** `为 plupload 实例对象`
      - **类型：** `Object`
      - **备注：**

  + **filterFiles**
      - **说明：** `为本次添加到上传队列里的文件对象`
      - **类型：** `Array`
      - **备注：**


### onProgress(plupload,file)

- **默认值：** $.noop

- **描述：** 会在文件上传过程中不断触发，可以用此事件来显示上传进度监听函数参数。

- **类型：** `Function`

- **参数：**
  + **plupload**
      - **说明：** `为 plupload 实例对象`
      - **类型：** `Object`
      - **备注：**

  + **file**
      - **说明：** `触发此事件的文件对象`
      - **类型：** `Object`
      - **备注：**

### onUploaded(plupload,file,info)

- **默认值：** $.noop

- **描述：** 当队列中的某一个文件上传完成后触发监听函数参数。

- **类型：** `Function`

- **参数：**

  + **plupload**
    - **说明：** `为 plupload 实例对象`
    - **类型：** `Object`
    - **备注：**

  + **file**
    - **说明：** `触发此事件的文件对象`
    - **类型：** `Object`
    - **备注：**
    - **属性：**
      + **id**
        - **说明：** 文件的唯一键值
      + **name**
        - **说明：** 文件名
      + **type**
        - **说明：** 文件类型
  + **info**
    - **说明：** `为文件资源信息`
    - **类型：** `Object`
    - **备注：**
    - **属性：**
      + **filename**
        - **说明：** 文件名称
      + **filesize**
        - **说明：** 文件大小
      + **filext**
        - **说明：** 文件后缀
      + **hash**
        - **说明：** 哈希
      + **mimetype**
        - **说明：** 媒体类型
      + **ofilename**
        - **说明：** 文件名称



### onComplete(plupload)

- **默认值：** $.noop

- **描述：** 当上传队列中所有文件都上传完成后触发监听函数参数。

- **类型：** `Function`

- **参数：**
  + **plupload**
      - **说明：** `为 plupload 实例对象`
      - **类型：** `Object`
      - **备注：**


### onQueuechanged(plupload)

- **默认值：** $.noop

- **描述：** 当上传队列发生变化后触发，即上传队列新增了文件或移除了文件。

- **类型：** `Function`

- **参数：**
  + **plupload**
      - **说明：** `为 plupload 实例对象`
      - **类型：** `Object`
      - **备注：**

- **备注：** 该事件会比onAdd或onRemoved事件先触发监听函数参数


### onRemove(file)

- **默认值：** $.noop

- **描述：** 当点击了文件项上的删除按钮时触发。

- **类型：** `Function`

- **参数：**
  + **file**
    - **说明：** `触发此事件的文件对象`
    - **类型：** `Object`
    - **备注：**
    - **属性：**
        + **id**
          - **说明：** 文件的唯一键值
        + **name**
          - **说明：** 文件名
        + **type**
          - **说明：** 文件类型

- **备注：** 该按钮元素DOM结构需要带有事件委托属性：`action-type="delete"` 及 文件ID属性：`data-pid="fileId"`。


### onError(plupload,error)

- **默认值：** $.noop

- **描述：** 当发生错误时触发。

- **类型：** `Function`

- **参数：**
  + **plupload**
      - **说明：** `为 plupload 实例对象`
      - **类型：** `Object`
      - **备注：**
  + **error**
      - **说明：** `为错误对象`
      - **类型：** `Object`
      - **备注：**
      - **属性：**
          + **code**
            - **说明：** 错误代码
          + **file**
            - **说明：** 与错误相关的文件对象
          + **message**
            - **说明：** 错误信息


## 实例方法
---

### uploader.isBusy()

- **描述：** 用于判断上传队列中是否还有待上传的文件。

- **参数：** `无`

- **返回值：** `true` 表示队列中存在待上传的文件，`false` 表示没有。


### uploader.getUrl(key)

- **描述：** 获取文件下载、预览的地址。

- **参数：** 
  + **key**
      - **必须：** `是`
      - **说明：** 为文件资源信息的键值
      - **类型：** `String`

- **返回值：**
    * **说明：** 包含下载地址和预览地址的新对象
    * **类型：** `Object`
    * **属性：**
        + **downloadUrl**
            - **说明** 下载地址
        + **previewUrl**
            - **说明** 预览地址

- **示例：**

```js
    // 获取上传文件的下载路径
    uploader.on('uploaded', function ( plupload, file, info ) {

      var urls = uploader.getUrl(info.filename);

      console.log(urls.downloadUrl);

      // ...
    });
```

- **注意：** 文件的key值为info的filename属性，可以通过 `getFileData( fileId )` 方法获取fileInfo。


### uploader.isImage(key)

- **描述：** 判断已上传的文件是否为图片

- **参数：**
  + **key**
    - **说明：** 为文件资源信息的键值

- **返回值：**
  + **类型：**`Boolean`
  + **描述：**`true`:是图片；`false`:不是图片


### uploader.getFileData(fileId)

- **描述：** 通过文件的ID获取资源信息

- **参数：**
  + **fileId**
    - **必须：** `是`
    - **说明** 为文件的键值
    - **类型：** `String`

- **返回值：**
  + **类型：** `Object`
  + **描述：** 文件对象，内部封装文件相关数据

- **示例：**
```js
    // 获取上传文件的key值
    uploader.on('uploaded', function ( plupload, file ) {

      var fileInfo = uploader.getFileData(file.id);

      console.log(fileInfo.filename);

      // ...
    });
```
### uploader.on(event,callback,[context])

- **描述：** 给对象添加事件回调函数

- **继承：** `Event (arale)`

- **参数：**
  + **event**
    - **说明** 事件名
  + **callback**
    - **说明** 事件回调函数
  + **context**
    - **说明** 事件上下文

- **备注：** 可以传入第三个参数 context 来改变回调函数调用时的 this 值

- **示例：**
```js
    uploader.on('add', callback, context /*可选*/);
```
### uploader.off([event],[callback],[context])

- **描述：** 从对象上移除事件回调函数

- **继承：** `Event (arale)`

- **参数：**
  + **event**
    - **说明** 事件名
  + **callback**
    - **说明** 事件回调函数
  + **context**
    - **说明** 事件上下文

- **备注：** 三个参数都是可选的，当省略某个参数时，表示取该参数的所有值。

- **示例：**

  ```js

    // 移除 add 事件上名为 onAdd 的回调函数
    uploader.off('add', onAdd);

    // 移除 add 事件的所有回调函数
    uploader.off('add');

    // 移除所有事件上名为 onAdd 的回调函数
    uploader.off(null, onAdd);

    // 移除上下文为 context 的所有事件的所有回调函数
    uploader.off(null, null, context);

    // 移除 uploader 对象上所有事件的所有回调函数
    uploader.off();

  ```

### uploader.trigger(event,[*args])

- **描述：** 触发一个或多个事件（用空格分隔）

- **继承：** `Event (arale)`

- **参数：**
  + **event**
    - **说明** 事件名
  + **args**
    - **说明** 参数会依次传给回调函数

## 实例属性

### tokenObj

* **说明：** 存放所有文件的token

* **类型：** **Object Array**

* **对象格式如：**
```json
    {
        "文件名称":
        [
            "文件 token",
            "文件 key"
        ]
    }
```
## 事件
---

### add

- **描述：** 当文件`添加到上传队列`后触发。

- **参数：**
  + **plupload**
      - **说明：** `为 plupload 实例对象`
      - **类型：** `Object`
      - **备注：**

  + **filterFiles**
      - **说明：** `为本次添加到上传队列里的文件对象`
      - **类型：** `Array`
      - **备注：**


### progress

- **描述：** 会在文件上传过程中不断触发，可以用此事件来显示上传进度监听函数参数。

- **参数：**
  + **plupload**
      - **说明：** `为 plupload 实例对象`
      - **类型：** `Object`
      - **备注：**

  + **file**
      - **说明：** `触发此事件的文件对象`
      - **类型：** `Object`
      - **备注：**


### uploaded

- **描述：** 当队列中的某一个文件上传完成后触发监听函数参数。

- **参数：**
  + **plupload**
      * **说明：** `为 plupload 实例对象`
      * **类型：** `Object`
      * **备注：**

  + **file**
      * **说明：** `触发此事件的文件对象`
      * **类型：** `Object`
      * **备注：**
      * **属性：**
          + **id**
            - **说明：** 文件的唯一键值
          + **name**
            - **说明：** 文件名
          + **type**
            - **说明：** 文件类型

  + **info**
      * **说明：** `为文件资源信息`
      * **类型：** `Object`
      * **备注：**
      * **属性：**
          + **filename**
            - **说明：** 文件名称
          + **filesize**
            - **说明：** 文件大小
          + **filext**
            - **说明：** 文件后缀
          + **hash**
            - **说明：** 哈希
          + **mimetype**
            - **说明：** 媒体类型
          + **ofilename**
            - **说明：** 文件名称


### complete

- **描述：** 当上传队列中所有文件都上传完成后触发监听函数参数。

- **参数：**
  + **plupload**
      - **说明：** `为 plupload 实例对象`
      - **类型：** `Object`
      - **备注：**


### queuechanged

- **描述：** 当上传队列发生变化后触发，即上传队列新增了文件或移除了文件。

- **参数：**
  + **plupload**
      - **说明：** `为 plupload 实例对象`
      - **类型：** `Object`
      - **备注：**

- **备注：** 该事件会比onAdd或onRemoved事件先触发监听函数参数


### remove

- **描述：** 当点击了文件项上的删除按钮时触发。

- **参数：**
  + **file**
    - **说明：** `触发此事件的文件对象`
    - **类型：** `Object`
    - **备注：**
    - **属性：**
        + **id**
          - **说明：** 文件的唯一键值
        + **name**
          - **说明：** 文件名
        + **type**
          - **说明：** 文件类型

- **备注：** 该按钮元素DOM结构需要带有事件委托属性：`action-type="delete"` 及 文件ID属性：`data-pid="fileId"`。


### error

- **描述：** 当发生错误时触发。

- **参数：**
  + **plupload**
      - **说明：** `为 plupload 实例对象`
      - **类型：** `Object`
      - **备注：**
  + **error**
      - **说明：** `为错误对象`
      - **类型：** `Object`
      - **备注：**
      - **属性：**
          + **code**
            - **说明：** 错误代码
          + **file**
            - **说明：** 与错误相关的文件对象
          + **message**
            - **说明：** 错误信息


## 图片参数

[BaseUploader (图片上传预览示例)](http://jsfiddle.net/gebilaoxiong/5ytvrwdq/2/) _（请确保在查看示例时本地环境配置了rake-zbj项目）_

### 略缩图参数列表

- `s.m`  略缩图模式，默认为1 [参考链接](http://developer.qiniu.com/docs/v6/api/reference/fop/image/imageview2.html)。

- `s.w`  略缩图宽度

- `s.h`  略缩图高度

- `s.format`  新图输出格式，如jpg，png等

- `s.interlace`  是否支持渐进显示, 取值范围：1 支持渐进显示，0不支持渐进显示(缺省为0) 适用目标格式：jpg

- `s.quality`  图片质量，取值范围是[1, 100]。默认85

#### 示例
```
  // 获取300X200略缩图:
  http://192.168.143.0:8087/resource/redirect?key=homesite%2Ftask%2Flogo-small.png%2Forigine%2Fe668cf75-13b9-4321-b6d3-20e71fb2bd4b&s.w=300&s.h=200
```

### 图片处理参数列表

- `a.t`  图片缩放参数 [参考链接](http://developer.qiniu.com/docs/v6/api/reference/fop/image/imagemogr2.html#imagemogr2-anchor-spec)。

- `a.g`  图片裁剪位置

- `a.c`  图片裁剪参数(a.g+a.c)

- `a.r`  图片旋转参数

- `a.b`  图片高斯模糊参数

- `a.format`  新图输出格式，如jpg，png等

- `a.interlace`  是否支持渐进显示, 取值范围：1 支持渐进显示，0不支持渐进显示(缺省为0) 适用目标格式：jpg

- `a.quality`   图片质量，取值范围是[1, 100]。默认85

#### 示例
```
  // 图片缩放50%
  http://192.168.143.0:8087/resource/redirect?key=homesite%2Ftask%2Flogo-small.png%2Forigine%2Fe668cf75-13b9-4321-b6d3-20e71fb2bd4b&a.t=!50p

  // 图片裁剪（居中300x200）
  http://192.168.143.0:8087/resource/redirect?key=homesite%2Ftask%2Flogo-small.png%2Forigine%2Fe668cf75-13b9-4321-b6d3-20e71fb2bd4b&a.c=300x200&a.g=Center

  // 图片旋转(顺时针旋转30°)
  http://192.168.143.0:8087/resource/redirect?key=homesite%2Ftask%2Flogo-small.png%2Forigine%2Fe668cf75-13b9-4321-b6d3-20e71fb2bd4b&a.r=30

  // 图片高斯模糊(模糊半径x正态分布标准差)
  http://192.168.143.0:8087/resource/redirect?key=homesite%2Ftask%2Flogo-small.png%2Forigine%2Fe668cf75-13b9-4321-b6d3-20e71fb2bd4b&a.b=3x5
```

### 水印参数列表

- `w.t` 水印类型，1.图片水印，2.文字水印， 3，图片+文字水印

- `w.i` 图片水印时，水印图片（注意水印图片不能大于原图尺寸）

- `w.ig` 图片水印位置

- `w.id` 图片水印透明度

- `w.ix` 图片水印相当于w.ig之后的x轴偏移

- `w.iy` 图片水印相当于w.ig之后的y轴偏移

- `w.text` 文字水印内容

- `w.font` 文字水印字体

- `w.fonts` 文字水印大小

- `w.fill` 文字水印颜色

- `w.tg` 文字水印位置

- `w.td` 文字水印透明度

- `w.tx` 文字水印相当于w.tg之后的x轴偏移

- `w.ty` 文字水印相当于w.tg之后的y轴偏移

#### 示例
```
  // 图片水印（水印图片地址http://77flds.com2.z0.glb.qiniucdn.com/images/logo-2.png）
  http://192.168.143.0:8087/resource/redirect?key=homesite%2Ftask%2Flogo-small.png%2Forigine%2Fe668cf75-13b9-4321-b6d3-20e71fb2bd4b&w.t=1&w.i=http://77flds.com2.z0.glb.qiniucdn.com/images/logo-2.png

  // 文字水印（居中文字水印）
  http://192.168.143.0:8087/resource/redirect?key=homesite%2Ftask%2Flogo-small.png%2Forigine%2Fe668cf75-13b9-4321-b6d3-20e71fb2bd4b&w.t=2&w.text=文字水印&w.tg=Center

  // 图片+文字水印
  http://192.168.143.0:8087/resource/redirect?key=homesite%2Ftask%2Flogo-small.png%2Forigine%2Fe668cf75-13b9-4321-b6d3-20e71fb2bd4b&w.t=3&w.text=文字水印&w.tg=Center&w.i=http://77flds.com2.z0.glb.qiniucdn.com/images/logo-2.png
```

### 注意

> 以上所有处理参数可同时指定，同时指定多种参数后，数据处理顺序为，先做略缩处理，将略缩后的结果给高级处理，将高级处理结果给水印处理，返回最终结果，类似管道。

#### 示例

先将原图略缩为300X200的略缩图，然后缩放大略缩图为200%(600x400)， 然后居中裁剪300x200，然后旋转30°，然后输出为png格式图片，接着做图片+文字水印，图片水印放右上角，文字水印放右下角

    http://localhost:8080/resource/getDownloadParam?key=6630632359095907249.jpg&s.w=300&s.h=200&a.t=!200p&a.g=Center&a.c=300x200&a.r=30&a.format=png&w.t=3&w.i=http://77flds.com2.z0.glb.qiniucdn.com/images/logo-2.png&w.ig=NorthEast&w.text=%E6%96%87%E5%AD%97%E6%B0%B4%E5%8D%B0&w.tg=SouthEast

## 附表1 《系统名称及所属域对照表》

| 业务系统名          | 资源所属域(belongToDomain)   |  资源所属系统(belongToSystem)  |
| ------------------ | :------------------------: | :--------------------------: |
| 抢单宝（服务商App）  | mobile                     |  wikey                       |
| 猪八戒（卖家版App）  | mobile                     |  buyer                       |
| 触屏版             | mobile                     |  newwap                      |
| 移动产品其他系统     | mobile                     |  default                     |
| 主站历史资源        | homesite                   |  old                         |
| 主站(发布需求)      | homesite                   |  task                        |
| 八戒图片广告系统    |  homesite                   | res                         |
| 八戒财税           | caishui                    |  caishui                     |
| 八卦炉            |  bgl                        | bjclound                    |