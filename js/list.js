$(function(){
	/** 登陆   **/  
	if(getCookie("login") != null){
		var data = JSON.parse(getCookie("login")) 
		$("#login-list").html(data.name).css({"color":"red","fontSize":"12px"})
		$("#login-list").click(function(){
			return false;
		})
	} else {
		$("#login-list").html("登陆")
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
	/*导航条*/
	
	$("#nav2").hover(function(){
		$(this).find("#nav-op").css({"display":"block","zIndex":"1"})
	},function(){
		$(this).find("#nav-op").css("display","none")
	});
	
	/* log  搜索*/
	
	$("#zList").hover(function(){ 
		$(this).find($("#list")).css("display","block")
	},function(){
		$(this).find($("#list")).css("display","none")
	});
	
	$("#app").hover(function(){
		$(this).find("img").css("display","block")
	},function(){
		$(this).find("img").css("display","none")
	}); 
	
	$.ajax({
		type:"get",
		url:"../json/data.json",
		dataType:"json",
		async:true,
		success:function(data){ 
			foo(data);
		}
	});
	function foo(data){
		console.log(data)
		let arr=[];
		data.map(function(item,i){
			arr.push(item.result)
			$("#list-nav2").append(
				`
				<div class="listNav2">
		 				<div>${item.margic}</div> 
		 				<ul>
		 					<li>
		 						<img src="${item.imgSrc}" />
		 					</li>
		 					<li class="addClass">
		 						
		 					</li>
		 				</ul> 
	 			</div>
				`
			)
			arr[i].map(function(item){
				console.log(item.type)
				$('.addClass').eq(i).append(`<a>${item.title}</a>`)
				if(item.type == "host"){
					$(".addClass").eq(i).find("a").css("color","#FF4466")
				}
			})
		})		
	};
	
	/*list  瀑布流内容*/
	
	$.ajax({
		type:"get",
		url:"../json/list-data.json",
		dataType:"json",
		async:true,
		success:function(data1){
			boo(data1);
		}
	});
	
	function boo(data1){
		var str = ""
		for(var attr in data1){ 
			str += `<li>
						<div class="list-border"> 
						<a href="detail.html?id=${data1[attr].id}">
							<img src="${data1[attr].imgSrc}"/>
							<p>${data1[attr].title}</p>
							<span>${data1[attr].price}</span>
						</a>
						</div>
					</li>`
		}
		$("#list-content").find("ul").html(str)
	}
});