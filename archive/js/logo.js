var svg;
var init = Date.now();
var mapsvg;
var projection;
var mapath;

document.addEventListener("DOMContentLoaded", function(event) {
  svg = d3.select("body")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

  // https://www.visualcinnamon.com/2015/09/placing-text-on-arcs.html
  // Arcs [ M start-x,start-y A radius-x,radius-y, x-axis-rotation, large-arc-flag, sweep-flag, end-x, end-y ]
  svg.append("path")
    .attr("id","wavy")
    .attr("d", "M 25,250 A 100,100 0 0,1 475,250")
    .style("fill", "#0074D9") // Blue
    .style("stroke", "none")
    .style("stroke-width","0");

  svg.append("text")
      .attr("dy", 48)
    .append("textPath")
      .attr("xlink:href","#wavy")
      .attr("id","wavyText")
      .style("text-anchor","middle")
      .attr("startOffset","50%")
      .text("DATA, ANALYTICS");

  svg.append("path")
    .attr("id","wavy-bottom")
    .attr("d", "M 475,250 A 100,100 0 0,1 25,250")
    .style("fill", "#001f3f") // Navy
    .style("stroke", "none")
    .style("stroke-width","0");

  svg.append("text")
      .attr("dy", 48)
    .append("textPath")
      .attr("xlink:href","#wavy-bottom")
      .attr("id","wavyText-bottom")
      .style("text-anchor","middle")
      .attr("startOffset","50%")
      .text("& VISUALIZATION");

  svg.append("circle")
    .attr("cx", 250)
    .attr("cy", 250)
    .attr("r", 155)
    .attr("id", "donut-hole")
    .style("fill","#ffffff") 
    .style("fill-opacity","1")
    .style("stroke","none");

/* Map */
  mapsvg = d3.select("svg")
    .append("g")
    .attr("class","map")
    .attr("width", 200)
    .attr("height", 200);
projection = d3.geoRobinson()
    .scale(65)
    .rotate([0,0,0])
    .translate([250,250]);
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
      .style("fill", "#262c43")
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
    
    mapsvg.append("path")
      .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
      .attr("class", "names")
      .attr("d", mapath);
  }
/* Motion items */    
  svg.append("circle")
    .attr("class","test")
    .attr("cx", 250)
    .attr("cy",  96)
    .attr("r", 4)
    .style("fill","#ff0000") 

  svg.append("circle")
    .attr("class","test2")
    .attr("cx", 250)
    .attr("cy", 404)
    .attr("r", 4)
    .style("fill","#ff0000") 

  d3.interval(function() {
    var delta = Date.now() - init;

    svg.selectAll(".test")
      .attr("transform", function() { return "rotate(" + (delta / 10) + ",250, 250)"; })

    svg.selectAll(".test2")
      .attr("transform", function() { return "rotate(" + (-1 * delta / 10) + ",250, 250)"; })
  }, 15);

  var tpoints = [[125, 250],[150, 180],[205, 235],[250, 115],[295, 235],[350, 180],[380, 250],[250, 165]];

  var topPath = svg.append("path")
    .data([tpoints])
    .attr("d", d3.line().curve(d3.curveCardinalClosed))
    .attr("fill", "none")
    .attr("stroke", "#2d2d2d")
    .attr("stroke-width", "1px");

  svg.selectAll(".tpoints")
    .data(tpoints)
    .enter()
      .append("circle")
        .attr("r", 2)
        .attr("transform", function(d) { return "translate(" + d + ")"; })
        .attr("fill", "#0054fe");

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
