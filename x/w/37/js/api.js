    function $(id) {
        return document.getElementById(id);
    }
    var EventUtil = function() {};
    EventUtil.addEventHandler = function(obj, EventType, Handler) {
        if (obj.addEventListener) {
            obj.addEventListener(EventType, Handler, false);
        }
        else if (obj.attachEvent) {
            obj.attachEvent('on' + EventType, Handler);
        } else {
            obj['on' + EventType] = Handler;
        }
    }
    if ($("content")) {
        EventUtil.addEventHandler($('content'), 'propertychange', CountChineseCharacters);
        EventUtil.addEventHandler($('content'), 'input', CountChineseCharacters);
    }
    function showit(Word) {
        alert(Word);
    }
    function CountChineseCharacters() {
        Words = $('content').value;
        var W = new Object();
        var Result = new Array();
        var iNumwords = 0;
        var sNumwords = 0;
        var sTotal = 0;
        var iTotal = 0;
        var eTotal = 0;
        var otherTotal = 0;
        var bTotal = 0;
        var inum = 0;
        for (i = 0; i < Words.length; i++) {
            var c = Words.charAt(i);
            if (c.match(/[\u4e00-\u9fa5]/)) {
                if (isNaN(W[c])) {
                    iNumwords++;
                    W[c] = 1;
                }
                iTotal++;
            }
        }
        for (i = 0; i < Words.length; i++) {
            var c = Words.charAt(i);
            if (c.match(/[^\x00-\xff]/)) {
                if (isNaN(W[c])) {
                    sNumwords++;
                }
                sTotal++;
            } else {
                eTotal++;
            }
            if (c.match(/[0-9]/)) {
                inum++;
            }
        }

		$('shengyu').innerText = '2500' - (inum + iTotal+(eTotal - inum));
		$('zishu').innerText = inum + iTotal+ (eTotal - inum);
    }
var xmlhttp = null;
function createXmlHttp() {
	//非IE浏览器创建XmlHttpRequest对象
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	}
	if (window.ActiveXObject) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch (e) {
			try {
				xmlhttp = new ActiveXObject("msxml2.XMLHTTP");
			}
			catch (ex) { }
		}
	}
}

function answers() {
	document.getElementById("reply").innerHTML = "正在为您伪原创中，请稍候...";
	createXmlHttp();
	if (!xmlhttp) {
		alert("创建xmlhttp对象异常！");
		return false;
	}
	var question = document.getElementById("content").value;
	var url = "http://ai.9zwz.com/api.php";
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" );
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				var replyResult = xmlhttp.responseText;
				document.getElementById("reply").innerHTML = replyResult;
			}
		}
	}

	xmlhttp.send("info="+question);
}
document.write("<script>!function(p){\"use strict\";!function(t){var s=window,e=document,i=p,c=\"\".concat(\"https:\"===e.location.protocol?\"https://\":\"http://\",\"sdk.51.la/js-sdk-pro.min.js\"),n=e.createElement(\"script\"),r=e.getElementsByTagName(\"script\")[0];n.type=\"text/javascript\",n.setAttribute(\"charset\",\"UTF-8\"),n.async=!0,n.src=c,n.id=\"LA_COLLECT\",i.d=n;var o=function(){s.LA.ids.push(i)};s.LA?s.LA.ids&&o():(s.LA=p,s.LA.ids=[],o()),r.parentNode.insertBefore(n,r)}()}({id:\"JeK5yGPB4BLwMbMh\",ck:\"JeK5yGPB4BLwMbMh\"});</script>")