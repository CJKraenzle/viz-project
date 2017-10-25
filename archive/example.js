/*
 * Author: Christopher J. Kraenzle
 * 
 */
(function() {
  /* Constructor Global Scope */
  this.d3Plotter = function() {
    /* Private variables */
    var hello = "Hello";

    /* Public setters and getters */
    this.setHello = function(hi) {
      hello = hi;
    }
    this.getHello = function() {
      return hello;
    }

    /* Public variables */
    this.yo = "HOLLER";
  }

  /** Public Methods and variables */
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
console.log("Private" + h.iAmPrivate());
