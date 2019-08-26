const path = require('path');

module.exports = {
  db: [],
  // start() creates three routes to be used in development
  start: function(app, route) {
    if (!app) throw new Error('instance of app should be first argument')
    // making copy of db
    const db = this.db;
    return function() {
      // creates a route to send visualization file
      // developer can provide path as second argument, or default to "SerVis"
      app.get(`/${route ? route : "SerVis"}`, function(req, res) {
        res.sendFile(path.join(__dirname + '/client/index.html'), {}, function(err) {
          res.status(err.status).send('could not find HTML file');
        });
      });
      // creates a route to send data from db
      app.get('/ping', function(req, res) {
        res.status(200).json(db);
      });
      // route for index.HTML to request bundle.js
      app.get('/build', function(req, res) {
        res.sendFile(path.join(__dirname, 'build/bundle.js'), {}, function(err) {
          res.status(err.status).send('could not find bundle js file');
        });
      });
    }
  },
  // storing request object data into db
  run: function() {
    // making copy of db
    const db = this.db;
    return function(req, res, next) {
      // time at request start
      // after response is sent, update db with req & res data
      res.on('finish', (err, data) => {
        if (err) {
          res.status(err.status.send('connection timed out'))
        }
        const start = process.hrtime();
        // calculates elapsed time in [seconds, nanoseconds]
        const end = process.hrtime(start);
        // converts end array into milliseconds
        const endTime = (end[0] * 1000) + (end[1] / 1000000);
        db.push({
          method: req.method, 
          // instantaneous time in milliseconds
          reqTime: new Date().getTime(), 
          // calculate elapsed time to three significant digits
          elapsedTime: Number(endTime.toPrecision(3)), 
          status: res.statusCode})
      })
      next();
    }
  }
}