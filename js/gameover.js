
function Gover(){
	base(this,LSprite,[]);
	var self=this;
	backLayer.addChild(self);
	self.draw();
}

Gover.prototype.draw=function(){
	var self=this;
	self.x=(LGlobal.width-200)/2;
	self.y=(LGlobal.height-100)/2;
	self.graphics.drawRoundRect(2,"#FFC0CB",[0,0,200,150,10],true,"#FFF0F5");
	var GOtext=new LTextField();
	GOtext.text="Game Over";
	GOtext.size=20;
	GOtext.color="#708090";
	GOtext.x=50;
	GOtext.y=20;
	self.addChild(GOtext);
	var score=new LTextField();
	score.text="分数:"+scoreLayer.count;
	score.size=15;
	score.color="#708090";
	score.textAlign="center";
	score.x=100;
	score.y=50;
	self.addChild(score);
	var checkpoint=new LTextField();
	checkpoint.text="关卡:"+scoreLayer.num;
	checkpoint.size=15;
	checkpoint.color="#708090";
	checkpoint.textAlign="center";
	checkpoint.x=100;
	checkpoint.y=80;
	self.addChild(checkpoint);
	self.btn=new LSprite();
	self.addChild(self.btn);
	self.btnDraw();
}

Gover.prototype.btnDraw=function(){
	var self=this;
	self.btn.y=115;
	self.btn.x=75;
	self.btn.graphics.drawRoundRect(1,"#B0C4DE",[0,0,50,20,5],true,"#E6E6FA");
	var btntext=new LTextField();
	self.btn.addChild(btntext);
	btntext.text="继续";
	btntext.size=12;
	btntext.x=12;
	btntext.y=2;
	btntext.color="#008080";
	self.btn.addEventListener(LMouseEvent.MOUSE_DOWN,restart);
}

function restart(){
	backLayer.removeChild(gameoverLayer);
	backLayer.removeChild(playerLayer);
	playerLayer=new Snake();
	btnLayer.dir=null;
	btnLayer.offOn=true;
	backLayer.addEventListener(LEvent.ENTER_FRAME,doMove);
	scoreLayer.count=0;
	scoreLayer.num=1;
	scoreLayer.show();
	speedCount=5;
	myTimer.start();
}