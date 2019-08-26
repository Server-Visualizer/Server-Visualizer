const path = require('path');

module.exports = {
  db: [],
  // start creates two routes to be used in development
  start: function(app, route) {
    // making a copy of db
    const db = this.db;
    return function() {
      // creates a route to send visualization file
      app.get(`/${route ? route : "SerVis"}`, function(req, res) {
        res.sendFile(path.join(__dirname + '/main.html'));
      })
      // creates a route to send data from db
      app.get('/ping', function(req, res) {
        res.json(db);
      })
    }
  },
  // storing request object data into db
  middleware: function() {
    // making copy of db
    const db = this.db;
    return function(req, res, next) {
      // time at request start
      // after response is sent, update db with req & res data
      res.on('finish', (err, data) => {
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