const express = require('express');

const app = express();

require('./server/config/db')

app.use(require('./server/pages/router'))
app.use(require('./server/Genres/router'))


app.use(express.static(__dirname + '/public'))
app.set ("view engine", "ejs")


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})