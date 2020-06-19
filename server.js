const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`app listening at http://localhost:${PORT}`));