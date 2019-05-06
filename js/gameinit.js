
function GInit(){
	base(this,LSprite,[]);
	var self=this;
	addChild(self);
	self.draw();
}

GInit.prototype.draw=function(){
	var self=this;
	var bitmap=new LBitmap(new LBitmapData(loadList["snakeBg"]));
	self.addChild(bitmap);
	var startBgUp=new LBitmap(new LBitmapData(loadList["startBg"]));
	var startBgdown=new LBitmap(new LBitmapData(loadList["startBg"]));
	startBgdown.x=2;
	startBgdown.y=2;
	var button=new LButton(startBgUp,startBgdown);
	button.x=(LGlobal.width-button.getWidth())/2;
	button.y=380;
	self.addChild(button);
	var tipText=new LTextField();
	tipText.color="#eee";
	tipText.text="温馨提示：←↑→↓为键盘按键，空格为暂停按键,每十分提升一关";
	tipText.x=(LGlobal.width-tipText.getWidth())/2;
	tipText.y=465;
	tipText.speed=1;
	tipText.wind();
	self.addChild(tipText);
	var timer=new LTimer(2000,1);
	timer.addEventListener(LTimerEvent.TIMER,function(){
		self.draw2();
	});
	timer.start();
}

GInit.prototype.draw2=function(){
	var self=this;
	var tipText2=new LTextField();
	tipText2.color="#eee";
	tipText2.text="键盘123为速度调整\"快中慢\"";
	tipText2.x=(LGlobal.width-tipText2.getWidth())/2;
	tipText2.y=485;
	tipText2.speed=1;
	tipText2.wind();
	self.addChild(tipText2);
}

