var dot_plot = svg.append("g")
  .attr("name", "dot-plot")
  .attr("transform", "translate(0, 625)")

var x_log2 = d3.scaleLog()
//var x_log2 = d3.scaleLinear()
  .domain([d3.min(ts_data3.map(d => d.ratio)) - 2, Math.ceil(d3.max(ts_data3.map(d => d.ratio))/100)*100])
  .range([70, 800])
  

var xAxis2 = d3.axisTop(x_log2)
  .tickValues([20, 30, 50, 70, 100, 140, 200, 300, 400])
  .ticks(10, ",i");
dot_plot
  .append("g")
  .attr("transform", "translate(0, -5)")
  .call(xAxis2)
  .attr("font-size", 16)

var gridlines = d3.axisTop()
  .tickValues([20, 30, 50, 70, 100, 140, 200, 300, 400])
  .tickFormat("")
  .tickSize(-350)
  .scale(x_log2)
  .ticks(10, ",i");
dot_plot
  .append("g")
  .attr("transform", "translate(0, -5)")
  .attr("class", "grid")
  .attr("opacity", .2)
  .call(gridlines)   

let plot_order = {
    "Kärnten": 0, "Burgenland": 1, "Wien": 2, "Steiermark": 3, "Niederösterreich": 4, "Oberösterreich": 5,
    "Salzburg": 6, "Vorarlberg": 7, "Tirol": 8
}

var x_log2 = d3.scaleLog()
  .domain([d3.min(ts_data3.map(d => d.ratio)), d3.max(ts_data3.map(d => d.ratio))])
  .range([70, 800])


dot_plot.append("g")
  .attr("name", "lines")
  .selectAll("lines")
  .data(nuts2_2)
  .enter()
  .append("line")
  .attr("x1", 70)
  .attr("x2", 800)
  .attr("y1", d => scale_nuts2(d.iso) + 15)
  .attr("y2", d => scale_nuts2(d.iso) + 15)
  .attr("class", "grid")

function x_log(ratio) {
    if (ratio == 0)
    return(-100)
    return 340 + 190*(Math.log(ratio) - 2.9)
}

var nuts2_old = ts_data2.filter(d => d.Datum == "23.03")
var nuts2_old_2 = ts_data3.filter(d => d.difference == 7)

dot_plot.append("g")
  .selectAll("line")
  .data(nuts2_2)
  .enter()
  .append("line")
  .attr("x1", (d, i) => x_log2(nuts2_old_2[i].ratio))
  .attr("x2", d => x_log2(d.ratio))
  .attr("y1", d => scale_nuts2(d.iso) + 15)
  .attr("y2", d => scale_nuts2(d.iso) + 15)
  .attr("class", d => "bl_" + d.iso + " connection_line")
  .attr("stroke", "rgba(0,0,0,0.5)")
  .attr("stroke-width", 7)

dot_plot.append("g")
  .attr("class", "ratio_new")
  .attr("name", "points")
  .selectAll("circle")
  .data(nuts2_2)
  .enter()
  .append("circle")
  .attr("cx", d => x_log2(d.ratio))
  .attr("cy", d => scale_nuts2(d.iso) + 15)
  .attr("r", 10)
  .attr("class", d => "bl_" + d.iso)
  .classed("ratio_new", true)
  .attr("stroke", "rgba(0,0,0,.4)")

dot_plot.append("g")
  .attr("name", "points")
  .attr("class", "ratio_old")
  .selectAll("circle")
  .data(nuts2_old_2)
  .enter()
  .append("circle")
  .attr("cx", d => x_log2(d.ratio))
  .attr("cy", (d, i) => scale_nuts2(d.iso) + 15)
  .attr("r", 10)
  .attr("class", d => "bl_" + d.iso)
  .classed("ratio_old", true)
  .attr("stroke", "rgba(0,0,0,.4)")

dot_plot.append("g")
  .attr("class", "ratio_old")
  .selectAll("text")
  .data(nuts2_old_2)
  .enter()
  .append("text")
  .attr("class", d => "bl_" + d.ido)
  .classed("ratio_value", true)
  .attr("x", (d, i) => x_log2(d.ratio) - 20)
  .attr("y", (d, i) => scale_nuts2(d.iso) + 15)
  .text((d, i) => Math.round(d.ratio*10)/10)
  .attr("text-anchor", "end")
  .attr("dominant-baseline", "central")

dot_plot.append("g")
  .attr("class", "ratio_new")
  .selectAll("text")
  .data(nuts2_2)
  .enter()
  .append("text")
  .attr("class", d => "bl_" + d.iso)
  .classed("ratio_value", true)
  .attr("x", d => x_log2(d.ratio) + 20)
  .attr("y", (d, i) => scale_nuts2(d.iso) + 15)
  .text(d => Math.round(d.ratio*10)/10)

var dot_plot_grid = dot_plot.append("g").attr("class", "ticks_ratio")

