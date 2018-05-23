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

  const $div = $('<div>')
  .addClass('clearfix')
  .appendTo($header);

  const $img = $('<img>')
  .addClass('photo')
  .attr('src', tweetData.user.avatars.small )
  .appendTo($div);

  const $span = $('<span>')
  .addClass('name')
  .text(tweetData.user.name)
  .appendTo($img);

  const $span = $('<span>')
  .addClass('user')
  .text(tweetData.user.handle)
  .appendTo($img);

  const $p = $('<p>')
  .addClass('text')
  .text(tweetData.content.text)
  .appendTo($tweet);

  const $footer = $('<footer>')
  .addClass('tweet-footer')
  .appendTo($tweet);

  const $span = $('<span>')
  .addClass('icons')
  .appendTo($tweet);

  const $i = $('<i>')
  .addClass('fas fa-flag')
  .appendTo($span);

  const $i = $('<i>')
  .addClass('fas fa-retweet')
  .appendTo($span);

  const $i = $('<i>')
  .addClass('fas fa-heart')
  .appendTo($span);

  return $tweet;
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

