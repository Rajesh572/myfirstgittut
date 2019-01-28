const express=require('express');
const hbs=require('hbs');
const fs=require('fs')

const port=process.env.PORT || 5000;
var app=express();  //create an app

hbs.registerPartials(__dirname + '/views/partials/');

app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log',log+'\n',(err)=>{
        next();
    });
});
/* 
app.use((req,res,next)=>{
res.render('maintenance.hbs')
});*/
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',() => new Date().getFullYear());

hbs.registerHelper('screamIt',(text)=>{
               return text.toUpperCase();
})

app.get('/',(req,res)=>{
//    res.send('Hello Express..!');
    //console.log(req);
res.render('home.hbs',{
    pageTitle:'Welcome',
    welcomeMessage:'Welcome to the App. . !'
})

});
app.get('/about',(req,res)=>{
    //res.send(`<h2>About the page</h2>`);
    res.render('about.hbs',{
        pageTitle:'About Titile',
    });
});

app.get('/bad',(req,res)=>{
    res.send({errorMessage:'Unable to handle request'});
});

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageTitle:'Projects'
    });
});

app.listen(port,()=>{
    console.log(`server is up on ${port}`);
});