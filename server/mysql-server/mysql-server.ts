const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const https = require('https');
// const http = require('http');
// const fs = require('fs');

const app = express();

// const options = {
// 	key: fs.readFileSync('./rootca.key'),
// 	cert: fs.readFileSync('./rootca.crt')
// };

// const corsOptions = {
//     origin: 'http://localhost:8081'
// };

// const HTTP_PORT = 8080;
// const HTTPS_PORT = 8443;

const PORT = process.env.PORT || 8080;

// Set CORS option
app.use(cors());
// app.use(cors(corsOptions));

// Parse requests of content-type: application/json
app.use(bodyParser.json());
// app.use(express.json());

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// RESTful API route for DB
app.use('/', require('./app/route/route.ts'));
// require('./app/common/db/mongodb/route/route.ts')(app);

// DB connection
const db = require('./app/model/index.ts');
db.sequelizeConfig.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// Default route for server status
app.get('/', (req, res) => {
    res.json({ message: `Server is running on port ${PORT}` });
});
// app.get('/', (req, res) => {
// 	res.json({ message: `Server is running on port ${req.secure ? HTTPS_PORT : HTTP_PORT}` });
// });

// Set listen port for request
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Set listen port for http request
// app.listen(HTTP_PORT, () => {
//     console.log(`Server is running on port ${HTTP_PORT}`);
// });
// Set listen port for https request
// app.listen(HTTPS_PORT, () => {
//  console.log(`Server is running on port ${HTTPS_PORT}`);
// });

// Create an HTTP service.
// http.createServer(app).listen(HTTP_PORT);

// Create an HTTPS service identical to the HTTP service.
// https.createServer(options, app).listen(HTTPS_PORT);
