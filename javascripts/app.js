/*************
 * Author: 	 		Christopher Dancarlo Danan
 * Created: 		August 26, 2015
 * Project: 		VanessaName
 * Filename: 		app.js
 * Purpose: 		Javascript code for VanessaName project. I created this project to practice some canvas skills I learned.
 					A name (default "Vanessa") is drawn on the canvas and interesting effects are applied to it.
 * Refereneces:
 					-https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
 *************/

//Global variables.
var canvas,						//Canvas object.
	ctx,						//Context of canvas = 2d.
	canvasWidth,				//Width of canvas.
	canvasHeight,				//Height of canvas.
	name = "Vanessa",			//Name that is written on canvas.
	nameWidth = 500,			//Width of 'Vanessa' hard coded to be 500 and used for centering text on canvas.
	nameLength = name.length,	//Number of characters in name.
	canvasCenterX,				//Center of width for the canvas.
	canvasCenterY,				//Center of height for the canvas.
	lightOn = false,			//Determines if flashlight is on in order to track mouse movement on canvas.
	rafHover,					//Request animation frame id for hover animation.
	rafShip,					//Request animation frame id for ship animation.
	rotateDegrees = 0.2;		//Number of degrees ship rotates per frame.


//Flashlight object.
var light = {
	x: 750 / 2,  			//Undefined if using canvas.width, so need to hardcode width of 750. Determines default x-coordinate starting value of light.
	y: 300 + 50,			//Determines default y-coordinate starting position of light.
	draw: function(){		//Draw the light on the canvas.
		ctx.save();

		ctx.globalCompositeOperation = "destination-over";  //Draw circles in background to prevent drawing over text.
		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.globalAlpha = 0.15; 

		//Draw the translucent circles.
		for(var i = 0; i < 6; i++){
			ctx.save();
			ctx.beginPath();
			ctx.arc(this.x, this.y, 10 + 30 * i, 0, Math.PI * 2, true);
			ctx.fill();
			ctx.restore();
		}

		ctx.restore();
	}
};

//Name object used in hover effect.
var hoverName = {
	x: 750 / 2,			//Name initialized to center of canvas.
	y: 300 / 2,			
	vx: 5,				//Velocity in x-direction.
	vy: 1,				//Velocity in y-direction.
	acc: 0.8,			//Acceleration.
	draw: function(){	//Draw text to canvas.
		ctx.save();

		ctx.textAlign = "center";
		ctx.font = "10em monospace";
		ctx.fillStyle = "#000";
		ctx.fillText("Vanessa", this.x, this.y);

		ctx.restore();
	}
};

//Shadow object used in hover effect.
var hoverShadow = {
	x: 750 / 2,					//Starting coordinates for shadow.
	y: 3000,
	xScale: 1,					//Scale shadow so it looks like it is on the floor.
	xScaleStretch: -0.001,		//Value to change width scale in animation (currently unused).
	yScale: 0.08,
	yScaleStretch: -0.0002,		//Value to change height scale in animation (currently unused).
	draw: function(){
		ctx.save();

		ctx.scale(this.xScale, this.yScale);
		ctx.fillStyle = "#ababab";
		ctx.fillText("Vanessa", this.x, this.y);

		ctx.restore();
	}
};

//Ship object used in ship effect.
var shipName = {
	x: 750 / 2,				//Starting coordinates for ship.
	y: 300 / 2,
	vx: 5,					//X-direction velocity for ship.
	vy: 1,					//Y-direction velocity for ship.
	acc: 0.8,				//Acceleration for ship.
	rotate: 15,				//Starting rotation value for shiop.
	draw: function(){		//Draw the ship and the name on it.
		ctx.save();

		ctx.strokeStyle = "black";
		ctx.fillStyle = "#ab6800";
		ctx.lineWidth = "5";

		//Wooden mast.
		ctx.beginPath();
		ctx.moveTo(380, 130);
		ctx.lineTo(380, -33);
		ctx.lineTo(400, -33);
		ctx.lineTo(400, 130);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		//Ship body.
		ctx.beginPath();
		ctx.moveTo(80, 130);
		ctx.lineTo(700, 130);
		ctx.quadraticCurveTo(700, 200, 650, 300);
		ctx.lineTo(200, 300);
		ctx.quadraticCurveTo(80, 300, 80, 140);
		ctx.lineTo(60, 140);
		ctx.lineTo(60, 130);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		//Sail.
		ctx.beginPath();
		ctx.moveTo(400, -10);
		ctx.quadraticCurveTo(550, -20, 550, 100);
		ctx.lineTo(400, 100);
		ctx.lineTo(415, 100);
		ctx.lineTo(415, -10);
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.stroke();

		ctx.save();

		//Sail icon.
		var path = new Path2D();
		ctx.fillStyle = "rgb(0, 200, 200)";
		ctx.translate(420, 0);
		ctx.scale(0.50, 0.50);
		path.moveTo(75, 40);
		path.bezierCurveTo(75, 37, 70, 25, 50, 25);
		path.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
		path.bezierCurveTo(20, 80, 40, 102, 75, 120);
		ctx.fill(path);
		ctx.fillStyle = "rgb(255, 133, 0)";
		path = new Path2D();
		path.moveTo(75, 120);
		path.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
		path.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
		path.bezierCurveTo(85, 25, 75, 37, 75, 40);
		ctx.fill(path);

		ctx.restore();

		//Draw text.
		ctx.textAlign = "center";
		ctx.font = "7em cursive";
		ctx.fillStyle = "#000";
		ctx.fillText("S.S. Vane", this.x, this.y);

		ctx.restore();
	}
};

