jQuery(document).ready(function($) {
  // Mobile Nav
  $('.menu-open').click(function() {
    $(this).toggleClass('is-active');
    $('.site-header-menu').toggleClass('is-open');
    $('body').toggleClass('nav-open');
  });

  $('.menu-open.menu-close.is-active').click(function() {
    $('body').removeClass('nav-open');
    $('.menu-open').removeClass('is-active');
    $('.site-header-menu').removeClass('is-open');
  });

  $('.site-header-menu a').on('click', function() {
    $('a.active').removeClass('active');
    $(this).addClass('active');

    if (
      $(this).hasClass('active') &&
      $('.menu-open.menu-close').hasClass('is-active')
    ) {
      $('body').removeClass('nav-open');
      $('.menu-open').removeClass('is-active');
      $('.site-header-menu').removeClass('is-open');
    }
  });

  $('.diversity_terms').click(function(e) {
    e.preventDefault();
    $('#diversity-popup').css({
      visibility: 'visible',
      opacity: 1
    });
  });

  $('.terms_conditions').click(function(e) {
    e.preventDefault();
    $('#terms-popup').css({
      visibility: 'visible',
      opacity: 1
    });
  });

  $('.close-icon').click(function() {
    $('#diversity-popup, #terms-popup').css({
      visibility: 'hidden',
      opacity: 0
    });
  });

  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') ==
          this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length
          ? target
          : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate(
            {
              scrollTop: target.offset().top
            },
            1000,
            function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(':focus')) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }
          );
        }
      }
    });

  $(document).ready(function(e) {
    $('#contact-form').validate({
      submitHandler: function(form) {
        var dt = new Date();
        var name = $('#name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var time = dt.toLocaleTimeString();
        var date = dt.toLocaleDateString();
        var consent = $('#consent-accepted').val();
        var message = $('#message').val();

        var dataString =
          'name=' +
          encodeURIComponent(name) +
          '&email=' +
          encodeURIComponent(email) +
          '&phone=' +
          encodeURIComponent(phone) +
          '&time=' +
          encodeURIComponent(time) +
          '&date=' +
          encodeURIComponent(date) +
          '&consent=' +
          encodeURIComponent(consent) +
          '&message=' +
          encodeURIComponent(message);

        var request = $.ajax({
          url:
            'https://script.google.com/macros/s/AKfycbwO4tI4Z11DG1k75GfX8qalr3AGM4bJ-ejB2tNMPoS8daqX9Hts/exec',
          type: 'POST',
          data: dataString,
          dataType: 'json'
        });

        request.done(function(result) {
          if (result.error) {
            $('#contact-form').append(
              "<p class='failure'>Error in submission, please try again or call 0208 361 3219.</p>"
            );
          } else {
            $('#contact-form').append(
              "<p class='sucess'>Thank you, your message had been sent.</p>"
            );
          }
        });

        request.fail(function(jqXHR, textStatus) {
          $('#contact-form').append(
            "<p class='failure'>Error in submission, please try again or call 0208 361 3219.</p>"
          );
        });
      }
    });
  });
});
