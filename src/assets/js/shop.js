$(document).ready(function() {

    console.log('hello world');
    var key = 'api_key=xlo8g1mbjnr9xwikydzlo6zk';
    var secret = 'kp2bf30qu2';
    var baseURL = 'https://openapi.etsy.com/v2'

    var url = 'https://openapi.etsy.com/v2/users/etsystore.js?callback=getData?' + key;
    console.log(url);

    $('.test').click(function() {

      $.ajax({
        url: url,
        dataType: 'jsonp',
        //jsonpCallback: '',
        jsonp: false,
        contentType: 'application/json',
        error: function(request, textStatus, errorThrown, data) {
          console.log('superfail', request, textStatus, errorThrown);
          console.log(data);
        },
        success: function(data) {
          console.log('success function');
          if (data.ok) {
            console.log(data);
          } else {
            alert(data.error);
          }
        }
      });
    })


}) //close jquery
