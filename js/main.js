
/**
 * 各图层变量
 * 
 * loadingLayer 加载层
 * backLayer 背景层
 * playerLayer 贪吃蛇
 * foodLayer 食物
 * btnLayer 按钮
 * gameoverLayer 游戏结束
 * scoreLayer 分数
 * pauseLayer 停止
 * speedLayer 速度
 *  */ 
var loadingLayer,backLayer,playerLayer,foodLayer,btnLayer,
gameoverLayer,scoreLayer,pauseLayer,speedLayer;

var myTimer=null;

// 需要加载的文件
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
// 速度
var speedCount=5;

/*记录运动方向,默认是右*/
var record="right";

// 入口方法
function main(){
	// LoadingSample4加载动画
	loadingLayer=new LoadingSample4();
	// 添加图层方法
	addChild(loadingLayer);
	// 加载资源操作
	LLoadManage.load(loadData,function(progress){
		//显示加载进度
		loadingLayer.setProgress(progress);
	},
	// 加载完后游戏初始化
	gameInit);
}

function gameInit(result){
	// 加载资源的结果
	loadList=result;
	// 移除加载层
	removeChild(loadingLayer);
	loadingLayer=null;
	// 初始场景背景层加载
	backLayer=new GInit(); 
	// 点击背景进入游戏
	backLayer.addEventListener(LMouseEvent.MOUSE_UP,gameStart);
}

function gameStart(){
	// 去除背景层
	backLayer.die();
	backLayer.removeAllChild();
	// 创建游戏背景层
	backLayer=new Background();
	// 创建贪吃蛇层
	playerLayer=new Snake();
	// 创建食物层
	foodLayer=new Food();
	// 生成食物
	foodLayer.product();
	// 创建按钮层
	btnLayer=new Btn();
	// 创建分数
	scoreLayer=new Score();
	// 获取分数
	num=scoreLayer.num;
	// 暂停按钮层
	pauseLayer=new Pause();
	// 速度层
	speedLayer=new Speed();
	// 定时器
	myTimer=new LTimer(5000,0);
	myTimer.addEventListener(LTimerEvent.TIMER,foodLayer.random.bind(foodLayer));
	// 开始运动
	myTimer.start();
	doMove();
	backLayer.addEventListener(LEvent.ENTER_FRAME,doMove);
	LEvent.addEventListener(window,LKeyboardEvent.KEY_DOWN,keydown);
}

/*键盘事件*/
function keydown(ev){
	
	if(btnLayer.offOn){
		// 不能反方向
		if(ev.keyCode==37&&btnLayer.dir=="right"||ev.keyCode==38&&btnLayer.dir=="down"||
			ev.keyCode==39&&btnLayer.dir=="left"||ev.keyCode==40&&btnLayer.dir=="up"){
			btnLayer.dir=btnLayer.dir;
		}else{
			// 移动方向
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
		// 停止
		pauseLayer.change();
	}
	// 调速
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
	// 检查是否撞墙了  -- 重点自己领悟
	if(check(playerLayer.posArr[playerLayer.posArr.length-1].x,playerLayer.posArr[playerLayer.posArr.length-1].y,playerLayer.posArr.length-1)||
		playerLayer.posArr[playerLayer.posArr.length-1].x>18||playerLayer.posArr[playerLayer.posArr.length-1].x<1||
		playerLayer.posArr[playerLayer.posArr.length-1].y>18||playerLayer.posArr[playerLayer.posArr.length-1].y<1){
		// 游戏结束
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




/*
判断是否碰撞或食物出现在贪食蛇里
*/
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