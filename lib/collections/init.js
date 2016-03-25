AdminConfig = {
  name: 'TARAS',
  skin: 'black-light',
  collections: {
    Accidents: {},
    Hospitals: {},
    PoliceStation: {},
    AccidentMap: {},
  }
};

Schemas = {};
Accidents = new Mongo.Collection('Accidents');
Hospitals = new Mongo.Collection('Hospitals');
PoliceStation = new Mongo.Collection('PoliceStation');
AccidentMap = new Mongo.Collection('Map');
//=================One Accident data for reference============================
//{"deaths": 1, "lon": "79.518999", "date": "2008-01-01T00:00:00", "location": "Fatimanagar\nRly.bridge\n", "vehicle": "Truck x  cycle", "lat": "17.982444", "injuries": 0}
//============================================================================

//===========================Schema Definitions===============================
//Accidents
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

//Hospitals
Schemas.Hospitals= new SimpleSchema({
  address: {
    type: String,
    label: 'Address',
    max: 10000
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
  }
});

//PoliceStation
Schemas.PoliceStation= new SimpleSchema({
  address: {
    type: String,
    label: 'Address',
    max: 10000
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
  }
});

//AccidentMap
Schemas.AccidentMap= new SimpleSchema({
  HospitalId: {
    type: String,
    label: 'Hospital ID',
    max: 10000
  },
  AccidentId: {
    type: String,
    label: 'Accident ID',
    max: 10000
  },
  PoliceId: {
    type: String,
    label: 'Police ID',
    max: 10000
  },
  Status: {
    type: Number,
    label: 'Status',
    min: 0
  }
});
//================Schema Attachments==========================================
Accidents.attachSchema(Schemas.Accidents);
Hospitals.attachSchema(Schemas.Hospitals);
PoliceStation.attachSchema(Schemas.PoliceStation);
AccidentMap.attachSchema(Schemas.AccidentMap);
//==================Collection helpers=======================================

AccidentMap.helpers({
  getHospital() {
    return Hospital.findOne({_id:this.HospitalId});
  },
  getPoliceStation() {
    return PoliceStation.findOne({_id:this.PoliceId});
  },
  getAccident() {
    return Accidents.findOne({_id:this.AccidentId});
  }
});