/*
for (i = 0; i < 11; i++) {
    let x = [5, 7, 10, 14, 20, 30, 50, 70, 100, 140, 200][i]
    dot_plot_grid.append("line")
      .attr("x1", x_log(x))
      .attr("x2", x_log(x))
      .attr("y1", 0)
      .attr("y2", 40 + 40*8)
      .attr("class", "grid")
    dot_plot_grid.append("text")
      .attr("x", x_log(x))
      .attr("y", -5)
      .text(x)
      //.attr("text-anchor", "middle")
}
*/

dot_plot.append("text")
  .attr("x", 500)
  .attr("y", -35)
  .text("Fälle pro 100.000 Einwohner (Logarithmiert)")
  .attr("class", "ratio_xlab")

var dot_plot_percents = dot_plot.append("g")
  .selectAll("text")
  .data(nuts2_2)
  .enter()
  .append("text")
  .attr("y", (d, i) => scale_nuts2(d.iso) + 15 - 5 - 5)//-5 + 20 + 40*(8-i))
  .attr("x", (d, i) => 0.5*(x_log2(d.ratio) + x_log2(nuts2_old_2[i].ratio)))
  .attr("text-anchor", "middle")
  .text((d, i) => "+" +Math.round((d.ratio - nuts2_old[i].ratio)/nuts2_old[i].ratio*1000)/10 + "%")
  .attr("opacity", .7)
  .attr("class", d => "percent_" + d.bl + " percent_value")

dot_plot.append("g")
  .selectAll("rect")
  .data(nuts2_2)
  .enter()
  .append("rect")
  .attr("x", (d, i) => x_log2(nuts2_old_2[i].ratio) - 70)
  .attr("width", (d, i) => x_log2(d.ratio) - x_log2(nuts2_old_2[i].ratio) + 140)
  .attr("y", (d, i) => -20 + scale_nuts2(d.iso) + 15)
  .attr("height", 40)
  .attr("opacity", 0)
  .on("mouseenter", d => svg_highlight(d.iso))
  .on("mouseleave", d => svg_unhighlight(d.iso))


function dot_plot_highlight(iso) {
  dot_plot.selectAll("circle.bl_" + iso).transition().ease(d3.easeElastic).duration(1500)
    .attr("r", 13).attr("opactiy", 0.6)
  dot_plot.selectAll("line.bl_" + iso).transition().duration(500).ease(d3.easeLinear)
    .attr("stroke-width", 9)
  dot_plot.selectAll(".bl_" + iso).classed("highlighted", true)
  dot_plot.selectAll(".percent_" + iso).transition().duration(300).ease(d3.easeLinear)
    .attr("y", d => -7 + 15 + scale_nuts2(d.iso))
    .attr("font-size", 19)
}

function dot_plot_unhighlight(iso) {
  dot_plot.selectAll("circle.bl_" + iso).transition().duration(500)
    .attr("r", 10).attr("opactiy", 1)
  dot_plot.selectAll("line.bl_" + iso).transition().duration(500)
    .attr("stroke-width", 7)
  dot_plot.selectAll(".bl_" + iso).classed("highlighted", false)
  dot_plot.selectAll(".percent_" + iso).transition().duration(500)
    .attr("y", d => -5 + 15 + scale_nuts2(d.iso))
    .attr("font-size", 17)
}

function dot_plot_update(difference) {
  let data_new = ts_data3.filter(d => d.difference == difference)
  let data_old = ts_data3.filter(d => d.difference == difference + 7)
  dot_plot.selectAll(".ratio_old").selectAll("circle")
    .data(data_old)
    .transition().ease(d3.easeElastic).duration(1000)
    .attr("cx", d => x_log2(d.ratio))
  dot_plot.selectAll(".ratio_new").selectAll("circle")
    .data(data_new)
    .transition().ease(d3.easeElastic).duration(1000)
    .attr("cx", d => x_log2(d.ratio))
  dot_plot.selectAll(".ratio_old").selectAll("text")
    .data(data_old)
    .transition().ease(d3.easeElastic).duration(1000)
    .attr("x", d => x_log2(d.ratio) - 20)
    .text(d => Math.round(d.ratio*10)/10)
  dot_plot.selectAll(".ratio_new").selectAll("text")
    .data(data_new)
    .transition().ease(d3.easeElastic).duration(1000)
    .attr("x", d => x_log2(d.ratio) + 20)
    .text(d => Math.round(d.ratio*10)/10)

  let old_ratio = i => data_old[i].ratio
  let new_ratio = i => data_new[i].ratio
  dot_plot.selectAll(".connection_line")
    .transition().ease(d3.easeElastic).duration(1000)
    .attr("x1", (d, i) => x_log2(old_ratio(i)))
    .attr("x2", (d, i) => x_log2(new_ratio(i)))

  //dot_plot.selectAll(".percent_value")
  dot_plot_percents
    .transition().ease(d3.easeElastic).duration(1000)
    .attr("x", (d, i) => 0.5 * (x_log2(old_ratio(i)) + x_log2(new_ratio(i))) )
    .text((d, i) => "+" +Math.round((new_ratio(i) - old_ratio(i))/old_ratio(i)*1000)/10 + "%")
  dot_plot
    .selectAll("rect")
    .attr("x", (d, i) => x_log2(old_ratio(i)) - 70)
    .attr("width", (d, i) => x_log2(new_ratio(i)) - x_log2(old_ratio(i)) + 140)
}