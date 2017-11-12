/*
 * Author: Christopher J. Kraenzle
 * 
 * 
 * d3Plotter.setData(<data>)
 *   <data> object definition
 *     JSON Array of objects
 * 
 * d3Plotter.setX(<x>) 
 *   <x> object definition 
 *     { name : <propertyName>, datatype : <datatype>}
 *       <propertyName> is the name of a property in Data to be used for x values
 *       <datatype> must contain one of the values "number", "string", "date"
 *  
 * d3Plotter.setY(<y>) 
 *   <y> object definition 
 *     { name : <propertyName>, datatype : <datatype>}
 *       <propertyName> is the name of a property in Data to be used for y values
 *       <datatype> must contain one of the values "number", "string", "date"
 *  
 * d3Plotter.setMargin(<margin>)
 *   <margin> object definition 
 *     { top : 99, right : 99, bottom : 99, left : 99}
 * 
 * 
 */

(function() {
  /* Constructor Global Scope */
  this.d3Plotter = function() {
    /* ********* ********* ********* ********* ********* ********* ********* 
     * Private variables 
     * ********* ********* ********* ********* ********* ********* ********* */
    var data = [];
    var xInfo = { name : "propertyName", datatype : "number" };
    var yInfo = { name : "propertyName", datatype : "string" };
    var margin = {
      top : 20,
      right : 10,
      bottom : 20,
      left : 10 
    };
    var svgWidth = 0;
    var svgHeight = 0;

    /* ********* ********* ********* ********* ********* ********* ********* 
     * Public setters and getters
     * ********* ********* ********* ********* ********* ********* ********* */
    /* Data */
    this.setData = function(d) {
      data = null;
      if (d===null) throw new Error("Data is null");
      if (d===undefined) throw new Error("Data is undefined");
      if (!Array.isArray(d)) throw new Error("Data is not an array");
      data = d;
    }
    this.getData = function() {
      return data;
    }

    /* X and Y */
    this.setX = function(x) {
      xInfo = null;
      if (x.name===undefined) throw new Error("Property name for x is undefined");
      if (x.datatype===undefined) throw new Error("Property name for x is undefined");
      if (x.name===null) throw new Error("Property name for x is null");
      if (x.datatype===null) throw new Error("Property name for x is null");
      if (Array.isArray(x)) throw new Error("X object is an array");

      xInfo = x;
    }
    this.getX = function() {
      return xInfo;
    }
    this.setY = function(y) {
      yInfo = null;
      if (y.name===undefined) throw new Error("Property name for x is undefined");
      if (y.datatype===undefined) throw new Error("Property name for x is undefined");
      if (y.name===null) throw new Error("Property name for x is null");
      if (y.datatype===null) throw new Error("Property name for x is null");
      if (Array.isArray(y)) throw new Error("Y object is an array");

      yInfo = y;
    }
    this.getY = function() {
      return yInfo;
    }

    /* Margin */
    this.setMargin = function(m) {
      margin = m;
    }
    this.getMargin = function() {
      return margin;
    }
    this.setSVGWidth = function(width) {
      svgWidth = width;
    };
    this.getSVGWidth = function() {
      return svgWidth;
    };
    this.setSVGHeight = function(height) {
      svgHeight = height;
    };
    this.getSVGHeight = function() {
      return svgHeight;
    }
  }

  /* ********* ********* ********* ********* ********* ********* ********* 
   * Public Methods and variables
   * ********* ********* ********* ********* ********* ********* ********* */
  d3Plotter.prototype.incomeGroup = "";
  d3Plotter.prototype.filter = function(key, value) {
    var newdata = this.getData().filter(function(d) {
      return d[k] = v;
    });
  }
  d3Plotter.prototype.scatterplot = function(svgID) {
    var scales;
    var xInfo = this.getX();
    var yInfo = this.getY();
    var data = this.getData();
    var incomeGroup = this.incomeGroup;

    try {
      /* Validate element is an SVG */
      validateSVG(svgID);
    } catch (e) {
      throw new Error(e);
    }

    document.getElementById(svgID).setAttribute("width", this.getSVGWidth());
    document.getElementById(svgID).setAttribute("height", this.getSVGHeight());
    scales = this.createScale();

    var scatter = d3.select(("#" + svgID))
      .selectAll("circle")
      .data(data);

    scatter
      .exit()
        .remove();

    scatter
      .enter()
      .append("circle")
      .merge(scatter)
        // Start attributes on resize
        .attr("r", 1)
        // Transition after resize
        .transition(d3.transition().duration(750))
          .attr("cx", function(d) { return scales.x(d[xInfo.name]); })
          .attr("cy", function(d) { return scales.y(d[yInfo.name]); })
          .attr("r" , function(d) {
            var radius = 4;
            if (incomeGroup=="") return radius;
            if (d.incomeGroup!=incomeGroup) return 3;
            return 6;
          })
          .style("fill", function(d) {
            var color = "rgba(130, 131, 135, 0.5)";

            if (d.incomeGroup=="High income") {
              color = "rgba(0, 26, 255, 0.5)";
            } else if (d.incomeGroup=="Low income") {
              color = "rgba(255, 0, 60, 0.5)";
            } else if (d.incomeGroup=="Upper middle income") {
              color = "rgba(0, 206, 0, 0.5)";
            } else if (d.incomeGroup=="Lower middle income") {
              color = "rgba(255, 81, 0, 0.5)";
            }

            return "rgba(0, 26, 255, 0.5)";
            if (incomeGroup=="") return color;
            if (d.incomeGroup!=incomeGroup) return "rgba(130, 131, 135, 0.5)";
            color = "rgba(0, 26, 255, 0.5)";
            return color;
          });

  }

  /* Create Scale */
  d3Plotter.prototype.createScale = function() {
    var x;
    var y;
    var xInfo = this.getX();
    var yInfo = this.getY();
    var m = this.getMargin();
    var w = this.getSVGWidth();
    var h = this.getSVGHeight();
    var data = this.getData();

    /* Create x scale */
    if (xInfo.datatype=="number") {
      x = d3.scaleLinear()
        .domain( d3.extent(data, function(row) { return row[xInfo.name]; }))
        .range([m.left, w - m.right])
        .nice();
    } else if (xInfo.datatype=="string") {
      x = d3.scaleBand()
        .domain(data.map(function(row) { return row[xInfo.name] }))
        .rangeRound([m.left, w - m.right])
        .padding(0.1);
    }
    /* Create y scale */
    if (yInfo.datatype=="number") {
      y = d3.scaleLinear()
        .domain( d3.extent(data, function(row) { return row[yInfo.name]; }))
        .range([h - m.top, m.bottom ])
        .nice();
    }
//    console.log(x(2) + " : " + y(2));
    return { x, y };
  }

  /* ********* ********* ********* ********* ********* ********* ********* 
   * Protected Methods
   * ********* ********* ********* ********* ********* ********* ********* */
  /* Validate SVG */
  function validateSVG(svgID) {
    var element = document.getElementById(svgID);
    if (element===null) throw new Error("Element " + svgID + ", not found");
    if (element===undefined) throw new Error("Element " + svgID + ", is not defined");
    if (element.nodeName.toLowerCase()==="svg") return;
    throw new Error("Not an SVG element");
  }
})();


/* ********* ********* ********* ********* ********* ********* ********* 
 * Testing
 * ********* ********* ********* ********* ********* ********* ********* */
/* Basic tests 
var h = new d3Plotter();
h.method("echo");

try {
  h.setData(null);
} catch (e) {
  console.log("Data is null: " + e);
}

try {
  h.setData(undefined);
} catch (e) {
  console.log("Data is undefined: " + e);
}

try {
  h.setData("string");
} catch (e) {
  console.log("Data is not an array: " + e);
}

h.setData([1,2,3,4,5]);
*/