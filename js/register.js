$(function(){
	$("#agg").click(function(){
		$(this).parent().css("display","none")
		return false;
	});
	
	/* 用户名格式验证*/
	var flag1 = null;
	var name = null;
	var value = null;
	var obj = null; 
	if(localStorage.getItem("register") == null){
		localStorage.setItem("register",JSON.stringify({asddd:"sadasd"})) 
	} else {
		obj = JSON.parse(localStorage.getItem("register"))
	};
	
	$("#txt1").focus(function(){
		$("#cont1").html("用户名由英文字母和数字组成的4-16位字符，以字母开头")		
	}); 
	$("#txt1").bind("input propertychange",function(){
		var reg=/^[a-zA-Z][a-zA-Z0-9]{3,15}$/;   
		if(reg.test($(this).val())){
			var data = JSON.parse(localStorage.getItem("register"))
			name = $(this).val()  
			for(var i in data){
				if(i != name){
					flag1 = true
					name = name
				} else {
					$("#cont1").html("用户名重复")
					flag1 = false
				}
			}
		} else {
			flag1 = false
			$("#cont1").html("用户名格式不正确")
		}  
		
	});
	
	/* 密码是格式验证 */
	var flag2 = null;
	$("#txt2").focus(function(){
		$("#cont2").html("密码不能含有非法字符，长度在4-10之间")
	});
	$("#txt2").bind("input propertychange",function(){
		var reg=/^[a-zA-Z0-9]{4,10}$/ 
		if(reg.test($(this).val())){
			flag2 = true
			value = $(this).val()
		} else {
			flag2 = false
			$("#cont2").html("密码格式不正确")
		}
	});
	
	/* 点击注册 */   
	
	$("#btn").click(function(){ 
		console.log(flag1)
		console.log(flag2)
		if(flag1 == true && flag2 == true){ 
			obj[name] = value;
			var str =JSON.stringify(obj)
			localStorage.setItem("register",str)
			location.href = "login.html"
		}
	})
});