var Boid = function ( x, y, angle ) {
    this.x = x;
    this.y = y;

    this.angle = Math.pow( Math.random(), 20 ) + angle;
    this.dx = Math.cos( this.angle );
    this.dy = Math.sin( this.angle );

    this.life = Math.random() * 100 + 100;
    this.dead = false;

    this.update = function () {

	    context.strokeStyle = '#575BAD21';
	    context.beginPath();
	    context.moveTo( this.x, this.y );

	    this.x += this.dx * 2;
	    this.y += this.dy * 2;
	    this.life -= 1;

	    context.lineTo( this.x, this.y );
	    context.stroke();

	    var index = ( Math.floor( this.x ) + width * Math.floor( this.y ) ) * 4;

	    if ( this.life <= 0 ) this.kill();
	    if ( data[ index + 3 ] > 0 ) this.kill();

	    if ( this.x < 0 || this.x > width ) this.kill();						
	    if ( this.y < 0 || this.y > height ) this.kill();

    }

    this.kill = function () {

	    boids.splice( boids.indexOf( this ), 1 );
	    this.dead = true;

    }

}

var width = window.innerWidth;
var height = window.innerHeight;

var canvas = document.getElementById( 'world' );
canvas.width = width;
canvas.height = height;

var context = canvas.getContext( '2d' );
var image, data;

var boids = [];
boids.push( new Boid( width / 2, height / 2, Math.random() * 180 * Math.PI / 180 ) );

setInterval( function () {

    image = context.getImageData( 0, 0, width, height );
    data = image.data;

    for ( var i = 0; i < boids.length; i ++ ) {

	    var boid = boids[ i ];
	    boid.update();

	    if ( !boid.dead && Math.random() > 0.5 && boids.length < 500 ) {

		    boids.push( new Boid( boid.x, boid.y, ( Math.random() > 0.5 ? 90 : - 90 ) * Math.PI / 180 + boid.angle ) );

	    }

    }

}, 1000 / 60 );

