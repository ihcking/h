var zbpConfig = {
    bloghost: "https://www.wuyouweb.com/",
    blogversion: "173290",
    ajaxurl: "https://www.wuyouweb.com/zb_system/cmd.php?act=ajax&src=",
    cookiepath: "/",
    lang: {
        error: {
            72: "名称不能为空或格式不正确",
            29: "邮箱格式不正确，可能过长或为空",
            46: "评论内容不能为空或过长"
        }
    },
    comment: {
        useDefaultEvents: true,
        inputs: {
            action: {
                getter: function () {
                    return $("#inpId").parent("form").attr("action");
                }
            },
            name: {
                selector: '#inpName',
                saveLocally: true,
                required: true,
                validateRule: /^[^\s　]+$/ig,
                validateFailedErrorCode: 72,
            },
            email: {
                selector: '#inpEmail',
                saveLocally: true,
                validateRule: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/ig,
                validateFailedErrorCode: 29,
            },
            homepage: {
                selector: '#inpHomePage',
                getter: function () {
                    var t = $('#inpHomePage').val();
                    return (!/^(.+)\:\/\//.test(t) && t !== "") ? 'http://' + t : t; 
                },
                saveLocally: true
            },
            postid: {
                selector: '#inpId',
                required: true
            },
            verify: {
                selector: '#inpVerify'
            },
            content: {
                selector: '#txaArticle',
                required: true,
                validateRule: /./ig,
                validateFailedErrorCode: 46,
            },
            replyid: {
                selector: '#inpRevID'
            },
            format: {
                getter: function () {return 'json';}
            }
        }
    }
};
var zbp = new ZBP(zbpConfig);

var bloghost = zbp.options.bloghost;
var cookiespath = zbp.options.cookiepath;
var ajaxurl = zbp.options.ajaxurl;
var lang_comment_name_error = zbp.options.lang.error[72];
var lang_comment_email_error = zbp.options.lang.error[29];
var lang_comment_content_error = zbp.options.lang.error[46];

$(function () {

    zbp.cookie.set("timezone", (new Date().getTimezoneOffset()/60)*(-1));
    var $cpLogin = $(".cp-login").find("a");
    var $cpVrs = $(".cp-vrs").find("a");
    var $addinfo = zbp.cookie.get("addinfo");
    if (!$addinfo){
        return ;
    }
    $addinfo = JSON.parse($addinfo);

    if ($addinfo.chkadmin){
        $(".cp-hello").html("欢迎 " + $addinfo.useralias + " (" + $addinfo.levelname  + ")");
        $cpLogin.html("后台管理");
    }

    if($addinfo.chkarticle){
        $cpVrs.html("新建文章");
        $cpVrs.attr("href", zbp.options.bloghost + "zb_system/cmd.php?act=ArticleEdt");
    }
});
$(function(){
  let inpNameVal = $(zbpConfig.comment.inputs.name.selector).val();
  if (typeof inpNameVal === "undefined") {
    return;
  }
  if (inpNameVal.trim() === "" || inpNameVal === "访客"){
    zbp.userinfo.output();
  }
});
var logostyle='';
    $(function() {
        function ly_dplayer_whs(VideoID){
            let w= 1920;
            let h= 1080;
            let r = 0;
            let ww = $('#' + VideoID).width();
            if(w>ww){
                r = ww/w;
                w = w*r;
                h = h*r;
            }
            $('#' + VideoID).css({'height':h + 'px','width':w + 'px'});
        }
        function ly_dplayer_wh(VideoID){
            let w = $('#' + VideoID).width();
            let h = w*1.79;
            let r = 0;
            let hs = ly_dplayer_h();
            if(h>hs){
                r = hs/h;
                w = w*r;
                h = h*r;
            }
            $('#' + VideoID).css({'max-height':h + 'px','max-width':w + 'px'});
        }
        function ly_dplayer_h(){var t=0;if(document.body.clientHeight&&document.documentElement.clientHeight)t=document.body.clientHeight<document.documentElement.clientHeight?document.body.clientHeight:document.documentElement.clientHeight;else t=document.body.clientHeight>document.documentElement.clientHeight?document.body.clientHeight:document.documentElement.clientHeight;return t}
        if ($('video').length > 0) {
            var Videostyle = '';
            var autoplay = 0;
            $('video').each(function () {
                var _this = $(this);
                var VideoID = 'video' + new Date().getTime();
                var VideoSrc = _this.attr('src');
                if(!VideoSrc){
                    VideoSrc = _this.find('source').attr('src');
                }
                if(VideoSrc){
                    $('head').append('<script src="https://www.wuyouweb.com/zb_users/plugin/ly_dplayer/DPlayer.min.js?20230107"></script>');
                    $(function () {
                        var poster = _this.attr('poster');
                        _this.after('<div id="'+VideoID+'" style="margin:10px auto;text-align:center;width:100%;height:auto;"></div>');
                        _this.remove();
                        ly_dplayer_whs(VideoID);
                        const dp = new DPlayer({
                            container: document.getElementById(VideoID),
                            autoplay: autoplay,
                            theme: '#ffffff',
                            loop: 0,
                            lang: 'zh-cn',
                            hotkey: true,
                            preload: 'auto',
                            logo: '',
                            volume: 0.7,
                            mutex: true,
                            video: {
                                url: decodeURIComponent(VideoSrc),
                                pic: poster?poster:'https://www.wuyouweb.com/zb_users/theme/umTg/style/images/fengmian.jpg',
                                type: 'auto',
                            },
                            contextmenu: [{
                                    text: '抖省APP官网-网购用抖省-不花冤枉钱！',
                                    link: 'https://www.wuyouweb.com/',
                                }
                            ],
                        });
                        $('head').append('<style>#'+VideoID+',#'+VideoID+' .dplayer-video-wrap .dplayer-video{margin:auto;object-fit:contain;}</style>');
                        if(logostyle){
                            $('head').append('<style>.dplayer-logo{'+logostyle+'}</style>');
                            logostyle = '';
                        }
                        $('#'+VideoID+' .dplayer-menu-item:gt(1)').remove();
                        if(autoplay){
                            autoplay = 0;
                        }
                    });
                }
            });
        }
    });
    
document.writeln("<script src='https://www.wuyouweb.com/zb_users/plugin/UEditor/third-party/prism/prism.js' type='text/javascript'><\/script><link rel='stylesheet' type='text/css' href='https://www.wuyouweb.com/zb_users/plugin/UEditor/third-party/prism/prism.css'/>");$(function(){var compatibility={as3:"actionscript","c#":"csharp",delphi:"pascal",html:"markup",xml:"markup",vb:"basic",js:"javascript",plain:"markdown",pl:"perl",ps:"powershell"};var runFunction=function(doms,callback){doms.each(function(index,unwrappedDom){var dom=$(unwrappedDom);var codeDom=$("<code>");if(callback)callback(dom);var languageClass="prism-language-"+function(classObject){if(classObject===null)return"markdown";var className=classObject[1];return compatibility[className]?compatibility[className]:className}(dom.attr("class").match(/prism-language-([0-9a-zA-Z]+)/));codeDom.html(dom.html()).addClass("prism-line-numbers").addClass(languageClass);dom.html("").addClass(languageClass).append(codeDom)})};runFunction($("pre.prism-highlight"));runFunction($('pre[class*="brush:"]'),function(preDom){var original;if((original=preDom.attr("class").match(/brush:([a-zA-Z0-9\#]+);/))!==null){preDom.get(0).className="prism-highlight prism-language-"+original[1]}});Prism.highlightAll()});
