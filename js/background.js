
function Background(){
	var self=this;
	base(self,LSprite,[]);
	addChild(self);
	self.drawBg();
	self.setView();
}

Background.prototype.drawBg=function(){
	var self=this;
	self.graphics.drawRect(2,"#F4A460",[0,0,LGlobal.width,LGlobal.height],true,"#FFDAB9")
}

Background.prototype.setView=function(){
	var self=this;
	var i,j,bitmap;
	for(i=0;i<18;i++){
		for(j=0;j<18;j++){
			bitmap=new LBitmap(new LBitmapData(loadList["block"],0,0,18,18));
			bitmap.x=j*18+27;
			bitmap.y=i*18+27;
			self.addChild(bitmap);
		}
	}
}