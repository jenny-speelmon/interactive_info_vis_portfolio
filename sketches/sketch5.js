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

    // label the axes
    p.stroke(0);
    p.fill(0);
    p.textSize(12);

    // show 1979
    let firstIndex = 0;
    let firstYear = years[firstIndex];
    let firstX = p.map(firstIndex, 0, years.length - 1, margin, p.width - margin);

    p.line(firstX, p.height - margin, firstX, p.height - margin + 6);
    p.noStroke();
    p.textAlign(p.CENTER);
    p.text(firstYear, firstX, p.height - margin + 20);
    p.stroke(0);

    // every 5 years
    years.forEach((year, i) => {
      if (year >= 1985 && year % 5 === 0) {
        let x = p.map(i, 0, years.length - 1, margin, p.width - margin);

        p.line(x, p.height - margin, x, p.height - margin + 6);

        p.noStroke();
        p.textAlign(p.CENTER);
        p.text(year, x, p.height - margin + 20);
        p.stroke(0);
      }
    });

    // show 2023
    let lastIndex = years.length - 1;
    let lastYear = years[lastIndex];
    let lastX = p.map(lastIndex, 0, years.length - 1, margin, p.width - margin);

    p.line(lastX, p.height - margin, lastX, p.height - margin + 6);
    p.noStroke();
    p.textAlign(p.CENTER);
    p.text(lastYear, lastX, p.height - margin + 20);
    p.stroke(0);

    // draw line graph
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
