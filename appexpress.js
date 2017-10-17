/* appexpress.js
Test server application based on nodeJS and express
*/

var express = require('express');
var hbs = require('hbs');
var fs = require('fs');
var morgan = require('morgan'); //logging

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use(morgan('dev')); // logger

// app.use indicates middleware to be used in sequential order
// below is a logger middleware created
app.use((req,res,next) => {
	var now = new Date().toString();
	var log = `${now}-${req.method}-${req.originalUrl}`;
	console.log(log);
	fs.appendFile('logging.log',log+'\n',(err) => {
		if(err) {
			console.log('a problem occured');
		}
	})
	next();
})

/* app.use((req,res,next) => {
	res.render('maintenance.hbs',{
		pageTitle:'Maintenance',
		maintenanceText:'Application temporarily unavailable'
	})
}) */

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(text) => {
	return text.toUpperCase();
})

app.use(express.static(__dirname+'/public')); //static pages in folder public

app.get('/',(req,res) => {
	//res.send('<h1>Hi there</h1>');
	res.render('home.hbs',{
		pageTitle:'Welcome page',
		welcomeText:'Hello there, welcome to my website'
		//currentYear:new Date().getFullYear()
	})
});

app.get('/about',(req,res) => {
	//res.send('<h1>The about page</h1>');
	res.render('about.hbs',{
		pageTitle:'About page',
		aboutMessage:'Hey, this is the About page'
		//currentYear:new Date().getFullYear()
	})
});

app.get('/bad',(req,res) => {
	res.send({
		error:'The server encountered an internal error'
	})
});

app.listen(3000,() => {
	console.log('server is running on port 3000');
});