//Foreground wave object.
var wave1 = {
	x: 0,					//Starting coordinates for wave.
	y: 250,
	vx: 2,					//Velocity values.
	vy: 2,
	color: "#398cff",		//Lighter shade of blue than background wave.
	draw: function(){		//Draw the wave.
		ctx.save();

		ctx.fillStyle = this.color;
		ctx.strokeStyle = "black";
		ctx.lineWidth = "5";
		ctx.beginPath();
		ctx.scale(1.1, 1);
		ctx.moveTo(this.x, this.y);
		ctx.bezierCurveTo(250, 100, 500, 400, 750, 250);
		ctx.lineTo(750, 500);
		ctx.lineTo(0, 500);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.stroke();

		ctx.restore();
	}
};

//Background wave object.
var wave2 = {	
	x: 750,					//Starting coordinates for wave.
	y: 250,
	vx: 2,					//Velocity values.
	vy: 1,
	color: "#145ec3",		//Darker shade of blue than foreground wave.
	draw: function(){		//Draw the wave.
		ctx.save();

		ctx.fillStyle = this.color;
		ctx.strokeStyle = "black";
		ctx.lineWidth = "5";
		ctx.beginPath();
		ctx.scale(1.1, 1);
		ctx.moveTo(this.x, this.y);
		ctx.bezierCurveTo(500, 100, 250, 500, 0, 250);
		ctx.lineTo(0, 500);
		ctx.lineTo(750, 500);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.stroke();

		ctx.restore();
	}
};

/**************
 * Purpose: Initialize canvas state for each effect.
 * Input: 	
 			-None.
 * Output: 	
 			-Clear canvas of previous drawings.
 			-Draw border on canvas.
 			-Remove any previous classes appended to canvas object.
*************/
var initializeCanvas = function(){
	"use strict";

	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	border();

	if($("#canvas").hasClass("light")){
		$("#canvas").toggleClass("light");
	};

	if($("#canvas").hasClass("flashLight")){
		$("#canvas").toggleClass("flashLight");
	}
};

/*************
 * Purpose: Draw a border around the canvas.
 * Input: 	
 			-None.
 * Output:
 			-Border is drawn to encapsulate the canvas.
*************/
var border = function(){
	"use strict";

	ctx.save();

	ctx.lineWidth = 5;
	ctx.strokeStyle = "black";
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(canvasWidth, 0);
	ctx.lineTo(canvasWidth, canvasHeight);
	ctx.lineTo(0, canvasHeight);
	ctx.lineTo(0, 0);
	ctx.stroke();

	ctx.restore();
};

/*************
 * Purpose: Default effect - draw name to canvas.	
 * Input: 	
 			-None.
 * Output:
 			-Name is drawn to canvas.
*************/
var draw = function(){
	"use strict";

	var x = (canvasWidth / 2) - (nameWidth / 2);

	initializeCanvas();

	ctx.textAlign = "center";
	ctx.font = "10em monospace";
	ctx.fillStyle = "#000";

	//Draw each character of text one at a time.
	//Why not just use fillText()? Since this method is used in other functions, fillText() will draw the text slightly off center of
	// where this method draws the text, creating a sudden, jarring effect of the text moving when switching back and forth between effects.
	// So, in order to make the effects transition smoothly, I just did this method.
	for(var i = 0; i < nameLength; i++){
		ctx.fillText(name.charAt(i), x, canvasHeight / 2);
		x += ctx.measureText(name.charAt(i)).width;
	}
};

