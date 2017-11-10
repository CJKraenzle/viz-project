(function() {
  this.Smile = function() {
    /* ********* ********* ********* ********* ********* ********* ********* 
     * Global Constructor
     * ********* ********* ********* ********* ********* ********* ********* */
    var version = "0.0.1";
    
    /* Set Smile Components */
    this.margin = { top : 0, right : 0, bottom : 0, left : 0};
  }
  Smile.prototype.plotId = "";
  Smile.prototype.w = 0;
  Smile.prototype.h = 0;
  Smile.prototype.svg;

  Smile.prototype.draw = function(plotID) {
    this.plotId = plotID;
    this.w = document.getElementById(plotID).clientWidth - 5;
    this.h = document.getElementById(plotID).clientHeight - 5;
    this.svg = d3.select("#"+plotID)
      .append("svg")
        .attr("width", this.w)
        .attr("height", this.h);
    this.svg.append("circle")
        .attr("class", plotID + "-head")
        .attr("cx", this.w / 2)
        .attr("cy", this.h / 2)
        .attr("r", this.w / 2)
        .style("fill", "#f9a825");
    this.svg.append("circle")
        .attr("class", plotID + "-leftEye")
        .attr("cx", ( this.w / 3 ))
        .attr("cy", ( this.h / 3 ))
        .attr("r", (this.w / 10))
        .style("fill", "#000000");
    this.svg.append("circle")
        .attr("class", plotID + "-rightEye")
        .attr("cx", 2 * ( this.w / 3 ))
        .attr("cy", ( this.h / 3 ))
        .attr("r", (this.w / 10))
        .style("fill", "#000000");
    this.svg.append("path")
      .attr("class", plotID + "-mouth")
      .attr("d", "M " + (this.w / 6) + "," + (this.h * .6) + " A 10,8" + " 0 0,0 " + ( 5 * this.w / 6 ) + "," + (this.h * .6))
      .style("fill", "none")
      .style("stroke", "#000000")
      .style("stroke-width", 2);
  }

  Smile.prototype.render = function() {
    var path = this.svg.selectAll("path")
  }

  Smile.prototype.happy = function() {
    var grin = d3.select(this.plotId + "-mouth");
    grin.attr("d", "M " + (this.w / 6) + "," + (this.h / 2) + " A 10,10" + " 0 0,0 " + ( 5 * this.w / 6 ) + "," + (this.h / 2));
  }

  Smile.prototype.frown = function() {
    var grin = d3.select("." + this.plotId + "-mouth");
    console.log("Calculating d");
    console.log("M " + Math.floor(this.w / 6) + "," + Math.floor((this.h * .75)) + " A 3,3 " + " 0 0,1 " + Math.floor( 5 * this.w / 6 ) + "," + Math.floor((this.h * .75)));
    grin.transition(750).attr("d", "M " + Math.floor(this.w / 6) + "," + Math.floor((this.h * .75)) + " A 6,3 " + " 0 0,1 " + Math.floor( 5 * this.w / 6 ) + "," + Math.floor((this.h * .75)));    
  }
})();