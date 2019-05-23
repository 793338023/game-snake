/** 
 * 按钮界面编写
*/
function Btn(){
	// 继承基本图层
	base(this,LSprite,[]);
	var self=this;
	backLayer.addChild(self);
	self.dir=null;
	self.offOn=true;
	self.btnGroup();
}



Btn.prototype.btnGroup=function(){
	var self=this;
	self.y=380;
	self.x=(LGlobal.width-44)/2;
		self.buttonup=buttonstate();
		self.buttonup.dir="up";
		
		self.addChild(self.buttonup);
		self.buttonright=buttonstate();
		self.buttonright.x=88;
		self.buttonright.y=44;
		self.buttonright.dir="right";
		self.buttonright.rotate=90;
		self.addChild(self.buttonright);
		self.buttondown=buttonstate();
		self.buttondown.y=88;
		self.buttondown.x=44;
		self.buttondown.rotate=180;
		self.buttondown.dir="down";
		self.addChild(self.buttondown);
		self.buttonleft=buttonstate();
		self.buttonleft.x=-44;
		self.buttonleft.y=88;
		self.buttonleft.rotate=-90;
		self.buttonleft.dir="left";
		self.addChild(self.buttonleft);
		for(var i=0;i<self.childList.length;i++){
			self.childList[i].addEventListener(LMouseEvent.MOUSE_DOWN,function(){
				self.down(this.sp.dir);
			});
		};
		
	}

Btn.prototype.down=function(dir){
	var self=this;
	if(self.offOn){
		if(dir=="left"&&self.dir=="right"||dir=="up"&&self.dir=="down"||
			dir=="right"&&self.dir=="left"||dir=="down"&&self.dir=="up"){
			self.dir=self.dir;
		}else{
			self.offOn=false;
			self.dir=dir;
		}
	}
}




function buttonstate(){
	var BtnUp=new LBitmap(new LBitmapData(loadList["btn"],0,0,44,44));
	var BtnDwon=new LBitmap(new LBitmapData(loadList["btn"],44,0,44,44));
	var btn=new LButton(BtnUp,null,BtnDwon);
	return btn;
}