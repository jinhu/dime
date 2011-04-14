Raphael.fn.connection = function (obj1, obj2, line, bg) {
    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
    }
    var bb1 = obj1.getBBox(),
        bb2 = obj2.getBBox(),
        p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
        {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
        {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
        {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
        {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
        {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
        {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
        {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
        d = {}, dis = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
    var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
    if (line && line.line) {
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
    } else {
        var color = typeof line == "string" ? line : "#000";
        return {
            bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
            line: this.path(path).attr({stroke: color, fill: "none"}),
            from: obj1,
            to: obj2
        };
    }
};

Raphael.fn.state = function (s) {
	var shape = this.ellipse(s.x,s.y, 30, 20);
	shape.attr({fill: "red", stroke: "blea", "fill-opacity": 0.5, "stroke-width": 2, cursor: "move"});
	return shape;
}
Raphael.fn.rule = function (r) {
	var shape = this.path(
	"M"+r.x+" "+r.y+
	"L"+(r.x+20)+" "+(r.y-20)+
	"H"+(r.x+60)+
	"L"+(r.x+80)+" "+(r.y)+
	"L"+(r.x+60)+" "+(r.y+20)+
	"H"+(r.x+20)+
	"L"+r.x+" "+r.y+"Z");
	shape.attr({fill: "red", stroke: "blea", "fill-opacity": 0.5, "stroke-width": 2, cursor: "move"});
	return shape;
}
Raphael.fn.action = function (r) {
	var shape = this.rect(r.x, r.y, 60, 40, 2);
	shape.attr({fill: "green", stroke: "#bfb", "fill-opacity": 0.5, "stroke-width": 2, cursor: "move"});
	return shape;
}
Raphael.fn.spliter = function (r) {
	var line;
	switch(r.type){
		case 'XOR_S':
		  line = this.path("M"+(r.x+30)+" "+r.y+" L"+(r.x+30)+" "+(r.y+40)+"M"+(r.x+60)+" "+(r.y+40)+"L"+(r.x+30)+" "+(r.y+20)+"L"+(r.x+60)+" "+(r.y)+"M"+r.x+" "+r.y+"H"+(r.x+60)+"V"+(r.y+40)+"H"+(r.x)+"V"+r.y+"Z");
		break;
		case 'XOR_E':
		  line = this.path("M"+(r.x+30)+" "+r.y+" L"+(r.x+30)+" "+(r.y+40)+"M"+(r.x)+" "+(r.y+40)+"L"+(r.x+30)+" "+(r.y+20)+"L"+(r.x)+" "+(r.y)+"M"+r.x+" "+r.y+"H"+(r.x+60)+"V"+(r.y+40)+"H"+(r.x)+"V"+r.y+"Z");
		break;
		case 'AND_S':
		  line = this.path("M"+(r.x+30)+" "+r.y+" L"+(r.x+30)+" "+(r.y+40)+"M"+(r.x+30)+" "+(r.y+40)+"L"+(r.x)+" "+(r.y+20)+"L"+(r.x+30)+" "+(r.y)+"M"+r.x+" "+r.y+"H"+(r.x+60)+"V"+(r.y+40)+"H"+(r.x)+"V"+r.y+"Z");
		break;
		case 'AND_E':
		  line = this.path("M"+(r.x+30)+" "+r.y+" L"+(r.x+30)+" "+(r.y+40)+"M"+(r.x+30)+" "+(r.y+40)+"L"+(r.x+60)+" "+(r.y+20)+"L"+(r.x+30)+" "+(r.y)+"M"+r.x+" "+r.y+"H"+(r.x+60)+"V"+(r.y+40)+"H"+(r.x)+"V"+r.y+"Z");
		break;
		default:
		  line = this.path("M"+(r.x+30)+" "+r.y+" L"+(r.x+30)+" "+(r.y+40)+"M"+(r.x+40)+" "+(r.y+40)+"L"+(r.x+30)+" "+(r.y+20)+"L"+(r.x+40)+" "+(r.y)+"M"+r.x+" "+r.y+"H"+(r.x+60)+"V"+(r.y+40)+"H"+(r.x)+"V"+r.y+"Z");
		break;
	}
	line.attr({fill: "cyan", stroke: "blue", "fill-opacity": 0.5, "stroke-width": 2, cursor: "move",x:r.x,y:r.y});
	return line;
}
var el;
window.onload = function () {
    var dragger = function () {
        this.ox = this.type == "ellipse" ? this.attr("cx") : this.attr("x") ;
        this.oy = this.type == "ellipse" ? this.attr("cy") : this.attr("y") ;
        this.animate({"fill-opacity": .2}, 500);
    },
        move = function (dx, dy) {
			if (this.type == "path") {
				this.translate(dx-this.x, dy-this.y);
				this.attr({x:dx, y:dy});
			}
			else {
				var att = this.type == "ellipse" ? {
					cx: this.ox + dx,
					cy: this.oy + dy
				} : {
					x: this.ox + dx,
					y: this.oy + dy
				};
				this.attr(att);
			}
            for (var i = connections.length; i--;) {
                r.connection(connections[i]);
            }
            r.safari();
        },
        up = function () {
            this.animate({"fill-opacity": 0}, 500);
        },
        r = Raphael("holder", 640, 480),
        connections = [],
        shapes = [  r.rule({x:100,y:100}),
                    r.state({x: 290,y: 80}),
                    r.spliter({x:290, y:180,type:'XOR_S'}),
                    r.spliter({x:450, y:100,type:'XOR_E'}),
                    r.spliter({x:450, y:150,type:'AND_S'}),
                    r.spliter({x:450, y:200,type:'AND_E'}),
                    r.action({x:350, y:200}),
                ];
        var color = Raphael.getColor();
    for (var i = 0, ii = shapes.length; i < ii; i++) {
        shapes[i].drag(move, dragger, up);
    }
    connections.push(r.connection(shapes[0], shapes[1], "#fff"));
    connections.push(r.connection(shapes[1], shapes[2], "#fff", "#fff|5"));
    connections.push(r.connection(shapes[1], shapes[3], "#000", "#fff"));
};