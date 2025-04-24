window.onload=function () {
	var Obtn=document.getElementById('btn');
	var timer=null;
	var isTop=true;
	var clientHeight=document.documentElement.clientHeight;

	window.onscroll=function(){
		var osTop=document.documentElement.scrollTop||document.body.scrollTop;
		if (osTop>=clientHeight) {
            Obtn.style.display="block";
		}
		else{
			Obtn.style.display="none";
		}
		if (!isTop) {
			clearInterval(timer);
		}
		isTop=false;
	}
	Obtn.onclick=function(){
		timer=setInterval(function () {
			var osTop=document.documentElement.scrollTop||document.body.scrollTop;
			var ispeed=Math.floor(-osTop / 3);
			document.documentElement.scrollTop=document.body.scrollTop = osTop+ispeed;

			isTop=true;
			if (osTop==0) {
				clearInterval(timer);
			}
		},30);
	}
}