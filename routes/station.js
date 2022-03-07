var express = require('express');
var axios = require('axios')
var router = express.Router();

router.get('/station/:id', function(req, res, next) {
  let station = req.params.id
  const url = 'https://environment.data.gov.uk/flood-monitoring/id/stations/'+station+'/readings?_sorted'


  const options = {
    params: {
      '_limit':'2000'
      }
  };

  axios.get(url, options)
    .then((response) => {
      var readings = response.data.items

      var total = readings.map(read => read.value).reduce((tot, read) => read + tot).toLocaleString(
        undefined, // leave undefined to use the visitor's browser 
                   // locale or a string like 'en-US' to override it.
        { minimumFractionDigits: 2 }
      );

      let values  = readings.map(function(v) {
        var date = new Date(v.dateTime)
        return new Date(v.dateTime);
      });
      var minDate=new Date(Math.min.apply(null,values)).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
      
      var maxDate=new Date(Math.max.apply(null,values)).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})

      if (maxDate === new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})) {
        maxDate = "today"
      }

      
      var maxTime=new Date(Math.max.apply(null,values)).toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit'})

     
      res.render('station', { readings:  readings, 
                              total_values: total,
                              minDate: minDate,
                              maxDate: maxDate,
                              maxTime: maxTime,
                              title: station});
    });
  
});

module.exports = router;