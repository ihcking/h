        var ua = navigator.userAgent.toLowerCase();
        var Sys = {};
        var s;
        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

        //判断设备是否为iPhone，改成你的苹果下载链接
        if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {  
            
            $(".shuoming").html('适用于苹果手机');
            if (Sys.safari) {
                $(".down_load").attr("href",'https://www.baidu.com/');
                $(".down_load").click(function(event) {
                    setTimeout(function(){
                        if( confirm){
                            location.href = "https://www.baidu.com/";
                        }
                    },4000)
                });
            }else{
                $("#weixin_ios").show();
            }
        }else{
            $(".shuoming").html('适用于安卓手机');
            //判断是否QQ内置浏览器
            if(ua.indexOf(' qq')>-1 && ua.indexOf('mqqbrowser') <0){
                $(".down_load").attr("href",'###');
                $("#weixin_android").show();
            }
            //在微信中打开
            else if (ua.match(/MicroMessenger/i) == "micromessenger") {
                $(".down_load").attr("href",'###');
                $("#weixin_android").show();
            }
            //判断Android，改成你的安卓下载链接
            else{   
                $(".down_load").attr("href",'https://www.sogou.com/');
            }
        }

let httpurl = window.location.href;
// qrcode($('.qcode'),300,'');
qrcode($('.qcode'),300,httpurl);
/**
 * @param  {[type]} qrCodeDiv   [description]
 * @param  {[type]} size        [description]
 * @param  {[type]} text        [description]
 * @return {[type]}             [description]
 */
function qrcode(qrCodeDiv,size,text)
{
    var option = {
          render:'image',
          minVersion:1,
          maxVersion:40,
          ecLevel: 'L',
          minVersion:5,
          left:0,
          top:0,
          size:size,
          fill:'#000',
          background:'#fff',
          text: text,
          radius:0,
          quiet:0,
          mode:4,
          mSize:0.15,
          mPosX:0.5,
          mPosY:0.5,
          image:null
        }

    $(qrCodeDiv).qrcode(option);
}

function click() {
    if (event.button==2) {
    alert('禁止鼠标右键')
    }
}

document.onmousedown = click

document.onkeydown = function(){
    if(window.event && window.event.keyCode == 123) {
        alert("禁止F12");
        event.keyCode=0;
        event.returnValue=false;
    }
    if(window.event && window.event.keyCode == 13) {
        window.event.keyCode = 505;
    }
    if(window.event && window.event.keyCode == 8) {
        alert(str+"\n请使用Del键进行字符的删除操作！");
        window.event.returnValue=false;
    }
}

document.oncontextmenu = function (event){
    if(window.event){
    event = window.event;
    }
    try{
    var the = event.srcElement;
        if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")){
        return false;
        }
        return true;
    }
    catch (e){
        return false;
    }
}