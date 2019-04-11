$(function(){
	
	/** 登陆   **/  
	if(getCookie("login") != null){
		var data = JSON.parse(getCookie("login"))
		console.log(data.name)
		$("#login-index").html(data.name).css({"color":"red","fontSize":"12px"})
		$("#login-index").click(function(){
			return false;
		})
	} else {
		$("#login-index").html("登陆")
	};
	
	/*导航条*/
	
	$("#nav2").hover(function(){
		$(this).find("#nav-op").css({"display":"block","zIndex":"10","background":"white"})
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
	})
	
	/* 首页 瀑布流  left*/
	$.ajax({
		type:"get",
		url:"../json/index-data1.json",
		dataType:"json",
		async:true,
		success:function(data){
			foo(data);
		}
	});
	 
	function foo(data){ 
		var str = "" 
		$.map(data,function(item,i){   
			str += `<div class="wLt">
		 					<div class="wlts">
		 					 	<img class="bigImg" src="${item.imgSrc}" />
		 					 	<div class="touming">
		 					 		<div class="zan">赞</div>
		 					 		<div class="str">星</div> 
		 					 	</div>
		 					</div>
		 					<div class="wltx"> 
			 					<img class="minImg" src="${item.imgUrl}"/>
			 					<span>${item.title}</span>
		 					</div>
	 				</div>` 
		})
		$("#wLeft").html(str);
		$("#wRight").html(str);
		$("#water-M").html(str);
	};
	 
}); "</span>\n\t\t \t\t\t\t\t</div>\n\t \t\t\t\t</div>";
		});
		$("#wLeft").html(str);
		$("#wRight").html(str);
		$("#water-M").html(str);
	};
});