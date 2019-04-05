const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const movies = [
    {id:1, name:'YJHD', genre:'romantic'},
    {id:2, name:'SOTY', genre:'stupid'},
    {id:3, name:'swadesh', genre:'homesick'},
    {id:4, name:'border', genre:'patroitism'},
]

function validateMovie(movie){
    const schema = {
        name: Joi.string().min(4).required(),
        genre: Joi.string().required()
    };
    const result = Joi.validate(movie, scehma);
    return result;
}

app.get('/api/movies',(req,res)=>{
    res.send(movies);
})

app.get('/api/movies/:id',(req,res)=>{
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if(!movie){
        return res.status(404).send('movie not found');
    }
    res.send(movie);
});

app.post('/api/movie',(req,res)=>{
    const {error} = validateMovie(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const movie = {
        id: movies.length + 1,
        name: req.body.name
    };
    movies.push(movie);
    res.send(movie);
});

const port = process.env.PORT || 3000;
app.listen(3000, ()=>console.log(`Listening on port ${port}..`));
