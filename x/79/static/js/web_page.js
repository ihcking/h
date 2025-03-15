/**
 * 万辰系统：上海达辰计算机系统有限公司 https://www.wc-os.com/ on 2019/9/19.
 */
layui.use(['form','layer', 'jquery','laytpl'], function() {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.jquery,
        laytpl = layui.laytpl;

    $(pageSel).addClass("hover");

    form.on('submit(forum_add)', function (data) {
        var param = data.field;
        //site add url
        var upUrl = config.api.site_add_url;
        //url,param,flag,endurl,lodingType
        AjaxHttp(upUrl,param,false,"",1);
    });

    form.render();

});