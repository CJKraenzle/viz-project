/**
 * Author: Christopher Kraenzle 
 */
var s;
document.addEventListener("DOMContentLoaded", function(event) {
  s = new HappyData();

  s.loadMetadata();
  s.loadPopulation();
  s.loadCountry();
});