
function Snake(){
	base(this,LSprite,[]);
	var self=this;
	backLayer.addChild(self);
	self.posArr=[{x:9,y:9},{x:10,y:9}];
	self.setView();
}

Snake.prototype.setView=function(){
	var self=this;
	var i,bitmap;
	for(i=0;i<self.posArr.length;i++){
		bitmap=new LBitmap(new LBitmapData(loadList["block"],36,0,18,18));
		bitmap.x=(self.posArr[i].x-1)*18+27;
		bitmap.y=(self.posArr[i].y-1)*18+27;
		bitmap.alpha=(i==self.posArr.length-1)?1:0.5;
		self.addChild(bitmap);
	}
}

Snake.prototype.run=function(){
	if(btnLayer.dir){
		btnLayer.offOn=true;
		var self=this;
		if(btnLayer.dir=="left"&&self.posArr[self.posArr.length-1].x-1==foodLayer.posx&&self.posArr[self.posArr.length-1].y==foodLayer.posy||
			btnLayer.dir=="right"&&self.posArr[self.posArr.length-1].x+1==foodLayer.posx&&self.posArr[self.posArr.length-1].y==foodLayer.posy||
			btnLayer.dir=="up"&&self.posArr[self.posArr.length-1].x==foodLayer.posx&&self.posArr[self.posArr.length-1].y-1==foodLayer.posy||
			btnLayer.dir=="down"&&self.posArr[self.posArr.length-1].x==foodLayer.posx&&self.posArr[self.posArr.length-1].y+1==foodLayer.posy){
			self.posArr.push(foodLayer.pos);
			foodLayer.removeAllChild();
			foodLayer.product();
			scoreLayer.count++;
			scoreLayer.show();
	}else{
		self.posArr.push(self.posArr.shift());	
	}
		
		if(btnLayer.dir=="left"||btnLayer.dir=="right"){
			if(btnLayer.dir=="right"){
				self.posArr[self.posArr.length-1].x=self.posArr[self.posArr.length-2].x+1;	
			}else{
				self.posArr[self.posArr.length-1].x=self.posArr[self.posArr.length-2].x-1;	
			}
				self.posArr[self.posArr.length-1].y=self.posArr[self.posArr.length-2].y;	
		}else if(btnLayer.dir=="up"||btnLayer.dir=="down"){
			if(btnLayer.dir=="down"){
				self.posArr[self.posArr.length-1].y=self.posArr[self.posArr.length-2].y+1;
			}else{
				self.posArr[self.posArr.length-1].y=self.posArr[self.posArr.length-2].y-1;
			}
			self.posArr[self.posArr.length-1].x=self.posArr[self.posArr.length-2].x;
		}
	}
}


