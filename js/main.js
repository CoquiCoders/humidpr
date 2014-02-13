
var humidifier = {
      lattitude: '18.4500',

      longitude: '66.0667',

      imageName: '0-65.png',

      huMessage: 'Not so bad.',

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

      updateForHumidity: function() {
          var humidity = this.currentWeather.humidity;
          if (humidity < 65) {
              this.imageName = '0-65.png';
          }
          else if (humidity >= 65 && humidity < 75) {
              this.imageName = '65-75.png';
          }
          else if (humidity >= 75 && humidity < 85) {
              this.imageName = '75-85.png';
          }
          else if (humidity >= 85) {
              this.imageName = '85-100.png';
          }
      },

      updateDisplay: function() {
        this.updateForHumidity();
        $('.image-container img').attr('src', 'img/' + humidifier.imageName);
        $('#humidity').text(Math.round((this.currentWeather.humidity * 100)) + '%');
        $('#huMessage').text(this.huMessage);
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
                  humidifier.updateDisplay();
             });
          }
      }
}

