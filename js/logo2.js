var svg;
var init = Date.now();
var mapsvg;
var projection;
var mapath;

document.addEventListener("DOMContentLoaded", function(event) {
  var svg = d3.select("body").append("svg")
    .attr("width", 500)
    .attr("height", 500);

  /* Map */
  mapsvg = d3.select("svg")
    .append("g")
    .attr("class","map")
    .attr("width", 200)
    .attr("height", 200);
  
  projection = d3.geoRobinson()
    .scale(65)
    .rotate([0,0,0])
    .translate([250,330]);
  
  mapath = d3.geoPath().projection(projection);
  
  queue()
    .defer(d3.json, "data/world_countries.json")
    .await(mapready);

  function mapready(error, data) {
    mapsvg.append("g")
      .attr("class", "countries")
      .attr("width", 200)
      .attr("height", 200)
      .selectAll("path")
        .data(data.features)
      .enter().append("path")
        .attr("d", mapath)
        .style("fill", "#0074D9")
        .style("stroke", "#ffffff")
        .style("stroke-width", 0.5)
        .style("opacity",0.6)
      .on('mouseover', function(d) {
        d3.select(this)
          .style("stroke","#d50000")
          .style("stroke-width", 1)
          .style("fill","#262c43")
          .style("opacity", 1);
        })
      .on('mouseout', function(d) {
        d3.select(this)
          .style("fill", "#0074D9")
          .style("stroke","#ffffff")
          .style("stroke-width", 0.5)
          .style("opacity", 0.6);
      });

    mapsvg.append("path")
      .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
      .attr("class", "names")
      .attr("d", mapath);
  }

  // Create an SVG Path - top half
  svg.append("path")
    .attr("id", "arch-top")
    .attr("d", "M 50,250 A 100,100 0 0,1 450,250")
    .style("fill", "none")
    .style("stroke", "#0074D9")
    .style("stroke-width",75);

  // Create an SVG Path - bottom half
  svg.append("path")
    .attr("id", "arch-bottom")
    .attr("d", "M 450,250 A 100,100 0 0,1 50,250")
    .style("fill", "none")
    .style("stroke", "#001f3f")
    .style("stroke-width",75);

  //Create an SVG Text Element and append a text path element
  svg.append("text")
      .attr("dy", 15)
    .append("textPath")
      .attr("xlink:href","#arch-top")
      .attr("id","text-top")
      .style("text-anchor", "middle")
      .attr("startOffset", "50%")
      .text("DATA, ANALYTICS");

  //Create an SVG Text Element and append a text path element
  svg.append("text")
      .attr("dy", 15)
      .append("textPath")
      .attr("xlink:href","#arch-bottom")
      .attr("id","text-bottom")
      .style("text-anchor", "middle")
      .attr("startOffset", "50%")
      .text("& VISUALIZATION");

  /* Motion items */
  svg.append("circle")
    .attr("class","test")
    .attr("cx", 250)
    .attr("cy",  88)
    .attr("r", 4)
    .style("fill","#ff0000");

  svg.append("circle")
    .attr("class","test")
    .attr("cx", 250)
    .attr("cy", 412)
    .attr("r", 4)
    .style("fill","#ff0000");

  svg.append("circle")
    .attr("class","test3")
    .attr("cx", 88)
    .attr("cy",  250)
    .attr("r", 4)
    .style("fill", "#ff0000");
  
  svg.append("circle")
    .attr("class","test3")
    .attr("cx", 412)
    .attr("cy", 250)
    .attr("r", 4)
    .style("fill", "#ff0000");
  
  d3.interval(function() {
    var delta = Date.now() - init;

    svg.selectAll(".test")
      .attr("transform", function() { return "rotate(" + (delta / 20) + ",250, 250)"; });

    svg.selectAll(".test3")
      .attr("transform", function() { return "rotate(" + (-1 * delta / 20) + ",250, 250)"; });
  }, 15);

  var tpoints = [[125, 230],[150, 160],[205, 215],[250, 95],[295, 215],[350, 160],[380, 230],[250, 135]];

  var topPath = svg.append("path")
    .data([tpoints])
    .attr("d", d3.line().curve(d3.curveCardinalClosed))
    .attr("fill", "none")
    .attr("stroke", "#003870")
    .attr("stroke-width", ".5px");

  svg.selectAll(".tpoints")
    .data(tpoints)
    .enter()
    .append("circle")
      .attr("r", 2)
      .attr("transform", function(d) { return "translate(" + d + ")"; })
      .attr("fill", "#0033ab");

  var tcircle = svg.append("circle")
    .attr("r", 7)
    .attr("transform", "translate(" + tpoints[0] + ")")
    .style("fill", "#0004ff")
    .style("stroke-width", "2px")
    .style("stroke", "#ffffff");

  transition();

  function transition() {
    tcircle.transition()
    .duration(5000)
    .attrTween("transform", translateAlong(topPath.node()))
    .on("end", transition);
  }

  function translateAlong(path) {
    var l = path.getTotalLength();
    return function(d, i , a) {
      return function(t) {
        var p = path.getPointAtLength(t * l);
        return "translate(" + p.x + "," + p.y + ")";
      }
    }
  }
  
});