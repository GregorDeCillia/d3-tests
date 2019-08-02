var margin = {top: 30, right: 30, bottom: 70, left: 60},
width = 460 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

const bandwith_old = 80
const bandwith_new = 60
const initial_color = "purple"

svg.append("rect")
.attrs({width:bandwith_old, height:280, x:0,
  y:100, fill:initial_color, id:"left"});
svg.append("rect")
.attrs({width:bandwith_old, height: 280, x:bandwith_old,
  y:100, fill: initial_color,
  id: "right"});

const x_shift = (bandwith_old-bandwith_new)/2

function split(mode = d3.easePoly) {
  d3.select("#left")
  .transition()
  .ease(mode)
  .duration(1500)
  .attrs({width:bandwith_new, x:x_shift,
    height: 180, y:200, fill:"red"})

  d3.select("#right")
  .transition()
  .ease(mode)
  .duration(1500)
  .attrs({width:bandwith_new, x:bandwith_old+x_shift,
    height: 380, y:00, fill: "blue"})
}

function unify(mode = d3.easePoly, color=initial_color) {
  d3.select("#left")
  .transition()
  .ease(mode)
  .duration(1500)
  .attrs({width:bandwith_old, x:0,
    height: 280, y:100, fill:color})

  d3.select("#right")
  .transition()
  .ease(mode)
  .duration(1500)
  .attrs({width:bandwith_old, x:bandwith_old,
    height: 280, y:100, fill: color})
}
