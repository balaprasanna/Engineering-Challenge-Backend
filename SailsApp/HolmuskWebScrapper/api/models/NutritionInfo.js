/**
* NutritionInfo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
//<div>
//	<div width="300px" >Input div</div>
//	<div width="300px" >Sugestion</div>	
//</div>
module.exports = {

  tableName: 'nutritioninfos',
  attributes: {
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
  	},

    toJSON: function() {
      var obj = this.toObject();
      delete obj.id;
      delete obj.__v;
      return obj;
    }

  }
};

