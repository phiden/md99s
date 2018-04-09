$(document).ready(function(){

  var base = "https://openapi.etsy.com/v2/";
  var api_key = "api_key=xlo8g1mbjnr9xwikydzlo6zk";
  var uri;
  var etsyURL;
  var listings = [];

  function loadListings() {

    uri = 'shops/phiden/listings/active.js?'

    etsyURL = base + uri + api_key + "&includes=MainImage&fields=url,price,title,shop_section_id,featured_rank&limit=30";

    console.log(etsyURL);

    $.ajax({
        url: etsyURL,
        dataType: 'jsonp',
        success: function(data) {
          if (data.ok) {
              listings = data.results;
              //console.log(listings);

              listings.forEach(function(elem) {
                //console.log(elem.featured_rank);
                if(elem.featured_rank != null) {
                  $('#etsyListings ul').append('<li><img src="' + elem.MainImage.url_570xN + '"><h6>' + elem.title + '</h6><p class="price">' + elem.price + '</p><a href="' + elem.url + '" class="button">shop on etsy</a></li>')
                }
              })

              /*
              url
              price
              title
              shop_section_id
              MainImage.url_75x75, url_170x135, url_570xN, url_fullxfull
              */


          } else {
              alert(data.error);
          }
        }
    });
  }

  loadListings();

});
