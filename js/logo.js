var svg;
var init = Date.now();

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

//  svg.append("text")
//      .attr("dy", -8)
//    .append("textPath")
//      .attr("xlink:href","#wavy")
//      .attr("id","pw-top")
//      .style("text-anchor","middle")
//      .attr("startOffset","50%")
//      .text("Pratt & Whitney");

  svg.append("path")
    .attr("id","wavy-bottom")
    .attr("d", "M 25,250 A 100,100 0 0,0 475,250")
    .style("fill", "#001f3f") // Navy
    .style("stroke", "none")
    .style("stroke-width","0");

  svg.append("text")
      .attr("dy", -18)
    .append("textPath")
      .attr("xlink:href","#wavy-bottom")
      .attr("id","wavyText-bottom")
      .style("text-anchor","middle")
      .attr("startOffset","50%")
      .text("& VISUALIZATION");

//  svg.append("text")
//      .attr("dy", 32)
//    .append("textPath")
//      .attr("xlink:href","#wavy-bottom")
//      .attr("id","pw-bottom")
//      .style("text-anchor","middle")
//      .attr("startOffset","50%")
//      .text("Digital Technology");

  svg.append("circle")
    .attr("cx", 250)
    .attr("cy", 250)
    .attr("r", 155)
    .style("fill","#ffffff") 
    .style("fill-opacity","0.9")
    .style("stroke","none");

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

//    if (delta / 5 <= 360) {
//      svg.selectAll("#wavy")
//      .attr("transform", function() { return "rotate(" + (delta / 5 ) + ",250, 250)"; })

//      svg.selectAll("#wavy-bottom")
//      .attr("transform", function() { return "rotate(" + (-1 * delta / 5 ) + ",250, 250)"; })
//    }
  }, 15);

  var tpoints = [
    [125, 250],
    [150, 180],
    [205, 235],
    [250, 115],
    [295, 235],
    [350, 180],
    [380, 250],
    [250, 165]
  ];

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

  svg.append("line")
    .attr("id","bottom-split")
    .attr("x1", 250)
    .attr("y1", 250)
    .attr("x2", 250)
    .attr("y2", 405)
    .style("stroke", "#747474");

  var cluster1 = [
    [120,270],
    [126,301],
    [128,310],
    [132,290],
    [142,280],
    [145,320],
    [142,270],
    [155,280],
    [160,320],
    [165,270],
    [170,285]
  ];

  var cluster2 = [
    [232,278],
    [235,317],
    [221,313],
    [204,263],
    [207,281],
    [179,268],
    [206,319],
    [232,293],
    [194,255],
    [213,267],
    [205,306],
    [187,310]    
  ];

  var cluster3 = [
    [210,390],
    [195,359],
    [185,352],
    [191,355],
    [163,354],
    [183,355],
    [228,373],
    [205,356],
    [160,346],
    [225,369],
    [182,381],
    [219,358],
    [191,354],
    [199,347],
    [185,386],
    [214,345],
    [218,384],
    [157,328],
    [237,348],
    [173,375]    
  ];

  svg.selectAll(".cluster1")
    .data(cluster1)
    .enter()
      .append("circle")
        .attr("r", 5)
        .attr("transform", function(d) { return "translate(" + d + ")"; })
        .attr("fill", "#006bfc")
        .style("fill-opacity","0.4");
        
  svg.selectAll(".cluster2")
    .data(cluster2)
    .enter()
      .append("circle")
        .attr("r", 5)
        .attr("transform", function(d) { return "translate(" + d + ")"; })
        .attr("fill", "#fc0000")
        .style("fill-opacity","0.4");
        
  svg.selectAll(".cluster3")
    .data(cluster3)
    .enter()
      .append("circle")
        .attr("r", 5)
        .attr("transform", function(d) { return "translate(" + d + ")"; })
        .attr("fill", "#15ff00")
        .style("fill-opacity","0.4");
        
  svg.append("rect")
    .attr("x", 251)
    .attr("y", 260)
    .attr("width", 145)
    .attr("height", 20)
    .style("fill", "orange")
    .style("fill-opacity","0.4");
    
  svg.append("rect")
    .attr("x", 251)
    .attr("y", 285)
    .attr("width", 135)
    .attr("height", 20)
    .style("fill", "orange")
    .style("fill-opacity","0.4");
    
  svg.append("rect")
    .attr("x", 251)
    .attr("y", 310)
    .attr("width", 120)
    .attr("height", 20)
    .style("fill", "orange")
    .style("fill-opacity","0.4");

  svg.append("rect")
    .attr("x", 251)
    .attr("y", 335)
    .attr("width", 100)
    .attr("height", 20)
    .style("fill", "orange")
    .style("fill-opacity","0.4");
    
  svg.append("rect")
    .attr("x", 251)
    .attr("y", 360)
    .attr("width", 60)
    .attr("height", 20)
    .style("fill", "orange")
    .style("fill-opacity","0.4");
    
  svg.append("rect")
    .attr("x", 251)
    .attr("y", 385)
    .attr("width", 18)
    .attr("height", 19)
    .style("fill", "orange")
    .style("fill-opacity","0.4");
    

});