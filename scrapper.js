var request = require('request');
var cheerio = require('cheerio');
var url = require('url');

var mainbase = "http://www.myfitnesspal.com";
var jsonarray = [];
var baseurlOptions = {
  url: "http://www.myfitnesspal.com/food/calorie-chart-nutrition-facts",
  headers: {
    'User-Agent': 'request'
  }
}

function nutritionInfoParser (suburl, callback){
	var options = {
		  url: mainbase+suburl,
		  headers: {
		    'User-Agent': 'request'
		  }
	};
	request(options, function(error, response, html){
		if(!error){			
			var $ = cheerio.load(html);
			var t = $('#nutrition-facts > tbody tr' ).each(function(){					
					$(this).children('td.col-1').each(function(){
						var json = {};
						json.name = $(this).html();
						json.value = $(this).next().html();
						jsonarray.push(json);
					})					
			});
			//console.log(jsonarray)
			callback(jsonarray)
		}
	})
}

function foodCollector(){
	request(baseurlOptions, function(error, response, html){
		if(!error){			
			var $ = cheerio.load(html);
			$('ul.food_search_results').each(function(){				
				 $(this).children('li').each(function(){
				 	var url = $(this).find('div.food_description > a').attr('href');		
				 	nutritionInfoParser(url.toString(), function(jsarray){
				 		//res.write(JSON.stringify(jsarray))
				 		jsonarray = []
				 		console.log(jsarray);
				 		//insertFoodAndNutrition(jsarray)
				 	})
				});		
			})
		}	
	})
}

foodCollector();