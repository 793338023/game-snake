/**
 * 贪吃蛇
 */
function Snake(){
	base(this,LSprite,[]);
	var self=this;
	backLayer.addChild(self);
	// 贪吃蛇的所占位置数组
	self.posArr=[{x:9,y:9},{x:10,y:9}];
	self.setView();
}

Snake.prototype.setView=function(){
	var self=this;
	var i,bitmap;
	// 贪吃蛇每一块的位置
	for(i=0;i<self.posArr.length;i++){
		bitmap=new LBitmap(new LBitmapData(loadList["block"],36,0,18,18));
		// 边界27px,每一块18px*18px
		bitmap.x=(self.posArr[i].x-1)*18+27;
		bitmap.y=(self.posArr[i].y-1)*18+27;
		// 透明度
		bitmap.alpha=(i==self.posArr.length-1)?1:0.5;
		// 添加块到图层
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
			// 添加食物食物位置到贪吃蛇数组里
			self.posArr.push(foodLayer.pos);
			// 去除食物
			foodLayer.removeAllChild();
			// 生成食物
			foodLayer.product();
			// 分数加一
			scoreLayer.count++;
			// 刷新分数
			scoreLayer.show();
	}else{
		// 没有食物，移动数组的首位到尾部
		self.posArr.push(self.posArr.shift());	
	}
		// 根据方向修改数组尾部的位置为正确位置
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


