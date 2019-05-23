/**
 * 调速界面编写
 */
function Speed(){
	base(this,LSprite,[]);
	var self=this;
	backLayer.addChild(self);
	self.show();
	self.x=27;
	self.y=450;
}

Speed.prototype.show=function(){
	var self=this;
	self.fast=new LSprite();
	self.addChild(self.fast);
	self.fast.graphics.drawArc(2,"#999",[0,0,20,0,2*Math.PI]);
	var fText=new LTextField();
	self.fast.addChild(fText);
	self.fast.sIndex=0;
	fText.text="快";
	fText.color="#ff7600";
	fText.size=20;
	fText.textAlign="center";
	fText.textBaseline="middle";
	self.middle=new LSprite();
	self.middle.x=50;
	self.addChild(self.middle);
	self.middle.graphics.drawArc(2,"#999",[0,0,20,0,2*Math.PI]);
	var mText=new LTextField();
	self.middle.addChild(mText);
	self.middle.sIndex=3;
	mText.text="中";
	mText.color="#ff7600";
	mText.size=20;
	mText.textAlign="center";
	mText.textBaseline="middle";
	self.slow=new LSprite();
	self.slow.x=100;
	self.addChild(self.slow);
	self.slow.graphics.drawArc(2,"#999",[0,0,20,0,2*Math.PI]);
	var sText=new LTextField();
	self.slow.addChild(sText);
	self.slow.sIndex=5;
	sText.text="慢";
	sText.color="#ff7600";
	sText.size=20;
	sText.textAlign="center";
	sText.textBaseline="middle";
	self.slow.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		self.sAdjust(e);
	})
	self.middle.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		self.sAdjust(e);
	})
	self.fast.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		self.sAdjust(e);
	});
}

Speed.prototype.sAdjust=function(e){
	if(e.target.sIndex!=undefined){
		speedCount=e.target.sIndex;
	}
}