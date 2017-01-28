WebFontConfig = {
      google: { families: [ 'Roboto:300' ] }
    };
    (function() {
      var wf = document.createElement('script');
      wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
      wf.type = 'text/javascript';
      wf.async = 'true';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wf, s);
      console.log("async fonts loaded", WebFontConfig);
    })();



  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

//Global Helpers
 Template.registerHelper('equals', function (a, b) {
      return a === b;
  });
  Template.registerHelper('formatDate', function (date) {
      return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
  });



//Map helper functions
Template.map.onRendered(function(){
  Meteor.subscribe('getAccidents');
  $('.context.example .ui.sidebar')
  .sidebar({
    context: $('.context.example .bottom.segment')
  })
  .sidebar('attach events', '.context.example .menu .item')
;

$( ".menu1" ).click(function() {
  $('.ui.sidebar')
  .sidebar('toggle')
;
});

  GoogleMaps.load({
    key: 'AIzaSyAdO05cxef-_WzAvrEZ9TYuUlSOIjdXmw8',
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




setMarker = function (initialLocation,location, map, isdraggable=false){

         var marker = new google.maps.Marker({
            position: initialLocation,
            title: location,
            map: map,
            draggable: isdraggable,
            // icon: 'http://www.fiatusa.com/assets/images/2015/vehicles/500e/marker-22x31.png',
            icon: 'http://icons.iconarchive.com/icons/icons8/windows-8/24/Transport-Car-icon.png',
            animation: google.maps.Animation.DROP
        });

        marker['infowindow'] = new google.maps.InfoWindow({
          content:location
        });
        google.maps.event.addListener(marker, 'mouseover', function() {
            this['infowindow'].open(map, this);
        });

        return marker;
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
    console.log("SLOW DOWN!");
    alert("SLOW DOWN");
  }

}


function startSimulation(map,accidents){
  var latLng = Geolocation.latLng();
  var currentLocationMarker = setMarker(new google.maps.LatLng(latLng.lat, latLng.lng), "Your location", map.instance, true);
  google.maps.event.addListener(currentLocationMarker, 'drag', function(e) { get_number_of_accidents_in_radius(e, accidents); } );

}

function displayInfo(circle){
  console.log("center"+circle.getCenter());
  console.log("bounds"+circle.getBounds());
  var bounds = circle.getBounds();
  var count = 0;
  var deaths = 0;
  accidents.forEach(function(obj){
    accident_lat_lng = new google.maps.LatLng(obj.lat, obj.longt);
    if(bounds.contains(accident_lat_lng)){
      count = count + 1;
      deaths = deaths+ obj.deaths;
    }
  })
  console.log("Accidents :"+count);
  console.log("Deaths :"+deaths);
}

Template.map.onCreated(function() {
  GoogleMaps.ready('map', function(map) {
    var latLng = Geolocation.latLng();
    accidents = Accidents.find({});
    // map.instance.addListener('click', function(e) {
    //   get_number_of_accidents_in_radius(e, accidents);
    // });



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
    var Circle = new google.maps.Circle({
      strokeColor: '#5b5b58',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#e7db9d',
      fillOpacity: 0.35,
      map: map.instance,
      center: latLng,
      radius: 1000,
      editable: true,
      draggable: true
    });

    console.log("event listeners");
    // eventlisteners
    google.maps.event.addListener(Circle, 'center_changed', function()
    {
        console.log('Circle moved');
        displayInfo(Circle);
    });

    google.maps.event.addListener(Circle, 'radius_changed', function()
    {
        console.log('dictance changed');
        displayInfo(Circle);
    });

  });
});


Template.map.events({
  'click #simButton'(e){
      event.preventDefault();
      accidents = Accidents.find({});
      console.log("HEY");
      startSimulation(GoogleMaps.maps.map, accidents);
  }
});


//Home template
Template.home.helpers({
  accidents: function(){
    return Accidents.find({});
  }
});


//Add user template
Template.adduser.onRendered(function(){
  $('.ui.radio.checkbox').checkbox();
});

Template.adduser.events({
  'click #submitform'(event) {
    event.preventDefault();
    var emailaddress=$('#emailaddress').val();
    var password=$('#Password').val();
    var confirmpassword=$('#ConfirmPassword').val();
    var hospitalmember=false;
    var policemember=false;
    var member=$('#member').val();
    var roles=[];
    if(member == 'hospital')
    {
      roles.push("Hospital");
      hospitalmember=true;
    }
    else if(policemember == false)
    {
      roles.push("Police");
      policemember=true;
    }
    var address=$('#address').val();
    var latlong=$('#latlongt').val();
    var latlongarr=latlong.trim().split(",");
    var userinfo={'address':address,'latlongarr':latlongarr,'hospitalmember':hospitalmember,'policemember': policemember};
    console.log("========Values from form===============");
    console.log(emailaddress+"|"+password+"|"+hospitalmember+"|"+address);
    Meteor.call('addnewuser',emailaddress,password,roles,userinfo,function(err,result){
      if(err)
      {
        Alerts.add(err);
      }
      else
      {
        Alerts.add("Success, Added user","success");
        $('input').val("");
      }
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
        Alerts.add(err);
      }
      else
      {
        Router.go('map');
      }
    });
  },
});


// Template.register.helpers({
//   bloodGroupOptions: function () {
//     return [
//         {label: "2013", value: 2013},
//         {label: "2014", value: 2014},
//         {label: "2015", value: 2015}
//     ];
//   },
// });



Template.register.events({
  'click #submitform'(event) {
    event.preventDefault();
    var emailaddress=$('#emailaddress').val();
    var password=$('#Password').val();
    var confirmpassword=$('#ConfirmPassword').val();
    var name = $('#name').val();
    var phoneNumber = $('#phoneNumber').val().toString();
    var EmergencyNo = $('#EmergencyNo').val().toString();
    var bloodGroup = $('#bloodGroup').val();
    var allergies = $('#allergies').val();
    var height = $('#height').val();
    var weight = $('#weight').val();
    // var carNo = $('#carNo').val();
    var phoneNumbers = []
    phoneNumbers.push(EmergencyNo);

    console.log(""+name+phoneNumber+EmergencyNo);

    Meteor.call('addNormalUser',emailaddress,password,function(error,result)
    {
      if(error)
        Alerts.add(error);
      else
      {
        Alerts.add("Successfully created User","success");
        console.log(""+result)

        Meteor.call('addUserProfile',result,name,phoneNumber,phoneNumbers, bloodGroup, allergies, height, weight,  function(error,result)
            {
              if(error)
                Alerts.add(error);
              else
              {
                Alerts.add("Successfully created UserProfile","success");
                Router.go('map');
              }
            });
      }
    });





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

//Portal code

Template.portal.onRendered(function(){
  $('.tabular.menu .item').tab();
  this.subscribe('getUsers');
});

Template.portal.helpers({
  accidents: function() {
       return AccidentMap.find({Status:0});
  },
  acceptedaccidents: function() {
       return AccidentMap.find({Status:1});
  },
  accident: function(accidentID) {
    return Accidents.find({_id:accidentID});
  },
  checkstatus: function(){
    if(this.Status == 0)
      return false;
    else
      return true;
  },
  allaccidents: function() {
       return AccidentMap.find({});
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
    user=Meteor.users.findOne({_id:this.UserId});
    if(user)
      return user.username
    else
      return "Not found";
  },
  getUserProfile: function(){
    console.log("user id "+ this.UserId);
    up = UserProfile.findOne({UserId:this.UserId});
    console.log(up);
    return up;
  }
});

Template.portal.events({

  'click #accept'(event) {
    event.preventDefault();
    // console.log(this.HospitalId);
    // console.log(this.AccidentId);
    Meteor.call('removeOtherHospitals',this._id,this.HospitalId,this.AccidentId,function(result,err){
      if(err)
      {
        Alerts.add(err);
      }
      else
      {
        Alerts.add("Success, Hospital assigned","success");
      }
    });
  },
  'click .accidentlocation' (event) {
    event.preventDefault();
    Session.set('portalMapAllow',true);
    Session.set('lat',this.getAccident().lat);
    Session.set('longt',this.getAccident().longt);
  },
  'click #userid'(event){
    event.preventDefault();
    console.log(this.UserId);
    $('#'+this.UserId).modal('show');
  }
});


//map portal
Template.portalmap.helpers({
  portalMapAllow: function(){
    return Session.get('portalMapAllow');
  },
  lat: function(){
    return Session.get('lat');
  },
  longt: function(){
    return Session.get('longt');
  },
});


