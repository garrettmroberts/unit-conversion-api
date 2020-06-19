const router = require('express').Router();
const json = require('../assets/length.json');

router
  .route('/:from/:to')
  .get((req, res) => {
    try {
      const splitReq = req.params.from.split(/([a-z].+)/, 2);
      const castTo = req.params.to;

      // Valid input checking
      if (/[^\d.]+/.test(splitReq[0]) 
        || !/^mm$|^cm$|^m$|^km$|^in$|^ft$|^yd$|^mi$/.test(splitReq[1])
        || !/^mm$|^cm$|^m$|^km$|^in$|^ft$|^yd$|^mi$/.test(castTo)
      ) {
        res.status(400).send({error: 'Invalid input.'})
      };
      
      // Converts units
      const table = json[splitReq[1]];
      const multiply = table[castTo];
      let converted = parseInt(splitReq[0])* multiply;

      // Handles queries
      if (req.query.precision) {
        converted = parseFloat(converted.toFixed(parseInt(req.query.precision)));
      };

      // Send result
      res.json({
        "from": req.params.from,
        "to": req.params.to,
        "conversionRate": multiply,
        "converted": converted,
        "Sentence": `${splitReq[0]}${splitReq[1]} is equal to ${converted}${castTo}.`
      })

    } catch(error) {
      res.send(error);
    }
  })

module.exports = router;