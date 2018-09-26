let cirPath = [];
let triPath = [];
let spacing = 5;
let theta = 0;
let h = 30;

function polarToCartesian(r,a){
	return createVector(r * cos(a),r * sin(a));
}

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);

  let r = 250;
  let startA = 0;
  let endA = 360;
  let start = polarToCartesian(r,startA);
  let end = polarToCartesian(r, endA);

  for (let a = startA; a < 360; a+=spacing) {
  	let x = r * cos(a);
    let y = r * sin(a);
    let cv = polarToCartesian(r,a);

    cirPath.push(cv);

    let amt = (a % 120) / (endA - startA);
    let tv = p5.Vector.lerp(start,end, amt);

    triPath.push(tv);

    if ((a+spacing) % 120 === 0) {
    	startA = startA + 120;
      endA = endA +120;
      start = polarToCartesian(r,startA);
      end = polarToCartesian(r, endA);
    }
  }
}

function draw() {
  background(220);
  translate(width/2,height/2);
		h+=0.5;
  	rotate(h);
  stroke(0);
  strokeWeight(2);
  noFill();
  let amt = (sin(theta)+1)/2;
  let u = 255 & (amt*255);
  let o = 0 & (amt*255);
  let p = 0   & (amt*255);
  let z = 255 & (amt*255);
  theta += 1;
  beginShape();
  for (let i = 0; i < cirPath.length; i++) {
    let cv = cirPath[i];
    let tv = triPath[i];
    let x = lerp(cv.x,tv.x, amt);
    let y = lerp(cv.y,tv.y, amt);
    fill(u,o,p,z);
    vertex(x,y);
  }
  endShape(CLOSE);

  beginShape();
  for (let i = 0; i < cirPath.length; i++) {
    let cv = cirPath[i];
    let tv = triPath[i];
    let x = lerp(cv.x,tv.x, amt);
    let y = lerp(cv.y,tv.y, amt);
    fill(0);
    ellipse(x,y,8);
  }
  endShape(CLOSE);

}
