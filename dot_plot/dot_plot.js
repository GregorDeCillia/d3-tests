// !preview r2d3 data=dot_plot_data
//
// r2d3: https://rstudio.github.io/r2d3
//
// https://www.d3-graph-gallery.com/graph/lollipop_cleveland.html

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
.domain([370, 720])
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

svg.selectAll("myline")
.data(data)
.enter()
.append("line")
.attr("x1", (d) => x(d.wk18))
.attr("x2", (d) => x(d.wk08))
.attr("y1", (d) => y(d.bundesland))
.attr("y2", (d) => y(d.bundesland))
.attr("stroke", "grey")
.attr("stroke-width", "1px");

// Circles of variable 1
svg.selectAll("mycircle")
.data(data)
.enter()
.append("circle")
.attr("cx", (d) => x(d.wk08))
.attr("cy", (d) => y(d.bundesland))
.attr("r", "6")
.style("fill", "#69b3a2");

// Circles of variable 2
svg.selectAll("mycircle")
.data(data)
.enter()
.append("circle")
.attr("cx", (d) => x(d.wk18))
.attr("cy", (d) => y(d.bundesland))
.attr("r", "6")
.style("fill", "#4C4082");

// legend
legend_data = [
  {key : "2012", color : "#69b3a2"},
  {key : "2018", color : "#4C4082"}
  ];

svg.selectAll("mydots")
.data(legend_data)
.enter()
.append("circle")
.attr("cx", x(640))
.attr("cy", function(d,i){ return y("Burgenland") + i*25})
.attr("r", 7)
.style("fill", (d) => d.color);

svg.selectAll("mylabels")
.data(legend_data)
.enter()
.append("text")
.attr("x", x(655))
.attr("y", function(d,i){ return y("Burgenland") + i*25})
.style("fill", (d) => d.color)
.text((d) => d.key)
.attr("text-anchor", "left")
.style("alignment-baseline", "middle")

// x tickes
x_ticks = [400, 450, 500, 550, 600, 650, 700]

svg.selectAll('line1')
.data(x_ticks)
.enter()
.append('line')
.attr('x1', (d) => x(d))
.attr('y1', height)
.attr('x2', (d) => x(d))
.attr('y2', y(0))
.attr("stroke", "grey")
.style("stroke-dasharray", "5 5");
