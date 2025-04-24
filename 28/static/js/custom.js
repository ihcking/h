$(document).ready(function() {
	var s = document.location;
	$(".nav a").each(function() {
		if (this.href == s.toString().split("#")[0]) {
			$(this).addClass("active");
			return false;
		}
	});
});

zbp.plugin.unbind("comment.reply", "system");
zbp.plugin.on("comment.reply", "default", function(id) {
	var i = id;
	$("#inpRevID").val(i);
	var frm = $('#divCommentPost'),
		cancel = $("#cancel-reply");

	frm.before($("<div id='temp-frm' style='display:none'>")).addClass("reply-frm");
	$('#AjaxComment' + i).before(frm);

	cancel.show().click(function() {
		var temp = $('#temp-frm');
		$("#inpRevID").val(0);
		if (!temp.length || !frm.length) return;
		temp.before(frm);
		temp.remove();
		$(this).hide();
		frm.removeClass("reply-frm");
		return false;
	});
	try {
		$('#txaArticle').focus();
	} catch (e) {}
	return false;
});

zbp.plugin.on("comment.get", "default", function (logid, page) {
	$('span.commentspage').html("Waiting...");
	$.get(bloghost + "zb_system/cmd.php?act=getcmt&postid=" + logid + "&page=" + page, function(data) {
		$('#AjaxCommentBegin').nextUntil('#AjaxCommentEnd').remove();
		$('#AjaxCommentEnd').before(data);
		$("#cancel-reply").click();
	});
})

zbp.plugin.on("comment.postsuccess", "default", function () {
	$("#cancel-reply").click();
});

$(function(){
$('.logo').after('<i class="fa nav-btn ti-menu"></i><nav id="mnav" class="inner"></nav>');
	$('.header .nav').clone(false).appendTo('#mnav');
	$('.nav-btn').click(function(){
		$('#mnav').slideToggle('500');
    });
    
    $('.inner a').click(function(){
		$('#mnav').hide();
    });
    
	
	$('.zoom').magnificPopup({
		disableOn: 200,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});
	
	$(".tabTitle li:first-child").addClass("active");
	$(".tabConBox .tabCon:first-child").show();
	function tabs(tabTit,on,tabCon){
        $(tabTit).children().click(function(){
            $(this).addClass(on).siblings().removeClass(on);
            var index = $(tabTit).children().index(this);
           	$(tabCon).children().eq(index).fadeIn(200).siblings().fadeOut(0);
    	});
	};
    tabs(".tabTitle","active",".tabConBox");
	
	jQuery(window).on('scroll', function() {
		if (jQuery(window).scrollTop() > 68) {
			jQuery('.header').addClass('fixed')
		} else {
			jQuery('.header').removeClass('fixed')
		}
	})
	$('.owl1').owlCarousel({
		margin:15,
		responsiveClass:true,
		pagination: true,
		nav: true,
		navText: [ '<span class="ti-angle-left"></span>' ,
		'<span class="ti-angle-right"></span>'],
		autoplay: false,
		smartSpeed: 600,
		responsive:{
			0:{
				items:1,
				pagination: true,
			},
			400:{
				items:2,
				pagination: true,
			},
			500:{
				items:2,
				pagination: true,
			},
			600:{
				items:2,
				pagination: true,
			},
			700:{
				items:3,
				pagination: true,
			},
			1000:{
				items:4,
				pagination: true,

			}
		},
	})
	
});

$(window).resize(function(){
		var $body = $('body').width();
		if($body > 740){
			$('#mnav').hide();			
		}
	});

jQuery(document).ready(function($) {
  $('.sbarBox').hcSticky({
    stickTo: '.orw',
    innerTop:-56,
    responsive:{919:{disable:true}}
  });
});

$(function() {
$('.nav a').on("click", function(){
	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		if (target.length) {
			$('html, body').animate({
				scrollTop: target.offset().top -20
			}, 1000);
			return false;
		}
	}
});

$(".nav a").on("click", function() {
	$(".nav a").removeClass("active");
	$(this).addClass("active");
} );
});