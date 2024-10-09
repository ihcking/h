window.onload=function(){
            document.documentElement.style.webkitTouchCallout='none';
        };


var determine = 0 
$(".discrBtn").click(function(){
	if(determine==0)
		{
			determine = 1
			if($(".name-input").val()=="")
			{
				$(".name-input").focus();
				$(".msgbox").fadeIn(300).delay(3000).hide(0);
			}
			else
			{
				$(".page1").hide();
				$(".page2").show();
			}
			setTimeout("determine=0",3300)
		}
	else
		{
			
		}
	})
$(".sex").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		//var gender = $("img",this).attr("alt");
	})
var width = 0;
function jishu()
	{
		if(width<=5)
			{
				$(".recording").show();
				$(".progressing").width(width*49+"px");
				$(".secondText").html(width+"s");
				width++
				a = setTimeout("jishu()",1000);
				return 
			}
		
	}
function ting(event)
	{
		if(width<5)
			{
				alert('时间太短,请重新录制')
				clearTimeout(a);
				$(".recording").hide();
				width = 0;
				wx.startRecord();
				//event.preventDefault();
			}
		else
			{
				$(".alert1").show();
				$(".recording").hide();
				var name = $(".name-input").val();
				var gender = $(".active img").attr("alt");
				$.ajax({
					type:'POST',
					url:'shibie.php',
					data: 'name='+name+'&gender='+gender,
					timeout:3000,
					success:function(tupian){							
							$("#shareImg").attr("src",tupian);
							setTimeout("show()",3000)
						},
					 error: function(){
							$(".alert1").hide(); 
							$(".alert2").show(); 
						}
				})	
			}	
	}
function show(){
		$(".container").hide();
		$(".page3").show();
	}