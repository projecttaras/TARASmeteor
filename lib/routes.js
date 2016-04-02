//================================Routes===================================

Router.configure({
  layoutTemplate: 'main'
});

Router.route('/',{
	name: 'home',
	template: 'home'
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