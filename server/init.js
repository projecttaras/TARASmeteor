Accounts.config({
  forbidClientAccountCreation : true
});




  

Meteor.startup(function () {
  // $.getScript('https://maps.googleapis.com/maps/api/js', function(){});
  console.log("Server init started........");
  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true,
    validateFile: function(file, req) {
	    // e.g. read file content
      Fiber = Npm.require('fibers');
	    console.log(file);
	    var path=file.path;
      var fs = Npm.require('fs');
      var obj = JSON.parse(fs.readFileSync(path, 'utf8'));
      Fiber(function() {
        for(var i=0, len=obj.length;i<len;i++)
        {
          Accidents.insert({
            deaths: obj[i].deaths,
            longt: obj[i].lon,
            lat: obj[i].lat,
            date: obj[i].date,
            location: obj[i].location,
            vehicle: obj[i].vehicle,
            injuries: obj[i].injuries
          });
          console.log(obj[i]);
        }
      }).run();
      // console.log(obj);
	    return null; 
	}
  });

  Meteor.methods({
    addnewuser: function(emailaddress,password,roles,userinfo){
      var user=Accounts.createUser({
        'username': emailaddress,
        'email': emailaddress,
        'password': password,
        'roles': roles,
        'userinfo':userinfo,
    },console.log("Done"));
    },
    getaddress: function(lat,longt){
      this.unblock();
      var url="http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+longt;
      console.log("Url to call....:"+url);
      return Meteor.http.call("GET",url);
    },
    removeOtherHospitals: function(MapId,HospitalId,AccidentId)
    {
      //console.log(AccidentMap.find({AccidentId: AccidentId}).fetch());
      AccidentMap.update({AccidentId: AccidentId},{$set:{Status: 3}},function(error){
        if(error){
          console.log(error);
        }
      });
      var accidents=AccidentMap.find({'AccidentId':AccidentId});
      accidents.forEach(function(obj){
        if(obj.HospitalId != HospitalId)
          AccidentMap.remove(obj._id);
      });
      AccidentMap.update(MapId,{$set:{Status: 1}},function(error){
        if(error){
          console.log(error);
        }
      });
    },
    addNormalUser: function(emailaddress,password)
    {
      roles=[];
      roles.push("Normal");
      setProfile=0;
      userId=Accounts.createUser({
            'username': emailaddress,
            'email': emailaddress,
            'password': password,
            'roles': roles,
            'setProfile': setProfile,
        });
    },
    getProfileStatus: function(userId){
      user=Meteor.users.findOne({_id:userId});
      console.log(user.setProfile);
      if(user.setProfile == 0)
        return true;
      else
        return false;
    }
    // getUser: function(UserId) {
    //   user=Meteor.users.findOne({_id: UserId});
    //   if(user)
    //   {
    //     // console.log(user.username);
    //     return user.username;
    //   }
    //   else
    //     return "Not found";
    // }

     // Variables
  

  })



  
  

});

Accounts.onCreateUser(function (options, user) {
    user.profile = {};
    // create a empty array to avoid the Exception while invoking method 'adminCheckAdmin'
    user.emails = [];
    if(options.roles)
      user.roles = options.roles;
    if(Meteor.users.find({roles:'admin'}).count() == 0)
    {
      console.log("Creating admin user");
      user.roles= ['admin']
    }
    if(options.userinfo)
    {
      console.log("Creating new hospital or police station");
      if(options.userinfo.hospitalmember)
      {
        hospital=Hospitals.insert({
          'userId':user._id,
          'address':options.userinfo.address,
          'longt': options.userinfo.latlongarr[1],
          'lat': options.userinfo.latlongarr[0],
        });
        user.orgId=hospital;
      }
      else if(options.userinfo.policemember)
      {
        police=PoliceStation.insert({
          'userId':user._id,
          'address':options.userinfo.address,
          'longt': options.userinfo.latlongarr[1],
          'lat': options.userinfo.latlongarr[0],
        });
        user.orgId=police;
      }
    }
    console.log("Added extra variables..........");
    return user;
  });
