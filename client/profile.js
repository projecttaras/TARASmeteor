Template.profile.onCreated(function(){
  // subscribe to the publication responsible for sending the Pushups
  // documents down to the client
  this.subscribe("userProfile");
});


Template.profile.helpers({
	userprofile: function(){
		my_user_id = Meteor.userId();
		console.log("me"+ my_user_id);
		u = UserProfile.findOne({UserId: my_user_id});
		if(!u){
			console.log("No user profile !");
			return "None";
		}
		console.log(u.UserId);
		return u;
		
	},
	getUser: function(){
    // var username="";
    // Meteor.call("getUser",UserId,function(err,data){
    //   console.log(data);
    //   username=data;
    // });
    // console.log("Returned content: "+ username);
    // return username;
    // console.log("Function called");
    user=Meteor.user();

    if(user)
      return user.username
    else
      return "Not found";
  	}

});


Template.profile.events({
	'click #updateform':  function(event){
		event.preventDefault();
		var name = event.target.form.name.value;
		var phoneNumber = event.target.form.phoneNumber.value;
		// var carNo = event.target.form.carNo.value;
		var EmergencyNo = event.target.form.EmergencyNo.value;
		var phoneNumbers = []
    	phoneNumbers.push(EmergencyNo);

		Meteor.call('updateUserProfile',Meteor.userId(),name,phoneNumber,phoneNumbers, function(error,result)
            {
              if(error)
                Alerts.add(error);
              else
              {
                Alerts.add("Successfully update UserProfile","success");
                // Router.go('map');
              }
            });
		

	}
});