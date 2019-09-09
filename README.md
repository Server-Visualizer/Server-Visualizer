# Server-Visualizer
Server-Visualizer is an Express middleware that helps developers visualize their server activities, by providing a user interface with charts illustrating the server response code, fetch method and request time.


## About
- Server-Visualizer allows developers to monitor request methods, response status codes, and related timings. 

- Data can be accessed using a GUI served from the same development port as the main app. 

- Displays a pie chart and a list of requests updated in real time.


## Install
```shell
npm install server-visualizer
```


## Usage
```javascript
const serverVisualizer = require('server-visualizer');

// pass in reference to instance of app to add development routes
// developer can set path to visualizer or accept default route to '/SerVis'
serverVisualizer.start(app[, route])();

// routes added
// 1. Specifies the route that the developer uses to access Server Visualizer
// 2. Retrieves request data for the application. To be used internally and not by the developer.
// 3. Serves the bundled Javascript file. To be used internally and not by the developer. 

// records request and response activities
app.use(serverVisualizer.run());
```

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
