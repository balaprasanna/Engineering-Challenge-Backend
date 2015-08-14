/**
 * FoodController
 *
 * @description :: Server-side logic for managing Foods
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var url = require('url')

module.exports = {
	getSuggestedFoodNames: function (req, res) {		
	var r = req.url;
	console.log(r)
	var urlInfo = url.parse(r,true)
	console.log(urlInfo)
	var q = urlInfo.query.q;
	console.log(q)
	
		NutritionInfo.find(
			{
			  food_name : {
			    'contains' : q
			  },
			  limit: 10
			}
		).exec(function (err, allTheStuff) {
			if(!err){
				console.log(allTheStuff)
				res.json(allTheStuff)
			}else
			{
				console.log(err)			
			}
		})
	},
};

