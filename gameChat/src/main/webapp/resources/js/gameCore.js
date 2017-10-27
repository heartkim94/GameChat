let game;
let display;
$(function() {
	display = $("display");
	display.attr("tabindex", "0");
	display.focus();
	let t = new GameText(0, 0, "Game Demo", 17);
	let point = 0;
	let pointBox = new GameText(0, 20, "point: 0", 17);
	let o = new GameImage(32*8, 32*8, 32, 32, "green");
	let nodes = [o];
	let apple = new GameImage(32*4, 32*6, 32, 32, "red");
	o.direction = "left";
	
	$(display).on("click", function() {
		alert("clicked");
	})
	$(display).on("keydown", function(e) {
		e.stopPropagation();
		e.preventDefault();
		if(e.key== "ArrowLeft") {
			o.direction = "left";
		} else if(e.key == "ArrowRight") {
			o.direction = "right";
		} else if(e.key == "ArrowUp") {
			o.direction = "up";
		} else if(e.key == "ArrowDown") {
			o.direction = "down";
		}
		
		
	});
	
	let gameOver = false;
	let moveUnit = 32;
	setInterval(update, 100);
	function update() {
		if(!gameOver) {
			if(o.x < 0 || o.x + o.gameTag.width > 640
					|| o.y < 0 || o.y + o.gameTag.height > 480) {
				gameOver = true;
				return;
			}
			
			
			
			let node = null;
			if(o.checkCollapse(apple)) {
				apple.remove();
				point += 1;
				pointBox.gameTag.setText("point: "+point);
				apple = new GameImage(32*(randomInt(1, 640/32)-1), 32*(randomInt(1, 480/32)-1), 32, 32, "red");
				let last;
				if(nodes.length > 1) {
					last = nodes[nodes.length-1];					
				} else {
					last = o;
				}
				node = new GameImage(last.x, last.y, 32, 32, "green");
				node.direction = last.direction;
			}
			
			let prev = o.direction;
			let temp;
			nodes.forEach(function(node, index) {
				if(node.direction == "left") {
					node.move(-moveUnit, 0);
				} else if(node.direction == "right") {
					node.move(moveUnit, 0);
				} else if(node.direction == "up") {
					node.move(0, -moveUnit);
				} else if(node.direction == "down") {
					node.move(0, moveUnit);
				}
				temp = node.direction;
				node.direction = prev;
				prev = temp;
				if(node!=o && o.checkCollapse(node)) {
					gameOver = true;
					alert("game over");
					return;
				}
			});
			
			if(node!=null) {
				nodes.push(node);
			}
		}
	}
});

function test() {
	alert(game);
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function GameObject() {}
GameObject.prototype.remove = function() {
	$(this.gameTag.tag).remove();
}
GameObject.prototype.move = function(x, y) {
	this.x = this.x + x;
	this.y = this.y + y;
	this.gameTag.setPos(this.x, this.y);
}
GameObject.prototype.checkCollapse = function(o) {
	let x = this.x;
	let x2 = this.x + $(this.gameTag.tag).width();
	let y = this.y;
	let y2 = this.y + $(this.gameTag.tag).height();
	
	let ox = o.x;
	let ox2 = o.x + $(this.gameTag.tag).width();
	let oy = o.y;
	let oy2 = o.y + $(this.gameTag.tag).height();
	
	if((ox >= x && ox < x2)
	&& (oy >= y && oy < y2)) {
		return true;
	} else if((ox2 > x && ox2 < x2)
		   && (oy2 > y && oy2 < y2)) {
		return true;
	} else {
		return false;
	}
}

function GameImage(x, y, width, height, color) {
	this.x = x;
	this.y = y;
	this.gameTag = new ImageTag(width, height, color);
	this.gameTag.setPos(x, y);
}
GameImage.prototype = new GameObject();

function GameText(x, y, text, size) {
	this.x = x;
	this.y = y;
	this.gameTag = new TextTag(text, size);
	this.gameTag.setPos(x, y);
}
GameImage.prototype = new GameObject();

// GameResource
function GameTag(type) {
	this.type = type;
}
GameTag.prototype.setSize = function(width, height) {
	this.width = width;
	this.height = height;
	$(this.tag).css("width", width+"px");
	$(this.tag).css("height", height+"px");
}
GameTag.prototype.setPos = function(x, y) {
	$(this.tag).css("left", x+"px");
	$(this.tag).css("top", y+"px");
}
GameTag.prototype.setBg = function(bg) {
	$(this.tag).css("background", bg);
}
GameTag.prototype.create = function() {
	this.tag = document.createElement("GameTag");
	$(this.tag).addClass(this.type);
	$(this.tag).appendTo(display);
}

// ImageTag
function ImageTag(width, height, color) {
	this.create();
	this.width = width;
	this.height = height;
	this.setSize(width, height);
	this.setBg(color);
}
ImageTag.prototype = new GameTag("ImageTag");

// TextTag
function TextTag(text, size) {
	this.create();
	this.setText(text);
	this.setSize(size);
	$(this.tag).appendTo(display);
}
TextTag.prototype = new GameTag("TextTag");
TextTag.prototype.setText = function(text) {
	$(this.tag).text(text);
}
TextTag.prototype.setSize = function(size) {
	$(this.tag).css("font-size", size+"px");
}