const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const session = require('express-session');
const app = express();

//importing routes
const citaRoutes = require('./routes/routes');



//settings
app.set('port',process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//midleware
app.use(morgan('dev'));
// app.use(myConnection(mysql, {
// 	host:'localhost',
// 	user: 'root',
// 	password: '1234',
// 	port: 3306,
// 	database: 'aydpractica34'
// }, 'single'));
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//routes
app.use('/', citaRoutes);


//static files 
app.use(express.static(path.join(__dirname, 'public')));



app.listen(app.get('port'), ()=>{
	console.log('Server on port 3000');
});

module.exports = app;
