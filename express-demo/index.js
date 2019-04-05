const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
]

app.get('/',(req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id',(req,res) =>{
    const course = courses.find(c => c.id ===parseInt(req.params.id));
    if(!course){
        return res.status(404).send('course not found');
    } 
    res.send(course);
});

//getting all courses of date
app.get('/api/courses/:year/:month',(req,res) =>{
    // res.send(req.params);
    res.send(req.query);//after ? optional data
});

app.post('/api/course',(req,res) => {
    const { error } = validateCourse(req.body);   
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//updating a course
app.put('/api/courses/:id', (req,res) => {
    //look up the course
    //if not existing, retuen 404
    const course = courses.find(c => c.id ===parseInt(req.params.id));
    if(!course){
        return res.status(404).send('course not found');
    } 
    //validate 
//    const result = validateCourse(req.body);
    const {error} = validateCourse(req.body);    
    //if invalid, return 400 - bad request
    if(error){
        //404 bad req
        res.status(400).send(error.details[0].message);
        return;
    }
    //update course
    //return the updated course
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id',(req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        return res.status(404).send('course not found');
    } 

    //delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);

});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result=Joi.validate(course, schema);
    return result;
}

const port = process.env.PORT || 3000;
app.listen(3000, ()=>console.log(`Listening on port ${port}..`));
