///////////////////字典//////////////////////
var block_Button_privateVar = "var &BI1&_state = 0; \n";
var block_Button_MainCode = "if (&BI1&){ \n 	$( \"#\" +&PI1& ).mousedown(function(){\n		&BI1&_state = 1;\n	});\n	$( \"#\" +&PI1&  ).mouseup(function(){\n		&BI1&_state = 0;\n	});\n	if (&BI1&_state){\n		&BO1& = true;\n	}else{\n		&BO2& = true;\n	}}\n";

var block_SetImg_MainCode = "if (&BI1&){ \n	$(\"#\" +&PI1&).attr(\"src\", &PI2&);\n	&BI1& = false;\n	&BO1& = true;\n}\n"

var block_MoveX_MainCode = "if (&BI1&){ \n	$(\"#\" +&PI1&).css(\"left\", parseInt($(\"#\" +&PI1&).css(\"left\"))+ parseInt(&PI2&));\n	&BI1& = false;\n	&BO1& = true;\n}\n"

var block_KeyWaiter_MainCode = "if (&BI1&){ \n$(\"body\").on(\"keydown\",function(e){ \nif (e.keyCode == &PI1&) &BO1& = true;\n});\n$(\"body\").on(\"keyup\",function(e){ \nif (e.keyCode == &PI1&) &BO2& = true;\n});\n}\n"


//$("#" +id_6).css("left",parseInt($("#" +id_6).css("left"))+5);
///////////////////字典//////////////////////
//var blockList = new Array("Button_0", "id_0", "", "", "", "", "SetImg_0", "id_1", "id_2", "", "", "", "Button_1", "id_3", "", "", "", "", "SetImg_1", "id_4", "id_5", "", "", "");
//var varList = new Array("id_0", "b1", "id_1", "im1", "id_2", "http://sandbox.runjs.cn/uploads/rs/244/f1gv147l/monster.png", "id_3", "b2", "id_4", "im1", "id_5", "http://sandbox.runjs.cn/uploads/rs/244/f1gv147l/hero.png");
//var linkList = new Array("Start", "Button_0_Start", "Button_0_bo0", "SetImg_0_Start", "Start", "Button_1_Start", "Button_1_bo0", "SetImg_1_Start");
var blockList = new Array();
var varList = new Array();
var linkList = new Array();

var finalCode = "";
var blockCode = "";
var privateVarCode = "";

