const express = require('express');
const path = require('path');
const lengthRoutes = require('./length.js');
const areaRoutes = require('./area.js');

const router = express.Router();

router.use('/length', lengthRoutes);
router.use('/area', areaRoutes);

router
  .get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../README.md'));
  })

module.exports = router;