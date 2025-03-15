/**
 * 万辰系统：上海达辰计算机系统有限公司 https://www.wc-os.com/
 */
var config = {
    api: {
        add_views: '/wanchen/api/addViews',
        update_list: '/wanchen/api/updateList',
        hot_info: '/wanchen/api/hotInfo',
        update_html: '/wanchen/api/update.html',
        site_info_click: '/wanchen/api/siteInfoClick',
        por_shi_main: '/wanchen/api/porShiMain',
        so_com_url: '/wanchen/api/soComUrl',
        site_add_url: '/wanchen/api/siteAddUrl',
        site_nav_list: '/wanchen/api/siteNavList',
        feedback: '/wanchen/api/feedback',
        addLinks: '/wanchen/api/addLinks',
        userLogin_url: '/wanchen/api/userLogin',
        rankTodayList: '/wanchen/api/rankTodayList',
        login_state_api: '/wanchen/api/login_state_api',
        list_page:'/wanchen/api/navs_inc_page'
    }
};

$.init();
/*打开侧边栏*/
if($(".panel").length>0){
	document.querySelector(".panel").addEventListener("open",function(){
		$(".content").css("overflow","hidden").append('<div class="shade"></div>');
	});
	document.querySelector(".panel").addEventListener("close",function(){
		$(".shade").remove();
		$(".content").css("overflow","auto");
	});
	$("body").on("click",".shade",function(){
		$.closePanel();
	});
}

function getDateDiff(dateTimeStamp){
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if(diffValue < 0){return;}
    var monthC =diffValue/month;
    var weekC =diffValue/(7*day);
    var dayC =diffValue/day;
    var hourC =diffValue/hour;
    var minC =diffValue/minute;
    if(monthC>=1){
        result="" + parseInt(monthC) + "月前";
    }
    else if(weekC>=1){
        result="" + parseInt(weekC) + "周前";
    }
    else if(dayC>=1){
        result=""+ parseInt(dayC) +"天前";
    }
    else if(hourC>=1){
        result=""+ parseInt(hourC) +"小时前";
    }
    else if(minC>=1){
        result=""+ parseInt(minC) +"分钟前";
    }else
        result="刚刚";
    return result;
}

function dateFtt(dateTime) { //author: meizz
    var date = new Date(parseInt(dateTime) * 1000);
    var month = date.getMonth()+1;
    var day = date.getDate();
    return month+"月"+day+"日";
}

function isToday(dateTime) {
    var time = new Date(parseInt(dateTime) * 1000);
    var month = time.getMonth()+1;
    var day = time.getDate();
    var date = new Date();
    var tomonth = date.getMonth()+1;
    var today = date.getDate();
    return month === tomonth && day === today;

}


/*Cookie操作*/
function getCookie(name) {
 	var dc = document.cookie;
 	var prefix = name + "=";
 	var begin = dc.indexOf("; " + prefix);
 	if(begin == -1) {
 		begin = dc.indexOf(prefix);
 		if(begin != 0) return null
 	} else {
 		begin += 2
 	}
 	var end = document.cookie.indexOf(";", begin);
 	if(end == -1) {
 		end = dc.length
 	}
 	return unescape(dc.substring(begin + prefix.length, end))
}
function setCookie(name, value, time) {
 	var strsec = getsec(time);
 	var exp = new Date();
 	exp.setTime(exp.getTime() + strsec * 1);
 	document.cookie = name + "=" + escape(value) + "; path=/;expires=" + exp.toGMTString();
}

function getsec(str) {
 	var str1 = str.substring(1, str.length) * 1;
 	var str2 = str.substring(0, 1);
 	if(str2 == "s") {
 		return str1 * 1000;
 	} else if(str2 == "h") {
 		return str1 * 60 * 60 * 1000;
 	} else if(str2 == "d") {
 		return str1 * 24 * 60 * 60 * 1000;
 	}
 }
 Array.prototype.ArrDelVal = function(val) {
 	for(var i = 0; i < this.length; i++) {
 		if(this[i] == val) {
 			this.splice(i, 1);
 			break;
 		}
 	}
}

/*判断当前是否是直接打开网站的*/
if(getCookie("openType")=="detail"){
    $(".indexSet .checkbox").click();
    urlToDetail("detial");
}
$(".indexSet .checkbox").click(function(){
    var that = $(this);
    setTimeout(function(){
        if(that.parent().find("input").is(':checked')){
            $.toast("开启直接进入");
            setCookie("openType","url","d365");
            urlToDetail("url");
        }else{
            $.toast("关闭直接进入");
            setCookie("openType","detail","d365");
            urlToDetail("detial");
        }
    },200)
});

function urlToDetail(type){
    if(type=="url"){
        $("body a[data-detail]").forEach(function(item,index){
            $(item).attr("href",$(item).attr("data-url")).attr("target","_blank");
        });
    }else{
        $("body a[data-detail]").forEach(function(item,index){
            $(item).attr("href",$(item).attr("data-detail")).removeAttr("target");
        });
    }
}
 
