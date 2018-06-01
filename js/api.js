(function($) {
  'use strict';


  /**
   * Ajax-based random post fetching & History API
   */
  $('#new-quote-button').on('click', function(event){
    event.preventDefault();
    // console.log('click');

    // console.log(api_vars.root_url);
    // write ajax here
      $.ajax({
        method: 'get',
        url: api_vars.root_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1' ,
        cache: false
    }).done(function(data){

      var quoteObj = data[0];
      var quoteContent = quoteObj.content.rendered;
      var quoteTitle = quoteObj.title.rendered;
      var quoteUrl = quoteObj._qod_quote_source_url;
      var quoteSource = quoteObj._qod_quote_source;

      var quoteLink = '<a href="' + quoteUrl + '">' + quoteSource + '</a>';
      
      $('.entry-content').html(quoteContent);
      $('.entry-title').html(quoteTitle);
      $('.source').html(quoteLink);

      // append the data to html, look at content.php in template parts
      // 
      // change to be the target e.g. look at .entry-meta in dev-tools there are .entry-title and .source
      // $('.entry-content').html(quoteContent);

    }).fail(function(){
      // some message for the user saying there was an error
    });
 });// end of .on click

  /**
   * Ajax-based front-end post submissions.
   */
    // in the wp javascript slides for post requests.
})(jQuery);

// create variable
// var lastPage = "";
//   $(history-button).on("click", function(event){
//     event.preventDefault();

// button click update the last page before ajax request
// lastPage = document.URL;
// console.log(lastPage);

// inside the .done method update the URL
// history.pushState(null, null, data[0].slug);
//   });

/**
* window pop state, back or forward button pressed
* after & outside of the click event
*/

// $(window).on("popstate", function(){
//     window.location.replace(lastPage);
// });
