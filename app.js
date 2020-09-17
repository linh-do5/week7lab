
const bodyParser = require('body-parser'); 
const express = require('express'); 
const mongoose = require('mongoose'); 

const actors = require('./routers/actor');
const movies = require('./routers/movie');

const app = express(); 

app.listen(8080); 


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:false})); 

mongoose.connect('mongodb://localhost:27017/moviedb',
function(err){
    if(err){
        return console.log('Mongoose - connection error:',
        err);
    }
    console.log('Connect Successfully');
}); 
app.get('/', (req,res)=>{
    res.send('Nothing here.....')
})
//Configuring Endpoints
//Actor RESTFul endpoionts 
//Task 7
app.get('/actors', actors.getAll); 
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
//Task 2
app.delete('/actorAndMovies/:id',actors.deleteActorAndMovies); 
//Task 3
app.put('/actores/:id/:mid', actors.updateActorMovie);


//Movie RESTFul  endpoints
//Task 8
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
//Task 1
app.delete('/movies/:id', movies.deleteOne);
//Task 4 
app.put('/movies/:mid/:id', movies.updateMovieActor);
//Task 5
app.put('/addActor/:mid/:id', movies.addActor); 
//Task 6
app.get('/getMovieYear/:year1/:year2',movies.getMovieYear); 
//Task 9 
app.delete('/deleteMovieBetween', movies.deleteMovieBetween)