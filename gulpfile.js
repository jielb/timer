//引用所需的gulp插件
const gulp = require("gulp");
const sass = require("gulp-sass"); 
const connect = require("gulp-connect");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const imgmin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const gutil = require("gulp-util");
/*const gulpJson = require("gulp-json");*/
//向dist文件夹中拷贝img下的图片
gulp.task("copyImg",()=>{
	gulp.src("img/**") //被拷贝图片的路径
	.pipe(imgmin()) //压缩图片
	.pipe(gulp.dest("dist/img")) //拷贝到dist文件下的路径
})

gulp.task("copyHtml",()=>{
	gulp.src("*.html")
	.pipe(gulp.dest("dist"))
})

gulp.task("copySass",()=>{
	gulp.src("sass/*.scss")
	.pipe(sourcemaps.init()) //开启sourcemaps
	.pipe(sass({"outputstyle":"compressed"})) //将scss中代码格式改成一行
	.pipe(sourcemaps.write()) //生成记录位置信息    经过 concat 和 uglify ，将生成的main.js 与 源文件( src 下的所有js文件 )之间的位置映射信息，生成sourcemaps文件 后 拷贝到dist/css
	.pipe(gulp.dest("dist/css"))
})

gulp.task("copyCss",()=>{
	gulp.src("sass/*.css")
	.pipe(gulp.dest("dist/css"))
})

gulp.task("copyJs",()=>{
	gulp.src("js/*.js")
	.pipe(gulp.dest("dist/js"))
})

gulp.task("babel",()=>{
	gulp.src("js/*.js")
	.pipe(babel({ //将es6转化为es5
		"presets":["es2015"]
	}))
	.pipe(gulp.dest("dist/js"))
})

gulp.task("json",()=>{
	gulp.src("json/*.json")
	/*.pipe(gulpJson())*/
	.pipe(gulp.dest("dist/json"))
})
gulp.task("concat",()=>{
	gulp.src("js/*.js")
	.pipe(concat("main.js")) //将所有js文件合并到main文件中，并保留 源文件
	.pipe(babel({
		"presets":["es2015"]
	}))
	.pipe(gulp.dest("dist/js"))
	.pipe(uglify())   //压缩js文件，不保留原文件 
	.on('error', function (err) {  // .on当压缩文件出错提示具体错误信息
         gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
	.pipe(rename("main.min.js"))//作用 可认为是：改变 合并 后 main.js文件  对其压缩 并改变js文件名字为main.min.js
	.pipe(gulp.dest("dist/js"))
})

gulp.task("watch",()=>{ //监听所有文件 及文件名
	gulp.watch(["img/**","*.html","sass/*.scss","js/*.js","js/*.js","js/*.js","json/*.json"],["copyImg","copyHtml","copySass","copyJs","babel","concat","json"])
})
gulp.task("server",()=>{  //连接服务器
	connect.server({
		root:"dist", //根目录
		livereload:true  //作用实时监听文件变化
	})
})

gulp.task("build",["copyImg","copyHtml","copySass","copyJs","babel", "concat","json"],()=>{//gulp build只执行一次  作用：执行所有方法("任务名")
	console.log("构建完成")
})

gulp.task("default",["server","watch"])  //gulp 实时监听








