/*
	食物层
*/

function Food(){
	base(this,LSprite,[]);
	var self=this;
	backLayer.addChild(self);
}

Food.prototype.product=function(){
	var self=this;
	self.bitmap=new LBitmap(new LBitmapData(loadList["block"],18,0,18,18));
	self.posx=Math.floor(Math.random()*18+1);
	self.posy=Math.floor(Math.random()*18+1);
	/** 
	 * 随机生成食物，但不能在贪吃蛇的位置里
	*/
	while(check(self.posx,self.posy)){
		self.posx=Math.floor(Math.random()*18+1);
		self.posy=Math.floor(Math.random()*18+1);
	}
	self.pos={x:self.posx,y:self.posy};
	self.bitmap.x=(self.posx-1)*18+27;
	self.bitmap.y=(self.posy-1)*18+27;
	self.addChild(self.bitmap);
}

Food.prototype.random=function(){
	var self=this;
	self.removeAllChild();
	self.product();
}

