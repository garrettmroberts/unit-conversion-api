const express = require('express');
const lengthRoutes = require('./length.js');

const router = express.Router();

router.use('/length', lengthRoutes);

router
  .get('/', (req, res) => {
    res.json({itWorks: true})
  })

module.exports = router;