/*************
 * Purpose: Random color effect - draw name with random colors assigned to each character.
 * Input: 	
 			-None.
 * Output:
 			-Name has each character drawn in random colors.
*************/
var randColor = function(){
	"use strict";

	var x = (canvasWidth / 2) - (nameWidth / 2);

	initializeCanvas();

	for(var i = 0; i < nameLength; i++){
		var r, g, b;

		//Choose random values for rgb.
		r = Math.floor(Math.random() * 256);
		g = Math.floor(Math.random() * 256);
		b = Math.floor(Math.random() * 256);

		ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
		ctx.fillText(name.charAt(i), x, canvasHeight / 2);
		x += (ctx.measureText(name.charAt(i+1)).width);
	}
};

/*************
 * Purpose: Light switch effect - illuminate the name so that it looks like a lightbulb set against a dark background.
 * Input: 	
 			-None.
 * Output:
 			-Name is written in yellow and radial gradient is used to make glow effect.
*************/
var lightSwitch = function(s){
	"use strict";

	var x = (canvasWidth / 2) - (nameWidth / 2);

	initializeCanvas();

	$("#canvas").toggleClass("light");		//initializeCanvas() removes 'light' class, so add it back again.

	ctx.save();

	if($("#canvas").hasClass("light")){		//Double check that 'light' class has been appended back to canvas.

		ctx.fillStyle = "#fdff00";
		ctx.strokeStyle = "rgba(255, 255, 84, 0.5)";
		ctx.lineWidth = "7";

		//Draw text.

		for(var i = 0; i < nameLength; i++){
			ctx.fillText(name.charAt(i), x, canvasHeight / 2);
			ctx.strokeText(name.charAt(i), x, canvasHeight / 2);
			x += ctx.measureText(name.charAt(i)).width;
		}

		//Create background glow.

		ctx.globalCompositeOperation = "destination-over";
		ctx.scale(2, .75);
		var glowGrad = ctx.createRadialGradient(canvasWidth / 4, canvasHeight / 2, 0, canvasWidth / 4, canvasHeight / 2, 175);
		glowGrad.addColorStop(0, "#FFFFC3");
		glowGrad.addColorStop(1, "rgba(255, 255, 195, 0.0");
		ctx.fillStyle = glowGrad;
		ctx.fillRect(0, 0, 750, 600);
	} else{									//If canvas still does not have 'light' class, then draw default text.
		draw();
	}

	ctx.restore();
};

/*************
 * Purpose: Flashlight effect - user controls the flashlight with mouse to illuminate the dark canvas.
 * Input: 	
 			-None.
 * Output:
 			-Draw translucent circles for flashlight effect.
*************/
var flashlight = function(){
	"use strict";

	var x = (canvasWidth / 2) - (nameWidth / 2);

	initializeCanvas();

	$("#canvas").toggleClass("light");		//Turns canvas background black.
	$("#canvas").addClass("flashLight");

	ctx.save();

	if($("#canvas").hasClass("light")){
		//Create the text.

		ctx.fillStyle = "#000";

		for(var i = 0; i < nameLength; i++){
			ctx.fillText(name.charAt(i), x, canvasHeight / 2);
			x += ctx.measureText(name.charAt(i)).width;
		}

		//Initialize light.

		light.draw();
	}

	ctx.restore();
};

/*************
 * Purpose: Hover effect - name hovers up and down on the canvas while a shadow sits below it.
 * Input: 	
 			-None.
 * Output:
			-Name hovers and a shadow is drawn beneath it. Animation is started and rafHover is given raf id.
*************/
var hover = function(){

	initializeCanvas();

	//Draw the name that will hover.
	hoverName.draw();

	ctx.save();

	ctx.globalCompositeOperation = "destination-over";

	//Draw the shadow.
	hoverShadow.draw();

	ctx.restore();

	//Move name vertically for hovering effect.
	hoverName.y += hoverName.vy * hoverName.acc;

	//Change scale of shadow.
	//hoverShadow.xScale += hoverShadow.xScaleStretch;
	//hoverShadow.yScale -= hoverShadow.yScaleStretch;

	//Make sure name doesn't go too high or too low.
	if(hoverName.y > 200 || hoverName.y < 150){
		hoverName.vy = -hoverName.vy;
		//hoverShadow.xScaleStretch = -hoverShadow.xScaleStretch;
		//hoverShadow.yScaleStretch = -hoverShadow.yScaleStretch;
	}

	//Create raf id in order to cancel animation later.
	rafHover = window.requestAnimationFrame(hover);
};