function genjs() {
	//finalCode += 
	//gen block list
	for (var i = 0; i < blockList.length; i = i + 6) {
		//console.log(blockList[i]);
		var connectWithStart = false;
		//check connect with start
		for (var j = 0; j < linkList.length; j = j + 2) {
			//console.log(linkList[j] + "  "  + linkList[j+1] + " " + blockList[i]);
			if (linkList[j] == "Start") {
				if (linkList[j + 1] == blockList[i] + "_Start") {
					connectWithStart = true;
					//console.log(linkList[j] + " ! " + blockList[i]+ "_Start" + " " + linkList[j+1]);
				}
			}
		};

		//final result
		finalCode += "var " + blockList[i] + "_Start = " + connectWithStart + "; \n";

		//insert block code to buffer
		var blockCodeBuffer = "";
		//console.log(blockList[i].split("_")[0]);
		if (blockList[i].split("_")[0] == "Button") {
			blockCodeBuffer += block_Button_privateVar;
			blockCodeBuffer = blockCodeBuffer.replace(/&BI1&/g, blockList[i] + "_Start");
			finalCode += blockCodeBuffer;

			blockCodeBuffer = "";
			blockCodeBuffer += block_Button_MainCode;
		}
		if (blockList[i].split("_")[0] == "SetImg") blockCodeBuffer += block_SetImg_MainCode;
		if (blockList[i].split("_")[0] == "MoveX") blockCodeBuffer += block_MoveX_MainCode;

		if (blockList[i].split("_")[0] == "KeyWaiter") blockCodeBuffer += block_KeyWaiter_MainCode;

		//BI replace////////////////////////////////////////////
		blockCodeBuffer = blockCodeBuffer.replace(/&BI1&/g, blockList[i] + "_Start");
		//get PI value////////////////////////////////////////////
		// value name = varList[varList.indexOf(blockList[i+1])]
		if (blockList[i + 1] != "") blockCodeBuffer = blockCodeBuffer.replace(/&PI1&/g, varList[varList.indexOf(blockList[i + 1])]);
		if (blockList[i + 2] != "") blockCodeBuffer = blockCodeBuffer.replace(/&PI2&/g, varList[varList.indexOf(blockList[i + 2])]);
		if (blockList[i + 3] != "") blockCodeBuffer = blockCodeBuffer.replace(/&PI3&/g, varList[varList.indexOf(blockList[i + 3])]);
		if (blockList[i + 4] != "") blockCodeBuffer = blockCodeBuffer.replace(/&PI4&/g, varList[varList.indexOf(blockList[i + 4])]);
		if (blockList[i + 5] != "") blockCodeBuffer = blockCodeBuffer.replace(/&PI5&/g, varList[varList.indexOf(blockList[i + 5])]);
		//BO////////////////////////////////////////////
		var boBuffer = "";

		for (var j = 0; j < linkList.length; j = j + 2) {
			//console.log(linkList[j].split("_")[0] + "_" + linkList[j].split("_")[1]+ "      " + blockList[i] );
			if (linkList[j].split("_")[0] + "_" + linkList[j].split("_")[1] == blockList[i]) {

				if (linkList[j].split("_")[2] == "bo0") {
					boBuffer += linkList[j + 1] + ",";
					boBuffer = boBuffer.substring(0, boBuffer.length - 1);
					blockCodeBuffer = blockCodeBuffer.replace(/&BO1&/g, boBuffer);
					boBuffer = "";
				}

				if (linkList[j].split("_")[2] == "bo1") {
					boBuffer += linkList[j + 1] + ",";
					boBuffer = boBuffer.substring(0, boBuffer.length - 1);
					blockCodeBuffer = blockCodeBuffer.replace(/&BO2&/g, boBuffer);
					boBuffer = "";
				}
			}
		}

		blockCodeBuffer = blockCodeBuffer.replace(/&BO1&/g, "NULL");
		blockCodeBuffer = blockCodeBuffer.replace(/&BO2&/g, "NULL");
		blockCodeBuffer = blockCodeBuffer.replace(/&BO3&/g, "NULL");
		blockCodeBuffer = blockCodeBuffer.replace(/&BO4&/g, "NULL");
		blockCodeBuffer = blockCodeBuffer.replace(/&BO5&/g, "NULL");
		//console.log();
		//PO////////////////////////////////////////////
		//console.log();
		blockCode += blockCodeBuffer;
	};
	finalCode += "\n";
	//gen var list
	for (var i = 0; i < varList.length; i = i + 2) {
		finalCode += "var " + varList[i] + " = \"" + varList[i + 1] + "\"; \n";
	}
	finalCode += "\n";
	//add private var
	finalCode += privateVarCode;
	//add main function
	finalCode += "function check(){ \n"
	//User code
	finalCode += blockCode;
	//add end interval
	finalCode += " } \n window.setInterval(\"check()\",20);"

	console.log("=================TABLE====================");
	console.log(blockList);
	console.log(varList);
	console.log(linkList);
	console.log("=================CODE====================");
	console.log(finalCode);
}

////////////////////////GUI///////////////////////
////////////////////////GUI///////////////////////
////////////////////////GUI///////////////////////
////////////////////////GUI///////////////////////
var parameterTable = new Array;
var BBTable = new Array;
var LinkageTable = new Array;

var bbDict_Button_pi = [["int", 2, "digitalpin"], ["int", 0, "time"]];
var bbDict_LED_pi = [["int", 13, "digitalpin"]];
var bbDict_Switch_pi = [];

var blockCounter = 0;
var ParameterCounter = 0;

