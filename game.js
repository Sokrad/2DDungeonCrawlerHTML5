var version ='0.0.1';

var debug = true;
var isPlaying = false;

// GameObject-Array
var gameObjects = new Array();
var map = new Map();

init();

function init()
{
	//debug Box
	if(!debug)
	{
		document.getElementById('debug').style.visibility = 'hidden';
	}	
	
	//Init Canvas
	background_canvas = document.getElementById('background_canvas');
	backround_ctx = background_canvas.getContext('2d');
	main_canvas = document.getElementById('main_canvas');
	main_ctx = main_canvas.getContext('2d');
	
	//Input Events Init
	document.addEventListener("keydown", key_down, false);
	document.addEventListener("keyup", key_up, false);
	
	requestaframe = (function() {
					return window.requestAnimationFrame     	||
						window.webkitRequestAnimationFrame    	||
						window.mozRequestAnimationFrame        	||
						window.oRequestAnimationFrame         	||
						window.msRequestAnimationFrame        	||
						function (callback) {
							window.setTimeout(callback, 1000 / 60)
					};
	})();
	
	
			
	load_media();
		
	//Create new Player
	player = new Player();
	map.canvas = backround_ctx;
	
	//Add Player To Draw and Update array
	gameObjects.push(player);
	
	
}


function load_media()
{
	map.block_sprite.src = 'image/floor_sprite.png';  
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

//Game Update
function gameUpdate()
{
	for(var i = 0;i<gameObjects.length;i++)
	{
		gameObjects[i].update();
	}
}

//Game Draw
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
	map.draw();
	
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

function key_up(e)
{
  var key_id = e.keyCode || e.which;
  if (key_id == 40) //down key
  {
    player.is_downkey = false;
    e.preventDefault();
  }
  if (key_id == 38) //up key
  {
    player.is_upkey = false;
    e.preventDefault();
  }
  if (key_id == 37) //left key
  {
    player.is_leftkey = false;
    e.preventDefault();
  }
  if (key_id == 39) //right key
  {
    player.is_rightkey = false;
    e.preventDefault();
  }
}

// Map Prototype
function Map()
{
	this.block_sprite = new Image();
	this.block_count = 2;
	this.blockwidth = 32;
	this.blockheight = 32;
	this.fw = 23;
	this.fh = 17;
	
	this.BaseMap = new Array();
	this.canvas = null;
}
Map.prototype.draw = function()
{
	var startx = 32;
	var starty = 32;
	for(var x=0;x<this.fw;x++)
	{
		for(var y=0;y<this.fh;y++)
		{
			map.canvas.drawImage(this.block_sprite,0,0,this.blockwidth,this.blockheight, startx+(x*this.blockwidth), starty+(y*this.blockheight), this.blockwidth, this.blockheight);
		}
	}
};

// Player Prototype
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
  main_ctx.fillStyle = "red";
  main_ctx.fillRect(this.drawX,this.drawY,50,50);
};
Player.prototype.update = function()
{
  this.check_keys();  
};
Player.prototype.check_keys = function()
{
	if (this.is_downkey == true)
		this.drawY++;
	if (this.is_upkey == true)
		this.drawY--;
	if (this.is_rightkey == true)
		this.drawX++;
	if (this.is_leftkey == true)
		this.drawX--;
};

