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
      if (!Array.isArray(x)) throw new Error("X object is not an array");

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
      if (!Array.isArray(y)) throw new Error("X object is not an array");

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
  }

  /* ********* ********* ********* ********* ********* ********* ********* 
   * Public Methods and variables
   * ********* ********* ********* ********* ********* ********* ********* */
  d3Plotter.prototype.value = 1;
  d3Plotter.prototype.method = function(echo) {
    console.log(echo);
    console.log(this.hello); // error
    iAmPrivate();
  }

  /* Protected Methods */
  function iAmPrivate() {
    console.log("PRIVATE!")
  }
})();

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
