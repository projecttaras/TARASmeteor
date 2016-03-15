  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

Template.map.created = function() {
  $('head').append('<script src="https://maps.googleapis.com/maps/api/js"></script>');
};

  Template.map.helpers({
  	accidents :function(){
      a = Accidents.find({});
      for(var i = 0; i< a.length; i++){
      	console.log(a[i]);
      }
    }
  });

