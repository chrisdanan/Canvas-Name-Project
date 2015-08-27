var canvas,		//Canvas object.
	ctx,		//Context of canvas = 2d.
	canvasWidth,
	canvasHeight,
	name = "Vanessa",
	nameWidth = 500,
	circles = false;

var draw = function(){
	"use strict";

	var nameLength = name.length,
		x = (canvasWidth / 2) - (nameWidth / 2);

	if($("#canvas").hasClass("light")){
		$("#canvas").toggleClass("light");
	};

	ctx.textAlign = "center";
	ctx.font = "10em monospace";
	ctx.fillStyle = "#000";

	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	for(var i = 0; i < nameLength; i++){
		ctx.fillText(name.charAt(i), x, canvasHeight / 2);
		x += ctx.measureText(name.charAt(i)).width;
	}

	ctx.save();

	circles = false;
};

var randColor = function(){
	"use strict";

	var nameLength = name.length,
		x = (canvasWidth / 2) - (nameWidth / 2);

	if($("#canvas").hasClass("light")){
		$("#canvas").toggleClass("light");
	};

	ctx.clearRect(0, 0, canvasWidth, canvasHeight);


	for(var i = 0; i < nameLength; i++){
		var r, g, b;

		r = Math.floor(Math.random() * 256);
		g = Math.floor(Math.random() * 256);
		b = Math.floor(Math.random() * 256);

		ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
		ctx.fillText(name.charAt(i), x, canvasHeight / 2);
		x += (ctx.measureText(name.charAt(i+1)).width);
	}

	circles = false;
};

var lightSwitch = function(s){
	"use strict";

	$("#canvas").toggleClass("light");

	ctx.save();

	ctx.globalCompositeOperation = "destination-over";

	if(circles === false){
		ctx.fillStyle = "#FFF";
		ctx.globalAlpha = 0.2;  //Set alpha value for all shapes declared from this point onwards.

		//Draw the translucent circles.
		for(var i = 0; i < 6; i++){
			ctx.save();
			ctx.beginPath();
			ctx.translate(canvasWidth / 2, canvasHeight / 2);
			ctx.scale(2, 1);
			ctx.arc(0, 0, 10 + 30 * i, 0, Math.PI * 2, true);
			ctx.fill();
			ctx.restore();
		}

		ctx.restore();

		circles = true;
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

		$("#lightSwitch").on("click", function(){
			console.log("Light Switch clicked.");

			lightSwitch();
		});
	}
};

$(document).ready(main);