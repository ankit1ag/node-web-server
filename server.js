const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname+'/views/partials'); // to register partials

app.set('view engine', 'hbs');   //sets various app related configuration



//using middleware

app.use((req,res,next)=>{
	
	var now = new Date().toString();
	var log = `${now} : ${req.method}   ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log + '\n', (err)=>{if(err){console.log(err);}});
	next();
	
});

//down below we used a middleware which does not call next resulting in not calling any handler
//to maintain the website we can use
// app.use((req,res,next)=>{
// res.render('maint.hbs',{
	// pageTitle : 'Maintenance page',
// });	
// });



// the order of app.use is important,we are using it in last so that we get maintenance view

app.use(express.static(__dirname + '/public'));   //http://localhost:3000/help.html



hbs.registerHelper('getCurrentYear', ()=>{
	//return 'lol';										//helper
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{            //helper with arguments
 	return text.toUpperCase();
});


app.get('/',(req,res)=>{
//	res.send('<h1>Hello World</h1>');
 // res.send({
	// name : 'Ankit',
	// styles : [
	// 'one',
	// 'two'
	// ]
// });
res.render('home.hbs',{
	pageTitle : 'Home page',
	//currentDate : new Date().getFullYear(),     //if we use helper we can remove date from here
	welcomeText : 'Hello! welcome to my website'
});


	
	});
	
app.get('/about',(req,res)=>{
     res.render('about.hbs',{
		 pageTitle : 'About us',
		// currentDate : new Date().getFullYear()
	 }); // will allow to render any view with current view engine
//	res.send("about page");
});	

app.get('/bad', (req,res)=>{
	
	res.send({
		errorMessage : 'Bad request'
	});
});
	

app.listen(3000);

// app.listen(3000, ()=>{
	// console.log('server is running on 3000');
// });