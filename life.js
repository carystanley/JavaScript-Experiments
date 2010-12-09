
function genesis(elem_name, world_size)
{
	var s = world_size;
	
	var scale = 5;
	var src = new Array();
	var dst = new Array();
	
	var c=document.getElementById(elem_name);
	c.width=c.height=s*scale;
	var X=c.getContext("2d");
	
	return {
		redraw: function() {
			var gone = dst; dst = src; src = gone;
			for(var y=0;y<s;y+=1){
		        for(var x=0;x<s;x+=1){
					var isalive = this.is_alive(src, x, y);
					X.fillStyle = (isalive)?"black":"white";  
					X.fillRect(x*scale, y*scale, scale-1, scale-1);
		        }
		    }
		},
		
		init: function() {

			for(var y=0;y<s;y+=1){
		        for(var x=0;x<s;x+=1){
					this.set_alive(dst, x, y, (Math.random() > 0.5));
		        }
		    }
			this.redraw();
		},

		update: function() {
	
			for(var y=0;y<s;y+=1){
		        for(var x=0;x<s;x+=1){ 
					var isalive = this.is_alive(src, x, y);
					var neighbors = this.calc_neighbors(src, x, y);
					if (isalive) {
						this.set_alive(dst, x, y, ((neighbors == 2) || (neighbors == 3)));
					} else {
						this.set_alive(dst, x, y, (neighbors == 3));
					} 
		        }
		    }

		    this.redraw();
		},
		
		calc_neighbors: function(map, x, y)
		{
			var total = 0;
			if (this.is_alive(map, x-1, y-1)) total++;
			if (this.is_alive(map, x,   y-1)) total++;
			if (this.is_alive(map, x+1, y-1)) total++;
			if (this.is_alive(map, x-1, y  )) total++;
			if (this.is_alive(map, x+1, y  )) total++;
			if (this.is_alive(map, x-1, y+1)) total++;
			if (this.is_alive(map, x  , y+1)) total++;
			if (this.is_alive(map, x+1, y+1)) total++;
			return total;
		},

		is_alive: function(map, x, y)
		{
			return (map[(y*s+x)] == true);
		},

		set_alive: function(map, x, y, value)
		{
			map[y*s+x] = value;
		}
	}
}

