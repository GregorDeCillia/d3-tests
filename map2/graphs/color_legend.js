var color_legend = svg.append("g")
  .attr("name", "color_legend")
  .attr("transform", "translate(800, 555)")

color_legend.append("line")
  .attr("x1", 300)
  .attr("x2", 1000)
  .attr("style", "stroke:rgba(0,0,0,.3);stroke-width:2")

var color_legend_circles = color_legend.append("g")
  .attr("name", "circles")
  .selectAll("circle")
  .data(cases)
  .enter()
  .append("circle")
  .attr("cx", d => x_linear(d.ratio))
  .attr("r", 10)
  .attr("opacity", .7)
  .attr("fill", (d) => get_color(d.ratio))
  .on("mouseenter", d => handleMouseover(d.bkz))
  .on("mouseleave", d => handleMouseLeave(d.bkz))
  .attr("stroke-width", .5)
  .attr("stroke", "black")
  .attr("id", d => "circle_" + d.bkz )
  .attr("class", d => "circle_" + d.bkz.toString().substring(0, 1))

var cl_values = color_legend.append("g").attr("name", "values")
  .attr("class", "ticks_ratio")

color_legend.append("text")
  .attr("x", x_linear(260/2))
  .attr("y", 35)
  .text("Fälle pro 100.000 Einwohner")
  .attr("class", "ratio_xlab")

function color_legend_update_time(new_date) {
  var cases2 = ts_bez.filter(d => d.date == new_date)
  // join ratio according to data/regions.js
  cases2.forEach(d => d.ratio = d.freq/regions.bz[d.bkz].population*100000)

   color_legend_circles
     .data(cases2)
     .transition()
     .ease(d3.easeElastic).duration(1500)
     .attr("cx", d => x_linear(d.ratio))
     .attr("fill", (d) => get_color(d.ratio))
}
