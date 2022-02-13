var express = require('express');
var axios = require('axios')
var router = express.Router();

router.get('/station/:id', function(req, res, next) {
  let station = req.params.id
  const url = 'https://environment.data.gov.uk/flood-monitoring/id/stations/'+station+'/readings?_sorted'


  const options = {
    params: {
      '_limit':'10000'
      }
  };

  axios.get(url, options)
    .then((response) => {
      console.log(response);
     
      res.render('station', { readings:  response.data.items});
    });
  
});

module.exports = router;