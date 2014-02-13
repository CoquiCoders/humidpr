
var humidifier = {
      lattitude: '18.4500',

      longitude: '66.0667',

      imageName: '0-65.png',

      huMessage: 'Mas o menos.',

      huMessageEng: 'Not so bad.',

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
              this.huMessage = 'Mas o menos.';
              this.huMessageEng = 'Not so bad.';
          }
          else if (humidity >= 65 && humidity < 75) {
              this.imageName = '65-75.png';
              this.huMessage = 'Mi espalda se encuentra humeda.';
              this.huMessageEng = 'Whoa.  My back is sweating';
          }
          else if (humidity >= 75 && humidity < 85) {
              this.imageName = '75-85.png';
              this.huMessage = 'Mi pelo no copera.';
              this.huMessageEng = 'My hair has a mind of its own.';
          }
          else if (humidity >= 85) {
              this.imageName = '85-100.png';
              this.huMessage = 'Me parezco a una Medusa.';
              this.huMessageEng = 'I look like medusa.';
          }
      },

      updateDisplay: function() {
        this.updateForHumidity();
        $('.image-container img').attr('src', 'img/' + humidifier.imageName);
        $('#humidity').text(Math.round((this.currentWeather.humidity * 100)) + '%');
        $('#huMessage').text(this.huMessage);
        $('#huMessageEng').text(this.huMessageEng);
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

