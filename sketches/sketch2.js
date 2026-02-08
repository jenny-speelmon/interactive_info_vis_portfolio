// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  const bathtubX = 100;
  const bathtubY = 150;
  const bathtubWidth = 500;
  const bathtubHeight = 200;
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

    // Fill the bathtub with water
    const hours = p.hour();
    const minutes = p.minute();
    const totalMinutes = hours * 60 + minutes;
    const maxMinutes = 24 * 60;
    const waterHeight = p.map(totalMinutes, 0, maxMinutes, 0, bathtubHeight - 5);
    p.fill(100, 150, 240, 180);
    p.noStroke();
    p.rect(bathtubX + 2, bodyBottom - waterHeight, bathtubWidth - 4, waterHeight);

    // tick marks for hours
    p.stroke(0);
    p.strokeWeight(1);
    p.fill(0);
    p.textSize(12);
    p.textAlign(p.RIGHT, p.CENTER);

    for (let h = 0; h <= 24; h++) {
      const tickY = bodyBottom - p.map(h, 0, 24, 0, bathtubHeight - 5);
      const tickLength = 10;
      p.line(bathtubX - tickLength, tickY, bathtubX, tickY);
      
      // add label every 2 hours
      if (h % 2 === 0) {
        p.text(h + ':00', bathtubX - tickLength - 5, tickY);
      }
    }

  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
