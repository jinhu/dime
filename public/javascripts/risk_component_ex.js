/**
 * @author Bastiaan Linders
 */

const PERSPECTIVE = 50;
const LAYERDELTA = 350;					// the amount of pixels children of an element will pop forward
const SIBLINGSPACING = 120;				// the radius of the circle of siblings
const RISKCOMPONENTCLASS = "circle";	// class used for risk elements
const ROOTELEMENT = "environment";		// root element does not use parent.element
const TEXTBOXELEMENT = "infobox";		// text box which can contain information and closes on click

var risks = {};							// needed for workaround to bind events
var topOpenenedComponent = null;		// needed for additional close button and to prevent clutter
	
function Position(X, Y, Z){
	this.X = X;	this.Y = Y; this.Z = Z;
}

//Class RiskComponent
	function RiskComponent(id, caption, isRoot){
		this.id = id;
		this.caption = caption;
		this.text = "get the description from the server.";
		this.severity = "0";
		this.element = null;
		this.opened = false;
		this.position = new Position(0, 0, 0);
		this.parent = null; // null is treated as an Object for some reason
		this.children = [];
		/* add component to page */
		if (isRoot) {
			this.id = "riskRoot";
			this.position.X = 100;
			this.position.Y = 175;
			this.position.Z = PERSPECTIVE;
			this.CreateElement(document.getElementById(ROOTELEMENT));
			this.element.style.display = "block";
			this.ShowChildren(true);
			topOpenenedComponent = this;
		}
		
		// needed for workaround to bind events
		risks[id] = this;
	}
	
	RiskComponent.prototype.CreateElement = function(baseElement){
		if (this.element == null) {
			this.element = document.createElement("div");
			this.element.innerHTML = this.caption;
			baseElement.appendChild(this.element);
			this.element.id = this.id;
			this.element.className = RISKCOMPONENTCLASS;
			$(this.element).css("display", "none");
			$(this.element).bind("touchstart",this.OnTouchStart);
			$(this.element).bind("mousedown",this.OnTouchStart);
		}
		this.RePosition();
	}
	
	RiskComponent.prototype.HasOpenedChild = function() {
		var nrOfChildren = this.children.length;
		for (var i = 0; i < nrOfChildren; i++) {
			if (this.children[i].opened) {
				return true;
			}
		}
		return false;
	}

	RiskComponent.prototype.OnTouchStart = function(e){
		e.preventDefault();
		if(this.id == e.target.id){
			if (e.target.id == "riskRoot" || risks[e.target.id].parent.opened) {
				if (!risks[e.target.id].opened) {
					risks[e.target.id].Open();
				}
				else {
					if(!risks[e.target.id].HasOpenedChild()){
						risks[e.target.id].Close();
					}
				}
			}
			else {
				risks[e.target.id].parent.Open();
			}
		}
	}
	
	RiskComponent.prototype.RePosition = function(){
		//console.log(this.id + " : (" + this.position.X + ", " + this.position.Y + ", " + this.position.Z + ")");
		this.element.style.webkitTransform = "translateX(" + this.position.X + "px) " + 
		                                     "translateY(" + this.position.Y + "px) " +
 		                                     "translateZ(" + this.position.Z + "px) ";
	}
	
	RiskComponent.prototype.Open = function(){
		if (!this.opened && this.children.length > 0) {
			var len = this.children.length;
			var angle = (2 * Math.PI) / len;
			
			for (var i = 0; i < len; i++) {
				this.children[i].element.style.display = "block";
				this.children[i].position.X = Math.round(SIBLINGSPACING * Math.sin(angle * i));
				this.children[i].position.Y = Math.round(SIBLINGSPACING * Math.cos(angle * i));
				this.children[i].position.Z = LAYERDELTA;
				this.children[i].RePosition();
				this.children[i].ShowChildren(true);
			}
			
			if(this.id != "riskRoot"){
				risks["riskRoot"].position.X -= this.position.X;
				risks["riskRoot"].position.Y -= this.position.Y;
			}
			
			risks["riskRoot"].position.Z = risks["riskRoot"].position.Z - LAYERDELTA;
			
			risks["riskRoot"].RePosition();
				
			this.opened = true;
			topOpenenedComponent = this;
		}else{
			this.ShowInfo();
		}
	}
	
	RiskComponent.prototype.ShowInfo = function() {
		var boxelement = document.getElementById(TEXTBOXELEMENT);
		var boxlayer = document.getElementById(TEXTBOXELEMENT + "layer");
		boxelement.innerHTML = this.caption + "<br /><br />" + this.text;
				
		boxelement.style.display = "block";
		boxlayer.style.display = "block";
		
		boxelement.style.opacity = "1.0";
		boxlayer.style.opacity = "0.5";
	}

	
	RiskComponent.prototype.ShowChildren = function(show) {
		if (this.children != ""){
			var nrOfChildren = this.children.length;
			for (var i = 0; i < nrOfChildren; i++) {
				if (show) 
					this.children[i].element.style.display = "block";
				else 
					this.children[i].element.style.display = "none";
			}
		}
	}
	
	RiskComponent.prototype.Close = function(){
		if(this.opened) {
			var len = this.children.length;
			for (var i = 0; i < len; i++) {
				this.children[i].position.X = 0;
				this.children[i].position.Y = 0;
				this.children[i].position.Z = -1;
				this.children[i].RePosition();
				this.children[i].ShowChildren(false);
			}
			
			if(this.id != "riskRoot"){
				risks["riskRoot"].position.X += this.position.X;
				risks["riskRoot"].position.Y += this.position.Y;
			}
			
			risks["riskRoot"].position.Z = risks["riskRoot"].position.Z + LAYERDELTA;
			risks["riskRoot"].RePosition();
			
			this.opened = false;
			topOpenenedComponent = this.parent;
		}
	}
	
	RiskComponent.prototype.AddChild = function(id, caption){
		var index = this.children.length;
		this.children[index] = new RiskComponent(id, caption);
		this.children[index].parent = this;
		this.children[index].position.Z = -1;
		
		this.children[index].CreateElement(this.element);
	}
// Class RiskComponent end