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
});

Accounts.onCreateUser(function (options, user) {
    user.profile = {};
    // create a empty array to avoid the Exception while invoking method 'adminCheckAdmin' 
    user.emails = [];
    console.log("Added extra variables..........");
    return user;
  });