var svg;
var out;
var left = [];
var right = [];
var plotline;
document.addEventListener("DOMContentLoaded", function(event) {
  for (var x=-99; x < 99; x++) {
    var point = {
      x : x + 170,
      y : .001 * Math.pow((x),2) + 130
    }
    left.push(point);
    point = {
      x : x + 430,
      y : .001 * Math.pow((x),2) + 130
    }
    right.push(point);
  }
  plotline = d3.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });
  createVisual();

});

function createVisual() {
  svg = d3.select("body").append("svg")
    .attr("width", 800)
    .attr("height", 800);

  out = svg.append("circle")
  .attr("cx", 300)
  .attr("cy", 300)
  .attr("r", 250)
  .style("fill", "#ffffff")
  .style("stroke", "steelblue")
  .style("stroke-width", "5");

  svg.append("path")
  .data( [left])
  .attr("class", "line")
  .attr("d", plotline);

  svg.append("path")
  .data( [right])
  .attr("class", "line")
  .attr("d", plotline);

};

function plotline(d) {

}