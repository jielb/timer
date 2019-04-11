"use strict";

$(function () {

	/** 登陆   **/
	if (getCookie("login") != null) {
		var data = JSON.parse(getCookie("login"));
		console.log(data.name);
		$("#login-index").html(data.name).css({ "color": "red", "fontSize": "12px" });
		$("#login-index").click(function () {
			return false;
		});
	} else {
		$("#login-index").html("登陆");
	};

	/*导航条*/

	$("#nav2").hover(function () {
		$(this).find("#nav-op").css({ "display": "block", "zIndex": "10", "background": "white" });
	}, function () {
		$(this).find("#nav-op").css("display", "none");
	});

	/* log  搜索*/

	$("#zList").hover(function () {
		$(this).find($("#list")).css("display", "block");
	}, function () {
		$(this).find($("#list")).css("display", "none");
	});

	$("#app").hover(function () {
		$(this).find("img").css("display", "block");
	}, function () {
		$(this).find("img").css("display", "none");
	});

	/* 首页 瀑布流  left*/
	$.ajax({
		type: "get",
		url: "../json/index-data1.json",
		dataType: "json",
		async: true,
		success: function success(data) {
			foo(data);
		}
	});

	function foo(data) {
		var str = "";
		$.map(data, function (item, i) {
			str += "<div class=\"wLt\">\n\t\t \t\t\t\t\t<div class=\"wlts\">\n\t\t \t\t\t\t\t \t<img class=\"bigImg\" src=\"" + item.imgSrc + "\" />\n\t\t \t\t\t\t\t \t<div class=\"touming\">\n\t\t \t\t\t\t\t \t\t<div class=\"zan\">\u8D5E</div>\n\t\t \t\t\t\t\t \t\t<div class=\"str\">\u661F</div> \n\t\t \t\t\t\t\t \t</div>\n\t\t \t\t\t\t\t</div>\n\t\t \t\t\t\t\t<div class=\"wltx\"> \n\t\t\t \t\t\t\t\t<img class=\"minImg\" src=\"" + item.imgUrl + "\"/>\n\t\t\t \t\t\t\t\t<span>" + item.title + "</span>\n\t\t \t\t\t\t\t</div>\n\t \t\t\t\t</div>";
		});
		$("#wLeft").html(str);
		$("#wRight").html(str);
		$("#water-M").html(str);
	};
});