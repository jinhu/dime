/**
 * @author jin
 */
Raphael.fn.mpr=function(y,img,dispences ){
    presc= this.image(img, 10, y-40, 50, 50);
	this.path("m80 "+(y-10)+"L830 "+(y-10));
	for (var i=0;i<dispences.length;i++ ){
		this.rect(dispences[i].start,y-20,dispences[i].duration,20,0);	
	}
};

Raphael.fn.box_tray = function(x, y){
var w=90;
var h=60;
var img = "/images/prescription.png";
tray=[];
tray['image'] =this.image(img,x,y,w,h); 
tray['rect']  =this.rect(x,y,w,h,0);
tray['rect'].attr({fill: "#fdd", stroke: "#000", "fill-opacity": 0.5, "stroke-width": 2});
tray['image'].node.style.cursor = "pointer";
tray['rect'].node.style.cursor = "pointer";
tray['rect'].mousedown(  function (e) {
        this.dx = e.clientX;
        this.dy = e.clientY;
        this.animate({"fill-opacity": 1,fill:"#dfd"}, 500);
        e.preventDefault && e.preventDefault();
    });


};
