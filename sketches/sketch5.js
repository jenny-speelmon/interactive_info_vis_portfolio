let data;
let yearlyTotals = {};

registerSketch('sk5', function (p) {
  
  p.preload = function () {
    data = p.loadTable(
      'US-National-Parks_Use_1979-2023_By-Month.csv',
      'csv',
      'header'
    );
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);

    for (let i = 0; i < data.getRowCount(); i++) {
      let year = data.getNum(i, 'Year');
      let visits = data.getNum(i, 'RecreationVisits');

      if (!yearlyTotals[year]) yearlyTotals[year] = 0;
      yearlyTotals[year] += visits;
    }
  };

  p.draw = function () {
    p.background(250);
    p.noStroke();
    p.fill(0);
    p.textAlign(p.CENTER);
    p.textSize(32);
    p.text("The Pandemic’s Impact on National Park Visits", p.width / 2, 60);

    let years = Object.keys(yearlyTotals).map(Number).sort((a, b) => a - b);
    let margin = 120;
    let chartWidth = p.width - 2 * margin;
    let chartHeight = p.height - 2 * margin;

    let maxVisits = Math.max(...Object.values(yearlyTotals));

    p.stroke(0);
    p.line(margin, p.height - margin, p.width - margin, p.height - margin);
    p.line(margin, margin, margin, p.height - margin);

    p.noFill();
    p.stroke(40, 120, 200);
    p.strokeWeight(3);

    p.beginShape();
    years.forEach((year, i) => {
      let x = p.map(i, 0, years.length - 1, margin, p.width - margin);
      let y = p.map(yearlyTotals[year], 0, maxVisits, p.height - margin, margin);
      p.vertex(x, y);
    });
    p.endShape();
  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
