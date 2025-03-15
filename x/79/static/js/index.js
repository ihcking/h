
$(document).ready(function(){
	/*加载首页推荐区的滚动*/
	var mySwiper = new Swiper('.swiper-container', {
		scrollbar: {
			el: '.swiper-scrollbar',
		}
	});


	/*兼容更多分类的横向滚动*/
	var classWidth = 0;
	$(".classList ul li").each(function(index,item){
		classWidth += parseInt($(item).css("margin-right")) + parseInt($(item).width());

	});
	$(".classList ul").width(classWidth);

	/*搜索下拉框提示*/
	var keyword = "";
	$(".indexSearch input").bind("input",function(e){
		var that = $(this);
		if(keyword != that.val()){
			$.get("/wanchen/webApi/bdkeyword?wd=" + that.val(),function(res){
				if(res.code == 0 || res.data){
					res = eval("("+res.data+")");
					var html = "";
					res.s.forEach(function(item,index){
						html += '<li> <a href="https://www.baidu.com/s?ie=utf-8&wd='+item+'" target="_blank">'+item+'</a> </li>';
					});

					if(html.trim()!=""){
						$(".selectKeyword").show().html(html);
					}else{
						$(".selectKeyword").hide().html("");
					}
				}else{
					$(".selectul").hide().html("");
				}
			});
		}else{
			$(".selectKeyword").hide();
		}
	});
	$(".indexSearch input").keyup(function(e){
		if(e.keyCode==13){
			window.open("https://www.baidu.com/s?ie=utf-8&wd=" + $(this).val() ,"_blank");
			$(".selectKeyword").hide();
		}
	});
	$(".selectKeyword").on("click","a",function(){
		$(".selectKeyword").hide();
	});
});

