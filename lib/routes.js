//================================Routes===================================

Router.configure({
  layoutTemplate: 'main'
});

Router.route('/',{
	name: 'home',
	template: 'map'
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
	 this.render('home');
});

Router.route('/login',{
	name:'login',
	template: 'login'
});

Router.route('/register',{
	name:'register',
	template: 'register'
});


Router.route('/api/insert/accident', function(){
  this.response.statusCode = 200;
  this.response.setHeader("Content-Type", "application/json");
  this.response.setHeader("Access-Control-Allow-Origin", "*");
  this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var lat=this.request.body.lat;
  var longt=this.request.body.longt;
  var address="";
  Meteor.call('getaddress',lat,longt,function(error,result){
  	if(error)
  		console.log(error);
  	else{
  		address=result.data.results[0].formatted_address;
  	}
  });
  this.response.end('Address found '+address);
}, {where: 'server'});