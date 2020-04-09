var map = svg.append("g")
  .attr("name", "map")
  .attr("transform", "translate(800, 0)")

var projection = d3.geoMercator()
    .center([13, 47.8])
    .scale(7500)

var geojson_source = "https://raw.githubusercontent.com/ginseng666/" +
  "GeoJSON-TopoJSON-Austria/master/2017/simplified-95/"

function tooltip_map_update(name, faelle, einwohner, faelle_rel){
  tooltip_map.selectAll("#bezirk").text(name)
  tooltip_map.selectAll("#faelle").text("Fälle: " + faelle)
  tooltip_map.selectAll("#einwohner").text("Einwohner: " + einwohner)
  tooltip_map.selectAll("#faelle_rel").text(
    "Fälle pro 100.000 EW: " + Math.round(faelle_rel*10)/10)
  
  tooltip_map.selectAll("rect").transition().duration(500)
    .attr("fill", get_color(faelle_rel))
    //.attr("stroke", get_color(faelle_rel))
    .attr("stroke", "black")
}

// Load external data and boot
//d3.json(geojson_source + "bezirke_95_geo.json", function(data){
    var map_polygons = map.append("g")
        .attr("name", "polygons")
        .selectAll("path")
        .data(polygons.features)
        //.data(data.features)
        .enter().append("path")
            .attr("id", (d, i) => "path_" + d.properties.iso)
            .attr("fill", (d) => {
              let current_case = cases.filter(x => x.bkz == d.properties.iso)[0]
              if (current_case == null) // if no match was found, assume no cases
                return get_color(0)
              else
                return get_color(current_case.ratio)
            })
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            .attr("class", (d) => "bl_" + d.properties.iso.substring(0, 1))
            .style("stroke", "rgba(0,0,0,.3)")
            .on("mouseenter", function(d) {
                handleMouseover(d.properties.iso)
            })
            .on("mouseleave", function(d) {
                handleMouseLeave(d.properties.iso)
            })
            //.attr("opacity", 0)
            //.transition()
            //.duration(500)
            //.attr("opacity", 1)
//})

function map_update_time(new_date) {
  var cases2 = ts_bez.filter(d => d.date == new_date)
  // join ratio according to data/regions.js
  cases2.forEach(d => d.ratio = d.freq/regions.bz[d.bkz].population*100000)

  map_polygons
    .transition()
    .duration(500)
    .attr("fill", (d) => {
      let current_case = cases2.filter(x => x.bkz == d.properties.iso)[0]
      if (current_case == null) // if no match was found, assume no cases
        return get_color(0)
      else
        return get_color(current_case.ratio)
    })

}

var tooltip_map = map.append("g")
  .attr("name", "tooltip")
  .attr("transform", "translate(50, 110)")

tooltip_map.append("rect")
  .attr("width", 350)
  .attr("height", 120)
  .attr("fill", "white")
  .attr("fill-opacity", .1)
  .attr("rx", 5)
  .attr("ry", 5)
  .attr("stroke-width", 3)

function tooltip_map_add_text(id, y) {
  return tooltip_map.append("text")
    .attr("x", 5)
    .attr("y", y)
    .attr("id", id)
    .style("font-size", 20)
}

tooltip_map_add_text("bezirk", 25).attr("font-weight", "bold")
tooltip_map_add_text("faelle", 50)
tooltip_map_add_text("einwohner", 75)
tooltip_map_add_text("faelle_rel", 100)

bl_mapping = {
  "Burgenland": 1,
  "Kärnten": 2,
  "Niederösterreich": 3,
  "Oberösterreich": 4,
  "Salzburg": 5,
  "Steiermark": 6,
  "Tirol": 7,
  "Vorarlberg": 8,
  "Wien": 9
}

function map_highlight(bl) {
  //bl = bl_mapping[bl]
  map.selectAll(".bl_" + bl).transition()
    .attr("stroke-width", 4)
    .style("stroke", "rgba(0,0,0,0.4)")

  color_legend.selectAll(".circle_"+bl)
    .transition().ease(d3.easeElastic).duration(1500)
    .attr("r", 20).attr("opacity", .5).attr("stroke-width", 1)

}

function map_unhighlight(bl) {
  //bl = bl_mapping[bl]
  map.selectAll(".bl_"+bl).transition()
    .attr("stroke-width", 1)
    .style("stroke", "rgba(0,0,0,.3)")

  color_legend.selectAll(".circle_"+bl).transition()
    .attr("r", 10).attr("opacity", .7).attr("stroke-width", .5)
}