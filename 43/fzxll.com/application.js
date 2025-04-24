/**
 *  Premium URL Shortener jQuery Application
 *  Copyright @KBRmedia - All rights Reserved 
 */
$(function() {
  /**
   * Call Neo
   **/
  $("select").chosen({disable_search_threshold: 5});  
  /**
   * Custom Radio Box
   **/
  $(document).on('click','.form_opt li a',function(e) {
    
    var href=$(this).attr('href');
    var name = $(this).parent("li").parent("ul").attr("data-id");
    var to = $(this).attr("data-value");
    var callback=$(this).parent("li").parent("ul").attr("data-callback");
    if(href=="#" || href=="") e.preventDefault();

    $("input#" + name).val(to);
    $(this).parent("li").parent("ul").find("a").removeClass("current");
    $(this).addClass("current");
    if(callback !==undefined){
      window[callback](to);
    }
  });
  /**
   * Back to top
   */
  $(window).scroll(function(){   
    if(window.pageYOffset>300){
      $("#back-to-top").fadeIn('slow');
    }else{
      $("#back-to-top").fadeOut('slow');
    }
  });
  $("a#back-to-top,.scroll").smoothscroll(); 
  //
  $(document).on('click',".clear-search",function(e){
    e.preventDefault();
    $(".return-ajax").slideUp('medium',function(){
      $(this).html('');
      $("#search").find("input[type=text]").val('');
      $(".url-container").slideDown('medium');
    });
  });
  $(window).on("scroll", function() {
    if($(window).scrollTop() > 50) {
        $("header").addClass("activehead");
    } else {
        //remove the background property so it comes transparent again (defined in your css)
       $("header").removeClass("activehead");
    }
	});
}); // End jQuery Ready

	function In_headerFunction() {
    var element = $("header");
    element.toggleClass("activeheadmenu2");
	}
	
	function In_ShowPosInfo() {
	$(".short-adv-sett").fadeIn(100);
	$(".main-index-top #main-form .main-options").slideDown(100);
	}
	
	//Custom Link Modal
	var $modallink = $('.link-shared'),
    $overlaylink = $('.overlaylink'),
    $showModallink = $('.show-modal'),
    $closelink = $('.closelink');
    
	function In_ShowLinkModal(){
	e.preventDefault();
  
	var windowHeight = $(window).height(),
      windowWidth = $(window).width(),
      modalWidth = windowWidth/2; //50% of window
  
	$overlaylink.show();
	$modallink.css({
		'width' : modalWidth,
		'margin-left' : -modalWidth/2
	});
	}

	$closelink.on('click', function(){
		$overlaylink.hide();
	});