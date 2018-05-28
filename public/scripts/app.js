/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Function that appends the tweet data to the article
function createTweetElement(tweetData) {
  const $tweet = $('<article>')
  .addClass('tweet');

  const $header = $('<header>')
  .addClass('tweet-header')
  .appendTo($tweet);

  $div = $('<div>')
  .addClass('clearfix')
  .appendTo($header);

  $img = $('<img>')
  .addClass('photo')
  .attr('src', tweetData.user.avatars.small )
  .appendTo($div);

  $span = $('<span>')
  .addClass('name')
  .text(tweetData.user.name)
  .appendTo($div);

  $span = $('<span>')
  .addClass('user')
  .text(tweetData.user.handle)
  .appendTo($div );

  $p = $('<p>')
  .addClass('text')
  .text(tweetData.content.text)
  .appendTo($tweet);

  const $footer = $('<footer>')
  .addClass('tweet-footer')
  .text(newTime(tweetData.created_at))
  .appendTo($tweet);

  $span = $('<span>')
  .addClass('icons')
  .appendTo($footer);

  $i = $('<i>')
  .addClass('fas fa-flag')
  .appendTo($span);

  $i = $('<i>')
  .addClass('fas fa-retweet')
  .appendTo($span);

  $i = $('<i>')
  .addClass('fas fa-heart')
  .appendTo($span);

  return $tweet;
}


// Date and Time funciton
function newTime(timestamp) {
  var currentTime = Date.now();
  var postTime = timestamp;
  var realTime = currentTime - postTime;
  Math.floor(realTime / 1000 / 60 / 60 / 24 / 365);
  if(Math.floor(realTime / 1000 / 60 / 60 / 24 / 365 ) > 0) {
    return Math.floor(realTime / 1000 / 60 / 60 / 24 / 365 ) + " years ago";
  } else if (Math.floor(realTime / 1000 / 60 /  60 / 24 / 30.416666) > 0) {
    return Math.floor(realTime / 1000 / 60 /  60 / 24 / 30.416666) + " months ago";
  } else if (Math.floor(realTime / 1000 / 60 /  60 / 24 ) > 0) {
    return Math.floor(realTime / 1000 / 60 /  60 / 24) + " days ago";
  } else if (Math.floor(realTime / 1000 / 60 /  60 ) > 0) {
    return Math.floor(realTime / 1000 / 60 /  60) + " hours ago";
  } else if(Math.floor(realTime / 1000 / 60) > 0) {
    return Math.floor(realTime / 1000 / 60) + " minutes ago";
  } else if (Math.floor(realTime / 1000) > 0) {
    return Math.floor(realTime / 1000) + " seconds ago";
  } else {
    return "Just now";
  }
}







// Function which renders the tweets
function renderTweets(tweets) {
  tweets.forEach(function (singleTweet) {
    $('#tweet-list').prepend(createTweetElement(singleTweet));
  });
}

function tweetsLoad() {
  $.ajax({
    url: "/tweets",
    type: "GET",
    success: function(data) {
      renderTweets(data);
    }
  });
}
$(document).ready(function(){
  tweetsLoad();
  $('.new-tweet').hide();
  $('.compose').on('click', function() {
    $('.new-tweet').toggle();
    $('textarea').focus();
  });
  $('#form-submission').on('submit', function(event) {
    event.preventDefault();
    let textArea = $('.text-field');
    if(textArea.val() === "" || textArea.val() === null) {
      alert("You need to write some text in textfield!");
    }else if(textArea.val().length > 140) {
      alert("Your tweet is too long");
    }else {
      $.ajax({
        url: "/tweets",
        type: "POST",
        data: $(this).serialize(),
        success: function() {
         $('textarea').val("");
         tweetsLoad();
       }
     });
    }
  });
});

