// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  let cx, cy;
  const stemHeight = 200;
  const branchLength = 50;
  const branchCount = 24;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    cx = p.width / 2;
    cy = p.height - 100;
  };
  p.draw = function () {
    p.background(255);

    // draw the pot
    p.fill(150, 75, 0);
    p.noStroke();
    p.rect(cx - 40, cy, 80, 50);

    // Draw middle stem
    p.stroke(0, 150, 0);
    p.strokeWeight(6);
    p.line(cx, cy, cx, cy - stemHeight);
   
    // Draw branches for buds
    p.strokeWeight(3);
    for (let i = 0; i < branchCount; i++) {
      const branchY = cy - (i / (branchCount - 1)) * stemHeight; // evenly spaced along stem
      const angle = (i % 2 === 0 ? -1 : 1) * p.PI / 6; // alternate left/right ~30°
      const x2 = cx + branchLength * p.sin(angle);
      const y2 = branchY - branchLength * (1 - p.cos(angle)); // slight vertical adjustment
      p.line(cx, branchY, x2, y2);
    }
  };
  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    cx = p.width / 2;
    cy = p.height - 100;
  };
});
