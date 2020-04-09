var bar = svg.append("g")
   .attr("name", "bar")
   .attr("transform", "translate(800, 625)")

var y_bl = i => 20 + 40*(8-i)

var nuts2_2_sorted = Array.from(nuts2_2)
var scale_nuts2 = d3.scaleBand()
  .domain(nuts2_2_sorted.sort((a, b) => b.ratio - a.ratio).map(d => d.iso))
  //.domain(nuts2_2_sorted.map(d => d.iso))
  .range([-35, 365])
  .paddingInner(10)
  .paddingOuter(5)

var x_axis_linear = d3.axisTop(x_linear)
  .tickValues([0, 50, 100, 150, 200, 250, 300, 350, 400])

bar
  .append("g")
  //.attr("transform", "translate(0, -5)")
  .call(x_axis_linear)
  .attr("font-size", 16)

var gridlines_bar = d3.axisBottom()
  .tickValues([0, 50, 100, 150, 200, 250, 300, 350, 400])
  .tickSize(360)
  .scale(x_linear)
  //.ticks(10, ",i");

bar
  .append("g")
  .attr("class", "grid")
  .attr("opacity", .2)
  .call(gridlines_bar)    

bar.append("g")
  .classed("nuts2_labels", true)
  .selectAll("text")
  .data(nuts2_2)
  .enter()
  .append("text")
  .attr("x", 190)
  //.attr("y", (d, i) => y_bl(i))
  .attr("y", d => scale_nuts2(d.iso) + 20)
  .text(d => regions.nuts2[d.iso].label)
  .attr("class", d => "bl_" + d.iso)
  .on("mouseenter", d => svg_highlight(d.iso))
  .on("mouseleave", d => svg_unhighlight(d.iso))

// bar plot
bar.append("g")
  .attr("transform", "translate(300, 0)")
  .attr("name", "rects")
  .selectAll("rect")
  //.data(nuts2)
  .data(nuts2_2)
  .enter()
  .append("rect")
  //.attr("y", (d, i) => y_bl(i) -15)
  .attr("y", d => scale_nuts2(d.iso))
  .attr("height", 30)
  .attr("width", d => x_linear(d.ratio) - 300)
  .attr("fill", d => get_color(d.ratio))
  .attr("stroke-width", 1)
  .attr("stroke", "rgba(0,0,0,.4)")
  .on("mouseenter", d => svg_highlight(d.iso))
  .on("mouseleave", d => svg_unhighlight(d.iso))
  .attr("class", d => "bl_" + d.iso)

var bar_inner = bar.append("g")
  .selectAll("rect")
  .data(nuts2_2)
  .enter()
  .append("rect")
  .attr("x", 300)
  .attr("y", (d, i) => scale_nuts2(d.iso) + 5)
  .attr("height", 20)
  .attr("width", 0)
  .attr("fill", "black")
  .attr("opacity", 0.7)

bar.append("g")
  .attr("name", "values")
  .selectAll("text")
  .data(nuts2_2)
  .enter()
  .append("text")
  .attr("class", d => "bl_" + d.iso)
  .classed("ratio_value", true)
  .attr("x", d => 5 + x_linear(d.ratio))
  .attr("y", (d, i) => scale_nuts2(d.iso) + 15)
  .text(d => Math.round(d.ratio*10)/10)

function bar_highlight(bl) {
  bar.selectAll(".bl_" + bl).transition()
    .attr("stroke-width", 5)
  bar.selectAll(".bl_" + bl).classed("highlighted", true)
}

function bar_unhighlight(bl) {
  bar.selectAll(".bl_" + bl).transition()
    .attr("stroke-width", 1)
  bar.selectAll(".bl_" + bl).classed("highlighted", false)

}