"use strict";

function ShoppingCart() {
	//如果localStorage已经有数据了，就取出来
	if (localStorage.getItem("cart") != null) {
		//购物车的数据
		this.cartData = JSON.parse(localStorage.getItem("cart"));
	} else {
		this.cartData = {}; //购物车的数据
	}

	//添加购物车
	this.addCart = function (id, num, tm) {
		if (!this.cartData[id] || tm) {
			this.cartData[id] = num;
		} else {
			this.cartData[id] = Number(this.cartData[id]) + num;
		}
		var str = JSON.stringify(this.cartData);

		localStorage.setItem("cart", str);
	};

	//删除单个购物车
	this.removeCart = function (id, tm) {
		var data = JSON.parse(localStorage.getItem("cart"));
		delete data[id];
		var str = JSON.stringify(data);
		localStorage.setItem("cart", str);
	};
	//删除全部购物车
	this.removeAll = function () {
		var data = JSON.parse(localStorage.getItem("cart"));
		for (var i in data) {
			delete data[i];
		};
		var str = JSON.stringify({});
		localStorage.setItem("cart", str);
	};
};