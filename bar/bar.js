// !preview r2d3 data=bar_data

var barHeight = Math.ceil(height / data.length);

var margin = {top: 10, right: 30, bottom: 30, left: 150},
width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;


var svg = svg
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");
      
// x axis
var x = d3.scaleLinear()
.domain([0, 12])
.range([ 0, width]);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// ya axis
var y = d3.scaleBand()
.range([ 0, height ])
.domain(data.map((d) => d.bundesland))
.padding(1);
svg.append("g")
.style("font", "1.3em times")
.call(d3.axisLeft(y));

var black_lines = svg.selectAll("blackline")
  .data(data)
  .enter()
  .append("rect")
  .attr("x",      (d) => x(0))
  .attr("y",      (d) => y(d.bundesland))
  .attr("height", (d, i) => barHeight/4)
  .attr("width",  (d) => x((d.genoss+d.private)/2))
  .attr("class", "redline");

var red_lines = svg.selectAll("redline")
  .data(data)
  .enter()
  .append("rect")
  .attr("x",      (d) => x(0))
  .attr("y",      (d) => y(d.bundesland)-barHeight/4)
  .attr("height", (d, i) => barHeight/4)
  .attr("width",  (d) => x((d.genoss+d.private)/2));

function split() {
  black_lines
    .transition()
    .duration(1500)
    .delay(1000)
    .attr("width", (d) => x(d.private))
    .style("fill", "#69b3a2");
    
  red_lines
    .transition()
    .duration(1500)
    .delay(1000)
    .attr("width", (d) => x(d.genoss))
    .style("fill", "#4C4082");
}

split();
