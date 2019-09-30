// !preview r2d3 data=bar_data

var barHeight = Math.ceil(height / data.length / 4);

var margin = {top: 10, right: 30, bottom: 30, left: 150},
width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

var svg = svg
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

var lower_bars = svg.selectAll()
  .data(data)
  .enter()
  .append("rect")
  .attr("y",      (d) => y(d.bundesland))
  .attr("height", barHeight)
  .attr("width",  (d) => x((d.genoss + d.private) / 2));

var upper_bars = svg.selectAll()
  .data(data)
  .enter()
  .append("rect")
  .attr("y",      (d) => y(d.bundesland) - barHeight)
  .attr("height", barHeight)
  .attr("width",  (d) => x((d.genoss + d.private) / 2));

function split(duration = 1500, delay = 1000) {
  lower_bars
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("width", (d) => x(d.private))
    .style("fill", "#69b3a2");

  upper_bars
    .transition()
    .duration(duration)
    .delay(delay)
    .attr("width", (d) => x(d.genoss))
    .style("fill", "#4C4082");
}

split();
