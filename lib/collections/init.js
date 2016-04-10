function deg2rad(angle) {
  return angle * .017453292519943295;
}

function getDistance( latitude1, longitude1, latitude2, longitude2 ) {  
    var earth_radius = 6371;

    var dLat = deg2rad(latitude2 - latitude1 );  
    var dLon = deg2rad(longitude2 - longitude1 );  

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(latitude1)) * Math.cos(deg2rad(latitude2)) * Math.sin(dLon/2) * Math.sin(dLon/2);  
    var c = 2 * Math.asin(Math.sqrt(a));  
    var d = earth_radius * c;  

    return d;  
}

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
  userId: {
    type: String,
    label: 'UserId',
    max: 10000,
    autoform: {
      options: function() {
        return Meteor.users.find({roles:'Hospital'}).map(function(doc) {
          return { label: doc.username, value: doc._id };
        })
      }
    }
  },
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
  userId: {
    type: String,
    label: 'UserId',
    max: 10000,
    autoform: {
      options: function() {
        return Meteor.users.find({roles:'Police'}).map(function(doc) {
          return { label: doc.username, value: doc._id };
        })
      }
    }
  },
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
//status 0 accident doesnot have hospital
//status 3 accident is in process of getting hospital
//status 1 accident got hospital
Schemas.AccidentMap= new SimpleSchema({
  UserId:{
    type: String,
    label: 'User ID',
    max: 10000,
    autoform: {
      options: function() {
        return Meteor.users.find({}).map(function(doc) {
          return { label: doc.username, value: doc._id };
        })
      }
    }
  },
  HospitalId: {
    type: String,
    label: 'Hospital ID',
    max: 10000,
    autoform: {
      options: function() {
        return Hospitals.find().map(function(doc) {
          return { label: doc.address, value: doc._id };
        })
      }
    }
  },
  AccidentId: {
    type: String,
    label: 'Accident ID',
    max: 10000,
    autoform: {
      options: function() {
        return Accidents.find().map(function(doc) {
          return { label: doc._id, value: doc._id };
        })
      }
    }
  },
  PoliceId: {
    type: String,
    label: 'Police ID',
    max: 10000,
    autoform: {
      options: function() {
        return PoliceStation.find().map(function(doc) {
          return { label: doc.address, value: doc._id };
        })
      }
    }
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

//===================Accident Map helpers====================================
AccidentMap.helpers({
  getHospital() {
    return Hospitals.findOne({_id:this.HospitalId});
  },
  getPoliceStation() {
    return PoliceStation.findOne({_id:this.PoliceId});
  },
  getAccident() {
    return Accidents.findOne({_id:this.AccidentId});
  },
  getUser() {
    user=Meteor.users.findOne({_id: this.UserId});
    if(user)
      return user.username;
    else
      return "Not found";
  }
});

//===================Accident Helpers=======================================
Accidents.helpers({
  getHospitalDistance(hosp)
  {
    var distance=getDistance(this.lat,this.longt,hosp.lat,hosp.longt);
    return distance;
  },
  getPoliceStationDistance(police)
  {
    var distance=getDistance(this.lat,this.longt,police.lat,police.longt);
    return distance;
  },
  getNearestHospital()
  {
    var hospitals=Hospitals.find({});
    var distances=[];
    var accident=this;
    hospitals.forEach(function(obj){
      var dist=accident.getHospitalDistance(obj);
      distances.push([obj._id,dist]);
    });
    distances.sort(function(a, b){return b[1]-a[1]});
    // console.log(String(distances));
    return distances;
  },
  getNearestPolice()
  {
    var allPoliceStations=PoliceStation.find({});
    var distances=[];
    var accident=this;
    allPoliceStations.forEach(function(obj){
      var dist=accident.getPoliceStationDistance(obj);
      distances.push([obj._id,dist]);
    });
    distances.sort(function(a, b){return b[1]-a[1]});
    // console.log(String(distances));
    return distances;
  }
})
