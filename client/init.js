
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });



//Map helper functions
Template.map.onRendered(function(){
  GoogleMaps.load({
    libraries: 'visualization'
  });
});

var heatmap;
// function toggleHeatmap() {
//   heatmap.setMap(heatmap.getMap() ? null : map);
// }

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 1);
}



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
        styles:[{"featureType":"water","elementType":"all","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"on"}]},{"featureType":"water","elementType":"labels","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"hue":"#83cead"},{"saturation":1},{"lightness":-15},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#f3f4f4"},{"saturation":-84},{"lightness":59},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbbbbb"},{"saturation":-100},{"lightness":26},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-35},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-22},{"visibility":"on"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"hue":"#d7e4e4"},{"saturation":-60},{"lightness":23},{"visibility":"on"}]}],
        // mapTypeId: google.maps.MapTypeId.SATELLITE,      
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

function getPoints() {
  return [
    new google.maps.LatLng(37.782551, -122.445368),
    new google.maps.LatLng(37.782745, -122.444586),
    new google.maps.LatLng(37.782842, -122.443688),
    new google.maps.LatLng(37.782919, -122.442815),
    new google.maps.LatLng(37.782992, -122.442112),
    new google.maps.LatLng(37.783100, -122.441461),
    new google.maps.LatLng(37.783206, -122.440829),
    new google.maps.LatLng(37.783273, -122.440324),
    new google.maps.LatLng(37.783316, -122.440023),
    ]
}


function deg2rad(angle) {
  return angle * .017453292519943295;
}

function getDistance( latitude1, longitude1, latitude2, longitude2 ) {  
    var earth_radius = 6371;

    var dLat = deg2rad(latitude2 - latitude1 );  
    var dLon = deg2rad(longitude2 - longitude1 );  

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(latitude1)) * Math.cos(deg2rad(latitude2)) * Math.sin(dLon/2) * Math.sin(dLon/2);  
    var c = 2 * Math.asin(Math.sqrt(a));  
    var d = earth_radius * c;  

    return d;  
}


function get_number_of_accidents_in_radius(loc, accidents){
  var threshold = 30;

  var rad = 1000;
  var lat = loc.latLng.lat();
  var lng = loc.latLng.lng();
  console.log(loc.latLng.lat()+ "   "+loc.latLng.lng());
  var count = 0;
  accidents.forEach(function(accident){
    var dist = getDistance(lat, lng, accident.lat, accident.longt);
    if(dist <= 0.2){
      count = count +1;
    }


  })
  if (count > threshold){
    console.log("SLOW DOWN BITCH");
  }

}

Template.map.onCreated(function() {
  GoogleMaps.ready('map', function(map) {
    var latLng = Geolocation.latLng();
    accidents = Accidents.find({});

    map.instance.addListener('click', function(e) {
      get_number_of_accidents_in_radius(e, accidents);
    });
    setMarker(new google.maps.LatLng(latLng.lat, latLng.lng), "Your location", map.instance);
    

    var accident_lat_lon_list = [];

    accidents.forEach(function(obj){
      // console.log(obj.location);
      // setMarker(new google.maps.LatLng(obj.lat, obj.longt), obj.location, map.instance);
      // console.log(obj.deaths);
      // accident_lat_lon_list.push(new google.maps.LatLng(obj.lat, obj.longt));
      for (i = 0; i < obj.deaths+obj.injuries+1 ; i++) { 
          accident_lat_lon_list.push(new google.maps.LatLng(obj.lat, obj.longt));
      }
    })

    // console.log(accident_lat_lon_list);
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: accident_lat_lon_list,
        map: map.instance
      });
    // changeGradient();
    changeRadius();
    changeOpacity();

  });
});


//Home template
Template.home.helpers({
  accidents: function(){
    return Accidents.find({});
  }
});


//Add user template
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


//Login and Register Templates
Template.login.events({
  'click #submitform'(event) {
    event.preventDefault();
    var emailaddress=$('#emailaddress').val();
    var password=$('#Password').val();
    // console.log(emailaddress+password);
    Meteor.loginWithPassword({'username':emailaddress},password,function(err){
      if(err)
      {
        console.log(err);
      }
      else
      {
        Router.go('home');
      }
    });
  },
});

Template.register.events({
  'click #submitform'(event) {
    event.preventDefault();
    var emailaddress=$('#emailaddress').val();
    var password=$('#Password').val();
    var confirmpassword=$('#ConfirmPassword').val();
    Accounts.createUser({
            'username': emailaddress,
            'email': emailaddress,
            'password': password,
        });
    Router.go('home');
  },
});



//Accidents maps functions
Accidents.find().observe({
  added: function(accident){
    GoogleMaps.ready('map', function(map) {
    var latLng = Geolocation.latLng();
      // console.log(obj.location);
    // setMarker(new google.maps.LatLng(accident.lat, accident.longt), accident.location, map.instance);
  });
  }
})


Template.homepage.helpers({
  template: function () {
    route = Router.current();
    return route? route.lookupTemplate() : 'home';
  },
});