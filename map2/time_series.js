var time_series = svg.append("g")
  .attr("name", "time_series")

function ts_color(d) {
    if (d == "27.03")
        return "#6971e9"
      if (d == "23.03")
        return "#7621be"
      return "black"
}

ts_y = (difference) => 550 - 33*difference

time_series
  .append("g")
  .selectAll("text")
  .data(["27.03", "26.03", "25.03", "24.03", "23.03", "22.03", "21.03", "20.03", "19.03", "18.03", "17.03", "16.03",
         "15.03", "14.03", "13.03", "12.03", "11.03"])
  .enter()
  .append("text")
  .text(d => d)
  .attr("x", 10)
  .attr("y", (d, i) => ts_y(i))
  .attr("fill", ts_color)
  .attr("font-size", 20)
  .attr("font-weight", (d) => {
      if (d == "27.03" | d == "23.03") return "bold"
  })

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

function time_series_radius(datum) {
    if (datum == "27.03" | datum == "23.03")
          return 7
        else
          return 4
}

time_series
    .append("g")
    .selectAll("circle")
    .data(ts_data2.filter((d) => d.ratio >=5))
    .enter()
    .append("circle")
    .attr("fill", (d) => ts_color(d.Datum))
    .attr("cx", (d) => x_log(d.ratio))
    .attr("cy", (d) => ts_y(d.difference))
    .attr("r", (d) => time_series_radius(d.Datum))
    .attr("class", d => d.bl)
    .attr("stroke", "rgba(0,0,0,.4)")
    .on("mouseenter", d => svg_highlight(d.bl))
    .on("mouseleave", d => svg_unhighlight(d.bl))

time_series.append("g")
  .selectAll("line")
  .data([5, 7, 10, 14, 20, 30, 50, 70, 100, 140, 200])
  .enter()
  .append("line")
  .attr("x1", d => x_log(d))
  .attr("x2", d => x_log(d))
  .attr("y1", ts_y(-.5))
  .attr("y2", ts_y(16.5))
  .attr("style", "stroke:rgba(0,0,0,0.2);stroke-width:2")

function time_series_highlight(bl) {
  time_series.selectAll("path."+bl)
    .attr("stroke-width", 4.5)
  time_series.selectAll("circle."+bl)
    .attr("r", d => 1.5*time_series_radius(d.Datum))
}

function time_series_unhighlight(bl) {
  time_series.selectAll("path."+bl)
    .attr("stroke-width", 1.5)
  time_series.selectAll("circle."+bl)
    .attr("r", d => time_series_radius(d.Datum))
}
