/**
 * Author: Christopher Kraenzle 
 */
(function() {
  this.HappyData = function() {
    var version = "0.0.1";
  };
  /* ********* ********* ********* ********* ********* ********* ********* 
   * Public Methods
   * ********* ********* ********* ********* ********* ********* ********* */
  HappyData.prototype.metadata = [];
  HappyData.prototype.population = [];
  HappyData.prototype.happy = [];

  /* ********* ********* ********* ********* ********* ********* ********* 
   * Public Variables
   * ********* ********* ********* ********* ********* ********* ********* */
  HappyData.prototype.processMetadata = function(d) {
    console.log(d.code);
    return {
      code : d["code"],
      region : d["region"],
      incomeGroup : d["incomeGroup"]
    };
  };
  HappyData.prototype.processPopulation = function(d) {
    return {
      code : d["code"],
      country : d["country"],
      year2008 : +d["year2008"],
      year2009 : +d["year2009"],
      year2010 : +d["year2010"],
      year2011 : +d["year2011"],
      year2012 : +d["year2012"],
      year2013 : +d["year2013"],
      year2014 : +d["year2014"],
      year2015 : +d["year2015"],
      year2016 : +d["year2016"]
    };
  };
  HappyData.prototype.processHappy = function(d) {
    return {
      code : d["code"],
      country : d["country"],
      year : +d["year"],
			lifeladder: +d["lifeLadder"],
			gdpPerCapita: +d["gdpPerCapita"],
			social: +d["social"],
			lifeExpect: +d["lifeExpect"],
			freedom: +d["freedom"],
			generosity: +d["generosity"],
			corruption: +d["corruption"]
    };
  };
  HappyData.prototype.loadMetadata = function(d) {
    d3.csv("data/metadata.csv", this.processMetadata, function(data) {
      this.metadata = data;
    });
  };
  HappyData.prototype.loadPopulation = function(d) {
    d3.csv("data/population.csv", this.processPopulation, function(data) {
      this.metadata = data;
    });
  };
  HappyData.prototype.loadMetadata = function(d) {
    d3.csv("data/metadata.csv", this.processMetadata, function(data) {
      this.metadata = data;
    });
  };
})();