/*返回按钮操作*/
$("body").on("click",".backs",function(){
	if(document.referrer.indexOf(location.host)!=-1){
		history.back(-1);
	}else{
		location = "/";
	}
});

/**
 *
 * @param {Object} config
 * @returns {boolean}
 */
$.fn.verify = function (config) {
    var arr_data = $(this).field();
    for (var key in config) {
        var item = $(this).find("[name=" + key + "]");//$("[data-verify=" + key + "]");
        msg = config[key](arr_data[key], item);
        if (typeof(msg) !== 'undefined') {

            item.focus();
            $.toast(msg);
            return false;
        }
    }
    return true;
};


$.fn.field = function () {
    var arr_data = $(this).serializeArray();
    var formData = {};
    if (arr_data.length > 0) {
        arr_data.forEach(function (item) {
            formData[item.name] = item.value;
        });
    }
    return formData;
};


function request(option) {
    if(typeof(option) !== 'object') {
        console.warn("option is not a 'object'");
        return false;
    }
    if(typeof(layer) === 'undefined') {
        layui.use(['layer','jquery'], ajx(true));
    } else {
        ajx();
    }
    if(typeof(option.loading) !== 'boolean') {
        var loading = layer.load(1);
    }

    function ajx(o) {
        if(o) {
            layer = layui.layer;
        }
        layui.jquery.ajax({
            url: option.url || location.pathname,
            data: option.data || null,
            dataType: option.dataType || 'JSON',
            contentType: option.dataType || "application/json;charset=utf-8",
            type: option.type || 'post',
            async: typeof(option.async) === 'boolean' ? option.async : true,
            success: option.success || function(res) {
                if (res.code == 401){
                    parent.location.href = "/user/";
                }
                option.done && option.done(res);
            },
            complete: function() {
                if(typeof(option.loading) !== 'boolean') {
                    layer.close(loading);
                }
                setTimeout(function() {
                    var ret = option.reload || false;
                    if(ret) {
                        ret = (typeof(ret === 'number')) ? ret : 0;
                        setTimeout(function() {
                            location.reload();
                        }, ret * 1000);
                    }
                }, 10);
            },
            error: option.error || function(e) {
                console.log(e);
                layer.closeAll();
                layer.msg('请求失败:' + e.statusText || e.statusMessage);
            }
        });
    }
}
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}



$("a.href").on('click', function () {
    var link = $(this).attr('href');
    var name = $(this).attr('name');
    var url = config.api.add_views;
    if (link.indexOf("http") !== -1) {
        if (name.indexOf("data-id:")!==-1){
            var id = name.substring(8,name.length);
            $.getJSON(url, {id: id}, function (res) {
                console.log(id + "," + res);
            });
        }
    }
});


$(".add_r").on('click',function (){
    var id = $(this).attr('data-id')
    request({
        loading:false,
        type:'get',
        url: '/wanchen/api/update_view',
        data: {
            id:id
        },
        done: function (res) {

        }
    });
})

/*站外输出网站时加上特殊标识符*/
$("a").each(function(index,item){
	var url = $(item).attr("href");
	if(url){
		if(url.indexOf("http")!=-1 && url.indexOf("wc-os")==-1 && url.slice(url.length-1,url.length) == "/"){
			/*满足条件 有出站http，并且不是本站关键字符串，且最后是斜杠  能够带输出标识符的*/
			$(item).attr("href",url+"#wc-os");
		}
	}
});


/*判断当前是否是直接打开网站的*/
if(getCookie("openType")=="detail"){
    $(".indexSet .checkbox").click();
    urlToDetail("detial");
}

$(".indexSet .checkbox").click(function(){
    var that = $(this);
    setTimeout(function(){
        if(that.parent().find("input").is(':checked')){
            $.toast("开启直接进入");
            setCookie("openType","url","d365");
            urlToDetail("url");
        }else{
            $.toast("关闭直接进入");
            setCookie("openType","detail","d365");
            urlToDetail("detial");
        }
    },200)
});

function urlToDetail(type){
    if(type=="url"){
        $("body a[data-detail]").forEach(function(item,index){
            $(item).attr("href",$(item).attr("data-url")).attr("target","_blank");
        });
    }else{
        $("body a[data-detail]").forEach(function(item,index){
            $(item).attr("href",$(item).attr("data-detail")).removeAttr("target");
        });
    }
}

layui.config({
    version: true,
    base:  '/application/lib/'
}).extend({
    timeago: 'timeago'
}).use(['jquery', 'timeago'], function () {
    var $jq = layui.jquery,
        timeago = layui.timeago;

    $jq($jq('.timeago')).each(function () {
        var name =$jq(this).attr("datetime");
        $jq(this).html(getDateDiff(name * 1000));
    });

});
