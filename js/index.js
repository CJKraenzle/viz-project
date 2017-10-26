/**
 * Author: Christopher Kraenzle 
 */
var s;
var p;

document.addEventListener("DOMContentLoaded", function(event) {
  s = new HappyData();
  p = new d3Plotter();

  document.addEventListener("dataloaded", function(event) {
    addIncomeGrowth();
    drawPage();
  });

  document.getElementById("li0").addEventListener("click", function(event){
    removeSelected();
    document.getElementById("li0").classList.add("selected");
    p.incomeGroup = "";
    drawPage();
  });

  document.getElementById("li1").addEventListener("click", function(event){
    removeSelected();
    document.getElementById("li1").classList.add("selected");
    p.incomeGroup = "High income";
    drawPage();
  });

  document.getElementById("li2").addEventListener("click", function(event){
    removeSelected();
    document.getElementById("li2").classList.add("selected");
    p.incomeGroup = "Upper middle income";
    drawPage();
  });

  document.getElementById("li3").addEventListener("click", function(event){
    removeSelected();
    document.getElementById("li3").classList.add("selected");
    p.incomeGroup = "Lower middle income";
    drawPage();
  });

  document.getElementById("li4").addEventListener("click", function(event){
    removeSelected();
    document.getElementById("li4").classList.add("selected");
    p.incomeGroup = "Low income";
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

function addIncomeGrowth() {
  for (var i=0; i < s.happy.length; i++) {
    s.happy[i].incomeGroup = "";
    for (var j=0; j < s.metadata.length; j++) {
      if (s.happy[i].code==s.metadata[j].code) {
        s.happy[i].incomeGroup = s.metadata[j].incomeGroup;
      }
    }
  }
}

function removeSelected() {
  document.getElementById("li0").classList.remove("selected");
  document.getElementById("li1").classList.remove("selected");
  document.getElementById("li2").classList.remove("selected");
  document.getElementById("li3").classList.remove("selected");
  document.getElementById("li4").classList.remove("selected");  
}