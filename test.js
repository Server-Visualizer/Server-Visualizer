const express = require('express');
const app = express();
const port = 5000;

app.use(cors());

app.get('/api', (req, res) => {
    res.json({"message": 'get request'});
});

app.post('/api', (req, res) => {
    res.json({"message": 'post request'})
});

app.put('/api', (req, res) => {
    res.json({"message": 'put request'})
});
app.delete('/api', (req, res) => {
    res.json({"message": 'delete request'})
});

app.listen(port, () => console.log(`Listening on port ${port}`));