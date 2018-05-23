
// Character counting function
$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    let maxCharacters = 140;
    let character = $(this).val().length;
    $(this).parent().find('.counter').text(maxCharacters - character);
    if(maxCharacters - character < 0) {
      $('.counter').addClass('redText');

    }else {
      $('.counter').removeClass('redText');
    }


  });
});