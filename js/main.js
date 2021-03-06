
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
          // Check hashtag first;
          var humidity = this.currentWeather.humidity * 100;
          console.log(humidity);
          if (humidity < 50) {
              this.imageName = '0-50.png';
              this.huMessage = 'Mas o menos.';
              this.huMessageEng = '(Not so bad.)';
          }
          else if (humidity >= 50 && humidity < 65) {
              this.imageName = '50-65.png';
              this.huMessage = 'Sintiendome pegajosa.';
              this.huMessageEng = '(Starting to feel it...)';
          }
		  else if (humidity >= 65 && humidity < 75) {
              this.imageName = '65-75.png';
              this.huMessage = 'Mi espalda se encuentra humeda.';
              this.huMessageEng = '(Whoa.  My back is sweating)';
          }
          else if (humidity >= 75 && humidity < 85) {
              this.imageName = '75-85.png';
              this.huMessage = 'Mi pelo no copera.';
              this.huMessageEng = '(My hair has a mind of its own.)';
          }
          else if (humidity >= 85 && humidity < 95) {
              this.imageName = '85-95.png';
              this.huMessage = 'Me parezco a una Medusa.';
              this.huMessageEng = '(I look like medusa.)';
          }
          else if (humidity >= 95) {
              this.imageName = '95-100.png';
              this.huMessage = 'dios mio, mi pelo cobro vida propia.';
              this.huMessageEng = '(I have no control over my hair at this point.)';
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
          $('.hastip').tooltipsy();
          // Get hashtag;
          var hashtag = window.location.hash;
          if (hashtag != null) {
            hash = hashtag.substr(1);
          }
          // Validate;
          if (hash > 0 && hash <= 100) {
              this.currentWeather = {humidity: hash / 100};
              this.updateDisplay();
          }
          if (!this.currentWeather) {
              var self = this;
              this.getWeather(this.lattitude, this.longitude).done(function(jqXHR, textStatus, errorThrow) {
                  if (textStatus == 'success') {
                    humidifier.currentWeather = jqXHR.currently;
                    humidifier.updateDisplay();
                  }
             });
          }
      }
}

