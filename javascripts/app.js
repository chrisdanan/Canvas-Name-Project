var canvas,		//Canvas object.
	ctx,		//Context of canvas = 2d.
	canvasWidth,
	canvasHeight,
	name = "Vanessa",
	nameWidth = 500;

var draw = function(){
	"use strict";

	ctx.textAlign = "center";
	ctx.font = "7em verdana";
	ctx.fillStyle = "#000";

	var nameLength = name.length,
		x = (canvasWidth / 2) - (nameWidth / 2);

	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	for(var i = 0; i < nameLength; i++){
		ctx.fillText(name.charAt(i), x, canvasHeight / 2);
		x += ctx.measureText(name.charAt(i)).width;
	}
};

var randColor = function(){
	"use strict";

	var nameLength = name.length,
		x = (canvasWidth / 2) - (nameWidth / 2);

	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	for(var i = 0; i < nameLength; i++){
		var r, g, b;

		r = Math.floor(Math.random() * 256);
		g = Math.floor(Math.random() * 256);
		b = Math.floor(Math.random() * 256);

		ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
		ctx.fillText(name.charAt(i), x, canvasHeight / 2);
		x += ctx.measureText(name.charAt(i)).width;
	}
};

var main = function(){
	"use strict";

	console.log("Hello Vane");

	canvas = document.getElementById("canvas");
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;

	if(canvas.getContext){
		ctx = canvas.getContext("2d");

		draw();

		$("#defaultBtn").on("click", function(){
			console.log("Default button clicked.");

			draw();
		});

		$("#randColorBtn").on("click", function(){
			console.log("Random Color Button clicked.");

			randColor();
		});
	}
};

$(document).ready(main);