var $friends =$('#friends');
var $name = $('#name');
var $age = $('#age');

var friendTemplate = "" +
	"<li>" +
	"<p><strong>Name:</strong> {{name}}</p>" +
	"<p><strong>Age:</strong> {{age}}</p>" +
	"<buttton id='{{id}}' class='remove btn btn-danger'>X</button>" +	
	"</li>";

function addFriend(friend){
	$friends.append(Mustache.render(friendTemplate, friend));
}; // visually verified closure

$(document).ready(function(){  // may be extra ')'

	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/learncode/friends',
		success: function(friends) {
			$.each(friends, function(i, friend){
				addFriend(friend);
			});
		},		// this should close the $.ajax(...)

		error: function(){
			alert('error loading friends');
		}		// this should close the error function
	});   			// this should close $(document)...

	$('#add-friend').on('click',function(){
		var friend = {
	 		name: $name.val(),
	 		age: $age.val()
	 	};

		$.ajax({
			type: 'POST',
			url: 'http://rest.learncode.academy/api/learncode/friends',
			data: friend,
			success: function(newFriend){
				addFriend(newFriend);
			},
			error: function(){
				alert('err saving order');
			}
		});		// this should close #.ajax POST
				// this should close #add-friend
	});

	//.delegate allows you to remove items that were loaded by other students
	$friends.delegate('.remove', 'click', function(){

		var $li = $(this).closest('li');
		//AJAX DELETE Function - click the .remove class button and the id identities what to delete
		$.ajax({
			type: 'DELETE',
			url: 'http://rest.learncode.academy/api/learncode/friends/' + $(this).attr('id'),
			success: function(){
				$li.fadeOut(300, function(){
					$(this).remove();
				
				});
			}
		});
	});
});