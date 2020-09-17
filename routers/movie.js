var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        Movie.find(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        }).populate('actors', 'name bYear');
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },deleteOne: function(req,res){
        Movie.findOneAndDelete({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    }, 
    updateMovieActor: function (req, res) {
        Movie.updateOne( { _id: req.params.mid }, { $pull: { actors: req.params.id } }, function(err, data){
            if (err) return res.status(400).json(err);
            res.json(data)
        } )
    }, 
    addActor: function(req,res){
        Movie.findOne({ _id: req.params.mid }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
    getMovieYear: function(req,res){
        Movie.find({  $and:[{year:{$gte: req.params.year2}},{year:{$lt: req.params.year1}}]}, function (err, data) {
            if (err) return res.status(400).json(err);
            res.json(data)
        });
    }, 
    deleteMovieBetween:function(req,res){
        Movie.deleteMany({  $and:[{year:{$gte: req.body.year2}},{year:{$lt: req.body.year1}}]}, function (err, data) {
            if (err) return res.status(400).json(err);
            res.json(data)
        });
    }
    









};