var time_series = svg.append("g")
  .attr("name", "time_series")

// x scale and x axis
var x_log2 = d3.scaleLog()
  .domain([d3.min(ts_data3.map(d => d.ratio)) - 2, Math.ceil(d3.max(ts_data3.map(d => d.ratio))/100)*100])
  .range([70, 800])

var xAxis = d3.axisBottom(x_log2)
  .tickValues([20, 30, 50, 70, 100, 140, 200, 300, 400])
  .ticks(10, ",i");

time_series
  .append("g")
  .attr("transform", "translate(0, 545)")
  .call(xAxis)
  .attr("font-size", 16)

var gridlines = d3.axisBottom()
  .tickValues([20, 30, 50, 70, 100, 140, 200, 300, 400])
  .tickFormat("")
  .tickSize(-530)
  .scale(x_log2)
  .ticks(10, ",i");

time_series
  .append("g")
  .attr("transform", "translate(0, 545)")
  .attr("class", "grid")
  .attr("opacity", .2)
  .call(gridlines)    

var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
  .key(d => d.bl)
  .entries(ts_data2.filter(d => d.ratio >= 5));

var sumstat2 = d3.nest()
  .key(d => d.iso)
  .entries(ts_data3)

// y scale and y axis
var my_time_scale = d3.scaleTime()
  .domain([min_time, max_time])
  .range([22, 530])

Array.prototype.unique = Array.prototype.unique || function() {
    var arr = [];
  this.reduce(function (hash, num) {
  if(typeof hash[num] === 'undefined') {
    hash[num] = 1; 
    arr.push(num);
  }
  return hash;
  }, {});
  return arr;
}

var yAxis = d3.axisLeft(my_time_scale)
  .tickFormat(d3.timeFormat("%d.%m"))
  .tickValues(time_instances.unique())
  
time_series
  .append("g")
  .attr("transform", "translate(70, 0)")
  .call(yAxis)
  .attr("font-size", 20)

time_series
  .append("g")
  .selectAll(".line")
  //.data(sumstat)
  .data(sumstat2)
  .enter()
  .append("path")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("opacity", .5)
    .attr("d", function(d) {
        return d3.line()
          .x(d => x_log2(d.ratio))
          .y(d => my_time_scale(d.time))
          (d.values)
    })
    .attr("class", d => d.key)
    .on("mouseenter", d => svg_highlight(d.key))
    .on("mouseleave", d => svg_unhighlight(d.key))

var time_series_circles = time_series
    .append("g")
    .attr("class", "ts_circles")
    .selectAll("circle")
    //.data(ts_data2.filter(d => d.ratio >= 5))
    .data(ts_data3)
    .enter()
    .append("circle")
    //.attr("cx", d => x_log(d.ratio))
    .attr("cx", d => x_log2(d.ratio))
    .attr("cy", d => my_time_scale(d.time))
    .attr("stroke", "rgba(0,0,0,.4)")
    .attr("class", d => "bl_" + d.iso)
    .classed("ratio_old", d => d.difference == 7)
    .classed("ratio_new", d => d.difference == 0)

time_series.append("g")
  .selectAll("rect")
  //.data(ts_data2.filter(d => d.ratio >= 5 & d.bl == "Tirol"))
  .data(ts_data3)
  .enter()
  .append("rect")
  .attr("y", d => my_time_scale(d.time) - 16)
  .attr("height", 33)
  .attr("x", 0)
  .attr("width", 800)
  .attr("opacity", 0)
  .on("mouseenter", d => {
    console.log(ts_data3.filter(d2 => d2.difference == d.difference).map(d => d.ratio))
    console.log(d)
    bar_inner
       .data(ts_data3.filter(d2 => d2.difference == d.difference))
       .transition().ease(d3.easeElastic).duration(1000)
       .attr("width", d => x_linear(d.ratio) - 300)

    let difference = Math.min(d.difference, 10)
    dot_plot_update(difference)
    let dd = x => x.difference - difference
    time_series_circles
      .classed("ratio_new", x => dd(x) == 0)
      .classed("ratio_old", x => dd(x) == 7)
      .classed("highlighted", x => x.difference == d.difference)

    color_legend_update_time(d.date)
    map_update_time(d.date)

      /*
    time_series_dates
      .classed("ratio_new", x => dd(x) == 0)
      .classed("ratio_old", x => dd(x) == 4)
      .classed("highlighted", x => x.difference == d.difference)
  */
  })
  .on("mouseleave", d => {
    bar_inner.transition().duration(1000).attr("width", 0)
    time_series_circles.classed("highlighted", false)
    color_legend_update_time(max_date)
    map_update_time(max_date)

    //time_series_dates.classed("highlighted", false)
  })

function time_series_highlight(bl) {
  time_series.selectAll("path.bl_"+bl).transition().ease(d3.easeElastic).duration(1500)
    .attr("stroke-width", 4.5)

  time_series_circles.classed("highlighted", d => d.iso == bl)
}

function time_series_unhighlight(bl) {
  time_series.selectAll("path.bl_"+bl).transition()
    .attr("stroke-width", 1.5)
  time_series_circles.classed("highlighted", false)
}
