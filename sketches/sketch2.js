// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  const bathtubX = 100;
  const bathtubY = 150;
  const bathtubWidth = 400;
  const bathtubHeight = 150;
  const rimHeight = 30;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  // Draw the bathtub
  p.draw = function () {
    p.background(255);
    p.fill(100, 150, 240);
   
    // Bathtub outline
    const bodyTop = bathtubY;
    const bodyBottom = bathtubY + bathtubHeight;

    p.fill(255);
    p.stroke(150);
    p.strokeWeight(4);

    p.beginShape();
    p.vertex(bathtubX, bodyTop);
    p.vertex(bathtubX, bodyBottom);
    p.vertex(bathtubX + bathtubWidth, bodyBottom);
    p.vertex(bathtubX + bathtubWidth, bodyTop);
    p.endShape();

    // Bathtub top oval
    p.fill(255);
    p.stroke(150);
    p.strokeWeight(4);
    p.ellipse(bathtubX + bathtubWidth / 2, bodyTop, bathtubWidth, rimHeight);

    // Faucet
    const fx = bathtubX;
    const fy = bodyTop;
    const stemHeight = 40;
    const curveWidth = 25;
    const curveHeight = 30;

    p.stroke(100);
    p.strokeWeight(4);
    p.noFill();

    p.beginShape();
    p.vertex(fx, fy);
    p.vertex(fx, fy - stemHeight);
    p.bezierVertex(
      fx, fy - stemHeight - curveHeight / 2,
      fx + curveWidth, fy - stemHeight - curveHeight / 2,
      fx + curveWidth, fy - stemHeight + curveHeight / 2
    );
    p.endShape();
  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
