/**
 * Author: Christopher Kraenzle 
 */
var s;
document.addEventListener("DOMContentLoaded", function(event) {
  s = new HappyData();

  document.addEventListener("dataloaded", function(event) {
    alert("Data loaded");
  });
  s.loadMetadata();
  s.loadPopulation();
  s.loadCountry();
});