
function Pause(){
	base(this,LSprite,[]);
	var self=this;
	backLayer.addChild(self);
	self.offOn=false;
	self.draw();
	self.x=450;
	self.y=450;

	self.addEventListener(LMouseEvent.MOUSE_OVER,function(){self.changeBgOver()});
	self.addEventListener(LMouseEvent.MOUSE_OUT,function(){self.changeBgOut()});
	self.addEventListener(LMouseEvent.MOUSE_UP,function(){self.change()});
}

Pause.prototype.draw=function(){
	var self=this;
	self.graphics.clear();
	self.graphics.drawArc(2,"#999",[0,0,20,0,2*Math.PI]);
	self.puaseState();
}
Pause.prototype.puaseState=function(){
	var self=this;
	if(self.offOn){
		self.graphics.drawVertices(0,"#999",[[-5,-15],[-5,15],[10,0]],true,"#999");
	}else{
		self.graphics.drawVertices(0,"#999",[[-10,-10],[-10,10],[10,10],[10,-10]],true,"#999");
	}
}
Pause.prototype.changeBgOver=function(){
	var self=this;
	self.graphics.clear();
	self.graphics.drawArc(2,"#999",[0,0,20,0,2*Math.PI],true,"rgba(255,105,180,0.2)");
	self.puaseState();
}

Pause.prototype.changeBgOut=function(){
	var self=this;
	self.graphics.clear();
	self.graphics.drawArc(2,"#999",[0,0,20,0,2*Math.PI],true,"rgba(255,105,180,0)");
	self.puaseState();
}

Pause.prototype.change=function(){
	var self=this;
	self.offOn=!self.offOn;
	self.graphics.clear();
	self.graphics.drawArc(2,"#999",[0,0,20,0,2*Math.PI],true,"rgba(255,105,180,0.2)");
	if(self.offOn){
		btnLayer.dir=record;
	}else{
		btnLayer.dir=null;
	}
	self.puaseState();
}