//背景2
(function () {
	const canvas = document.getElementById("lines");
	const ctx = canvas.getContext("2d");
	let width;
	let height;
	class Line {
	  constructor(origin, size, length, color, style = "pattern") {
		this.size = size;
		this.origin = origin;
		this.length = length;
		this.color = color;
		this.style = style;
		this.origin = `M${origin.x},${origin.y}`;
		this.offSet = 0;
		this.line = null;
		this.offSetSpeed = length / size;
	  }
	  getColorString() {
		return `hsla(${this.color.h}deg,${this.color.s}%,${this.color.l}%,${this.color.a})`;
	  }
	  generators() {
		return [
		  {
			line: `h${this.size}`,
			mag: this.size
		  },
		  {
			line: `h-${this.size}`,
			mag: this.size
		  },
		  {
			line: `v${this.size}`,
			mag: this.size
		  },
		  {
			line: `v-${this.size}`,
			mag: this.size
		  },
		  {
			line: `l${this.size},${this.size}`,
			mag: Math.hypot(this.size, this.size)
		  },
		  {
			line: `l${this.size}-${this.size}`,
			mag: Math.hypot(this.size, this.size)
		  },
		  {
			line: `l-${this.size},${this.size}`,
			mag: Math.hypot(this.size, this.size)
		  },
		  {
			line: `l-${this.size}-${this.size}`,
			mag: Math.hypot(this.size, this.size)
		  }
		];
	  }
	  generate() {
		let segments = this.generators(this.size);
		let path = this.origin;
		let mag = 0;
		let fragment;
		let i;
		for (i = 0; i < this.length; i += 1) {
		  fragment = segments[(Math.random() * segments.length) | 0];
		  path += ` ${fragment.line}`;
		  mag += fragment.mag;
		}
		this.line = {
		  path,
		  mag
		};
		return this;
	  }
	  renderStyle(style) {
		if (style === "glitches") {
		  ctx.lineDashOffset = this.line.mag + this.offSet;
		  ctx.setLineDash([
			this.size ** 1.5,
			(this.line.mag / this.length) * this.size ** 2
		  ]);
		  this.offSet += 20;
		  // this.size / (this.size ** 2);
		  ctx.lineWidth = 2;
		  return this;
		}
		if (style === "pattern") {
		  ctx.lineDashOffset = this.line.mag - this.offSet;
		  ctx.setLineDash([this.line.mag, this.line.mag]);
		  this.offSet += 10;
		  //this.size / (this.size ** 100);
		  ctx.lineWidth = 0.2;
		}
	  }
	  mutatePath() {
		let lineFragment = this.line.path.split(" ").slice(1);
		let generator = this.generators();
		lineFragment[(Math.random() * lineFragment.length) | 0] =
		  generator[(Math.random() * generator.length) | 0].line;
		this.line.path = `${this.line.path.split(" ")[0]} ${lineFragment.join(
		  " "
		)}`;
	  }
	  draw() {
		!this.line && this.generate();
  
		ctx.strokeStyle = this.getColorString();
		this.renderStyle(this.style);
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.stroke(new Path2D(this.line.path));
		return this;
	  }
	}
	function clear() {
	  ctx.fillStyle = `hsla(235deg, 13%, 18%, 0.1)`;
	  ctx.fillRect(0, 0, width, height);
	}
	function generateLines(amount) {
	  let lines = [];
	  let styles = [
		{
		  size: 1.25,
		  style: "pattern",
		  color: { h: 210, s: 100, l: 70, a: 0.5 }
		},
		{ size: 2.5, style: "pattern", color: { h: 190, s: 90, l: 50, a: 0.3 } },
		{ size: 5, style: "pattern", color: { h: 210, s: 70, l: 60, a: 0.2 } },
		{ size: 10, style: "pattern", color: { h: 310, s: 80, l: 55, a: 0.15 } },
		{ size: 20, style: "pattern", color: { h: 200, s: 25, l: 35, a: 0.12 } },
		{ size: 20, style: "pattern", color: { h: 210, s: 20, l: 40, a: 0.12 } },
		{ size: 40, style: "pattern", color: { h: 190, s: 40, l: 50, a: 0.12 } },
		{ size: 80, style: "pattern", color: { h: 220, s: 50, l: 60, a: 0.12 } },
		{ size: 40, style: "glitches", color: { h: 300, s: 100, l: 50, a: 0.3 } },
		{ size: 20, style: "glitches", color: { h: 210, s: 100, l: 50, a: 0.3 } },
		{ size: 60, style: "glitches", color: { h: 30, s: 100, l: 50, a: 0.3 } }
	  ];
	  for (let i = 0; i < amount; i += 1) {
		let style = styles[(Math.random() ** 2 * styles.length) | 0];
		lines.push(
		  new Line(
			{ x: width * 0.5, y: height * 0.5 },
			style.size,
			500 + Math.random() * 1000,
			style.color,
			style.style
		  )
		);
	  }
	  return lines;
	}
	let id;
	function resize() {
	  id = cancelAnimationFrame(id);
	  width = window.innerWidth;
	  height = window.innerHeight;
	  canvas.width = width;
	  canvas.height = height;
	  const lines = generateLines(40);
	  function update() {
		if (!(id % 3)) {
		  clear();
		  lines.forEach((line) => {
			line.draw();
			if (!(id % 5) && Math.random() > 0.95) {
			  line.mutatePath();
			}
		  });
		}
		id = requestAnimationFrame(update);
	  }
	  id = requestAnimationFrame(update);
	}
	window.addEventListener("resize", resize, {
	  passive: true
	});
	resize();
  })();
  
  //背景3  这个可用
  const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const RESOLUTION = 1;

let w = canvas.width = window.innerWidth * RESOLUTION;
let h = canvas.height = window.innerHeight * RESOLUTION;

const PARTICLE_COUNT = 400;
const CONNECT_DISTANCE = w * 0.05;
const FORCE_DISTANCE = w * 0.1;

const r = (n = 1) => Math.random() * n;
const PI = Math.PI;
const TAU = PI * 2;

let time = new Date;

const lerp = (start, end, amt) => {
  return (1-amt)*start+amt*end
};

const distance = (x1, y1, x2, y2) => {
	const a = x1 - x2;
	const b = y1 - y2;
	return Math.sqrt( a*a + b*b );
};

const angle = (cx, cy, ex, ey) => {
  return Math.atan2(ey - cy, ex - cx);
};

