"use strict";

$(function () {
	var data1 = JSON.parse(localStorage.getItem("cart"));
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
		var str = "";
		$.each(data, function (index, item) {
			for (var i in data1) {
				if (item.id == i) {

					str += "\n\t\t\t\t\t\t\t<li class=\"del\">\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t<input title=\"" + item.price + "\" data-id3=\"" + i + "\" type=\"checkbox\" class=\"ch\" />\n\t\t\t\t\t\t\t\t\t<img src=\"" + item.imgSrc + "\" />\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div> \n\t\t\t\t\t\t\t\t\t<span>" + item.title + "</span>\n\t\t\t\t\t\t\t\t\t<span>" + ("￥" + item.price) + "</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t<i class=\"totalPrice\">" + data1[i] * item.price + "</i>\n\t\t\t\t\t\t\t\t\t<span data-id=\"" + i + "\" title=\"" + item.price + "\" class=\"minus\">-</span>\n\t\t\t\t\t\t\t\t\t<input class=\"numCont\" type=\"text\" value=\"" + data1[i] + "\"/>\n\t\t\t\t\t\t\t\t\t<span data-id1=\"" + i + "\" title=\"" + item.price + "\" class=\"add\">+</span>\n\t\t\t\t\t\t\t\t\t<span data-id2=\"" + i + "\" title=\"" + item.i + "\" class=\"delBtn\">\u5220\u9664</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t";
				}
			}
		});
		$("#cartList").html(str);
		var cart = new ShoppingCart();
		/* 减号 */
		$(".minus").each(function () {
			$(this).click(function () {
				var id = this.getAttribute("data-id");
				var pc = this.getAttribute("title");
				if ($(this).next().val() == 1) {
					$(this).next().val("1");
					cart.addCart(id, 1, false);
				} else {
					$(this).next().val(Number($(this).next().val()) - 1);
					cart.addCart(id, $(this).next().val(), true);
					/*单行总价*/
					$(this).siblings(".totalPrice").html(pc * $(this).next().val());
				}
			});
		});

		/* 加号 */
		$(".add").each(function () {
			$(this).click(function () {
				var id = this.getAttribute("data-id1");
				var pc = this.getAttribute("title");
				$(this).prev().val(Number($(this).prev().val()) + 1);
				cart.addCart(id, $(this).prev().val(), true);
				/*单行总价*/
				$(this).siblings(".totalPrice").html(pc * $(this).prev().val());
			});
		});

		/* 单行删除*/
		$(".delBtn").each(function () {
			$(this).click(function () {
				var id = this.getAttribute("data-id2");
				cart.removeCart(id, true);
				//	 			$(this).parent().parent().parent().empty(this.parentNode.parentNode)

				//	 			$('#cartList').remove($(this).parent().parent())
				/*	console.log($(this).attr('title'))	*/
				$(this).parent().parent().remove();
			});
		});

		//商品所有按钮点击后，全选按钮打钩     
		$(".ch").click(function () {
			if ($(".ch:checked").length == $(".ch").length) {
				$(".oCh").prop("checked", true);
			} else {
				$(".oCh").prop("checked", false);
			}
		});

		//点击按钮计算价格
		var num1 = 0;
		var numPrice = 0;
		$(".ch").each(function () {
			$(this).click(function () {
				if ($(this).prop("checked") == true) {
					var id = this.getAttribute("data-id3");
					var pc = this.getAttribute("title");
					console.log(pc);
					num1 = Number($(this).parent().next().next().find("input[class='numCont']").val()) + num1;
					numPrice = $(this).parent().next().next().find("input[class='numCont']").val() * pc + numPrice;
				} else {
					num1 = num1 - $(this).parent().next().next().find("input[class='numCont']").val();
					numPrice = numPrice - $(this).parent().next().next().find("input[class='numCont']").val() * this.getAttribute("title");
				}
				$(".oNum").html(num1);
				$(".oPrice").html(numPrice);
			});
		});

		/* 全选 */
		num1 = 0;
		numPrice = 0;
		$(".oCh").click(function () {
			$(".ch").prop("checked", $(".oCh").prop("checked"));
			if ($(".oCh").prop("checked") == true) {
				$(".ch").each(function () {
					var id = this.getAttribute("data-id3");
					var pc = this.getAttribute("title");
					num1 = Number($(this).parent().next().next().find("input[class='numCont']").val()) + num1;
					numPrice = $(this).parent().next().next().find("input[class='numCont']").val() * pc + numPrice;
				});
				$(".oNum").html(num1);
				$(".oPrice").html(numPrice);
				// 全选 删除所有商品 
				$(".totalDelBtn").click(function () {
					cart.removeAll();
					$("#cartList").empty($("#cartList").children());
				});
			} else {
				num1 = 0;
				numPrice = 0;
				$(".oNum").html("0.0");
				$(".oPrice").html("0.00");
			}
		});
	};
});