 $(function(){
 	$("#phone").click(function(){
 		$(this).css({"color":"#ff4066","border-bottom":"2px solid red"}).siblings().css({"border":"none","color":"#333"})
 		$("#pas-login").css({"display":"none"})
 		$("#phone-login").css({"display":"block"})
 		return false
 	});
 	$("#pas").click(function(){
 		$(this).css({"color":"#ff4066","border-bottom":"2px solid red"}).siblings().css({"border":"none","color":"#333"})
 		$("#phone-login").css({"display":"none"})
 		$("#pas-login").css({"display":"block"})
 		return false
 	});
 	
 	/* 用户名格式验证*/
	var flag1 = null;
	var nameVal = null;
	$("#txt1").bind("input propertychange",function(){
		var data = JSON.parse(localStorage.getItem("register"))
		var reg=/^[a-zA-Z][a-zA-Z0-9]{3,15}$/;   
		if(reg.test($(this).val())){
			for(var i in data){
				if( i == $(this).val()){					
					flag1 = true
					nameVal = $(this).val()
					console.log(nameVal) 
				}
			}
		} else {
			flag1 = false
		}
		
	});
	
	/* 密码是格式验证 */
	var flag2 = null;
	$("#txt2").bind("input propertychange",function(){
		var reg=/^[a-zA-Z0-9]{4,10}$/ 
		if(reg.test($(this).val())){
			flag2 = true
		} else {
			flag2 = false
		}
	});
 	
 	/* 点击密码登陆  */
 	$("#pas-btn").click(function(){
 		console.log(flag1)
 		console.log(flag2)
 		if(flag1 == true && flag2 == true){
 			var str3 = JSON.stringify({name:nameVal,token:1})
 			setCookie("login",str3,7)
 			location.href = "index.html"
 		} else {
 			$("#cont").html("用户名或密码错误").css({"color":"red","fontSize":"12px"})
 		}
 	})
})