$(function(){
    /** 登陆   **/  
	if(getCookie("login") != null){
		var data = JSON.parse(getCookie("login")) 
		$("#login-detail").html(data.name).css({"color":"red","fontSize":"12px"});
		$("#login-detail").click(function(){
			return false;
		})
	} else {
		$("#login-detail").html("登陆")
	};	 
	/*主页右边脱离文档固定*/
	$(".fix").hover(function(){
		$(this).find("p").css("display","block")
	},function(){
		$(this).find("p").css("display","none")
	}); 
	
	$(window).scroll(function(){
		var scrollTop = $(document).scrollTop()  
		if(scrollTop >= 400){
			$("#Top").css("display","block")
		}else{
			$("#Top").css("display","none")
		}
	});
	
	$("#Top").click(function(){
		$("html,body").stop().animate({"scrollTop":0},500)		
	});
	
	/* nav */
	$("#shop").hover(function(){
		console.log("aa")
		$(this).siblings().css("display","block")
	},function(){
		$(this).siblings().css("display","none")
	});
	
	/* 物品详细信息*/
	//console.log(location.search.split("=")[1]);
	$.ajax({
		type:"get",
		url:"../json/list-data.json",
		dataType:"json",
		async:true,
		success:function(data){
			foo(data);
		}
	});
	function foo(data){
		$.each(data,function(index,item){
			if(data[index].id == location.search.split("=")[1]){
				var str = `<div>
								<div class="fd-picture">
									<img src="${data[index].imgSrc}"/>
									<div class="sx-picture">
										<img src="${data[index].imgSrc}"/>
									</div>
								</div>
								<div id="bug">
									<h3>${data[index].title}</h3>
									<p>${"促销价:"+data[index].price}</p>
									<img class="zs-picture" src="${data[index].imgSrc}"/>
									<div id="num">
										<span id="minus">-</span>
										<input id="Num" type="text" value="1"/>
										<span class="add">+</span>
									<div>
									<div id="numBtn">
										<input type="button" value="立即购买" />
										<input type="button" class="cart-btn" data-id="${data[index].id}" value="加入购物车" /> 
									</div>
								</div>
						</div>`
			}
			$("#shopping").html(str)
			
			/* 加号  */
			$(".add").unbind("click").bind("click",function(){
				
			//	console.log($("#Num").val())
				$("#Num").val(parseInt($("#Num").val())+1)
			});
			
			/* 减号 */
			$("#minus").unbind("click").bind("click",function(){ 
				if($("#Num").val() == 1){
					$("#Num").val("1") 
				} else {
					$("#Num").val(Number($("#Num").val()) - 1)
				}
			});
			 
			/*  加入购物出车*/
			$(".cart-btn").unbind("click").bind("click",function(){
				let id = this.getAttribute("data-id")
				let Cart = new ShoppingCart()
				Cart.addCart(id,Number($("#Num").val()),true)
				location.href="cart.html"
			})
		})
		
	}
	
});