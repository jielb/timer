"use strict";

$(function () {
	/** 登陆   **/
	if (getCookie("login") != null) {
		var data = JSON.parse(getCookie("login"));
		$("#login-detail").html(data.name).css({ "color": "red", "fontSize": "12px" });
		$("#login-detail").click(function () {
			return false;
		});
	} else {
		$("#login-detail").html("登陆");
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

	/* nav */
	$("#shop").hover(function () {
		console.log("aa");
		$(this).siblings().css("display", "block");
	}, function () {
		$(this).siblings().css("display", "none");
	});

	/* 物品详细信息*/
	//console.log(location.search.split("=")[1]);
	$.ajax({
		type: "get",
		url: "../json/list-data.json",
		dataType: "json",
		async: true,
		success: function success(data) {
			foo(data);
		}
	});
	function foo(data) {
		$.each(data, function (index, item) {
			if (data[index].id == location.search.split("=")[1]) {
				var str = "<div>\n\t\t\t\t\t\t\t\t<div class=\"fd-picture\">\n\t\t\t\t\t\t\t\t\t<img src=\"" + data[index].imgSrc + "\"/>\n\t\t\t\t\t\t\t\t\t<div class=\"sx-picture\">\n\t\t\t\t\t\t\t\t\t\t<img src=\"" + data[index].imgSrc + "\"/>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div id=\"bug\">\n\t\t\t\t\t\t\t\t\t<h3>" + data[index].title + "</h3>\n\t\t\t\t\t\t\t\t\t<p>" + ("促销价:" + data[index].price) + "</p>\n\t\t\t\t\t\t\t\t\t<img class=\"zs-picture\" src=\"" + data[index].imgSrc + "\"/>\n\t\t\t\t\t\t\t\t\t<div id=\"num\">\n\t\t\t\t\t\t\t\t\t\t<span id=\"minus\">-</span>\n\t\t\t\t\t\t\t\t\t\t<input id=\"Num\" type=\"text\" value=\"1\"/>\n\t\t\t\t\t\t\t\t\t\t<span class=\"add\">+</span>\n\t\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t<div id=\"numBtn\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"\u7ACB\u5373\u8D2D\u4E70\" />\n\t\t\t\t\t\t\t\t\t\t<input type=\"button\" class=\"cart-btn\" data-id=\"" + data[index].id + "\" value=\"\u52A0\u5165\u8D2D\u7269\u8F66\" /> \n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>";
			}
			$("#shopping").html(str);

			/* 加号  */
			$(".add").unbind("click").bind("click", function () {

				//	console.log($("#Num").val())
				$("#Num").val(parseInt($("#Num").val()) + 1);
			});

			/* 减号 */
			$("#minus").unbind("click").bind("click", function () {
				if ($("#Num").val() == 1) {
					$("#Num").val("1");
				} else {
					$("#Num").val(Number($("#Num").val()) - 1);
				}
			});

			/*  加入购物出车*/
			$(".cart-btn").unbind("click").bind("click", function () {
				var id = this.getAttribute("data-id");
				var Cart = new ShoppingCart();
				Cart.addCart(id, Number($("#Num").val()), true);
				location.href = "cart.html";
			});
		});
	};
});