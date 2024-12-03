function tick() {
	var today,z1,z2,z3,z4,z5,z6,z7,z8,z9,z10,z11,z12,ztx,scolor,tY,tM,tD;
	var sccolor=new Array("red","#00FF00");
	today = new Date()
	tY=today.getFullYear();
	tM=parseInt(today.getMonth())+1;
	tD=today.getDate();
	var hours = today.getHours();
	var minutes = today.getMinutes();
	var seconds = today.getSeconds();
	if(hours<10) hours='0'+hours
	if(minutes<10) minutes='0'+minutes
	if(seconds<10) seconds='0'+seconds
	scolor=sccolor[seconds%2]
	Clock.innerHTML =tY+'年'+tM+'月'+tD+'日&nbsp;'+hours+':'+minutes+':'+seconds;
	if (( hours >= 1 ) && (hours < 3 )){
		z1=scolor;
		ztx="丑";
	} else {
		z1="#c0c0c0";
	}
	if (( hours >= 3 ) && (hours < 5 )) {
		z2=scolor;
		ztx="寅";
	} else {
		z2="#c0c0c0";
	}
	if (( hours >= 5 ) && (hours < 7 )) {
		z3=scolor;
		ztx="卯";
	} else {
		z3="#c0c0c0";
	}
	if (( hours >= 7 ) && (hours < 9 )){
		z4=scolor;
		ztx="辰";
	} else {
		z4="#c0c0c0";
	}
	if (( hours >= 9 ) && (hours < 11)) {
		z5=scolor;
		ztx="巳";
	} else {
		z5="#c0c0c0";
	}
	if (( hours >= 11) && (hours < 13)) {
		z6=scolor;
		ztx="午";
	} else {
		z6="#c0c0c0";
	}
	if (( hours >= 13) && (hours < 15)){
		z7=scolor;
		ztx="未";
	} else {
		z7="#c0c0c0";
	}
	if (( hours >= 15) && (hours < 17)){
		z8=scolor;
		ztx="申";
	} else {
		z8="#c0c0c0";
	}
	if (( hours >= 17) && (hours < 19)){
		z9=scolor;
		ztx="酉";
	} else {
		z9="#c0c0c0";
	}
	if (( hours >= 19) && (hours < 21)){
		z10=scolor;
		ztx="戌";
	} else {
		z10="#c0c0c0";
	}
	if (( hours >= 21) && (hours < 23)){
		z11=scolor;
		ztx="亥";
	} else {
		z11="#c0c0c0";
	}
	if (((hours >= 23) || (hours < 1))) {
		z12=scolor;
		ztx="子";
	} else {
		z12="#c0c0c0";
	}
	tim.innerHTML='<table border="0" cellpadding="0" cellspacing="0" width="304"><tr><td width="28"></td><td height=2 width="23" bgcolor='+z12+'></td>'+'<td width="23" bgcolor='+z1+'></td><td width="23" bgcolor='+z2+'></td><td width="23" bgcolor='+z3+'></td>'+'<td width="23" bgcolor='+z4+'></td><td width="23" bgcolor='+z5+'></td>'+'<td width="23" bgcolor='+z6+'></td><td width="23" bgcolor='+z7+'></td>'+'<td width="23" bgcolor='+z8+'></td><td width="23" bgcolor='+z9+'></td>'+'<td width="23" bgcolor='+z10+'></td><td width="23" bgcolor='+z11+'></td></tr></table>';
	tim2.innerHTML=ztx;
	window.setTimeout("tick()", 1000);
}
