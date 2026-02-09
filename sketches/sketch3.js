// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  let cx, cy;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    cx = p.width / 2;
    cy = p.height / 2 - 40;
  };

  p.draw = function () {
    p.background(255);
   
    // Draw the necklace string
    p.noFill();
    p.stroke(160);
    p.strokeWeight(3);
    p.ellipse(cx, cy, 300, 420);
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight);
    cx = p.width / 2;
    cy = p.height / 2 - 40;
  };
});
