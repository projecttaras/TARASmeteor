Template.userDevice.onCreated(function(){
  // subscribe to the publication responsible for sending the Pushups
  // documents down to the client
  this.subscribe("userDevice");
  this.subscribe("manufacturers");
});


Template.userDevice.helpers({
	userdevicelist: function(){
    console.log("Hello");
		my_user_id = Meteor.userId();
		console.log("me"+ my_user_id);
		u = UserDevice.find({UserId: my_user_id});
		if(!u){
			console.log("No user Devices !");
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
  	},
    getManufacturer: function(){
      console.log("Manufacturer list");
      m = Manufacturer.find({});
      return m;
    }

});


Template.userDevice.events({
	'click #updateform':  function(event){
		event.preventDefault();
		var name = event.target.form.name.value;
		var deviceID = event.target.form.deviceid.value;
    var manID = event.target.form.manu.value.toString();

		Meteor.call('addDevice',Meteor.userId(),name,deviceID,manID,function(error,result)
            {
              if(error)
                Alerts.add(error);
              else
              {
                Alerts.add("Successfully update UserDevices","success");
                // Router.go('map');
              }
            });


	}
});
