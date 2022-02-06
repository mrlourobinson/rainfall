var axios = require('axios')
const express = require('express');
const router = express.Router();

const url = 'https://environment.data.gov.uk/flood-monitoring/id/stations'

/* GET home page. */
router.get('/', function(req, res, next) {
  let name = req.params.id

  const options = {
    params: {
      'parameter': 'rainfall'
      }
  };
  
  axios.get(url, options)
    .then((response) => {
      console.log(response.data.items[0]['measures']);
      res.render('index', { response:  response.data.items});
    });
});

module.exports = router;
