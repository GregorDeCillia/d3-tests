var map = svg.append("g")
  .attr("name", "map")
  .attr("transform", "translate(800, 0)")

var projection = d3.geoMercator()
    .center([13, 47.8])
    .scale(7500)

var geojson_source = "https://raw.githubusercontent.com/ginseng666/" +
  "GeoJSON-TopoJSON-Austria/master/2017/simplified-95/"

/*
setTimeout(function() {
    d3.json(geojson_source + "laender_95_geo.json", function(data){
    // Draw the map
    map.append("g")
        .selectAll("path2")
        .data(data.features)
        .enter().append("path")
            .attr("fill", (d, i) => {
                console.log(d.properties);
                return "rgba(255, 255, 255, 0)";
            })
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            .style("stroke", "black")
            .style("stroke-width", "3px")
    })
}, 200)
*/

function tooltip_map_update(name, faelle, einwohner, faelle_rel){
  tooltip_map.selectAll("#bezirk").text(name)
  tooltip_map.selectAll("#faelle").text("Fälle: " + faelle)
  tooltip_map.selectAll("#einwohner").text("Einwohner: " + einwohner)
  tooltip_map.selectAll("#faelle_rel").text(
    "Fälle pro 100.000 EW: " + Math.round(faelle_rel*10)/10)
  
  tooltip_map.selectAll("rect").transition().duration(500)
    .attr("fill", get_color(faelle_rel))
    .attr("stroke", get_color(faelle_rel))
}

// Load external data and boot
d3.json(geojson_source + "bezirke_95_geo.json", function(data){
    // Draw the map
    map.append("g")
        .attr("name", "polygons")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
            .attr("id", (d, i) => "path_"+i)
            .attr("fill", (d) => get_color(get_ratio(d)))
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            .attr("class", (d) => cases[d.properties.name].bl)
            .style("stroke", "rgba(0,0,0,.3)")
            .on("mouseenter", handleMouseover)
            .on("mouseleave", handleMouseLeave)

    color_legend.append("g")
       .attr("name", "circles")
       .selectAll("circle")
       .data(data.features)
       .enter()
       .append("circle")
       .attr("cx", (d) => x_linear(get_ratio(d)))
       .attr("r", 10)
       .attr("opacity", .7)
       .attr("fill", (d) => get_color(get_ratio(d)))
       .on("mouseover", handleMouseover)
       .on("mouseleave", handleMouseLeave)
       .attr("stroke-width", .5)
       .attr("stroke", "black")
       .attr("id", (d, i) => "circle_" + i)
       .attr("class", (d) => "circle_"+cases[d.properties.name].bl)
})

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

function add_text(id, y) {
  return tooltip_map.append("text")
    .attr("x", 5)
    .attr("y", y)
    .attr("id", id)
    .style("font-size", 20)
}

add_text("bezirk", 25).attr("font-weight", "bold")
add_text("faelle", 50)
add_text("einwohner", 75)
add_text("faelle_rel", 100)

function map_highlight(bl) {
  map.selectAll("."+bl).transition()
    .attr("stroke-width", 5)

  color_legend.selectAll(".circle_"+bl).transition()
    .attr("r", 20).attr("opacity", .5).attr("stroke-width", 1)

}

function map_unhighlight(bl) {
  map.selectAll("."+bl).transition()
    .attr("stroke-width", 1)
  color_legend.selectAll(".circle_"+bl).transition()
    .attr("r", 10).attr("opacity", .7).attr("stroke-width", .5)
}