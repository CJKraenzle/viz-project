var map = {};
var whr;

document.addEventListener("DOMContentLoaded", function(event) {
  //s = new HappyData();
  whr = new WorldHappinessReport();  
  //mapSetup();
});

function mapSetup() {
  map.margin = { top : 0, right : 0, bottom : 0, left : 0};
  map.w = 900 - map.margin.left - map.margin.right;
  map.h = 500 - map.margin.top - map.margin.bottom;
  map.color = d3.scaleThreshold()
    .domain([1,2,3,4,5,6,7,8,9])
    .range([
      "#bbdefb",
      "#90caf9",
      "#64b5f6",
      "#42a5f5",
      "#2196f3",
      "#1e88e5",
      "#1976d2",
      "#1565c0",
      "#0d47a1"
    ]);
  
  map.svg = d3.select("#appWorld")
    .append("svg")
    .attr("width", map.w)
    .attr("height", map.h)
    .append("g")
    .attr("class", "map");

  map.projection = d3.geoRobinson()
    .scale(180)
    .rotate([0,0,0])
    .translate( [ map.w / 2, map.h / 2 ]);

  map.path = d3.geoPath().projection(map.projection);

  queue()
  .defer(d3.json, "data/world_countries.json")
  .await(mapReady); 
}

function mapReady(error, data, population) {
  var i = 0;

  map.svg.append("g")
      .attr("class", "countries")
    .selectAll("path")
      .data(data.features)
    .enter().append("path")
      .attr("d", map.path)
      .style("fill", function(d) { 
        i++;
        return map.color((i % 7 + 1)); 
      })
      .style("stroke", "#ffffff")
      .style("stroke-width", 0.5)
      .style("opacity",0.6)
      .on('mouseover', function(d) {
        d3.select(this)
          .style("stroke","#bf360c")
          .style("stroke-width", 1)
          .style("opacity", 1);
      })
      .on('mouseout', function(d) {
        d3.select(this)
          .style("stroke","#ffffff")
          .style("stroke-width", 0.5)
          .style("opacity", 0.6);
  });

  map.svg.append("path")
    .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
    .attr("class", "names")
    .attr("d", map.path);
}