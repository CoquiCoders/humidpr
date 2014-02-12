
var humidifier = {
      lattitude: '18.4500',

      longitude: '66.0667',

      getWeather: function(lattitude, longitude, dateTime) {
          if (!dateTime || dateTime == null) {
            dateTime = Math.round(+new Date()/1000)
          }
          var url = 'http://api.forecast.io/forecast/a5e1c0cd83868863d7fe8b7a72375e3b/' + lattitude + ',' + longitude + ',' + dateTime;
          return $.ajax({
            type: 'GET',
            url: url,
            async: false,
            contentType: "application/json",
            dataType: 'jsonp',
          });
      },

      getImageForHumidity: function() {
          var imageName;
          var humidity = this.currentWeather.humidity;
          if (humidity < 65) {
              imageName = 'park-export.jpg';
          }
          else if (humidity >= 65 && humidity < 75) {
              imageName = 'park-export.jpg';
          }
          else if (humidity >= 75 && humidity < 85) {
              imageName = 'parking-export.jpg';
          }
          else if (humidity >= 85) {
              imageName = 'parking-export.jpg';
          }
          return imageName;
      },

      humidify: function () {
          if (!this.currentWeather) {
              var self = this;
              this.getWeather(this.lattitude, this.longitude).done(function(jqXHR, textStatus, errorThrow) {
                  console.log('promise');
                  console.log(jqXHR);
                  console.log(textStatus);
                  console.log(errorThrow);
                  if (textStatus != 'success') {
                        // do something.
                  }
                  humidifier.currentWeather = jqXHR.currently;
                  var image = humidifier.getImageForHumidity();
                  $('.image-container img').attr('src', 'img/' + image);

           //       var height = $("#img-slider .right img").height();
       //          var offset = (this.currentWeather.humidity * height);
         //         $("#img-slider .right").css("clip", "rect(0, 1000px, " + offset + "px, 0px)"); /* top, right, bottom, left */

              });
          }
      }
}

