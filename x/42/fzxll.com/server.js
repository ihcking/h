/**
 *  Premium URL Shortener jQuery Application
 *  Copyright @KBRmedia - All rights Reserved
 */

//数字格式化为千位标识
function toThousands(num) {
    var num = (num || 0).toString(), re = /\d{3}$/, result = '';
    while ( re.test(num) ) {
        result = RegExp.lastMatch + result;
        if (num !== RegExp.lastMatch) {
            result = ',' + result;
            num = RegExp.leftContext;
        } else {
            num = '';
            break;
        }
    }
    if (num) { result = num + result; }
    return result;
}
function rules(){
	layer.open({
	  type: 2,
	  skin: 'layui-layer-rim', //加上边框
	  area: ['580px', '400px'], //宽高
	  title: '91she.cn链接内容管理规范',
	  content: './rules.php'
	});
}
$(document).ready(function() {

	$.get("ajax.php?act=count",function(data){
		$("#count_dwz").text(toThousands(data.count_dwz));
		$("#count_tongji").text(toThousands(data.count_tongji));
		$("#count_vip").text(toThousands(data.count_vip));
	},'json');
	/**
	 * Shorten URL
	 **/
	// Ajax request: URL shortening and error handeling
	$("#shortenurl").click(function(e) {
		e.preventDefault();
		var url = $("#url").val();
		var type = $("#type").val();
		var dwz = $("#dwz").val();
		if(type == 1)var typename = '跳转防红';
		else if(type == 2)var typename = '直接防红';
		else if(type == 3)var typename = '微信防红';
		if (url=='') {
			Snackbar.show({text: '请输入正确的网址！', backgroundColor: '#e22e40', textColor: '#fff', showAction: false });
			$('.main-input').addClass('error');
			return;
		}
		if($("#isagree").val()!='1') {
			Snackbar.show({text: '您须同意我们的服务条款才能生成', backgroundColor: '#e22e40', textColor: '#fff', showAction: false });
			return;
		}
		$.ajax({
			type: "POST",
			url: "./ajax.php?act=creat",
			data: {url: url, type: type, dwz: dwz},
			dataType: "json",
			beforeSend: function() {
				$('.shortbtnz').append("<div class='spinner-container-parent'><div class='spinner-container'><div class='spinner'><div class='spinner-left'><div class='spinner-circle'></div></div><div class='spinner-right'><div class='spinner-circle'></div></div></div></div></div>");
			},
			complete: function() {
				$('.shortbtnz').find('.spinner-container-parent').fadeOut("fast");
			},
			success: function(html) {
				if (html.code!=0) {
					Snackbar.show({text: html.msg, backgroundColor: '#e22e40', textColor: '#fff', showAction: false });
					$('.main-input').addClass('error');
				} else {
					$('.main-input').removeClass('error');
					/**$("#shortenurl").hide();
					$("#copyurl").show();   **/

					var url = html.dwz1;
					Snackbar.show({text: '生成链接成功', backgroundColor: '#1aa82c', textColor: '#fff', showAction: false });
					$('.modal-contentlink').html('<div class="panel-body"><div class="copy-link-block"><span class="short-url">' + url + '</span><button class="btn btn-primary" id="copyurlmodal" type="button" data-clipboard-text="' + url + '"><i class="zmdi zmdi-copy"></i></button></div><div class="qr"><img src="https://www.liantu.com/api.php?w=155&text=' + encodeURIComponent(url) + '" alt=""><a href="https://www.liantu.com/api.php?w=155&text=' + encodeURIComponent(url) + '" target="_blank" class="mdbtn btn btn-primary" data-value="https://www.liantu.com/api.php?w=155&text=' + encodeURIComponent(url) + '">保存二维码</a><br/><a href="tongji.php?id=' + html.id + '" target="_blank" class="mdbtn btn btn-success">查看统计</a><br/>当前套餐：'+(html.isvip==1?'<a href="./pay.php" target="_blank" style="color:#ef7509">VIP版</a>':'<a href="./pay.php" target="_blank" style="color:#0224a5">免费版</a>')+'</div></div></div>');
					$('.overlaylink').fadeIn();
					$('.main-advanced').find('input').val('');
					$('.main-input').val('');
					/**url.val(html.short);  
					url.select();
					var copy = new Clipboard('#copyurl');
					$("#submit").hide();
					$("#copyurl").attr("data-clipboard-text", url).show();
					copy.on('success', function(e) {
						Snackbar.show({text: '复制成功'});
						$("#copyurl").hide();
						$("#shortenurl").show();
						$('input.main-input').val('');
					});*/
					var copymodal = new Clipboard('#copyurlmodal');
					copymodal.on('success', function(e) {
						Snackbar.show({text: '复制成功'});
					});
				}

			}
		});
	});
	$("#agree").click(function() {
		var obj = $(this);
		obj.removeClass('btn-default');
		obj.addClass('btn-success');
		$("#isagree").val("1");
		$.cookie('agreerules', '1');
	});

	if($.cookie('agreerules') == '1')$("#agree").click();
});