var map = {};

document.addEventListener("DOMContentLoaded", function(event) {

});

function ready(error, data) {
  map.data = data;
  var i = 0;
  
  map.w = document.getElementById("appOverview").clientWidth - map.margin.left - map.margin.right;
  map.h = document.getElementById("appOverview").clientHeight - map.margin.top - map.margin.bottom;

  var mapr = map.svg.selectAll("path")
      .data(data.features);
  
  mapr
    .exit()
      .remove();

  mapr
    .enter()
      .append("path")
      .merge(mapr)
        .attr("d", map.path)
        .attr("class", function(d) {
          return "rank rank" + Math.ceil(getIndicator(d.properties.name,"lifeladder"));
        })
        .style("fill", function(d) { 
          var ladder = getIndicator(d.properties.name,"lifeladder");
          return map.color(Math.ceil(ladder)); 
        })
        .style("stroke", "#ffffff")
        .style("stroke-width", 0.5)
        .style("opacity",1)
        .on('mouseover', function(d) {
          d3.select(this)
            .style("stroke","#bf360c")
            .style("stroke-width", 2)
            .style("opacity", 1);
        })
        .on('mouseout', function(d) {
          d3.select(this)
            .style("stroke","#ffffff")
            .style("stroke-width", 0.5)
            .style("opacity", 1);
  });

  map.svg.append("path")
    .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
    .attr("class", "names")
    .attr("d", map.path);
}

function getIndicator(country, name) {
  console.log("passed country: " + country);
  for (var i=0; i < h.happy.length; i++) {
    if (h.happy[i].country==country) {
      return h.happy[i][name];
    }
  }
}
