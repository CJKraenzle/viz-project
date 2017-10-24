/**
 * Author: Christopher Kraenzle 
 */
var s;
document.addEventListener("DOMContentLoaded", function(event) {
  s = new HappyData();

  s.loadMetadata();
  for (var i=0; i < s.metadata.length; i++) {
    console.log(s.metadata[i].code + " - " + s.metadata[i].country);
  }
});