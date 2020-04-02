var time_series = svg.append("g")
  .attr("name", "time_series")

ts_y = (difference) => 550 - 33*difference

var time_series_dates = time_series
  .append("g")
  .selectAll("text")
  .data(ts_data2.filter(d => d.ratio >= 5 & d.bl == "Tirol"))
  .enter()
  .append("text")
  .text(d => d.Datum)
  .attr("x", 45)
  .attr("y", d => ts_y(d.difference))
  .attr("font-size", 20)
  .attr("dominant-baseline", "central")
  .attr("text-anchor", "middle")
  .classed("date", true)
  .classed("ratio_old", d => d.difference == 4)
  .classed("ratio_new", d => d.difference == 0)


var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
  .key(d => d.bl)
  .entries(ts_data2.filter(d => d.ratio >= 5));

time_series
  .append("g")
  .selectAll(".line")
  .data(sumstat)
  .enter()
  .append("path")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("opacity", .5)
    .attr("d", function(d) {
        return d3.line()
          .x(d => x_log(d.ratio))
          .y(d => ts_y(d.difference))
          (d.values)
    })
    .attr("class", d => d.key)
    .on("mouseenter", d => svg_highlight(d.key))
    .on("mouseleave", d => svg_unhighlight(d.key))

var time_series_circles = time_series
    .append("g")
    .attr("class", "ts_circles")
    .selectAll("circle")
    .data(ts_data2.filter(d => d.ratio >= 5))
    .enter()
    .append("circle")
    .attr("cx", d => x_log(d.ratio))
    .attr("cy", d => ts_y(d.difference))
    .attr("stroke", "rgba(0,0,0,.4)")
    .attr("class", d => d.bl)
    .classed("ratio_old", d => d.difference == 4)
    .classed("ratio_new", d => d.difference == 0)
  
time_series.append("g")
  .selectAll("line")
  .data([5, 7, 10, 14, 20, 30, 50, 70, 100, 140, 200])
  .enter()
  .append("line")
  .attr("x1", d => x_log(d))
  .attr("x2", d => x_log(d))
  .attr("y1", ts_y(-.5))
  .attr("y2", ts_y(16.5))
  .attr("class", "grid")

time_series.append("g")
  .selectAll("rect")
  .data(ts_data2.filter(d => d.ratio >= 5 & d.bl == "Tirol"))
  .enter()
  .append("rect")
  .attr("y", d => ts_y(d.difference) - 16)
  .attr("height", 33)
  .attr("x", 0)
  .attr("width", x_log(200))
  .attr("opacity", 0)
  .on("mouseenter", d => {
    bar_inner
       .data(ts_data2.filter(d2 => d2.Datum == d.Datum))
       .transition().ease(d3.easeElastic).duration(1000)
       .attr("width", d => x_linear(d.ratio) - 300)

    let difference = Math.min(d.difference, 5)
    dot_plot_update(difference)
    let dd = x => x.difference - difference
    time_series_circles
      .classed("ratio_new", x => dd(x) == 0)
      .classed("ratio_old", x => dd(x) == 4)
      .classed("highlighted", x => x.difference == d.difference)

    time_series_dates
      .classed("ratio_new", x => dd(x) == 0)
      .classed("ratio_old", x => dd(x) == 4)
      .classed("highlighted", x => x.difference == d.difference)
  
  })
  .on("mouseleave", d => {
    bar_inner.transition().duration(1000).attr("width", 0)
    time_series_circles.classed("highlighted", false)
    time_series_dates.classed("highlighted", false)
  })

function time_series_highlight(bl) {
  time_series.selectAll("path."+bl).transition().ease(d3.easeElastic).duration(1500)
    .attr("stroke-width", 4.5)

  time_series_circles.classed("highlighted", d => d.bl == bl)
}

function time_series_unhighlight(bl) {
  time_series.selectAll("path."+bl).transition()
    .attr("stroke-width", 1.5)
  time_series_circles.classed("highlighted", false)
}
