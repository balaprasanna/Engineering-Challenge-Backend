// $(document).ready(function(){

//     $( ".search-target" ).change(function() {
//   		alert( "Handler for .change() called." + $( this ).val() );
// 	});

// });
$(document).ready(function(){
	$("#search-box").keyup(function(){
		if($(this).val() == ""){
			$('#suggesstion-box').html('');
		}
		else
		{
			$.ajax({
			type: "GET",
			url: "/Food/getSuggestedFoodNames",
			data:'q='+$(this).val(),
			beforeSend: function(){
				//$("#search-box").css("background","#FFF url(LoaderIcon.gif) no-repeat 165px");
			},
			success: function(data){
				
				$('#suggesstion-box').html('');
				$('#suggesstion-box').append("<ul id='newList'></ul>");
				var resultArray =  data;
				resultArray.forEach( function(resultObject) {
					var foodname = resultObject.food_name;
					$("#newList").append("<li>"+ foodname +"</li>");
				})

				$("#suggesstion-box").show();			
				//$("#search-box").css("background","#FFF");
			}
			});
		}
	});
});