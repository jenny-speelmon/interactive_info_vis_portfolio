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

    // label x axis
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
    
    // y axis ticks
    let interval = 20_000_000;
    let numTicks = Math.ceil(maxVisits / interval);

    p.stroke(0);
    p.fill(0);
    p.textAlign(p.RIGHT, p.CENTER);

    for (let j = 0; j <= numTicks; j++) {
      let yVal = j * interval;
      let y = p.map(yVal, 0, maxVisits, p.height - margin, margin);

      if (yVal === 100_000_000) continue;

      p.line(margin - 6, y, margin, y);

      p.noStroke();
      p.text((yVal / 1e6) + "M", margin - 10, y);
      p.stroke(0);
    }

    // highlight pandemic
    let startYear = 2018;
    let endYear = 2023;
    let startIndex = years.indexOf(startYear);
    let endIndex = years.indexOf(endYear);

    if (startIndex >= 0 && endIndex >= 0) {
      // get the area around line
      let yValues = [];
      for (let i = startIndex; i <= endIndex; i++) {
        let y = p.map(yearlyTotals[years[i]], 0, maxVisits, p.height - margin, margin);
        yValues.push(y);
      }

      let xStart = p.map(startIndex, 0, years.length - 1, margin, p.width - margin);
      let xEnd = p.map(endIndex, 0, years.length - 1, margin, p.width - margin);
      let yTop = Math.min(...yValues);
      let yBottom = Math.max(...yValues);

      let buffer = 10;

      // draw box
      p.fill(255, 255, 0, 80);
      p.stroke(200, 150, 0);
      p.strokeWeight(2);
      p.rect(xStart, yTop - buffer, xEnd - xStart, (yBottom - yTop) + 2 * buffer);
    }

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

    // label axes
    p.textAlign(p.CENTER);
    p.textSize(14);
    p.fill(0);
    p.noStroke();
    p.text("Year", p.width / 2, p.height - 20);

    p.push();
    p.translate(20, p.height / 2);
    p.rotate(-p.HALF_PI);
    p.textAlign(p.CENTER);
    p.text("Total Recreation Visits (Millions)", 0, 0);
    p.pop();

    // pandemic annotations
    const pandemicAnnotations = [
      { 
        year: 2020, 
        text: "Drop: around half of main parks closed due to COVID-19, and some parks had closed roads and facilities", 
        offsetX: 20, offsetY: 20 
      },
      { 
        year: 2021, 
        text: "Partial recovery: some closures and restrictions lifted", 
        offsetX: 20, offsetY: -20 
      },
      { 
        year: 2022, 
        text: "Recovery: post-pandemic surge in visits after parks reopened and demand increased", 
        offsetX: 20, offsetY: -20 
      }
    ];

    pandemicAnnotations.forEach(a => {
      let i = years.indexOf(a.year);
      if (i >= 0) {
        let x = p.map(i, 0, years.length - 1, margin, p.width - margin);
        let y = p.map(yearlyTotals[a.year], 0, maxVisits, p.height - margin, margin);

        // Draw connecting line to the left
        let lineLength = 60; // how far left the line goes
        let lineX = x - lineLength;
        let lineY = y + a.offsetY; // can still adjust vertical offset

        p.stroke(0);
        p.strokeWeight(1);
        p.line(x, y, lineX, lineY);

        // Draw the text to the left of the line
        p.noStroke();
        p.fill(0);
        p.textAlign(p.RIGHT, p.CENTER); // right-aligned so it doesn't overflow
        p.text(a.text, lineX - 5, lineY); // 5px padding
      }
    });
  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
