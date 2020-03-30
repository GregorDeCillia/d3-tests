var color_legend = svg.append("g")
  .attr("name", "color_legend")
  .attr("transform", "translate(0, 555)")

color_legend.append("line")
  .attr("x1", 300)
  .attr("x2", 1000)
  .attr("style", "stroke:rgba(0,0,0,.3);stroke-width:2")

var cl_values = color_legend.append("g").attr("name", "values")

for (var i = 0; i <= 13; i++) {
    cl_values.append("text")
      .attr("x", 300 + i*700/260*20)
      .attr("y", 35)
      .text(i*20)
      .attr("text-anchor", "middle")
}

color_legend.append("text")
  .attr("x", 300 + 700/2)
  .attr("y", 60)
  .text("Fälle pro 100.000 Einwohner")
  .attr("text-anchor", "middle")