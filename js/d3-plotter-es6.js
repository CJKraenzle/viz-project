/*
 * Author: Christopher J. Kraenzle
 * 
 */

class PlotTypes {
  // Class Constructor
  constructor(data, xname, yname) {
    // Create three parameters 
    // d holds the data set
    // x holds the column name for x values
    // y holds the column name for y values
    this.d = null;
    this.x = null;
    this.xtype = "number";
    this.y = null;
    this.ytype = "number";
    
    // Set data, if no data is passed log the error
    // Parameters do not need to be passed
    try {
      this.setData(data);
    } catch (e) {
      // Error is ok: console.log(e);
    }

    // Set column representing X values
    try {
      this.setX(xname);
    } catch (e) {
      // Error is ok: console.log(e);
    }
    
    // Set column representing y values
    try {
      this.setY(yname);
    } catch (e) {
      // Error is ok: console.log(e);
    }
  }

  // Basic validations before setting data set
  setData(data) {
    this.d = null;
    if (data===null) throw new Error("Data is null");
    if (data===undefined) throw new Error("Data is undefined");
    if (!Array.isArray(data)) throw new Error("Data is not an array");

    this.d = data;
  }
  // Basic validations before setting x column
  setX(xname, datatype) {
    this.x = null;
    if (xname===null) throw new Error("X is null");
    if (xname===undefined) throw new Error("X is undefined");

    this.x = xname;
    this.xtype = datatype;

    if (!(this.d[0].hasOwnProperty(this.x))) 
      throw new Error("Data set is missing property " + this.x);
  }
  // Basic validations before setting y column
  setY(yname, datatype) {
    this.y = null;
    if (yname===null) throw new Error("Y is null");
    if (yname===undefined) throw new Error("Y is undefined");

    this.y = yname;
    this.ytype = datatype;

    if (!(this.d[0].hasOwnProperty(this.y))) 
    throw new Error("Data set is missing property " + this.y);
  }

  // Getters for parameters
  getData() {
    return this.d;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }

  /* ********* ********* ********* ********* ********* ********* 
   * Create scatterplot
   * ********* ********* ********* ********* ********* ********* */
  scatterplot(svgID) {
    let scales;

    try {
      // Validate element is an SVG
      this.validateSVG(svgID);
    } catch (e) {
      throw new Error(e);
    }
    
    let w = document.getElementById(svgID).clientWidth;
    let h = document.getElementById(svgID).clientHeight;

    scales = this.createScales(w, h);

    let scatter = d3.select(("#" + svgID))
      .selectAll("circle")
      .data(this.d);
    
    scatter
      .exit()
        .remove();

    scatter
      .enter()
      .append("circle")
      .merge(scatter)
        // Start attributes on resize
        .attr("r",12)
        // Transition after resize
        .transition(d3.transition().duration(750))
          .attr("cx", (d)=>{ return scales.x(d[this.x]); })
          .attr("cy", (d)=>{ return scales.y(d[this.y]); })
          .attr("r" , 2);
  }

  /* ********* ********* ********* ********* ********* ********* 
   * Create line chart
   * ********* ********* ********* ********* ********* ********* */
   
   /* ********* ********* ********* ********* ********* ********* 
   * General functions
   * ********* ********* ********* ********* ********* ********* */
  createScales(width, height) {
    let x;
    let y;

    // Set x scale
    if (this.xtype=="number") {
      x = d3.scaleLinear()
        .domain( d3.extent(this.d, (row)=>{ return row[this.x]; }) )
        .range([ 0, width])
        .nice();
    }

    // Set y scale
    if (this.ytype=="number") {
      y = d3.scaleLinear()
        .domain( d3.extent(this.d, (row)=>{ return row[this.y]; }) )
        .range([ height, 0])
        .nice();
    }
    return { x, y };
  }

  // Validation routines
  validateSVG(svgID) {
    let element = document.getElementById(svgID);
    if (element===null) throw new Error("element not found")
    if (element===undefined) throw new Error("element not defined")
    if (element.nodeName.toLowerCase()==="svg") return;
    throw new Error("Not an SVG element");
  }  
}

