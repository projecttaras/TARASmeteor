
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });


Template.map.onRendered(function(){
  GoogleMaps.load();
});

Template.map.helpers({
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },
  mapOptions : function (){
    var latLng = Geolocation.latLng();
    // Initialize the map once we have the latLng.
    if (GoogleMaps.loaded()){
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: 13,
        zoomControl: true,
        scaleControl: true,
        styles:[{"featureType":"water","elementType":"all","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"on"}]},{"featureType":"water","elementType":"labels","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"hue":"#83cead"},{"saturation":1},{"lightness":-15},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#f3f4f4"},{"saturation":-84},{"lightness":59},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbbbbb"},{"saturation":-100},{"lightness":26},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-35},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-22},{"visibility":"on"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"hue":"#d7e4e4"},{"saturation":-60},{"lightness":23},{"visibility":"on"}]}]
      };
    }
  }

});

setMarker = function (initialLocation,location, map){

         var marker = new google.maps.Marker({
            position: initialLocation,
            title: location,
            map: map,
            draggable: false,
            icon: 'http://www.fiatusa.com/assets/images/2015/vehicles/500e/marker-22x31.png',
            animation: google.maps.Animation.DROP
        });

        marker['infowindow'] = new google.maps.InfoWindow({
          content:location
        });
        google.maps.event.addListener(marker, 'mouseover', function() {
            this['infowindow'].open(map, this);
        });
}



Template.map.onCreated(function() {
  GoogleMaps.ready('map', function(map) {
    var latLng = Geolocation.latLng();

    setMarker(new google.maps.LatLng(latLng.lat, latLng.lng), "Your location", map.instance);
    accidents = Accidents.find({});

    accidents.forEach(function(obj){
      // console.log(obj.location);
      setMarker(new google.maps.LatLng(obj.lat, obj.longt), obj.location, map.instance);
    })

  });
});

Template.home.helpers({
  accidents: function(){
    return Accidents.find({});
  }
});


Template.adduser.events({
  'click #submitform'(event) {
    event.preventDefault();
    var emailaddress=$('#emailaddress').val();
    var password=$('#Password').val();
    var confirmpassword=$('#ConfirmPassword').val();
    var hospitalmember=$('#Hospital').is(':checked');
    var policemember=$('#PoliceStation').is(':checked');
    var roles=[];
    if(hospitalmember)
      roles.push("Hospital");
    else if(policemember)
      roles.push("Police");
    var address=$('#address').val();
    var latlong=$('#latlongt').val();
    var latlongarr=latlong.trim().split(",");
    var userinfo={'address':address,'latlongarr':latlongarr,'hospitalmember':hospitalmember,'policemember': policemember};
    console.log("========Values from form===============");
    console.log(emailaddress+"|"+password+"|"+hospitalmember+"|"+address);
    Meteor.call('addnewuser',emailaddress,password,roles,userinfo,function(){
      console.log("Sending data to user..........");
    });
  },
});


Template.adduser.helpers({
  UserRole: function(){
    if(Meteor.user())
      return Meteor.user().roles;
    else
      return "No role assigned";
  }
})

Accidents.find().observe({
  added: function(accident){
    GoogleMaps.ready('map', function(map) {
    var latLng = Geolocation.latLng();
      // console.log(obj.location);
    setMarker(new google.maps.LatLng(accident.lat, accident.longt), accident.location, map.instance);
  });
  }
})
