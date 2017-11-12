var h;

document.addEventListener("DOMContentLoaded", function(event) {
  h = new HappyData();

  document.addEventListener("dataloaded", function(event){
    queue()
      .defer(d3.json, "data/world_countries.json")
      .await(ready);
  })

  h.loadMetadata();
  h.loadPopulation();
  h.loadCountry();

  map.margin = { top : 0, right : 0, bottom : 0, left : 0};
  map.w = document.getElementById("appOverview").clientWidth - map.margin.left - map.margin.right;
  map.h = document.getElementById("appOverview").clientHeight - map.margin.top - map.margin.bottom;
  map.data = [];
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
  
  map.svg = d3.select("#appOverview")
    .append("svg")
    .attr("width", 960)
    .attr("height", 500)
    .append("g")
    .attr("class", "map")
    .append("g")
    .attr("class", "countries");

  map.projection = d3.geoRobinson()
    .scale(150)
    .rotate([0,0,0])
    .translate( [ 480, 250 ]);

  map.path = d3.geoPath().projection(map.projection);

  document.getElementById("rank9").addEventListener("mouseover", hoverRank);
  document.getElementById("rank9").addEventListener("mouseout", hoverOut);
  document.getElementById("rank8").addEventListener("mouseover", hoverRank);
  document.getElementById("rank8").addEventListener("mouseout", hoverOut);
  document.getElementById("rank7").addEventListener("mouseover", hoverRank);
  document.getElementById("rank7").addEventListener("mouseout", hoverOut);
  document.getElementById("rank6").addEventListener("mouseover", hoverRank);
  document.getElementById("rank6").addEventListener("mouseout", hoverOut);
  document.getElementById("rank5").addEventListener("mouseover", hoverRank);
  document.getElementById("rank5").addEventListener("mouseout", hoverOut);
  document.getElementById("rank4").addEventListener("mouseover", hoverRank);
  document.getElementById("rank4").addEventListener("mouseout", hoverOut);
  document.getElementById("rank3").addEventListener("mouseover", hoverRank);
  document.getElementById("rank3").addEventListener("mouseout", hoverOut);
  document.getElementById("rank2").addEventListener("mouseover", hoverRank);
  document.getElementById("rank2").addEventListener("mouseout", hoverOut);
  document.getElementById("rank1").addEventListener("mouseover", hoverRank);
  document.getElementById("rank1").addEventListener("mouseout", hoverOut);
});

function hoverRank(event) {
  var col = document.getElementsByClassName("rank");
  for( var i=0; i < col.length; i++) {
    col[i].style["opacity"] = 0.1;
  }

  var col2 = document.getElementsByClassName(event.target.id);
  for( var i=0; i < col2.length; i++) {
    col2[i].style["opacity"] = 1;
  }
}

function hoverOut(event) {
  var col = document.getElementsByClassName("rank");
  for( var i=0; i < col.length; i++) {
    col[i].style["opacity"] = 1;
  }
}

