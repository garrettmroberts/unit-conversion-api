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

      // Handles precision query
      if (req.query.precision) {
        converted = parseFloat(converted.toFixed(parseInt(req.query.precision)));
      };

      // Sets standard convertedStr and sentence
      let convertedStr = converted.toString() + castTo;
      let sentence = `${splitReq[0]}${splitReq[1]} is equal to ${converted}${castTo}.`;

      // Handles subunits query
      if (req.query.subunits === 'true') {
        let metricUnits = ['mm', 'cm', 'm', 'km'];
        let imperialUnits = ['in', 'ft', 'yd', 'mi'];
        let subunit;

        if (imperialUnits.includes(req.params.to)) {
          subunit = imperialUnits[imperialUnits.indexOf(req.params.to) - 1];
        };

        if (metricUnits.includes(req.params.to)) {
          subunit = metricUnits[metricUnits.indexOf(req.params.to) - 1];
        };

        if (subunit != undefined) {
          let decimal = parseFloat('0.' + converted.toString().split('.')[1]);
          if (decimal) {
            let subunitMeasure = (json[castTo][subunit] * decimal).toFixed(2);
            convertedStr = `${converted.toFixed(0)}${castTo} and ${subunitMeasure}${subunit}`;
            sentence = `${req.params.from} is equal to ${converted.toFixed(0)}${castTo} and ${subunitMeasure}${subunit}.`;
          }
          
        }
      };

      // Send result
      res.json({
        "from": req.params.from,
        "to": req.params.to,
        "conversionRate": multiply,
        "convertedInt": converted,
        "convertedStr": convertedStr,
        "Sentence": sentence
      })

    } catch(error) {
      res.send(error);
    }
  })

module.exports = router;