layui.use(['layer', 'jquery','laytpl','form','util','upload'], function() {
	var layer = layui.layer,
		$jq = layui.jquery,
		laytpl = layui.laytpl,
		form = layui.form;
	var util = layui.util;
	var upload = layui.upload;

	request({
		url:'/wanchen/api/getIndexTopMedia',
		type:'get',
		loading:false,
		done: function (res) {
			if(res.code == 0){
				if(res.data.topState && res.data.topState == 1){
					$(".zhanweitop").hide();
					var Tpl = topListParent.innerHTML
						,view = document.getElementById('web_group');
					laytpl(Tpl).render(res.data, function(html){
						view.innerHTML = html;

						$jq("#web_group .goToTop").on('click',function () {
							ad();
						});
					});
				}else {
					$("#web_group").remove();
				}

			}else {
				layer.msg('置顶广告位获取失败：'+res.msg);
			}

		}
	})


	request({
		url:'/wanchen/api/picbuy/getMobileMedia',
		type:'get',
		loading:false,
		done: function (res) {
			if(res.code == 0){
				$(".zhanweipic").hide();
				if(res.data.topState && res.data.topState == 1){
					var Tpl = picListParent.innerHTML
						,view = document.getElementById('picad');
					laytpl(Tpl).render(res.data, function(html){
						view.innerHTML = html;

					});
				}else {
					$("#picad").remove();
				}

			}else {
				layer.msg('图片广告位获取失败：'+res.msg);
			}

		}
	})

	request({
		url:'/wanchen/api/textbuy/getMobileMedia',
		type:'get',
		loading:false,
		done: function (res) {
			if(res.code == 0){
				if(res.data.topState && res.data.topState == 1){
					var Tpl = textListParent.innerHTML
						,view = document.getElementById('textad');
					laytpl(Tpl).render(res.data, function(html){
						view.innerHTML = html;
					});
				}else {
					$(".wanchen-guanggao").remove();
				}
			}else {
				layer.msg('文字广告位获取失败：'+res.msg);
			}

		}
	})


	function ad(){
		var index = layer.load(0, {shade: [0.5,'#fff']});
		$.get("/wanchen/api/getIndexTopMediaPrice",function(res){
			layer.close(index);
			if(res.code!=0){
				layer.msg(res.msg);
			}else{
				var addressLi = "";
				var buyTimeLi = "";
				for(var i = 0;i<res.data.topMedias.length;i++){
					addressLi = addressLi + ('<li '+ (i==0?'class="active"':'') +' data-id="'+res.data.topMedias[i].id+'" data-time="'+res.data.topMedias[i].safe_time+'">位置'+(res.data.topMedias[i].id+1)+'<i>0s</i></li>');
				}

				for(var i = 0;i<res.data.webProtects.length;i++){
					if(res.data.webProtects[i].minute==0){
						buyTimeLi = buyTimeLi + ('<li '+ (i==0?'class="active"':'') +' data-money="'+res.data.webProtects[i].price+'" data-id="'+res.data.webProtects[i].id+'">不保护</li>');
					}else{
						buyTimeLi = buyTimeLi + ('<li '+ (i==0?'class="active"':'') +' data-money="'+res.data.webProtects[i].price+'" data-id="'+res.data.webProtects[i].id+'">'+(res.data.webProtects[i].minute / 60)+'小时</li>');
					}
				}

				var buyInter;
				var dataCache = localStorage.getItem("postData") ? JSON.parse(localStorage.getItem("postData"))  : null;
				var layerOpen = layer.open({
					type: 1,
					skin:"ptdivskin",
					shadeClose:false,
					title: '购买广告位',
					area:["100vw","90vh"],
					content: '<style>\
                    .ptdivskin{overflow:auto;}\
                    .postBuyTop{padding: 28px 20px;}\
                    .postBuyTop .buyInput{margin-bottom: 22px;}\
                    .postBuyTop .buyInput h3{font-size: 15px;color: #333333;}\
                    .postBuyTop .buyInput h3 font{color:#F30;}\
                    .postBuyTop .buyInput input{display: block;border: 1px solid #eaeaea;height: 40px;line-height: 40px;width: 100%;margin-top: 3px;font-size:15px;padding-left: 6px;}\
                    .postBuyTop .buyInput>img{display:block;margin-top:12px;border-radius:3px;width:32px;height:32px;cursor:pointer;}\
                    .postBuyTop .buyBtn{margin-top:22px;}\
                    .postBuyTop .buyBtn a{cursor:pointer;float:left;width:calc((100% - 30px) / 2);height:42px;line-height:42px;text-align:center;font-size:15px;border-radius:5px;background:#F1F1F1;color:#666;}\
                    .postBuyTop .buyBtn a.disabled{opacity:0.7;}\
                    .postBuyTop .buyInput ul{margin-top:15px;}\
                    .postBuyTop .buyInput ul li{cursor: pointer;float: left;border: 1px solid #e4e4e4;color: #868686;padding: 5px 12px;text-align: center;margin-right: 10px;border-radius: 23px;position: relative;font-size: 14px;margin-bottom: 16px;}\
                    .postBuyTop .buyInput ul li i{position: absolute;display:none; top: -13px;right:-8px;padding:2px 6px;border-radius:40px;background: red;color: #FFF;font-size: 11px;font-style: normal;z-index:1;}\
                    .postBuyTop .buyInput ul li:nth-last-child(1){margin-right:0;}\
                    .postBuyTop .buyInput ul li.active{background:#20c4ab;color:#FFF;border:1px solid #20c4ab;}\
                    .postBuyTop .buyNotice{line-height: 29px;font-size: 14px;color: #787878;}\
                    .postBuyTop .payMoney{color:#F30;font-weight:bold;}\
                    .postBuyTop .payMoney span{font-size:20px;}\
                    </style>\
                    <div class="postBuyTop">\
                        <div class="buyInput">\
                            <h3>位置 <font>*</font></h3>\
                            <ul class="layui-clear address">'+addressLi+'</ul>\
                        </div>\
                        <div class="buyInput">\
                            <h3>保护时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size:12px;color: #a0a0a0;">保护期内，其他人无法顶替你的位置</span> <font>*</font></h3>\
                            <ul class="layui-clear buyTime">'+buyTimeLi+'</ul>\
                        </div>\
                        <div class="buyInput">\
                            <h3>网站名称 <font>*</font></h3>\
                            <input type="text" name="webname" maxlength="10" value="'+(dataCache?dataCache.webname:'')+'" />\
                        </div>\
                        <div class="buyInput">\
                            <h3>网站介绍 <font>*</font></h3>\
                            <input type="text" name="intro" maxlength="50" value="'+(dataCache?dataCache.intro:'')+'" />\
                        </div>\
                        <div class="buyInput">\
                            <h3>网站链接&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size:12px;color: #a0a0a0;">http开头</span> <font>*</font></h3>\
                            <input type="text" name="url" maxlength="600" value="'+(dataCache?dataCache.url:'')+'" />\
                        </div>\
                        <div class="buyInput">\
                            <h3>iCON图标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size:12px;color: #a0a0a0;">(文件必须在100KB以内)</span></h3>\
                            <img src="'+(dataCache?dataCache.icon:'/web/simplicity/img/pushImage.png')+'" class="icon" onerror="this.src=\'/web/simplicity/img/pushImage.png\';" />\
                            <input style="margin-top: 8px;" placeholder="ICON地址" type="text" name="icon" maxlength="600" value="'+(dataCache?dataCache.icon:'/web/simplicity/img/pushImage.png')+'" />\
                        </div>\
                        <div class="buyNotice">本次预计支付：<font class="payMoney"><span>'+res.data.webProtects[0].price+'</span> 元</font><br />购买后将直接顶替你所选的位置，该服务不可退款。若无其他人顶替你的位置或你的网站处于保护期内，<font style="color:#F30;font-weight:bold;">你的网站可一直展示在该位置上。</font>如有疑问，请联系站长QQ<br />\
                        <font style="color:#F30;font-weight:bold;">网站必须合法，违法网站一经查出，立即下架且不退款！</font></div>\
                        <div class="buyBtn layui-clear">\
                            <a onclick="layer.closeAll();">取消</a>\
                            <a style="margin-left:30px;background:#20c4ab;color:#FFF;" class="buyBtnSure disabled">前去付款</a>\
                        </div>\
                    </div>\
                    ',
					end:function(){
						clearInterval(buyInter);
					},
					success:function(){
						//每一秒开始间隔一下。
						interF();
						buyInter = setInterval(interF, 1000);
						function interF(){
							var li = $(".buyInput .address li");
							for(var i = 0;i<li.length;i++){
								var liTime = parseInt($(".buyInput .address li").eq(i).data("time"));
								if(liTime > 1){
									$(".buyInput .address li").eq(i).data("time",liTime - 1);
									$(".buyInput .address li").eq(i).find("i").html((liTime - 1) + "s").show();
								}else{
									$(".buyInput .address li").eq(i).data("time",0);
									$(".buyInput .address li").eq(i).find("i").html("0s").hide();
								}
							}
							checkBtn();
						}
						//位置选择
						$(".buyInput .address li").click(function(){
							//显示当前的位置激活状态
							$(".buyInput .address .active").removeClass("active");
							$(this).addClass("active");

							//如果位置是第6个，禁止他买保护时间
							/*if($(this).index()==5){
                                $(".buyInput .buyTime li").hide();
                                $(".buyInput .buyTime li").eq(0).show();
                            }else{
                                $(".buyInput .buyTime li").show();
                            }

                            //将购买时长重置
                            $(".buyInput .buyTime .active").removeClass("active");
                            $(".buyInput .buyTime li").eq(0).addClass("active");
                            $(".payMoney").html("<span>" + $(".buyInput .buyTime li").eq(0).data("money") + "</span> 元");*/

							//检查按钮是否可以显示
							checkBtn();
						});
						//检查按钮是否可以按
						function checkBtn(){
							if(parseInt($(".postBuyTop .address li.active").data("time")) == 0){
								$(".buyBtnSure").removeClass("disabled");
							}else{
								$(".buyBtnSure").addClass("disabled");
							}
						}
						//保护时间选择
						$(".buyInput .buyTime li").click(function(){
							$(".buyInput .buyTime .active").removeClass("active");
							$(this).addClass("active");
							$(".payMoney").html("<span>" + $(this).data("money") + "</span> 元");
						});
						//上传icon
						var uploadInst = upload.render({
							elem: '.buyInput .icon',
							url: '/upload/file',
							exts:'png|jpg|ico',
							size: '100',
							done: function(res){
								$(".buyInput .icon").attr("src",res.data.src);
								$(".postBuyTop input[name=icon]").val(res.data.src);
							}
						});


						//现在购买
						$(".buyBtnSure").click(function(){
							if(!$(".buyBtnSure").hasClass("disabled")){
								var postData = {
									webname : $(".postBuyTop input[name=webname]").val() || "",
									intro : $(".postBuyTop input[name=intro]").val() || "",
									url : $(".postBuyTop input[name=url]").val() || "",
									ad_id : $(".postBuyTop .address li.active").data("id"),
									icon : $(".postBuyTop input[name=icon]").val() || "",
									safe_time : $(".postBuyTop .buyTime li.active").attr("data-id"),
									type : 1,
									payment : 'm',
								}
								if(postData.webname==""){
									layer.msg("请填写网站名字");
									return;
								}
								if(postData.intro==""){
									layer.msg("请填写网站介绍");
									return;
								}
								if(postData.url==""){
									layer.msg("请填写网站链接");
									return;
								}
								if(postData.url.indexOf("http")!=0){
									layer.msg("请以http或https开头");
									return;
								}
								if(postData.icon.indexOf("/web/simplicity/img/pushImage.png")!=-1){
									layer.msg("请上传网站图标ICON");
									return;
								}

								request({
									url:'/wanchen/api/buy_ad',
									data:JSON.stringify(postData),
									done: function (res) {
										if(res.code!=0){
											layer.msg(res.msg);
										}else{
											localStorage.setItem("postData",JSON.stringify(postData));
											location = res.pay;
										}
									}
								})

							}else{
								layer.msg("该位置处于保护期，无法购买");
							}
						});
					}
				});

				layer.full(layerOpen);
			}
		});
	}

	$jq("#web_group .goToTop").on('click',function () {
		ad();
	});



});






