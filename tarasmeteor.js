AdminConfig = {
  name: 'TARAS',
  skin: 'black-light',
  collections: {
    Accidents: {}
  }
};

Schemas = {};
Accidents= new Mongo.Collection('Accidents');
//=================One Accident data for reference============================
//{"deaths": 1, "lon": "79.518999", "date": "2008-01-01T00:00:00", "location": "Fatimanagar\nRly.bridge\n", "vehicle": "Truck x  cycle", "lat": "17.982444", "injuries": 0}
//============================================================================

//===========================Schema Definitions===============================
Schemas.Accidents = new SimpleSchema({
  deaths: {
    type: Number,
    label: 'Deaths',
    min: 0
  },
  longt: {
    type: String,
    label: 'Longtitude',
    max: 1000,
  },
  lat: {
    type: String,
    label: 'Latitude',
    max: 1000
  },
  date: {
    type: Date,
    label: 'Date'
  },
  location: {
    type: String,
    label: 'Location',
    max: 1000
  },
  vehicle: {
    type: String,
    label: 'Vehicles',
    max: 10000
  },
  injuries: {
    type: Number,
    label: 'Injuries',
    min: 0
  }
});

//================Schema Attachments==========================================
Accidents.attachSchema(Schemas.Accidents);



//=================Meteor Application=========================================
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Accounts.onCreateUser(function (options, user) {
    user.profile = {};
    // create a empty array to avoid the Exception while invoking method 'adminCheckAdmin' 
    user.emails = [];
    console.log("Added extra variables..........");
    return user;
  });
}
