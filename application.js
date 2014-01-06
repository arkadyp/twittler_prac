var Application = {
  init: function() {
    var app = this;
    $(document).ready(function(){      
      app.showTweets();

      $('button.showAllTweets').on('click', function(){
        app.showTweets.call(app);
      });

      $('.tweets').on('click', '.user', function() {
        var username = $(this).text().slice(1);
        app.showTweets.call(app, username);        
      });

      $('.tweets').on('click', '.hashtag', function() {
        app.showHashtags.call(app, $(this).text());
      });

    });
  },

  showTweets: function(username) {
    var tweets;  
    if(username && username in streams.users) { //show user tweets
      tweets = streams.users[username];      
    } else { //show all tweets
      tweets = streams.home;
    }
    var index = tweets.length - 1;

    $('.tweets').html(''); //clear content
    var $tweet;
    while(index >= 0) {
      $tweet = this.formatTweet(tweets[index]);
      $tweet.appendTo('.tweets');
      index -= 1;
    }
  },

  formatTweet: function(tweet) {
    var $tweet = $('<li></li>');
    var $user = $('<span class="user">@'+tweet.user+'</span>');    
    $user.appendTo($tweet);
    var $msg  = this.processHashtags(tweet.message);
    var $time = $('<span> ('+jQuery.timeago(tweet.created_at)+')</span>');
    $time.appendTo($msg);
    $msg.appendTo($tweet);      
    return $tweet;
  },

  processHashtags: function(message) {
    var words = message.split(' '); //split message into individual words
    var spans = []; //store spans of either content or hashtags
    var content = ": "; //store non hashtag content before dumping in 'spans' 
    //var hashtag = ""; //store hashtag before dumping into span
    _.each(words, function(word) {
      if(word.charAt(0) === '#') { //if word starts with hashtag, create span for it    
        if(content !== "") { 
          spans.push($('<span>'+content+'</span>')); //avoid creating empty content span
        }
        spans.push($('<span class="hashtag">'+word+'</span>'));
        content = " ";        
      } else {
        content += word+" ";
      }
    });
    if(content.length > 1) {  //since content span is triggered by hashtag, make sure that trailing content is added
      spans.push($('<span>'+content+'</span>'));
    }

    var $content = $('<span class="tweetBody"></span>');
    _.each(spans, function($span) {
      $span.appendTo($content);
    });
    return $content;
  },

  showHashtags: function(hashtag) {
    var tweets = streams.home;
    var index = tweets.length - 1;
    $('.tweets').html('');
    while(index >= 0) {
      if(tweets[index].message.indexOf(hashtag) !== -1) {
        $tweet = this.formatTweet(tweets[index]);
        $tweet.appendTo('.tweets');
      }
      index--;
    }
  }
};

Application.init();