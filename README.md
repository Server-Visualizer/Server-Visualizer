# Server-Visualizer
Express middleware that helps developers visualize their Express server activities.


## Usage

Terminal:
```shell
npm install server-visualizer
```

Express app:
```javascript
const serverVisualizer = require('server-visualizer');

// pass in reference to instance of app to add development routes
serverVisualizer.start(app)();

// records request and response activities
app.use(serverVisualizer.middleware());
```
