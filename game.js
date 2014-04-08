var version ='0.0.1';

var debug = true;
var isPlaying = false;

// GameObject-Array
var gameObjects = new Array();

init();

function init()
{
	//debug Box
	if(!debug)
	{
		document.getElementById('debug').style.visibility = 'hidden';
	}	
	
	//Init Canvas
	//background_canvas = document.getElementById('background_canvas');
	//backround_ctx = main_canvas.getContext('2d');
	main_canvas = document.getElementById('main_canvas');
	main_ctx = main_canvas.getContext('2d');
	
	//Input Events Init
	document.addEventListener("keydown", key_down, false);
	
	requestaframe = (function() {
					return window.requestAnimationFrame     	||
						window.webkitRequestAnimationFrame    	||
						window.mozReuestAnimationFrame        	||
						window.oRequestAnimationFrame         	||
						window.msRequestAnimationFrame        	||
						function (callback) {
							window.setTimeout(callback, 1000 / 60)
					};
	})();
		
	//Create new Player
	player = new Player();
	
	//Add Player To Draw and Update array
	gameObjects.push(player);
}

// Debug Mausposition
function mouse(e)
{
	var x = e.pageX - document.getElementById('game_object').offsetLeft;
	var y = e.pageY - document.getElementById('game_object').offsetTop;
	document.getElementById('x').innerHTML = x;
	document.getElementById('y').innerHTML = y;
}


//GameLoop
function gameLoop()
{
	clear();
	
	gameUpdate();
	gameDraw();
	
	
	if(isPlaying)
		requestaframe(gameLoop);
}

function gameUpdate()
{
	for(var i = 0;i<gameObjects.length;i++)
	{
		gameObjects[i].update();
	}
}

function gameDraw()
{
	for(var i = 0;i<gameObjects.length;i++)
	{
		gameObjects[i].draw();
	}
}

//GameLoop Toggle Funktion
function toggle_Loop()
{
	if(!isPlaying)
	{
		isPlaying = true;
		gameLoop();
	}
	else
	{
		isPlaying = false;
		clear();
	}
}

// Reseten der Canvas
function clear()
{
	main_ctx.clearRect(0,0,800,600);
}


//Input Manager
function key_down(e)
{
  var key_id = e.keyCode || e.which;
  if (key_id == 40) //down key
  {
    player.is_downkey = true;
    e.preventDefault();
  }
  if (key_id == 38) //up key
  {
    player.is_upkey = true;
    e.preventDefault();
  }
  if (key_id == 37) //left key
  {
    player.is_leftkey = true;
    e.preventDefault();
  }
  if (key_id == 39) //right key
  {
    player.is_rightkey = true;
    e.preventDefault();
  }
}

function Player()
{
  this.drawX = 0;
  this.drawY = 0;
  this.speed = 1;
  this.is_downkey = false;
  this.is_upkey = false;
  this.is_leftkey = false;
  this.is_rightkey = false;
}
Player.prototype.draw = function()
{
  this.game.main_ctx.fillStyle = "red";
  this.game.main_ctx.fillRect(this.drawX,this.drawY,50,50);
};
Player.prototype.update = function()
{
  this.check_keys();  
};
Player.prototype.check_keys = function()
{
  if (this.is_downkey == true)
    this.drawY++;
};