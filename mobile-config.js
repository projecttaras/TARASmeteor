App.info({
  id: 'com.epics.taras',
  name: 'TARAS',
  description: 'Accident prevention',
  author: 'EPICS',
  email: 'vivekhtc25@gmail.com',
  website: 'http://projecttaras.github.io'
});

App.icons({
  'android_mdpi': 'icons/logo.png',
  'android_hdpi': 'icons/logo.png',
  'android_xhdpi': 'icons/logo.png',
  'android_xxhdpi': 'icons/logo.png',
  'android_xxxhdpi': 'icons/logo.png',
});

App.launchScreens({
  'android_mdpi_portrait': 'icons/tarassplash.png',
  'android_hdpi_portrait': 'icons/tarassplash.png',
  'android_xhdpi_portrait': 'icons/tarassplash.png',
  'android_xxhdpi_portrait': 'icons/tarassplash.png',
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.accessRule('*.google.com/*');
App.accessRule('*.googleapis.com/*');
App.accessRule('*.gstatic.com/*');
App.accessRule('*');