(function($) {
  'use strict';

  /**
   * Ajax-based random post fetching & History API
   */
  $('#new-quote-button').on('click', function(event) {
    event.preventDefault();

    $.ajax({
      method: 'get',
      url:
        api_vars.root_url +
        'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      cache: false
    })
      .done(function(data) {
        var quoteObj = data[0];
        var quoteContent = quoteObj.content.rendered;
        var quoteTitle = quoteObj.title.rendered;
        var quoteUrl = quoteObj._qod_quote_source_url;
        var quoteSource = quoteObj._qod_quote_source;

        var quoteLink = '<a href="' + quoteUrl + '">' + quoteSource + '</a>';

        $('.entry-content').html(quoteContent);
        $('.entry-title').html(quoteTitle);
        $('.source').html(quoteLink);
      })
      .fail(function() {
        $('.site-main').html('There was an error, please try again!');
      });
  }); // end of .on click

  $('#quote-submission-form').on('submit', function(event) {
    event.preventDefault();

    $.ajax({
      method: 'post',
      url: api_vars.root_url + 'wp/v2/posts',
      data: {
        title: $('#quote-author').val(),
        content: $('#quote-content').val(),
        source: $('#quote-source').val(),
        sourceUrl: $('#quote-source-url').val()
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-WP-Nonce', api_vars.nonce);
      }
    })
      .done(function() {
        $('#quote-submission-form').slideUp('slow');
        $('.quote-submission').append(
          'Your quote has been submitted. Thank you!'
        );
      })
      .fail(function() {
        $('#quote-submission-form').append(
          'There was an error submitting your quote, please try again!'
        );
      });
  });

})(jQuery);

