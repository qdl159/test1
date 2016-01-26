(function(){
	'user strict';
	
	$.get('/api/user', function(users){
		var cnt ='<tr><th></th></tr>'
		users.forEach(function(user){
  			cnt += '<tr><td>' + user.firstName + '</td><td>' + user.lastName + '</td></tr>';

		});
		$('#cnt').html(cnt);

	});


})();
