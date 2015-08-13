var request = require('request');
var cheerio = require('cheerio');
var url = require('url');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', { name: String });
var NutritionInfo = mongoose.model('NutritionInfo',
{
  	food_name: {
  		type: 'string'
  	},
  	Calories:{
  		type: 'string'	
  	},
  	Sodium:{
  		type: 'string'	
  	},
  	'Total Fat':{
  		type: 'string'	
  	},
  	Potassium:{
  		type: 'string'	
  	},
  	'Total Carbs':{
  		type: 'string'	
  	},
  	Polyunsaturated:{
  		type: 'string'	
  	},
  	'Dietary Fiber':{
  		type: 'string'	
  	},
  	Monounsaturated:{
  		type: 'string'	
  	},
  	Sugars:{
  		type: 'string'	
  	},
  	Trans:{
  		type: 'string'	
  	},
  	Protein:{
  		type: 'string'	
  	},
  	'Vitamin A':{
  		type: 'string'	
  	},
  	Calcium:{
  		type: 'string'	
  	},
  	'Vitamin C':{
  		type: 'string'	
  	},
  	Iron:{
  		type: 'string'	
  	}
  })

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err){
  	console.log(err);
  } 
  console.log('meow');
});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('connection opended')
});

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

			var foodname = $('h2.food-description').text();
			//console.log(jsonarray)
			callback(jsonarray,foodname)
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
				 	nutritionInfoParser(url.toString(), function(jsarray,foodname){				 		
				 		jsonarray = []				 	
				 		insertFoodAndNutrition(jsarray,foodname)
				 	})
				});		
			})
		}	
	})
}

foodCollector();

function insertFoodAndNutrition(jsarray,foodname){
	var nutritionInfoObjectWithDynamicKeys = {};
	nutritionInfoObjectWithDynamicKeys['food_name'] = foodname; 
	for(var obj in jsarray){
		if(!(jsarray[obj].name == '&#xA0;')){
			var record = jsarray[obj];				 			
			nutritionInfoObjectWithDynamicKeys[record.name] = record.value;				 			
		}
	}
	console.log(nutritionInfoObjectWithDynamicKeys);
	var nutriInfo = new NutritionInfo( nutritionInfoObjectWithDynamicKeys );
	nutriInfo.save(function (err) {
	  if (err){
	  	console.log(err);
	  } 
	  console.log('Saved Successfully..');
	});
}