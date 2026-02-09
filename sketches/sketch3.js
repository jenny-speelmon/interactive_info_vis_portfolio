// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  let cx, cy;
  const beadCount = 48;
  const radius = 200;

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
    p.circle(cx, cy, radius * 2);

    // beads
    const hours = p.hour();
    const minutes = p.minute();
    const halfHoursPassed = hours * 2 + Math.floor(minutes / 30);

    const passedCount = halfHoursPassed;
    const futureCount = beadCount - passedCount;

    // bottom beads for time already passed
    for (let i = 0; i < passedCount; i++) {
      const isHour = i % 2 === 1;
      const beadRadius = isHour ? 16 : 10;
      const col = isHour ? p.color(80, 90, 140) : p.color(240, 180, 80);

      const t = passedCount === 1 ? 0.5 : i / (passedCount - 1);
      const angle = t * p.PI;
      const x = cx + radius * p.cos(angle);
      const y = cy + radius * p.sin(angle);

      p.noStroke();
      p.fill(col);
      p.circle(x, y, beadRadius * 2);
    }

    // top beads for time left in the day
    for (let i = 0; i < futureCount; i++) {
      const beadIndex = passedCount + i;
      const isHour = beadIndex % 2 === 1;
      const beadRadius = isHour ? 16 : 10;
      const col = isHour ? p.color(80, 90, 140) : p.color(240, 180, 80);

      const t = futureCount === 1 ? 0.5 : i / (futureCount - 1);
      const angle = p.PI + t * p.PI;
      const x = cx + radius * p.cos(angle);
      const y = cy + radius * p.sin(angle);

      p.noStroke();
      p.fill(col);
      p.circle(x, y, beadRadius * 2);
    }
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    cx = p.width / 2;
    cy = p.height / 2 - 40;
  };
});
