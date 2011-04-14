jQuery.fn.plot_bp = function(data, config){
	if (!this[0].getContext){  
		console.log("The supplied HTML element does not appear to be a canvas");
		return;
	}
	var context = this[0].getContext("2d");
	var step=10;
	var offset=0;
	var scale=1;
	fillRoundedRect(context,0,0,300,300,30);
	drawAxes();
	drawLables();
	drawData(data.sbp);
	drawData(data.dbp);
	
	function drawData(data){
		context.strokeStyle='#ddf';
		context.lineWidth=2;
		context.beginPath();

		context.moveTo(20, (data[0].value*scale)+offset);
		for(var i in data){
			context.lineTo( i*step+20, (data[i].value*scale)+offset);
		}
		context.stroke();
		context.fillStyle='#F00';
		for(var i in data){
			context.beginPath();
			context.arc( i*step+20, (data[i].value*scale)+offset,3, 0, Math.PI*2, true);
			context.fill();
			context.stroke();
			
		}
	}
	function fillRoundedRect(context, x,y,w,h,r){
		var backgroundGradient = context.createLinearGradient(0, 0, 0, 300);
		backgroundGradient.addColorStop(0,   "hsl(222, 35%, 33%)");
		backgroundGradient.addColorStop(0.5, "hsl(222, 59%, 23%)");
		backgroundGradient.addColorStop(0.5, "hsl(224, 70%, 20%)");
		backgroundGradient.addColorStop(1,   "hsl(224, 70%, 20%)");
		context.fillStyle = backgroundGradient;

		context.beginPath();
		context.moveTo(x+r, y);
		context.lineTo(x+w-r, y);
		context.quadraticCurveTo(x+w, y, x+w, y+r);
		context.lineTo(x+w, y+h-r);
		context.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
		context.lineTo(x+r, y+h);
		context.quadraticCurveTo(x,y+h, x, y+h-r);
		context.lineTo(x, y+r);
		context.quadraticCurveTo(x, y, x+r, y);
		context.fill();
		context.stroke();
	}
	
	function drawLables(){
		context.font="12pt Arial";
		context.strokeStyle="hsl(222, 50%, 76%)";
		context.strokeText("mmHg", 250,30);
		var step=45;

		for( i=1;i<6;i++){
			context.strokeText(""+(240-(i*step)), 250, 22+(i*step));
		}

		context.font="9pt Arial";
		for( i=0;i<6;i++){
			context.strokeText("mm/dd", 13+(i*step),295);
		}
	}
	function drawAxes(){
		context.strokeStyle="hsl(222, 20%, 46%)";
		context.beginPath();

		// baseline
		context.moveTo(0, 280);
		context.lineTo(300, 280);
		
		context.moveTo(20,0);
		context.lineTo(20,280);
		var step=45;
		for( i=0;i<6;i++){
			context.moveTo(20+(i*step),0);
			context.lineTo(20+(i*step),280);

		}
		for( i=0;i<6;i++){
			context.moveTo(245,20+(i*step));
			context.lineTo(255,20+(i*step));

		}
		context.stroke();
	}

}

