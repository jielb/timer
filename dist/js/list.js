"use strict";

$(function () {
	/** 登陆   **/
	if (getCookie("login") != null) {
		var data = JSON.parse(getCookie("login"));
		$("#login-list").html(data.name).css({ "color": "red", "fontSize": "12px" });
		$("#login-list").click(function () {
			return false;
		});
	} else {
		$("#login-list").html("登陆");
	};
	/*主页右边脱离文档固定*/
	$(".fix").hover(function () {
		$(this).find("p").css("display", "block");
	}, function () {
		$(this).find("p").css("display", "none");
	});

	$(window).scroll(function () {
		var scrollTop = $(document).scrollTop();
		if (scrollTop >= 400) {
			$("#Top").css("display", "block");
		} else {
			$("#Top").css("display", "none");
		}
	});

	$("#Top").click(function () {
		$("html,body").stop().animate({ "scrollTop": 0 }, 500);
	});
	/*导航条*/

	$("#nav2").hover(function () {
		$(this).find("#nav-op").css({ "display": "block", "zIndex": "1" });
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

	$.ajax({
		type: "get",
		url: "../json/data.json",
		dataType: "json",
		async: true,
		success: function success(data) {
			foo(data);
		}
	});
	function foo(data) {
		console.log(data);
		var arr = [];
		data.map(function (item, i) {
			arr.push(item.result);
			$("#list-nav2").append("\n\t\t\t\t<div class=\"listNav2\">\n\t\t \t\t\t\t<div>" + item.margic + "</div> \n\t\t \t\t\t\t<ul>\n\t\t \t\t\t\t\t<li>\n\t\t \t\t\t\t\t\t<img src=\"" + item.imgSrc + "\" />\n\t\t \t\t\t\t\t</li>\n\t\t \t\t\t\t\t<li class=\"addClass\">\n\t\t \t\t\t\t\t\t\n\t\t \t\t\t\t\t</li>\n\t\t \t\t\t\t</ul> \n\t \t\t\t</div>\n\t\t\t\t");
			arr[i].map(function (item) {
				console.log(item.type);
				$('.addClass').eq(i).append("<a>" + item.title + "</a>");
				if (item.type == "host") {
					$(".addClass").eq(i).find("a").css("color", "#FF4466");
				}
			});
		});
	};

	/*list  瀑布流内容*/

	$.ajax({
		type: "get",
		url: "../json/list-data.json",
		dataType: "json",
		async: true,
		success: function success(data1) {
			boo(data1);
		}
	});

	function boo(data1) {
		var str = "";
		for (var attr in data1) {
			str += "<li>\n\t\t\t\t\t\t<div class=\"list-border\"> \n\t\t\t\t\t\t<a href=\"detail.html?id=" + data1[attr].id + "\">\n\t\t\t\t\t\t\t<img src=\"" + data1[attr].imgSrc + "\"/>\n\t\t\t\t\t\t\t<p>" + data1[attr].title + "</p>\n\t\t\t\t\t\t\t<span>" + data1[attr].price + "</span>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>";
		}
		$("#list-content").find("ul").html(str);
	}
});