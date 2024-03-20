const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
    origin:true,credentials:true
}))
app.use(express.json())
const router = require('./route');



app.use('/', router);


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });
