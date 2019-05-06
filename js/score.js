
function Score(){
	base(this,LSprite,[]);
	var self=this;
	backLayer.addChild(self);
	self.count=0;
	self.num=1;
	self.draw();
}

Score.prototype.draw=function(){
	var self=this;
	self.x=365;
	self.y=80;
	self.graphics.drawRect(2,"#eee",[0,0,125,200],true,"#ddd");
	self.scoreshow=new LTextField();
	self.scoreshow.x=20;
	self.scoreshow.y=50;
	self.scoreshow.color="#2F4F4F";
	self.addChild(self.scoreshow);
	self.checkpoint=new LTextField();
	self.checkpoint.x=20;
	self.checkpoint.y=90;
	self.checkpoint.color="#2F4F4F";
	self.addChild(self.checkpoint);
	self.show();
}

Score.prototype.show=function(){
	var self=this;
	self.scoreshow.text="分数:"+self.count;
	self.checkpoint.text="关卡:"+((self.count%10==0&&self.count!=0)?++self.num:self.num);
}