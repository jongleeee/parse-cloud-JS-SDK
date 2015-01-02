
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("updateMember", function(request, response) {
    var userID = request.params.userID;

	var userQuery = new Parse.Query(Parse.User);
	
	userQuery.equalTo('objectID', userID);
	userQuery.first().then(function(user) {
    	if (user) {
        	// do something with the user here
        	user.set('groups', request.params.groupList);
        	
			
    		Parse.Cloud.useMasterKey();
			
			user.save().then(function() {
            response.success();
        	});
    	
		} else {
        	// no match found, handle it or do response.error();
    	}
	});
});


