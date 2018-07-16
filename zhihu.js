$(document).ready(function(){
    setTimeout(function(){
		window.scrollTo(0,0);
	}, 50);
})
var now,past;
$(window).scroll(function(){
	var rightL = $(".main-right").position().left;
	now=$(this).scrollTop();
	var left=$(this).scrollLeft();
	var topsH = $(".title").offset().top;
	var mainH = $(".main").offset().top;
	var userT = $(".user").offset().top+$(".user").height();
	var botmT = $(".main-bottom").offset().top;
	var leftL = $(".user").offset().left;
	//顶部固定
	if(now>=topsH){
	  $(".title").css({"position":"fixed","top":0,"left":-left});
	}
	else if(now<topsH){
	  $(".title").css({"position":"static"});
	}
	//下滑
	if(now>past){
		//底部栏不固定
		if(userT<botmT){
			$(".main-bottom").css({"position":"static","box-shadow":"none","border-bottom":"1px solid #f6f6f6"});
		}
		//顶部与侧边栏
		if(topsH+$(".title").height()>mainH){
			$(".main-right").css({"position":"fixed","top":"4em"});   //右边栏固定
			$(".return-top-li").slideDown();  //回到顶部出现
			if($(".title1").css("top")=="0px"){
				$(".title1").stop().css({"top":"0"}).animate({top:'-3.25em'},'fast');
				$(".title2").stop().css({"top":"0"}).animate({top:'-3.25em'},'fast');
			}
		}
		else{
			$(".return-top-li").slideUp();  //回到顶部消失
		}
	}
	//上滑
	else if(now<past){
		var btmS=botmT+$(".main-bottom").height()-now;
		//底部栏固定
		if(btmS>=$("body").height()){
			$(".main-bottom").css({"position":"fixed","bottom":"0","box-shadow":" 0 0 5px #CCC","border":"none"});   //底部栏固定
		}
		//顶部与侧边栏
		if(topsH+$(".title").height()>mainH){
			$(".return-top-li").slideDown();  //回到顶部出现
			if($(".title1").css("top")!="0px"){
				$(".title1").stop().css({"top":"-3.25em"}).animate({top:'0'},'fast');
				$(".title2").stop().css({"top":"-3.25em"}).animate({top:'0'},'fast');
			}
		}
		else{
			$(".main-right").css({"position":"static"});   //右边栏取消固定
			$(".return-top-li").slideUp();  //回到顶部消失
		}
	}
	$(".main-bottom").css({"left":leftL-left});
	$(".main-right").css({"left":rightL-left});
	past=now;
})
//侧边按钮
$(".return-arr").hover(function(){
		$(this).prev().fadeIn();
	},function(){
		$(this).prev().fadeOut();
	}
)
   //回到顶部
$(".return-top-li").click(function(){
	$("html,body").animate({scrollTop:"0"},1);
})

//上部   显示全部与收起
jQuery.extend({
	OpenFold:function(openDel,foldDel,QuesDel){         
		var queDel=$(QuesDel).html();
		//显示全部
		$(openDel).click(function(){
			$(QuesDel).html(queDel);
			$(openDel).hide();
			$(foldDel).show();
		})
		//收起
		$(foldDel).click(function(){
			if($(QuesDel).text().length>100){
				$(QuesDel).html($(QuesDel).text().replace(/[\r\n]/g,"").substr(0,100) + "...");
			}
			$(openDel).show();
			$(foldDel).hide();
		})
	}
})
$.OpenFold(".head-open",".head-fold",".Ques-del");
//详细内容   显示全部与收起
$(".main-bottom-fold").click(function(){
	$(".user").css({"max-height":"15em","overflow":"hidden"});
	$(".user").after('<div class="open-user">展开阅读全文</div>');
	$(".main-bottom").hide();
	$(".main-bottom2").show();
	$(".filter").show();
})
$(".user-wrapper").on("click",".open-user",function(){
	$(".filter").hide();
	$(".main-bottom").show();
	$(".main-bottom2").hide();
	$(".user").css({"max-height":"none","overflow":"visible"});
	$(".open-user").remove();
})
//头像详细显示
$(".main-title-img").hover(function(){
		var userDel='<div class="main-title ">'+
						'<img class="main-title-img" src="images/user.jpg" width="60px" height="60px">'+
						'<div class="main-title-div">'+
							'<div>名字</div>'+
							'<div>。。。。。。。。。。。。</div>'+
						'</div>'+
					'</div>'+
					'<div class="del-bottom">'+
						'<div>'+
							'<div>回答</div>'+
							'<strong>6,142</strong>'+
						'</div>'+
						'<div>'+
							'<div>文章</div>'+
							'<strong>16,142</strong>'+
						'</div>'+
						'<div>'+
							'<div>关注者</div>'+
							'<strong>16,142</strong>'+
						'</div>'+
					'</div>'+
					'<div class="del-btn">'+
						'<button type="button" class="title-btn2">关注他</button>'+
						'<button type="button" class="title-btn1">发私信</button>'+
					'</div>';
		$(".main-title-img").append('<div class="user-del">'+userDel+'</div>');
	},function(){
		$(".user-del").remove();
	}
)
//搜索框
//页面初始化
function Init(){
	$(".head-fold").click();
	$(".return-top").hide();
	$(".return-top-li").slideUp();  //回到顶部消失
}
Init();