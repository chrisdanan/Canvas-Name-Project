var canvas,		//Canvas object.
	ctx,		//Context of canvas = 2d.
	canvasWidth,
	canvasHeight,
	name = "Vanessa",
	nameWidth = 500,
	nameLength = name.length,
	canvasCenterX,
	canvasCenterY,
	lightOn = false,
	rafHover,
	rafShip,
	rotateDegrees = 0.2;


var light = {
	x: 750 / 2,  //Undefined if using canvas.width.
	y: 300 + 50,
	draw: function(){
		ctx.save();
		ctx.globalCompositeOperation = "destination-over";

		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.globalAlpha = 0.15;  //Set alpha value for all shapes declared from this point onwards.

		//Draw the translucent circles.
		for(var i = 0; i < 6; i++){
			ctx.save();
			ctx.beginPath();
			ctx.arc(this.x, this.y, 10 + 30 * i, 0, Math.PI * 2, true);
			ctx.fill();
			ctx.restore();
		}

		ctx.globalAlpha = 1;
		ctx.restore();
	}
};

var hoverName = {
	x: 750 / 2,
	y: 300 / 2,
	vx: 5,
	vy: 1,
	acc: 0.8,
	rotate: 15,
	draw: function(){
		ctx.save();
		ctx.textAlign = "center";
		ctx.font = "10em monospace";
		ctx.fillStyle = "#000";
		ctx.fillText("Vanessa", this.x, this.y);
		ctx.restore();
	}
};

var hoverShadow = {
	x: 750 / 2,
	y: 3000,
	xScale: 1,
	xScaleStretch: -0.001,
	yScale: 0.08,
	yScaleStretch: -0.0002,
	draw: function(){
		ctx.save();
		ctx.scale(this.xScale, this.yScale);
		ctx.fillStyle = "#ababab";
		ctx.fillText("Vanessa", this.x, this.y);
		ctx.restore();
	}
};

var shipName = {
	x: 750 / 2,
	y: 300 / 2,
	vx: 5,
	vy: 1,
	acc: 0.8,
	rotate: 15,
	draw: function(){
		ctx.save();
		ctx.textAlign = "center";
		ctx.font = "10em monospace";
		ctx.fillStyle = "#000";
		ctx.fillText("Vanessa", this.x, this.y);
		ctx.restore();
	}
};

var wave1 = {
	x: 0,
	y: 250,
	vx: 2,
	vy: 2,
	color: "#398cff",
	draw: function(){
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

var wave2 = {
	x: 750,
	y: 250,
	vx: 2,
	vy: 1,
	color: "#145ec3",
	draw: function(){
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

var initializeCanvas = function(){
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	border();

	if($("#canvas").hasClass("light")){
		$("#canvas").toggleClass("light");
	};

	if($("#canvas").hasClass("flashLight")){
		$("#canvas").toggleClass("flashLight");
	}
};

var border = function(){
	ctx.save();

	//Draw border around the canvas.
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

var draw = function(){
	"use strict";

	var x = (canvasWidth / 2) - (nameWidth / 2);

	initializeCanvas();

	ctx.textAlign = "center";
	ctx.font = "10em monospace";
	ctx.fillStyle = "#000";

	for(var i = 0; i < nameLength; i++){
		ctx.fillText(name.charAt(i), x, canvasHeight / 2);
		x += ctx.measureText(name.charAt(i)).width;
	}
};

var randColor = function(){
	"use strict";

	var x = (canvasWidth / 2) - (nameWidth / 2);

	initializeCanvas();

	for(var i = 0; i < nameLength; i++){
		var r, g, b;

		r = Math.floor(Math.random() * 256);
		g = Math.floor(Math.random() * 256);
		b = Math.floor(Math.random() * 256);

		ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
		ctx.fillText(name.charAt(i), x, canvasHeight / 2);
		x += (ctx.measureText(name.charAt(i+1)).width);
	}
};

var lightSwitch = function(s){
	"use strict";

	var x = (canvasWidth / 2) - (nameWidth / 2);

	initializeCanvas();

	$("#canvas").toggleClass("light");

	ctx.save();

	if($("#canvas").hasClass("light")){
		//Create the text.

		ctx.fillStyle = "#fdff00";
		ctx.strokeStyle = "rgba(255, 255, 84, 0.5)";
		ctx.lineWidth = "7";

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

		ctx.restore();
	} else{
		draw();
	}
};

var flashlight = function(){
	"use strict";

	var x = (canvasWidth / 2) - (nameWidth / 2);

	initializeCanvas();

	$("#canvas").toggleClass("light");
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

var hover = function(){

	initializeCanvas();

	hoverName.draw();
	ctx.save();
	ctx.globalCompositeOperation = "destination-over";
	hoverShadow.draw();
	ctx.restore();

	hoverName.y += hoverName.vy * hoverName.acc;

	//hoverShadow.xScale += hoverShadow.xScaleStretch;
	//hoverShadow.yScale -= hoverShadow.yScaleStretch;

	if(hoverName.y > 200 || hoverName.y < 150){
		hoverName.vy = -hoverName.vy;
		//hoverShadow.xScaleStretch = -hoverShadow.xScaleStretch;
		//hoverShadow.yScaleStretch = -hoverShadow.yScaleStretch;
	}

	rafHover = window.requestAnimationFrame(hover);
};

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

	shipName.rotate += rotateDegrees;

	wave1.x += wave1.vx;
	wave1.y += wave1.vy;
	wave2.y += wave2.vy;

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

	rafShip = window.requestAnimationFrame(ship);
};

var main = function(){
	"use strict";

	console.log("Hello Vane");

	canvas = document.getElementById("canvas");
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	canvasCenterX = canvasWidth / 2;
	canvasCenterY = canvasHeight / 2;

	if(canvas.getContext){
		ctx = canvas.getContext("2d");

		draw();

		$("#defaultBtn").on("click", function(){
			console.log("Default button clicked.");

			window.cancelAnimationFrame(rafHover);
			window.cancelAnimationFrame(rafShip);
			rafHover = "";
			rafShip = "";
			lightOn = false;
			draw();
		});

		$("#randColorBtn").on("click", function(){
			console.log("Random Color Button clicked.");

			window.cancelAnimationFrame(rafHover);
			window.cancelAnimationFrame(rafShip);
			rafHover = "";
			rafShip = "";
			lightOn = false;
			randColor();
		});

		$("#lightSwitch").on("click", function(){
			console.log("Light Switch clicked.");

			window.cancelAnimationFrame(rafHover);
			window.cancelAnimationFrame(rafShip);
			rafHover = "";
			rafShip = "";
			lightOn = false;
			lightSwitch();
		});

		$("#flashLight").on("click", function(){
			console.log("Flash Light button clicked.");

			window.cancelAnimationFrame(rafHover);
			window.cancelAnimationFrame(rafShip);
			rafHover = "";
			rafShip = "";
			lightOn = true;
			flashlight();
		});

		$("#hover").on("click", function(){
			console.log("Hover Button clicked.");

			lightOn = false;
			window.cancelAnimationFrame(rafShip);
			rafShip = "";

			if(!rafHover){
				window.requestAnimationFrame(hover);
			}
		});

		$("#ship").on("click", function(){
			console.log("Ship Button clicked.");

			window.cancelAnimationFrame(rafHover);
			rafHover = "";
			
			if(!rafShip){
				window.requestAnimationFrame(ship);
			}
		});

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