const particlePrototype = () => ({
  x: w * 0.5 + (Math.cos(r(TAU)) * r(w* 0.5)),
  y: h * 0.5 + (Math.sin(r(TAU)) * r(h* 0.5)),
  angle: r(TAU),
  speed: r(0.15),
  normalSpeed: r(0.15),
	oscAmplitudeX: r(2),
	oscSpeedX: 0.001 + r(0.008),
	oscAmplitudeY: r(2),
	oscSpeedY: 0.001 + (r(0.008)),
	connectDistance: r(CONNECT_DISTANCE),
	color: {
		r: Math.round(200 + r(55)),
		g: Math.round(150 + r(105)),
		b: Math.round(200 + r(55))
	}
});

const particles = (new Array(PARTICLE_COUNT))
  .fill({})
  .map(particlePrototype);

const update = () => {
  particles.forEach(p1 => {
    p1.x += (Math.cos(p1.angle) + (Math.cos(time * p1.oscSpeedX) * p1.oscAmplitudeX)) * p1.speed;
    p1.y += (Math.sin(p1.angle) + (Math.cos(time * p1.oscSpeedY) * p1.oscAmplitudeY)) * p1.speed;
    
    p1.speed = lerp(p1.speed, p1.normalSpeed * RESOLUTION, 0.1);
    
    if (p1.x > w || p1.x < 0) {
      p1.angle = PI - p1.angle;
    }
    if (p1.y > h || p1.y < 0) {
     	p1.angle = -p1.angle;
    }
		
		if (r() < 0.005) 
			p1.oscAmplitudeX = r(2);
		if (r() < 0.005) 
			p1.oscSpeedX = 0.001 + (r(0.008));
		if (r() < 0.005) 
			p1.oscAmplitudeY = r(2);
		if (r() < 0.005) 
			p1.oscSpeedY = 0.001 + r(0.008);
		
		p1.x = Math.max(-0.01,Math.min(p1.x, w + 0.01));
		p1.y = Math.max(-0.01,Math.min(p1.y, h + 0.01));
  });
};

const render = () => {
  
	ctx.clearRect(0,0,w,h);
	
  particles.map(p1 => {
    particles
			.filter(p2 => {
				if (p1 == p2)
					return false;
				if (distance(p1.x, p1.y, p2.x, p2.y) > p1.connectDistance)
					return false;
				return true;
			})
			.map(p2 => {
				const dist = distance(p1.x, p1.y, p2.x, p2.y);
				p1.speed = lerp(p1.speed, p1.speed + (0.05 / p1.connectDistance * dist), 0.2);
				return {
					p1,
					p2,
					color: p1.color,
					opacity: Math.floor(100 / p1.connectDistance * (p1.connectDistance - dist)) / 100
				};
			})
			.forEach((line, i) => {
				const colorSwing = Math.sin(time * (line.p1.oscSpeedX));
				ctx.beginPath();
				ctx.globalAlpha = line.opacity;
				ctx.moveTo(line.p1.x, line.p1.y);
				ctx.lineTo(line.p2.x, line.p2.y);
				ctx.strokeStyle = `rgb(
					${Math.floor(line.color.r * colorSwing)},
					${Math.floor((line.color.g * 0.5) + ((line.color.g * 0.5) * colorSwing))},
					${line.color.b}
				)`
				ctx.lineWidth = (line.opacity * 4);
				ctx.stroke();
				ctx.closePath();
			});
  });
  
};

const loop = () => {
  time = new Date;
  update();
  render();
  window.requestAnimationFrame(loop);
};

loop();

window.addEventListener('mousemove', e => {
  
  const mouseX = e.layerX * RESOLUTION;
  const mouseY = e.layerY * RESOLUTION;
  
  particles.forEach(p => {
    const dist = distance(mouseX, mouseY, p.x, p.y);
    
    if (dist < FORCE_DISTANCE && dist > 0) {
      p.angle = angle(mouseX, mouseY, p.x, p.y)
      const force = (FORCE_DISTANCE - dist) * 0.1;
      p.speed = lerp(p.speed, force, 0.2);
    }
  });
	
});

window.addEventListener('resize', e => {
	w = canvas.width = window.innerWidth * RESOLUTION;
	h = canvas.height = window.innerHeight * RESOLUTION;
});