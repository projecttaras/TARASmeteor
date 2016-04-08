App.info({
  id: 'com.epics.taras',
  name: 'TARAS',
  description: 'Accident prevention',
  author: 'EPICS',
  email: 'vivekhtc25@gmail.com',
  website: 'http://projecttaras.github.io'
});


// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.accessRule('*.google.com/*');
App.accessRule('*.googleapis.com/*');
App.accessRule('*.gstatic.com/*');
