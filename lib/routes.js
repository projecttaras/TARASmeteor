//================================Routes===================================

Router.configure({
  layoutTemplate: 'ionmain'
});

Router.route('/',{
	name: 'home',
	template: 'ioncontent',
});

Router.route('/uploadjson',{
  name: 'upload',
  template: 'uploadjson'
});

Router.route('/map',{
  name: 'map',
  template: 'map'
});

Router.route('/adduser',{
	name: 'adduser',
	template: 'adduser'
});

Router.route('/logout',function(){
	 Meteor.logout();
	 this.render('map');
});

Router.route('/login',{
	name:'login',
	template: 'login'
});

Router.route('/register',{
	name:'register',
	template: 'register'
});

Router.route('/portal',{
	name:'portal',
	template: 'portal'
});


Router.route('/api/insert/accident', function(){
  this.response.statusCode = 200;
  this.response.setHeader("Content-Type", "application/json");
  this.response.setHeader("Access-Control-Allow-Origin", "*");
  this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var lat=this.request.body.lat;
  var longt=this.request.body.longt;
  var id=this.request.body.userId;
  var response="";
  var address="";
  console.log(id);
  if(id)
  {
	  Meteor.call('getaddress',lat,longt,function(error,result){
	  	if(error)
	  	{
	  		response=response+String(error);
	  		console.log(error);
	  	}
	  	else{
	  		address=result.data.results[0].formatted_address;
	  		accident=Accidents.insert({
	  			'deaths':0,
	  			'longt': longt,
	  			'lat':lat,
	  			'date': new Date(),
	  			'location': address,
	  			'vehicle': 'Car x Vehicle',
	  			'injuries': 1
	  		});
	  		if(accident)
	  		{
	  			user=Meteor.users.findOne({'_id':id});
	  			if(user){
		  			hospitals=Accidents.findOne({_id:accident}).getNearestHospital();
		  			policestations=Accidents.findOne({_id:accident}).getNearestPolice();
		  			// console.log(hospitals);
		  			// console.log(policestations);
		  			for(var i=0;i<hospitals.length && i<5;i++)
		  			{
		  				AccidentMap.insert({
		  					'UserId': id,
		  					'HospitalId':hospitals[i][0],
		  					'PoliceId': policestations[0][0],
		  					'AccidentId':accident,
		  					'Status': 0
		  				});
		  			}
		  			//Send sms to all the people related to the user
		  			console.log("Informed police")
		  			response=response+"Accident created and informed";
		  		}
		  		else
		  			response=response+"User not found";
	  		}
	  		else
	  			response=response+"Accident couldnot be created";
	  	}
	  });
  }
  this.response.end(response);
}, {where: 'server'});


Router.route('/api/insert/accidentsms', function(){
  this.response.statusCode = 200;
  this.response.setHeader("Content-Type", "application/json");
  this.response.setHeader("Access-Control-Allow-Origin", "*");
  this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var message=this.request.body.message;
  var number=this.request.body.number;
  var keyword=this.request.body.keyword
  var latlongt=message.split(",");
  var lat=latlongt[0];
  var longt=latlongt[1];
  var id=latlongt[2];
  var response="";
  var address="";
  console.log(id);
  if(id)
  {
	  Meteor.call('getaddress',lat,longt,function(error,result){
	  	if(error)
	  	{
	  		response=response+String(error);
	  		console.log(error);
	  	}
	  	else{
	  		address=result.data.results[0].formatted_address;
	  		accident=Accidents.insert({
	  			'deaths':0,
	  			'longt': longt,
	  			'lat':lat,
	  			'date': new Date(),
	  			'location': address,
	  			'vehicle': 'Car x Vehicle',
	  			'injuries': 1
	  		});
	  		if(accident)
	  		{
	  			user=Meteor.users.findOne({'_id':id});
	  			if(user){
		  			hospitals=Accidents.findOne({_id:accident}).getNearestHospital();
		  			policestations=Accidents.findOne({_id:accident}).getNearestPolice();
		  			// console.log(hospitals);
		  			// console.log(policestations);
		  			for(var i=0;i<hospitals.length && i<5;i++)
		  			{
		  				AccidentMap.insert({
		  					'UserId': id,
		  					'HospitalId':hospitals[i][0],
		  					'PoliceId': policestations[0][0],
		  					'AccidentId':accident,
		  					'Status': 0
		  				});
		  			}
		  			//Send sms to all the people related to the user
		  			console.log("Informed police")
		  			response=response+"Accident created and informed";
		  		}
		  		else
		  			response=response+"User not found";
	  		}
	  		else
	  			response=response+"Accident couldnot be created";
	  	}
	  });
  }
  this.response.end(response);
}, {where: 'server'});