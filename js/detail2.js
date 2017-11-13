var d2width = 960;
var d2height = 500;
var d2margin = { top: 20, right: 20, left: 150, bottom: 120};
var d2innerWidth = d2width - d2margin.right - d2margin.left;
var d2innerHeight = d2height - d2margin.top - d2margin.bottom;
var d2x;
var d2y = d3.scaleLinear();
var svg;

function d2CreateScales(xField, yField) {
  d2x = d3.scaleLinear()
    .domain([2008, 2016])
    .range([0 + d2margin.left, d2width - d2margin.right])
    .nice();
  d2y = d3.scaleLinear()
    .domain([0 , 9])
    .range([d2innerHeight, 0 + d2margin.bottom])
    .nice();
}

function d2CreateScatterPlot(xField, yField, rField) {
  svg = d3.select("svgDetail2")
    .attr("width", d2width)
   .attr("height", d2height);

  svg.selectAll("circle")
    .data(h.happy)
    .enter()
      .append("circle")
        .attr("cx", function(d,i) {
          return d2x(d[xField]);
        })
        .attr("cy", function(d,i) {
          return d2y(d[yField]);
        })
        .attr("r", function(d,i) {
          return d[rField] * 10;
        });
  
  svg.append("g")
    .attr("transform", "translate(0," + d2innerHeight + ")")
    .call(d3.axisBottom(d2x));

  svg.append("text")
    .attr("class","label")
    .attr("y", 425)
    .attr("x", d2width / 2)
    .style("text-anchor", "middle")
    .text("Happiness Ranking");

  svg.append("g")
    .attr("transform", "translate(" + d2margin.left + "," + 0 + ")")
    .call(d3.axisLeft(d2y));

  svg.append("text")
    .attr("class","label")
    .attr("transform", "rotate(-90)")
    .attr("y", 100)
    .attr("x", -(d2height / 2))
    .style("text-anchor", "middle")
    .text("GDP Per Capita");
  
  svg.append("text")
    .attr("class","label")
    .attr("y", 50)
    .attr("x", d2width / 2 )
    .style("text-anchor", "middle")
    .text("World Happiness Ranking");
}