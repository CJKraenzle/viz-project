/**
 * Author: Christopher Kraenzle 
 */
var s;
var p;

document.addEventListener("DOMContentLoaded", function(event) {
  s = new HappyData();
  p = new d3Plotter();

  document.addEventListener("dataloaded", function(event) {
    drawPage();
  });

  window.addEventListener("resize", function(event) {
    drawPage();
  });

  s.loadMetadata();
  s.loadPopulation();
  s.loadCountry();
});

function drawPage() {
  var region = s.distinctValues(s.metadata, "region");
  var incomeGroup = s.distinctValues(s.metadata, "incomeGroup");

  p.setData(s.happy);
  p.setX({ name: "country", datatype: "string" });
  p.setY({ name: "lifeladder", datatype: "number" });
  p.setSVGWidth(window.innerWidth - 200);
  p.setSVGHeight(window.innerHeight - 100);
  p.scatterplot("chart1");
}