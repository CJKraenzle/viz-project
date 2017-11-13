var h;
var s;
document.addEventListener("DOMContentLoaded", function(event) {
  h = new HappyData();
  s = new d3Plotter();

  document.addEventListener("dataloaded", function(event){
    queue()
      .defer(d3.json, "data/world_countries.json")
      .await(ready);

    var x = {};
    x.name = "gdpPerCapita";
    x.datatype = "number";
    var y = {};
    y.name = "lifeladder";
    y.datatype = "number";
    var margin = {};
    margin.top = 20;
    margin.left = 150;
    margin.right = 0;
    margin.bottom = 150;
    
    var filterData = h.happy.filter(function(d) {
      return d.year==2016;
    });
    s.setData(filterData);
    s.setX(x);
    s.setY(y);
    s.setMargin(margin);
    s.setSVGHeight("500");
    s.setSVGWidth("960");
    s.scatterplot("svgDetail");
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

  var filterData = h.happy.filter(function(d) {
    var value1 = "" + Math.ceil(d.lifeladder);
    var value2 = event.target.id.substring(4,5)
    if (value1==value2 && d.year==2016) {
      return true;
    } else {
      return false;
    }
  });
  s.setData(filterData);
  //s.setX(x);
  //s.setY(y);
  //s.setMargin(margin);
  //s.setSVGHeight("500");
  //s.setSVGWidth("960");
  s.scatterplot("svgDetail");
}

function hoverOut(event) {
  var col = document.getElementsByClassName("rank");
  for( var i=0; i < col.length; i++) {
    col[i].style["opacity"] = 1;
  }

  var filterData = h.happy.filter(function(d) {
    return d.year==2016;
  });
  s.setData(filterData);
  //s.setX(x);
  //s.setY(y);
  //s.setMargin(margin);
  //s.setSVGHeight("500");
  //s.setSVGWidth("960");
  s.scatterplot("svgDetail");
}

