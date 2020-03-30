var bar = svg.append("g")
   .attr("name", "bar")
   .attr("transform", "translate(800, 625)")

var y_bl = i => 20 + 40*(8-i)

bar.append("g")
  .attr("name", "nuts2_labels")
  .selectAll("text")
  .data(nuts2)
  .enter()
  .append("text")
  .attr("x", 190)
  .attr("y", (d, i) => y_bl(i))
  .attr("font-size", 24)
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "central")
  .text(d => d.bl)

bar_lines = bar.append("g")
for (var i = 0; i <= 13; i++) {
  bar_lines.append("line")
    .attr("x1", x_linear(i*20))
    .attr("x2", x_linear(i*20))
    .attr("y1", y_bl(8) - 25)
    .attr("y2", y_bl(0) + 25)
    .attr("style", "stroke:rgba(0,0,0,0.2);stroke-width:2")
}

// bar plot
bar.append("g")
  .attr("name", "rects")
  .selectAll("rect")
  .data(nuts2)
  .enter()
  .append("rect")
  .attr("x", 300)
  .attr("y", (d, i) => y_bl(i) -15)
  .attr("height", 30)
  .attr("width", d => x_linear(d.ratio) - 300)
  .attr("fill", d => get_color(d.ratio))
  .attr("stroke-width", 1)
  .attr("stroke", "rgba(0,0,0,.4)")
  .on("mouseenter", d => svg_highlight(d.bl))
  .on("mouseleave", d => svg_unhighlight(d.bl))
  .attr("class", d => d.bl)

bar.append("g")
  .attr("name", "values")
  .selectAll("text")
  .data(nuts2)
  .enter()
  .append("text")
  .attr("x", d => 5 + x_linear(d.ratio))
  .attr("y", (d, i) => y_bl(i))
  .attr("font-size", 20)
  .text(d => Math.round(d.ratio*10)/10)
  .attr("dominant-baseline", "central")

function bar_highlight(bl) {
  bar.selectAll("." + bl).transition()
    .attr("stroke-width", 5)
}

function bar_unhighlight(bl) {
  bar.selectAll("." + bl).transition()
    .attr("stroke-width", 1)
}