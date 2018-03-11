$(document).ready(function(){

  console.log('hello world test');

  var base = "https://openapi.etsy.com/v2/";
  var api_key = "api_key=xlo8g1mbjnr9xwikydzlo6zk";
  var uri;
  var etsyURL;
  var listings = [];

  function loadShopDetails(){

    uri = 'shops/phiden.js?';
    etsyURL = base + uri + api_key;

    $.ajax({
      url: etsyURL,
      dataType: 'jsonp',
      success: function(data) {
        if (data.ok) {

            console.log(data);

            //load shop thumbnail
            $('#etsyImg').attr('src', data.results[0].icon_url_fullxfull);

            //replace shop URL with the api link for tracking purposes
            $('#etsyURL').attr('href', data.results[0].url);

            //load #vacationBanner

            //load etsyTagline
            $('#etsyTagline').text(data.results[0].title);

            //load shopMessage
            $('#shopMessage').text(data.results[0].announcement);

        } else {
            alert(data.error);
        }
      }
    });

  }

  function loadListings() {

    uri = 'shops/phiden/listings/active.js?'

    etsyURL = base + uri + api_key + "&includes=MainImage&fields=url,price,title,shop_section_id,description&limit=100";

    // etsyURL = "https://openapi.etsy.com/v2/" + uri + shop + "?api_key=" + api_key;

    console.log(etsyURL);

    $.ajax({
        url: etsyURL,
        dataType: 'jsonp',
        success: function(data) {
          if (data.ok) {

              // console.log(data);
              listings = data.results;

              listings.forEach(function(elem) {

                $('#etsyListings ul').append('<li><img src="' + elem.MainImage.url_570xN + '"><h6>' + elem.title + '</h6><p class="price">' + elem.price + '</p><p class="description">' + elem.description + '</p><a href="' + elem.url + '" class="button">shop on etsy</a></li>')

              })

              /*
              url
              price
              title
              description
              shop_section_id
              MainImage.url_75x75, url_170x135, url_570xN, url_fullxfull
              */


          } else {
              alert(data.error);
          }
        }
    });
  }

  loadShopDetails();
  loadListings();

});
