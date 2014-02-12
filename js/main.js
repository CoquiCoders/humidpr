
function setUpTangle () {

    var getWeather = function(lattitude, longitude, dateTime) {
      if (!dateTime || dateTime == null) {
        dateTime = Math.round(+new Date()/1000)
      }
      var url = 'http://api.forecast.io/forecast/a5e1c0cd83868863d7fe8b7a72375e3b/' + lattitude + ',' + longitude + ',' + dateTime;
      //var url = 'http://api.forecast.io/forecast/a5e1c0cd83868863d7fe8b7a72375e3b/18.4500,66.0667,2014-02-12T20:00:00-0400';
      return $.ajax({
        type: 'GET',
        url: url,
        async: false,
        contentType: "application/json",
        dataType: 'jsonp',
        //success: function(json) {
        //  console.log(json);
        //  tangle.weatherData = json;
        //},
      });
    }
    var element = document.getElementById("scenario");

    var tangle = new Tangle(element, {
        initialize: function () {
            this.lattitude = '18.4500';
            this.longitude = '66.0667';
        },
        update: function () {
            console.log('update');
            if (!this.currentWeather) {
                getWeather(this.lattitude, this.longitude).done(function(jqXHR, textStatus, errorThrow) {
                   console.log('promise');
                   console.log(jqXHR);
                   console.log(textStatus);
                   console.log(errorThrow);
                   if (textStatus != 'success') {
                       // do something.
                   }
                   this.currentWeather = jqXHR.currently;
                   var width = $("#img-slider .right img").width();
                   var left = (this.currentWeather.humidity * width);
                   $("#img-slider .right").css("clip", "rect(0, 1000px, 1000px, " + left + "px)"); /* top, right, bottom, left */

                });
            }

        }

    });
}

