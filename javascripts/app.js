var canvas,		//Canvas object.
	ctx,		//Context of canvas = 2d.
	canvasWidth,
	canvasHeight,
	name = "Vanessa",
	nameWidth = 500,
	lightOn = false;

var light = {
	x: (canvasWidth / 2),
	y: (canvasHeight / 2),
	draw: function(){
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
	}
};

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
};

var lightSwitch = function(s){
	"use strict";

	var nameLength = name.length,
		x = (canvasWidth / 2) - (nameWidth / 2);

	if($("#canvas").hasClass("light")){
		$("#canvas").toggleClass("light");
	};

	$("#canvas").toggleClass("light");

	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	ctx.save();

	if($("#canvas").hasClass("light")){
		//Create the text.

		ctx.fillStyle = "#fdff00";
		ctx.strokeStyle = "rgba(254, 255, 120, 0.5)";
		ctx.lineWidth = "5";

		for(var i = 0; i < nameLength; i++){
			ctx.fillText(name.charAt(i), x, canvasHeight / 2);
			ctx.strokeText(name.charAt(i), x, canvasHeight / 2);
			x += ctx.measureText(name.charAt(i)).width;
		}

		//Create background circles.

		ctx.globalCompositeOperation = "destination-over";

		ctx.fillStyle = "rgb(254, 255, 195)";
		ctx.globalAlpha = 0.2;  //Set alpha value for all shapes declared from this point onwards.

		//Draw the translucent circles.
		for(var i = 0; i < 6; i++){
			ctx.save();
			ctx.beginPath();
			ctx.translate(canvasWidth / 2, canvasHeight / 2);
			ctx.scale(2, 0.85);
			ctx.arc(0, 0, 10 + 30 * i, 0, Math.PI * 2, true);
			ctx.fill();
			ctx.restore();
		}

		ctx.restore();
	} else{
		draw();
	}
};

var flashlight = function(){
	"use strict";

	var nameLength = name.length,
		x = (canvasWidth / 2) - (nameWidth / 2);

	if($("#canvas").hasClass("light")){
		$("#canvas").toggleClass("light");
	};

	$("#canvas").toggleClass("light");

	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

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

			lightOn = false;
			draw();
		});

		$("#randColorBtn").on("click", function(){
			console.log("Random Color Button clicked.");

			lightOn = false;
			randColor();
		});

		$("#lightSwitch").on("click", function(){
			console.log("Light Switch clicked.");

			lightOn = false;
			lightSwitch();
		});

		$("#flashLight").on("click", function(){
			console.log("Flash Light button clicked.");

			lightOn = true;
			flashlight();
		});

		canvas.addEventListener('mousemove', function(e){
			if(lightOn){
				ctx.clearRect(0, 0, canvasWidth, canvasHeight);
			    light.x = e.clientX;
			    light.y = e.clientY;
			    flashlight();
			    light.draw();
			}
});
	}
};

$(document).ready(main);