window.onload = function() {
	var r = Raphael("holder", 781, 496);
	//r.rect(0, 0, 619, 419, 10).attr({ fill: "#333333", stroke: "#666" }).toBack();
	r.image("image/BGImage.png", 0, 0, 781, 496);
	var lastMousePosX;
	var lastMousePosY;

	//牛逼的三张表 动态类型不用管尺寸
	function block_Start() {
		var body = r.image("image/Start.png", 185, 230, 100, 38);

		body.drag(function move(dx, dy, x, y) {
			line1.data[0][1] = this.attrs.x + 98;
			line1.data[0][2] = this.attrs.y + 20;
			line1.data[1][1] = x - 5;
			line1.data[1][2] = y - 5;
			line1.draw();

			//console.log(this.attrs.x, "  ", this.attrs.x, "  ", x, "  ", y);
			lastMousePosX = x - 5;
			lastMousePosY = y - 5;
		},
		function start(x, y) {
			// r.getElementByPoint()
			//console.log(x);
		},
		function end() {
			//console.log(lastMousePosX, "  ", lastMousePosY);
			//console.log(r.getElementByPoint(lastMousePosX, lastMousePosY));
			if (r.getElementByPoint(lastMousePosX, lastMousePosY).data("type") == "body" || r.getElementByPoint(lastMousePosX, lastMousePosY).data("PinName") == null) {
				//如果是模块body 就把线隐藏掉
				line1.data[0][1] = -1;
				line1.data[0][2] = -1;
				line1.data[1][1] = -1;
				line1.data[1][2] = -1;
				line1.draw();
			} else {
				//如果是pi 复制这条线
				var theNewOne = myLine.createNew(line1.data[0][1], line1.data[0][2], line1.data[1][1], line1.data[1][2]);

				//插入linkage表单数据
				//LinkageTable.push("Start", r.getElementByPoint(lastMousePosX, lastMousePosY).data("PinName"), "", "");
				linkList.push("Start", r.getElementByPoint(lastMousePosX, lastMousePosY).data("PinName"));
				console.log(linkList);
			}
		});
	}
	///////////////////Block Dict////////////////
	function block_Button(x, y, d1) {
		//绘制模块
		var init_x = x + 40;
		var init_y = y + 30;

		var data1 = (d1.split("_")[1])*2+1;

		var pi = r.set(
		//r.path("").attr({ fill: "#ec6d6d", stroke: "#00000000" }),
		r.image("image/UI_Block_Pin.png", init_x - 25, init_y - 45, 24, 20).data("paraPointer", data1));
		var bi = r.set(r.image("image/UI_Block_Pin.png", init_x - 55, init_y - 25, 24, 20).data("PinName", "Button_" + blockCounter + "_Start"));
		var bo = r.set(r.image("image/UI_Block_Pin.png", init_x + 35, init_y - 25, 24, 20).data("PinName", "Button_" + blockCounter + "_bo0"), 
			r.image("image/UI_Block_Pin.png", init_x + 35, init_y, 24, 20).data("PinName", "Button_" + blockCounter + "_bo1"));

		var piText = r.set(r.text(init_x - 15, init_y - 40, varList[data1]).attr({
			fill: "#FFFFFF"
		}));

		var body = r.rect(x, y, 80, 60).attr({
			fill: "#3b829c",
			stroke: "#2d2d2d",
			text: "Hello"
		});
		var bodyText = r.text(x + 40, y + 30, "Button").attr({
			fill: "#FFFFFF"
		});
		body.data("type", "body");

		//模块拖动
		body.drag(function move(dx, dy, x, y) {
			x1 = x - 25;
			y1 = y - 45;
			//PI
			pi[0].attr({
				x: x1,
				y: y1
			});
			piText[0].attr({
				x: x1 + 10,
				y: y1 + 5,
				text: varList[data1]
			});

			x2 = x - 55;
			y2 = y - 25;
			//BI
			bi[0].attr({
				x: x2,
				y: y2
			});

			x3 = x + 35;
			y3 = y - 25;
			//BO
			bo[0].attr({
				x: x3,
				y: y3
			});
			y3 += 30;
			bo[1].attr({
				x: x3,
				y: y3
			});

			this.attr({
				x: x - 40,
				y: y - 30
			}).toFront();
			bodyText.attr({
				x: x,
				y: y
			}).toFront();

		},
		function up() {
			this.dx = this.dy = 0;
		});
		//pi拖动
		pi.drag(function move(dx, dy, x, y) {
			line1.data[0][1] = this.attrs.x;
			line1.data[0][2] = this.attrs.y;
			line1.data[1][1] = x;
			line1.data[1][2] = y;
			line1.draw();
			lastMousePosX = x;
			lastMousePosY = y;
		},
		function start(x, y) {
		},
		function end() {
			if (r.getElementByPoint(lastMousePosX, lastMousePosY).data("type") == "body" || r.getElementByPoint(lastMousePosX, lastMousePosY).data("PinName") == null) {
				//如果是模块body 就把线隐藏掉
				line1.data[0][1] = -1;
				line1.data[0][2] = -1;
				line1.data[1][1] = -1;
				line1.data[1][2] = -1;
				line1.draw();
			} else {
				//如果是pi 复制这条线
				var theNewOne = myLine.createNew(line1.data[0][1], line1.data[0][2], line1.data[1][1], line1.data[1][2]);

			}
		});
		pi.dblclick(function dbclick() {
			//console.log(this.data("paraPointer"));
			//alert(this);
			var data = prompt("Input:", "");

			varList[this.data("paraPointer")] = data;
			piText[0].attr({
				text: varList[data1]
			});

		});
		//bo拖动
		bo.drag(function move(dx, dy, x, y) {
			line1.data[0][1] = this.attrs.x + 25;
			line1.data[0][2] = this.attrs.y + 10;
			line1.data[1][1] = x - 5;
			line1.data[1][2] = y - 5;
			line1.draw();

			//console.log(this.attrs.x, "  ", this.attrs.x, "  ", x, "  ", y);
			lastMousePosX = x - 5;
			lastMousePosY = y  - 5;
		},
		function start(x, y) {
			// r.getElementByPoint()
			//console.log(x);
		},
		function end() {
			//console.log(lastMousePosX, "  ", lastMousePosY);
			//console.log(r.getElementByPoint(lastMousePosX, lastMousePosY));
			if (r.getElementByPoint(lastMousePosX, lastMousePosY).data("type") == "body" || r.getElementByPoint(lastMousePosX, lastMousePosY).data("PinName") == null) {
				//如果是模块body 就把线隐藏掉
				line1.data[0][1] = -1;
				line1.data[0][2] = -1;
				line1.data[1][1] = -1;
				line1.data[1][2] = -1;
				line1.draw();
			} else {
				//如果是pi 复制这条线
				var theNewOne = myLine.createNew(line1.data[0][1], line1.data[0][2], line1.data[1][1], line1.data[1][2]);

				//插入linkage表单数据
				//LinkageTable.push(this.data("PinName"), r.getElementByPoint(lastMousePosX, lastMousePosY).data("PinName"), "", "");
				linkList.push(this.data("PinName"), r.getElementByPoint(lastMousePosX, lastMousePosY).data("PinName"));
				console.log(linkList);
			}
		});
	}

	function block_SetImg(x, y, d1,d2) {
		//绘制模块
		var init_x = x + 40;
		var init_y = y + 30;

		var data1 = (d1.split("_")[1])*2+1;
		var data2 = (d2.split("_")[1])*2+1;

		var pi = r.set(
		r.image("image/UI_Block_Pin.png", init_x - 25, init_y - 45, 24, 20).data("paraPointer", data1),
		r.image("image/UI_Block_Pin.png", init_x - 25 +30, init_y - 45, 24, 20).data("paraPointer", data2)
		);
		var bi = r.set(r.image("image/UI_Block_Pin.png", init_x - 55, init_y - 25, 24, 20).data("PinName", "SetImg_" + blockCounter + "_Start"));
		var bo = r.set(r.image("image/UI_Block_Pin.png", init_x + 35, init_y - 25, 24, 20).data("PinName", "SetImg_" + blockCounter + "_bo0"));

		var piText = r.set(r.text(init_x - 15, init_y - 40, varList[data1]).attr({fill: "#FFFFFF"}),
				r.text(init_x - 15 +30, init_y - 40, varList[data2]).attr({fill: "#FFFFFF"})
			);

		var body = r.rect(x, y, 80, 60).attr({
			fill: "#3b829c",
			stroke: "#2d2d2d",
			text: "Hello"
		});
		var bodyText = r.text(x + 40, y + 30, "SetImg").attr({
			fill: "#FFFFFF"
		});
		body.data("type", "body");

		//模块拖动
		body.drag(function move(dx, dy, x, y) {
			x1 = x - 25;
			y1 = y - 45;
			//PI
			pi[0].attr({
				x: x1,
				y: y1
			});
			piText[0].attr({
				x: x1 + 10,
				y: y1 + 5,
				text: varList[data1]
			});

			x1 += 30;
            pi[1].attr({
				x: x1,
				y: y1
			});
			piText[1].attr({
				x: x1 + 10,
				y: y1 + 5,
				text: varList[data2]
			});

			x2 = x - 55;
			y2 = y - 25;
			//BI
			bi[0].attr({
				x: x2,
				y: y2
			});

			x3 = x + 35;
			y3 = y - 25;
			//BO
			bo[0].attr({
				x: x3,
				y: y3
			});
	

			this.attr({
				x: x - 40,
				y: y - 30
			}).toFront();
			bodyText.attr({
				x: x,
				y: y
			}).toFront();

		},
		function up() {
			this.dx = this.dy = 0;
		});
		//pi拖动
		pi.drag(function move(dx, dy, x, y) {
			line1.data[0][1] = this.attrs.x;
			line1.data[0][2] = this.attrs.y;
			line1.data[1][1] = x;
			line1.data[1][2] = y;
			line1.draw();
			lastMousePosX = x;
			lastMousePosY = y;
		},
		function start(x, y) {
		},
		function end() {
			if (r.getElementByPoint(lastMousePosX, lastMousePosY).data("type") == "body" || r.getElementByPoint(lastMousePosX, lastMousePosY).data("PinName") == null) {
				//如果是模块body 就把线隐藏掉
				line1.data[0][1] = -1;
				line1.data[0][2] = -1;
				line1.data[1][1] = -1;
				line1.data[1][2] = -1;
				line1.draw();
			} else {
				//如果是pi 复制这条线
				var theNewOne = myLine.createNew(line1.data[0][1], line1.data[0][2], line1.data[1][1], line1.data[1][2]);

			}
		});
		pi.dblclick(function dbclick() {
			//console.log(this.data("paraPointer"));
			//alert(this);
			var data = prompt("Input:", "");

			varList[this.data("paraPointer")] = data;
			piText[0].attr({
				text: varList[data1]
			});

		});
		//bo拖动
		bo.drag(function move(dx, dy, x, y) {
			line1.data[0][1] = this.attrs.x + 25;
			line1.data[0][2] = this.attrs.y + 10;
			line1.data[1][1] = x - 5;
			line1.data[1][2] = y - 5;
			line1.draw();

			//console.log(this.attrs.x, "  ", this.attrs.x, "  ", x, "  ", y);
			lastMousePosX = x - 5;
			lastMousePosY = y  - 5;
		},
		function start(x, y) {
			// r.getElementByPoint()
			//console.log(x);
		},
		function end() {
			//console.log(lastMousePosX, "  ", lastMousePosY);
			//console.log(r.getElementByPoint(lastMousePosX, lastMousePosY));
			if (r.getElementByPoint(lastMousePosX, lastMousePosY).data("type") == "body" || r.getElementByPoint(lastMousePosX, lastMousePosY).data("PinName") == null) {
				//如果是模块body 就把线隐藏掉
				line1.data[0][1] = -1;
				line1.data[0][2] = -1;
				line1.data[1][1] = -1;
				line1.data[1][2] = -1;
				line1.draw();
			} else {
				//如果是pi 复制这条线
				var theNewOne = myLine.createNew(line1.data[0][1], line1.data[0][2], line1.data[1][1], line1.data[1][2]);

				//插入linkage表单数据
				//LinkageTable.push(this.data("PinName"), r.getElementByPoint(lastMousePosX, lastMousePosY).data("PinName"), "", "");
				linkList.push(this.data("PinName"), r.getElementByPoint(lastMousePosX, lastMousePosY).data("PinName"));
				console.log(linkList);
			}
		});
	}

	function block_MoveX(x, y, d1,d2) {
		//绘制模块
		var init_x = x + 40;
		var init_y = y + 30;

		var data1 = (d1.split("_")[1])*2+1;
		var data2 = (d2.split("_")[1])*2+1;

		var pi = r.set(
		r.image("image/UI_Block_Pin.png", init_x - 25, init_y - 45, 24, 20).data("paraPointer", data1),
		r.image("image/UI_Block_Pin.png", init_x - 25 +30, init_y - 45, 24, 20).data("paraPointer", data2)
		);
		var bi = r.set(r.image("image/UI_Block_Pin.png", init_x - 55, init_y - 25, 24, 20).data("PinName", "MoveX_" + blockCounter + "_Start"));
		var bo = r.set(r.image("image/UI_Block_Pin.png", init_x + 35, init_y - 25, 24, 20).data("PinName", "MoveX_" + blockCounter + "_bo0"));

		var piText = r.set(r.text(init_x - 15, init_y - 40, varList[data1]).attr({fill: "#FFFFFF"}),
				r.text(init_x - 15 +30, init_y - 40, varList[data2]).attr({fill: "#FFFFFF"})
			);

		var body = r.rect(x, y, 80, 60).attr({
			fill: "#3b829c",
			stroke: "#2d2d2d",
			text: "Hello"
		});
		var bodyText = r.text(x + 40, y + 30, "MoveX").attr({
			fill: "#FFFFFF"
		});
		body.data("type", "body");

		//模块拖动
		body.drag(function move(dx, dy, x, y) {
			x1 = x - 25;
			y1 = y - 45;
			//PI
			pi[0].attr({
				x: x1,
				y: y1
			});
			piText[0].attr({
				x: x1 + 10,
				y: y1 + 5,
				text: varList[data1]
			});

			x1 += 30;
            pi[1].attr({
				x: x1,
				y: y1
			});
			piText[1].attr({
				x: x1 + 10,
				y: y1 + 5,
				text: varList[data2]
			});

			x2 = x - 55;
			y2 = y - 25;
			//BI
			bi[0].attr({
				x: x2,
				y: y2
			});

			x3 = x + 35;
			y3 = y - 25;
			//BO
			bo[0].attr({
				x: x3,
				y: y3
			});
	

			this.attr({
				x: x - 40,
				y: y - 30
			}).toFront();
			bodyText.attr({
				x: x,
				y: y
			}).toFront();

		},
		function up() {
			this.dx = this.dy = 0;
		});
		//pi拖动
		pi.drag(function move(dx, dy, x, y) {
			line1.data[0][1] = this.attrs.x;
			line1.data[0][2] = this.attrs.y;
			line1.data[1][1] = x;
			line1.data[1][2] = y;
			line1.draw();
			lastMousePosX = x;
			lastMousePosY = y;
		},
		function start(x, y) {
		},
		function end() {
			if (r.getElementByPoint(lastMousePosX, lastMousePosY).data("type") == "body" || r.getElementByPoint(lastMousePosX, lastMousePosY).data("PinName") == null) {
				//如果是模块body 就把线隐藏掉
				line1.data[0][1] = -1;
				line1.data[0][2] = -1;
				line1.data[1][1] = -1;
				line1.data[1][2] = -1;
				line1.draw();
			} else {
				//如果是pi 复制这条线
				var theNewOne = myLine.createNew(line1.data[0][1], line1.data[0][2], line1.data[1][1], line1.data[1][2]);

			}
		});
		pi.dblclick(function dbclick() {
			//console.log(this.data("paraPointer"));
			//alert(this);
			var data = prompt("Input:", "");

			varList[this.data("paraPointer")] = data;
			piText[0].attr({
				text: varList[data1]
			});

		});
		//bo拖动
		bo.drag(function move(dx, dy, x, y) {
			line1.data[0][1] = this.attrs.x + 25;
			line1.data[0][2] = this.attrs.y + 10;
			line1.data[1][1] = x - 5;
			line1.data[1][2] = y - 5;
			line1.draw();

			//console.log(this.attrs.x, "  ", this.attrs.x, "  ", x, "  ", y);
			lastMousePosX = x - 5;
			lastMousePosY = y  - 5;
		},
		function start(x, y) {
			// r.getElementByPoint()
			//console.log(x);
		},
		function end() {
			//console.log(lastMousePosX, "  ", lastMousePosY);
			//console.log(r.getElementByPoint(lastMousePosX, lastMousePosY));
			if (r.getElementByPoint(lastMousePosX, lastMousePosY).data("type") == "body" || r.getElementByPoint(lastMousePosX, lastMousePosY).data("PinName") == null) {
				//如果是模块body 就把线隐藏掉
				line1.data[0][1] = -1;
				line1.data[0][2] = -1;
				line1.data[1][1] = -1;
				line1.data[1][2] = -1;
				line1.draw();
			} else {
				//如果是pi 复制这条线
				var theNewOne = myLine.createNew(line1.data[0][1], line1.data[0][2], line1.data[1][1], line1.data[1][2]);

				//插入linkage表单数据
				//LinkageTable.push(this.data("PinName"), r.getElementByPoint(lastMousePosX, lastMousePosY).data("PinName"), "", "");
				linkList.push(this.data("PinName"), r.getElementByPoint(lastMousePosX, lastMousePosY).data("PinName"));
				console.log(linkList);
			}
		});
	}


	function block_KeyWaiter(x, y, d1) {
		//绘制模块
		var init_x = x + 40;
		var init_y = y + 30;

		var data1 = (d1.split("_")[1])*2+1;

		var pi = r.set(
		//r.path("").attr({ fill: "#ec6d6d", stroke: "#00000000" }),
		r.image("image/UI_Block_Pin.png", init_x - 25, init_y - 45, 24, 20).data("paraPointer", data1));
		var bi = r.set(r.image("image/UI_Block_Pin.png", init_x - 55, init_y - 25, 24, 20).data("PinName", "KeyWaiter_" + blockCounter + "_Start"));
		var bo = r.set(r.image("image/UI_Block_Pin.png", init_x + 35, init_y - 25, 24, 20).data("PinName", "KeyWaiter_" + blockCounter + "_bo0"), 
			r.image("image/UI_Block_Pin.png", init_x + 35, init_y, 24, 20).data("PinName", "Button_" + blockCounter + "_bo1"));

		var piText = r.set(r.text(init_x - 15, init_y - 40, varList[data1]).attr({
			fill: "#FFFFFF"
		}));

		var body = r.rect(x, y, 80, 60).attr({
			fill: "#3b829c",
			stroke: "#2d2d2d",
			text: "Hello"
		});
		var bodyText = r.text(x + 40, y + 30, "KeyWaiter").attr({
			fill: "#FFFFFF"
		});
		body.data("type", "body");

		//模块拖动
		body.drag(function move(dx, dy, x, y) {
			x1 = x - 25;
			y1 = y - 45;
			//PI
			pi[0].attr({
				x: x1,
				y: y1
			});
			piText[0].attr({
				x: x1 + 10,
				y: y1 + 5,
				text: varList[data1]
			});

			x2 = x - 55;
			y2 = y - 25;
			//BI
			bi[0].attr({
				x: x2,
				y: y2
			});

			x3 = x + 35;
			y3 = y - 25;
			//BO
			bo[0].attr({
				x: x3,
				y: y3
			});
			y3 += 30;
			bo[1].attr({
				x: x3,
				y: y3
			});

			this.attr({
				x: x - 40,
				y: y - 30
			}).toFront();
			bodyText.attr({
				x: x,
				y: y
			}).toFront();

		},
		function up() {
			this.dx = this.dy = 0;
		});
		//pi拖动
		pi.drag(function move(dx, dy, x, y) {
			line1.data[0][1] = this.attrs.x;
			line1.data[0][2] = this.attrs.y;
			line1.data[1][1] = x;
			line1.data[1][2] = y;
			line1.draw();
			lastMousePosX = x;
			lastMousePosY = y;
		},
		function start(x, y) {
		},
		function end() {
			if (r.getElementByPoint(lastMousePosX, lastMousePosY).data("type") == "body" || r.getElementByPoint(lastMousePosX, lastMousePosY).data("PinName") == null) {
				//如果是模块body 就把线隐藏掉
				line1.data[0][1] = -1;
				line1.data[0][2] = -1;
				line1.data[1][1] = -1;
				line1.data[1][2] = -1;
				line1.draw();
			} else {
				//如果是pi 复制这条线
				var theNewOne = myLine.createNew(line1.data[0][1], line1.data[0][2], line1.data[1][1], line1.data[1][2]);

			}
		});
		pi.dblclick(function dbclick() {
			//console.log(this.data("paraPointer"));
			//alert(this);
			var data = prompt("Input:", "");

			varList[this.data("paraPointer")] = data;
			piText[0].attr({
				text: varList[data1]
			});

		});
		//bo拖动
		bo.drag(function move(dx, dy, x, y) {
			line1.data[0][1] = this.attrs.x + 25;
			line1.data[0][2] = this.attrs.y + 10;
			line1.data[1][1] = x - 5;
			line1.data[1][2] = y - 5;
			line1.draw();

			//console.log(this.attrs.x, "  ", this.attrs.x, "  ", x, "  ", y);
			lastMousePosX = x - 5;
			lastMousePosY = y  - 5;
		},
		function start(x, y) {
			// r.getElementByPoint()
			//console.log(x);
		},
		function end() {
			//console.log(lastMousePosX, "  ", lastMousePosY);
			//console.log(r.getElementByPoint(lastMousePosX, lastMousePosY));
			if (r.getElementByPoint(lastMousePosX, lastMousePosY).data("type") == "body" || r.getElementByPoint(lastMousePosX, lastMousePosY).data("PinName") == null) {
				//如果是模块body 就把线隐藏掉
				line1.data[0][1] = -1;
				line1.data[0][2] = -1;
				line1.data[1][1] = -1;
				line1.data[1][2] = -1;
				line1.draw();
			} else {
				//如果是pi 复制这条线
				var theNewOne = myLine.createNew(line1.data[0][1], line1.data[0][2], line1.data[1][1], line1.data[1][2]);

				//插入linkage表单数据
				//LinkageTable.push(this.data("PinName"), r.getElementByPoint(lastMousePosX, lastMousePosY).data("PinName"), "", "");
				linkList.push(this.data("PinName"), r.getElementByPoint(lastMousePosX, lastMousePosY).data("PinName"));
				console.log(linkList);
			}
		});
	}
///////////////////Block Dict////////////////

	var myLine = {
		createNew: function(ax, ay, bx, by) {
			var line = {};

			line.A = "";
			line.B = "";
			line.data = [["M", ax, ay], ["L", bx, by]];
			var linebody = r.path(line.data).attr({
				stroke: "3b829c",
				"stroke-width": 4,
				"stroke-linecap": "round"
			});

			line.draw = function() {
				linebody.attr({
					path: line.data
				});;
			};

			return line;

		}
	}

	bbList_Button = r.set(r.image("image/bblist_ButtonWaiter.png", 20, 35, 148, 46).drag(function move(dx, dy, x, y) {
		this.attr({
			x: x,
			y: y
		});
		lastMousePosX = x;
		lastMousePosY = y;
	},
	function start() {},
	function end() {
		this.attr({
			x: 20,
			y: 35
		});

		//插入表单数据
		var parameterPointer = new Array(10);
		for (var i = 0; i < bbDict_Button_pi.length; i++) {
			//console.log();
			//parameterTable.push(ParameterCounter, bbDict_Button_pi[i][0], "", bbDict_Button_pi[i][1], "", bbDict_Button_pi[i][2], "");
			varList.push("id_"+ ParameterCounter, bbDict_Button_pi[i][1]);
			parameterPointer[i] = "id_"+ ParameterCounter;
			ParameterCounter++;
		}

		//BBTable.push("", "KitButton_" + blockCounter, "KitButton", "", parameterPointer[0], parameterPointer[1], parameterPointer[2], parameterPointer[3], parameterPointer[4], parameterPointer[5], parameterPointer[6], parameterPointer[7], parameterPointer[8], parameterPointer[9], "");
		blockList.push("Button_" + blockCounter, parameterPointer[0], parameterPointer[1], parameterPointer[2], parameterPointer[3], parameterPointer[4]);
		block_Button(lastMousePosX, lastMousePosY, parameterPointer[0], parameterPointer[1]);

		blockCounter++;
	}));

	bbList_SetImg = r.set(r.image("image/bblist_SetImg.png", 20, 85, 148, 46).drag(function move(dx, dy, x, y) {
		this.attr({
			x: x,
			y: y
		});
		lastMousePosX = x;
		lastMousePosY = y;
	},
	function start() {},
	function end() {
		this.attr({
			x: 20,
			y: 85
		});

		//插入表单数据
		var parameterPointer = new Array(10);
		for (var i = 0; i < bbDict_Button_pi.length; i++) {
			//console.log();
			//parameterTable.push(ParameterCounter, bbDict_Button_pi[i][0], "", bbDict_Button_pi[i][1], "", bbDict_Button_pi[i][2], "");
			varList.push("id_"+ ParameterCounter, bbDict_Button_pi[i][1]);
			parameterPointer[i] = "id_"+ ParameterCounter;
			ParameterCounter++;
		}

		//BBTable.push("", "KitButton_" + blockCounter, "KitButton", "", parameterPointer[0], parameterPointer[1], parameterPointer[2], parameterPointer[3], parameterPointer[4], parameterPointer[5], parameterPointer[6], parameterPointer[7], parameterPointer[8], parameterPointer[9], "");
		blockList.push("SetImg_" + blockCounter, parameterPointer[0], parameterPointer[1], parameterPointer[2], parameterPointer[3], parameterPointer[4]);
		block_SetImg(lastMousePosX, lastMousePosY, parameterPointer[0], parameterPointer[1]);

		blockCounter++;
	}));

	bbList_MoveX = r.set(r.image("image/bblist_MoveX.png", 20, 135, 148, 46).drag(function move(dx, dy, x, y) {
		this.attr({
			x: x,
			y: y
		});
		lastMousePosX = x;
		lastMousePosY = y;
	},
	function start() {},
	function end() {
		this.attr({
			x: 20,
			y: 135
		});

		//插入表单数据
		var parameterPointer = new Array(10);
		for (var i = 0; i < bbDict_Button_pi.length; i++) {
			//console.log();
			//parameterTable.push(ParameterCounter, bbDict_Button_pi[i][0], "", bbDict_Button_pi[i][1], "", bbDict_Button_pi[i][2], "");
			varList.push("id_"+ ParameterCounter, bbDict_Button_pi[i][1]);
			parameterPointer[i] = "id_"+ ParameterCounter;
			ParameterCounter++;
		}

		//BBTable.push("", "KitButton_" + blockCounter, "KitButton", "", parameterPointer[0], parameterPointer[1], parameterPointer[2], parameterPointer[3], parameterPointer[4], parameterPointer[5], parameterPointer[6], parameterPointer[7], parameterPointer[8], parameterPointer[9], "");
		blockList.push("MoveX_" + blockCounter, parameterPointer[0], parameterPointer[1], parameterPointer[2], parameterPointer[3], parameterPointer[4]);
		block_MoveX(lastMousePosX, lastMousePosY, parameterPointer[0], parameterPointer[1]);

		blockCounter++;
	}));

	bbList_KeyWaiter = r.set(r.image("image/bblist_keyWaiter.png", 20, 175, 148, 46).drag(function move(dx, dy, x, y) {
		this.attr({
			x: x,
			y: y
		});
		lastMousePosX = x;
		lastMousePosY = y;
	},
	function start() {},
	function end() {
		this.attr({
			x: 20,
			y: 175
		});

		//插入表单数据
		var parameterPointer = new Array(10);
		for (var i = 0; i < bbDict_Button_pi.length; i++) {
			//console.log();
			//parameterTable.push(ParameterCounter, bbDict_Button_pi[i][0], "", bbDict_Button_pi[i][1], "", bbDict_Button_pi[i][2], "");
			varList.push("id_"+ ParameterCounter, bbDict_Button_pi[i][1]);
			parameterPointer[i] = "id_"+ ParameterCounter;
			ParameterCounter++;
		}

		//BBTable.push("", "KitButton_" + blockCounter, "KitButton", "", parameterPointer[0], parameterPointer[1], parameterPointer[2], parameterPointer[3], parameterPointer[4], parameterPointer[5], parameterPointer[6], parameterPointer[7], parameterPointer[8], parameterPointer[9], "");
		blockList.push("KeyWaiter_" + blockCounter, parameterPointer[0], parameterPointer[1], parameterPointer[2], parameterPointer[3], parameterPointer[4]);
		block_KeyWaiter(lastMousePosX, lastMousePosY, parameterPointer[0], parameterPointer[1]);

		blockCounter++;
	}));

	var line1 = myLine.createNew(0, 0, 0, 0);
	block_Start();
}