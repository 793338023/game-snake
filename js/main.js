
var loadingLayer,backLayer,playerLayer,foodLayer,btnLayer,
gameoverLayer,scoreLayer,pauseLayer,speedLayer;

var myTimer=null;

var loadData=[{name:"snakeBg",path:"./img/snakeBg.jpg"},
			{name:"startBg",path:"./img/start.png"},
			{name:"block",path:"./img/block.png"},
			{name:"btn",path:"./img/btn.png"},
			{name:"gameinit",path:"js/gameinit.js"},
			{name:"backgroundJs",path:"js/background.js"},
			{name:"foodJs",path:"js/food.js"},
			{name:"snakeJs",path:"js/snake.js"},
			{name:"btnJs",path:"js/btn.js"},
			{name:"gameover",path:"js/gameover.js"},
			{name:"score",path:"js/score.js"},
			{name:"pause",path:"js/pause.js"},
			{name:"speed",path:"js/speed.js"}],
	loadList;

var speed=0;
var num=0;
var speedCount=5;

/*记录运动方向,默认是右*/
var record="right";


function main(){
	loadingLayer=new LoadingSample4();
	addChild(loadingLayer);
	LLoadManage.load(loadData,function(progress){
		loadingLayer.setProgress(progress);
	},gameInit);
}

function gameInit(result){
	loadList=result;
	removeChild(loadingLayer);
	loadingLayer=null;
	backLayer=new GInit(); 
	backLayer.addEventListener(LMouseEvent.MOUSE_UP,gameStart);
}

function gameStart(){
	backLayer.die();
	backLayer.removeAllChild();
	backLayer=new Background();
	playerLayer=new Snake();
	foodLayer=new Food();
	foodLayer.product();
	btnLayer=new Btn();
	scoreLayer=new Score();
	num=scoreLayer.num;
	pauseLayer=new Pause();
	speedLayer=new Speed();
	myTimer=new LTimer(5000,0);
	myTimer.addEventListener(LTimerEvent.TIMER,foodLayer.random.bind(foodLayer));
	myTimer.start();
	doMove();
	backLayer.addEventListener(LEvent.ENTER_FRAME,doMove);
	LEvent.addEventListener(window,LKeyboardEvent.KEY_DOWN,keydown);
}

/*键盘事件*/
function keydown(ev){
	if(btnLayer.offOn){
		if(ev.keyCode==37&&btnLayer.dir=="right"||ev.keyCode==38&&btnLayer.dir=="down"||
			ev.keyCode==39&&btnLayer.dir=="left"||ev.keyCode==40&&btnLayer.dir=="up"){
			btnLayer.dir=btnLayer.dir;
		}else{
			btnLayer.offOn=false;
			if(ev.keyCode==37){
				btnLayer.dir="left";
			}else if(ev.keyCode==38){
				btnLayer.dir="up";
			}else if(ev.keyCode==39){
				btnLayer.dir="right";
			}else if(ev.keyCode==40){
				btnLayer.dir="down";
			}
		}
	}
	console.log(ev.keyCode);
	if(ev.keyCode==32){
		pauseLayer.change();
	}
	if(ev.keyCode==49){
		speedCount=0;
	}
	if(ev.keyCode==50){
		speedCount=3;
	}
	if(ev.keyCode==51){
		speedCount=5;
	}
}

/*蛇运动*/

function doMove(){
	if(speed--<0){
		if(speedCount>=0){
			if(scoreLayer.num>num){
				speedCount--;
				num=scoreLayer.num;
			}
		}
		speed=speedCount;
		playerLayer.run();
	}
	if(check(playerLayer.posArr[playerLayer.posArr.length-1].x,playerLayer.posArr[playerLayer.posArr.length-1].y,playerLayer.posArr.length-1)||
		playerLayer.posArr[playerLayer.posArr.length-1].x>18||playerLayer.posArr[playerLayer.posArr.length-1].x<1||
		playerLayer.posArr[playerLayer.posArr.length-1].y>18||playerLayer.posArr[playerLayer.posArr.length-1].y<1){
		gameOver();
		return;
	};	
	if(btnLayer.dir){
		pauseLayer.offOn=true;
		pauseLayer.draw();
		record=btnLayer.dir;
		playerLayer.removeAllChild();
		playerLayer.setView();
	}
}




/*判断是否碰撞或食物出现在贪食蛇里*/

function check(x,y,index){
	for (var i = playerLayer.posArr.length - 1; i >= 0; i--) {
		if(playerLayer.posArr[i].x==x&&playerLayer.posArr[i].y==y&&i!=index){
			return true;
		}
	}
	return false;
}


/*游戏结束*/

function gameOver(){
	myTimer.stop();
	backLayer.removeAllEventListener();
	gameoverLayer=new Gover();
}