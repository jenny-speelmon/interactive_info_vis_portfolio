// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  let cx, cy;
  let beadCount = 48;
  let ovalW = 300;
  let ovalH = 420;

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

    // beads
    let a = ovalW / 2;
    let b = ovalH / 2;

    for (let i = 0; i < beadCount; i++) {
      let angle = p.TWO_PI * (i / beadCount) - p.HALF_PI;

      let x = cx + a * p.cos(angle);
      let y = cy + b * p.sin(angle);

      p.noStroke();
      p.fill(180);
      p.circle(x, y, 10);
    }
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight);
    cx = p.width / 2;
    cy = p.height / 2 - 40;
  };
});
