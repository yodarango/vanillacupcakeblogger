//dev enviromental variables
//require('dotenv').config();

//load database
require('./db/db');

//npm pacakges at global level
const express = require('express');
const app = express();
app.use('/account', require('./server/routers/private-routes').router);
app.use('/account', require('./server/routers/private-reoutes_1.2'));
app.use('', require('./server/routers/public-routes'));
app.use('', require('./server/routers/public-routes_1.2'));
app.use('/setup', require('./server/routers/setup'));

//middleware
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//listen to the app
app.listen(process.env.PORT || 3000, () => {
	console.log(`running on ${process.env.PORT}`);
});
