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
  .attr("y", d => y_bl(d.index))
  .text(d => d.bl)
  .attr("class", d => d.bl)
  .classed("nuts2_labels", true)
  .on("mouseenter", d => svg_highlight(d.bl))
  .on("mouseleave", d => svg_unhighlight(d.bl))

bar_lines = bar.append("g").attr("class", "grid")
for (var i = 0; i <= 13; i++) {
  bar_lines.append("line")
    .attr("x1", x_linear(i*20))
    .attr("x2", x_linear(i*20))
    .attr("y1", y_bl(8) - 25)
    .attr("y2", y_bl(0) + 25)
}

// bar plot
bar.append("g")
  .attr("transform", "translate(300, 0)")
  .attr("name", "rects")
  .selectAll("rect")
  .data(nuts2)
  .enter()
  .append("rect")
  .attr("y", (d, i) => y_bl(i) -15)
  .attr("height", 30)
  .attr("width", d => x_linear(d.ratio) - 300)
  .attr("fill", d => get_color(d.ratio))
  .attr("stroke-width", 1)
  .attr("stroke", "rgba(0,0,0,.4)")
  .on("mouseenter", d => svg_highlight(d.bl))
  .on("mouseleave", d => svg_unhighlight(d.bl))
  .attr("class", d => d.bl)

var bar_inner = bar.append("g")
  .selectAll("rect")
  .data(nuts2)
  .enter()
  .append("rect")
  .attr("class", d => "bar_inner_" + d.bl)
  .attr("x", 300)
  .attr("y", (d, i) => y_bl(i) -10)
  .attr("height", 20)
  .attr("width", 0)
  .attr("fill", "black")
  .attr("opacity", 0.7)

bar.append("g")
  .attr("name", "values")
  .selectAll("text")
  .data(nuts2)
  .enter()
  .append("text")
  .attr("class", d => d.bl)
  .classed("ratio_value", true)
  .attr("x", d => 5 + x_linear(d.ratio))
  .attr("y", (d, i) => y_bl(i))
  .text(d => Math.round(d.ratio*10)/10)

function bar_highlight(bl) {
  bar.selectAll("." + bl).transition()
    .attr("stroke-width", 5)
  bar.selectAll("." + bl).classed("highlighted", true)
}

function bar_unhighlight(bl) {
  bar.selectAll("." + bl).transition()
    .attr("stroke-width", 1)
  bar.selectAll("." + bl).classed("highlighted", false)

}