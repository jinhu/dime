var current_user;
var jQT;                	
var sbp = [{time: 1270168904, value: 122, severity: 0},{time: 1270255304, value: 123, severity: 0.5},
       	{time: 1270341704, value: 113, severity: 0},{time: 1270428104, value: 128, severity: 0.5},
       	{time: 1270514504, value: 118, severity: 0},{time: 1270600904, value: 124, severity: 0.5},
       	{time: 1270687304, value: 118, severity: 0},{time: 1270773704, value: 112, severity: 0},
       	{time: 1270860104, value: 129, severity: 1},{time: 1270946504, value: 117, severity: 0},
       	{time: 1271032904, value: 119, severity: 0},{time: 1271119304, value: 122, severity: 0},
       	{time: 1271205704, value: 128, severity: 0.5},{time: 1271292104, value: 123, severity: 0.5},
       	{time: 1271378504, value: 121, severity: 0},{time: 1271464904, value: 125, severity: 0.5},
       	{time: 1271551304, value: 122, severity: 0},{time: 1271637704, value: 126, severity: 0.5},
       	{time: 1271724104, value: 125, severity: 0.5},{time: 1271810504, value: 123, severity: 0.5},
       	{time: 1271896904, value: 132, severity: 1},{time: 1271983304, value: 131, severity: 1},
       	{time: 1272069704, value: 127, severity: 0.5},{time: 1272156104, value: 119, severity: 0},
       	{time: 1272242504, value: 120, severity: 0},{time: 1272328904, value: 132, severity: 1},
       	{time: 1272415304, value: 130, severity: 1},{time: 1272501704, value: 124, severity: 0.5},
       	{time: 1272588104, value: 120, severity: 0}];

       	var dbp = [{time: 1270168754, value: 72, severity: 0},{time: 1270255154, value: 73, severity: 0},
       	{time: 1270341554, value: 67, severity: 0},{time: 1270427954, value: 76, severity: 0.5},
       	{time: 1270514354, value: 70, severity: 0},{time: 1270600754, value: 72, severity: 0},
       	{time: 1270687154, value: 78, severity: 0.5},{time: 1270773554, value: 75, severity: 0.5},
       	{time: 1270859954, value: 76, severity: 0.5},{time: 1270946354, value: 74, severity: 0},
       	{time: 1271032754, value: 75, severity: 0.5},{time: 1271119154, value: 73, severity: 0},
       	{time: 1271205554, value: 76, severity: 0.5},{time: 1271291954, value: 74, severity: 0},
       	{time: 1271378354, value: 72, severity: 0},{time: 1271464754, value: 73, severity: 0},
       	{time: 1271551154, value: 72, severity: 0},{time: 1271637554, value: 76, severity: 0.5},
       	{time: 1271723954, value: 78, severity: 0.5},{time: 1271810354, value: 73, severity: 0},
       	{time: 1271896754, value: 75, severity: 0.5},{time: 1271983154, value: 80, severity: 1},
       	{time: 1272069554, value: 75, severity: 0.5},{time: 1272155954, value: 75, severity: 0.5},
       	{time: 1272242354, value: 69, severity: 0},{time: 1272328754, value: 76, severity: 0.5},
       	{time: 1272415154, value: 82, severity: 1},{time: 1272501554, value: 76, severity: 0.5},
       	{time: 1272587954, value: 60, severity: 0.5}];
       	var glucose ={
       			start:1270168904,
       			end:1272588104,
       			points:[{time: 1270168904, value: 122, severity: 0},{time: 1270255304, value: 123, severity: 0.5},
       	       	{time: 1270341704, value: 113, severity: 0},{time: 1270428104, value: 128, severity: 0.5},
       	       	{time: 1270514504, value: 118, severity: 0},{time: 1270600904, value: 124, severity: 0.5},
       	       	{time: 1270687304, value: 118, severity: 0},{time: 1270773704, value: 112, severity: 0},
       	       	{time: 1270860104, value: 129, severity: 1},{time: 1270946504, value: 117, severity: 0},
       	       	{time: 1271032904, value: 119, severity: 0},{time: 1271119304, value: 122, severity: 0},
       	       	{time: 1271205704, value: 128, severity: 0.5},{time: 1271292104, value: 123, severity: 0.5},
       	       	{time: 1271378504, value: 121, severity: 0},{time: 1271464904, value: 125, severity: 0.5},
       	       	{time: 1271551304, value: 122, severity: 0},{time: 1271637704, value: 126, severity: 0.5},
       	       	{time: 1271724104, value: 125, severity: 0.5},{time: 1271810504, value: 123, severity: 0.5},
       	       	{time: 1271896904, value: 132, severity: 1},{time: 1271983304, value: 131, severity: 1},
       	       	{time: 1272069704, value: 127, severity: 0.5},{time: 1272156104, value: 119, severity: 0},
       	       	{time: 1272242504, value: 120, severity: 0},{time: 1272328904, value: 132, severity: 1},
       	       	{time: 1272415304, value: 130, severity: 1},{time: 1272501704, value: 124, severity: 0.5},
       	       	{time: 1272588104, value: 120, severity: 0}]
       	}

       	var jQT = new $.jQTouch({
       		startupScreen: '/images/splash.png',
       		icon: '/favicon.ico',
       		addGlossToIcon: false,
       		statusBar: 'black-translucent',
//       						cacheGetRequests: false,
       		slideSelector: 'body > * > ul li a, .tile a ,a.tab ',
       		preloadImages: [
       		'/images/jqtouch_apple/backButton.png',
       		'/images/jqtouch_apple/blueButton.png',
       		'/images/jqtouch_apple/toolButton.png',
       		'/images/jqtouch_apple/grayButton.png',
       		'/images/jqtouch_apple/whiteButton.png',
       		'/images/jqtouch_apple/loading.gif'
       		]
       		});
   		var patient_id=0;

   		var data = {symbol: "mmHg",
   		symbolXOffset: 20,
   		timespan: 28,
   		minValue: 60,
   		stepSize: 20,
   		maxValue: 130,
   		sbp:sbp,
   		dbp:dbp
   		};
function valid(blob){
	return true;
}
       		
$(function(){  
	$('#user_login').submit(function(){
		$.getJSON($(this).attr('action'),function(blob){
			if(valid(blob))
				current_user = blob;
				jQT.goTo('#badges','slide');
		});
		return false;
	});
	$("a.inline").click( function() {
   		$(this.target).slideUp();
   		$(this.target).html("");
   		$(this.target).load(this.href);
   		$(this.target).slideDown();
   		return false;
   		});
	
	$("#bpGraph").plot_bp(data);
	$("#sugarGraph").plot_glucose(glucose);

	$("#dlGraph").plot_dl(data);
	var med1 = {brandname: "Aprovel", adherence: [[-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1],[1,1,0,0,1,1,1],[-1,-1,-1,-1,-1,-1,-1]]};
	var med2 = {brandname: "Dexamethason", adherence: [[-1,-1,-1,-1,-1,-1,-1],[1,1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1,-1],[1,1,1,1,1,1,1]]};

});
