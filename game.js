var version ='0.0.1';

var debug = true;
var isPlaying = false;

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
	backround_ctx = main_canvas.getContext('2d');
	main_canvas = document.getElementById('main_canvas');
	main_ctx = main_canvas.getContext('2d');
	
	//Input Events Init
	document.addEventListener("keydown", key_down, false);
	
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
	
	main_ctx.fillStyle = "red";
	main_ctx.fillRect(10,10,50,50);
	
	if(isPlaying)
		window.setTimeout(gameLoop,10);
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
  if (key_id == 40) //down key_down
  {
    r_y++;
    e.preventDefault();
  }
}