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
    type: String,
    label: 'Date',
    max: 1000
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