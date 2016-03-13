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

