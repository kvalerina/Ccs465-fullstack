const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // Return single record
        .exec();

        // Uncomment the following line to show results of the querey
        // on the console
        //console.log(q);

    if(!q)
    { // Database rturned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

const tripsFindByCode = async(req, res) => { 
    const q = await Model
        .find({'code' : req.params.tripCode}) // Return single record
        .exec();

        // Uncomment the following line to show results of the querey
        // on the console
        //console.log(q);

    if(!q)
    { // Database rturned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};


// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client

const tripsAddTrip = async (req, res) => {
    const newtrip = new Trip({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    });
  
    const q = await newtrip.save();
  
        // Uncomment the following line to show results of operation
        // on the console
        console.log(q);

    if (!q) {
      //Database returned no data
      return res.status(400).json(err);
    } else {
      return res.status(201).json(q);
    }
  };


// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client

const tripsUpdateTrip = async (req, res) => {
    console.log(req.params);
    console.log(req.body);
    try {
      const q = await Model.findOneAndUpdate(
        { code: req.params.tripCode },
        {
          code: req.body.code,
          name: req.body.name,
          length: req.body.length,
          start: req.body.start,
          resort: req.body.resort,
          perPerson: req.body.perPerson,
          image: req.body.image,
          description: req.body.description,
        }
      ).exec();
  
      if (!q) {
        // Database returned no data
        return res.status(404).json({ message: "Trip not found" });
      } else {
        // Return resulting updated trip
        return res.status(200).json(q);
      }
  
      // Uncomment the following line to show results of operation
      // console.log(q);
    } catch (error) {
      console.error("Error updating trip:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };


module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};