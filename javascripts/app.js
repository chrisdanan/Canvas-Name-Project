var canvas,
	ctx;

var draw = function(){
	"use strict";
	
	ctx.font = "5em helvetica";

	ctx.fillText("Vanessa", 100, 200);
};

var main = function(){
	"use strict";

	console.log("Hello Vane");

	canvas = document.getElementById("canvas");

	if(canvas.getContext){
		ctx = canvas.getContext("2d");

		draw();
	}
};

$(document).ready(main);