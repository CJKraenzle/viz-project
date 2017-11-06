document.addEventListener("", function(event) {
  whr = new WorldHappinessReport();
});

(function() {
  this.WorldHappinessReport = function() {
    /* ********* ********* ********* ********* ********* ********* ********* 
     * Global Constructor
     * ********* ********* ********* ********* ********* ********* ********* */
    var version = "0.0.1";

    /* Set Map components */
    this.map.margin = {  top : 0, right : 0, bottom : 0, left : 0 };
    this.map.w = 900 - this.map.margin.left - this.map.margin.right;
    this.map.h = 500 - this.map.margin.top - this.map.margin.bottom;
    this.map.color = d3.scaleThreshold()
      .domain([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
      .range(["#bbdefb","#90caf9","#64b5f6","#42a5f5","#2196f3","#1e88e5","#1976d2","#1565c0","#0d47a1"]);

    this.map.svg = d3.select("#appWorld").append("svg")
      .attr("width", this.map.w)
      .attr("height", this.map.h)
      .append("g")
        .attr("class","map")
      .append("g")
        .attr("class","countries");
    
    this.map.projection = d3.geoRobinson()
      .scale(180)
      .rotate([0,0,0])
      .translate([ this.map.w / 2, this.map.h / 2 ]);

    this.map.path = d3.geoPath().projection(this.map.projection);

    /* Get data */
    queue()
      .defer(d3.json, "data/world_countries.json")
      .await(this.ready);
  }

  /* ********* ********* ********* ********* ********* ********* ********* 
   * Public Variables
   * ********* ********* ********* ********* ********* ********* ********* */
  WorldHappinessReport.prototype.map = {};

  /* ********* ********* ********* ********* ********* ********* ********* 
   * Public Methods
   * ********* ********* ********* ********* ********* ********* ********* */
  WorldHappinessReport.prototype.drawMap = function() {
    this.map.svg.selectAll("path")
      .data(this.map.world.features);

    this.map.svg
      .exit()
        .remove();

    this.map.svg
      .enter().append("path")
        .attr("d", this.map.path)
        .style("fill", function(d) {
          return this.map.color(1)
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

        this.map.svg.append("path")
          .datum(topojson.mesh(this.map.world.features, function(a, b) {
            return a.id !== b.id;
          }))
          .attr("class", "names")
          .attr("d", this.map.path);
  }
  
   WorldHappinessReport.prototype.ready = function(error, world) {
    this.map.world = world;
    drawMap();
  }
})();