/*************
 * Purpose: Ship effect - name is drawn on a ship that bounces on the waves of the ocean.
 * Input: 	
 			-None.
 * Output:
 			-Name, ship, and waves are drawn and animation is started. rafShip is given raf id.
*************/
var ship = function(){

	initializeCanvas();

	ctx.save();

	//Name.
	shipName.y = 230;
	ctx.translate(250, 200);
	ctx.rotate(Math.PI / 180 * shipName.rotate);
	ctx.translate(-250, -200);
	shipName.draw();

	ctx.restore();

	ctx.save();

	//Waves.
	wave1.draw();
	ctx.globalCompositeOperation = "destination-over";
	wave2.draw();

	//Background.
	ctx.fillStyle = "#9ffdff";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);

	ctx.restore();

	//Move ship and waves.

	shipName.rotate += rotateDegrees;

	wave1.x += wave1.vx;
	wave1.y += wave1.vy;
	wave2.y += wave2.vy;

	//Create boundaries of movement for ship and waves.
	if(wave1.x > 400 || wave1.x < 250){
		wave1.vx = -wave1.vx;
	}
	if(wave1.y > 300 || wave1.y < 150){
		wave1.vy = -wave1.vy;
	}

	if(wave2.y > 300 || wave2.y < 200){
		wave2.vy = -wave2.vy;
	}

	if(shipName.rotate < 10 || shipName.rotate > 20){
		rotateDegrees = -rotateDegrees;
	}

	//Create raf id in order to cancel animation later.
	rafShip = window.requestAnimationFrame(ship);
};

var main = function(){
	"use strict";

	console.log("Hello Vane!!!");

	canvas = document.getElementById("canvas");
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	canvasCenterX = canvasWidth / 2;
	canvasCenterY = canvasHeight / 2;

	//Only do canvas stuff if browser supports it.
	if(canvas.getContext){
		ctx = canvas.getContext("2d");

		draw();

		//Default effect.
		$("#defaultBtn").on("click", function(){
			console.log("Default button clicked.");

			window.cancelAnimationFrame(rafHover);
			window.cancelAnimationFrame(rafShip);
			rafHover = "";
			rafShip = "";
			lightOn = false;
			draw();
		});

		//Random color effect.
		$("#randColorBtn").on("click", function(){
			console.log("Random Color Button clicked.");

			window.cancelAnimationFrame(rafHover);
			window.cancelAnimationFrame(rafShip);
			rafHover = "";
			rafShip = "";
			lightOn = false;
			randColor();
		});

		//Light switch effect.
		$("#lightSwitch").on("click", function(){
			console.log("Light Switch clicked.");

			window.cancelAnimationFrame(rafHover);
			window.cancelAnimationFrame(rafShip);
			rafHover = "";
			rafShip = "";
			lightOn = false;
			lightSwitch();
		});

		//Flashlight effect.
		$("#flashLight").on("click", function(){
			console.log("Flash Light button clicked.");

			window.cancelAnimationFrame(rafHover);
			window.cancelAnimationFrame(rafShip);
			rafHover = "";
			rafShip = "";
			lightOn = true;
			flashlight();
		});

		//Hover effect.
		$("#hover").on("click", function(){
			console.log("Hover Button clicked.");

			lightOn = false;
			window.cancelAnimationFrame(rafShip);
			rafShip = "";

			if(!rafHover){
				window.requestAnimationFrame(hover);
			}
		});

		//Ship effect.
		$("#ship").on("click", function(){
			console.log("Ship Button clicked.");

			window.cancelAnimationFrame(rafHover);
			rafHover = "";

			if(!rafShip){
				window.requestAnimationFrame(ship);
			}
		});

		//Track movement of mouse for flashlight.
		canvas.addEventListener('mousemove', function(e){
			if(lightOn){
				ctx.clearRect(0, 0, canvasWidth, canvasHeight);
			    light.x = e.clientX;
			    light.y = e.clientY;
			    //console.log("X: " + e.clientX);
			    //console.log("Y: " + e.clientY);
			    flashlight();
			    light.draw();
			}
		});
	}
};

$(document).ready(main);

//t
//fflvd