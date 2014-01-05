var Application = {
  init: function() {
    var app = this;
    $(document).ready(function(){      
      app.showAllTweets();

      $('button.showAllTweets').on('click', function(){
        app.showAllTweets.call(app);
      });          
    });
  },

  showAllTweets: function() {
    var index = streams.home.length - 1;
    var $tweet; 
    while(index >= 0){
      $tweet = this.formatTweet(streams.home[index]);
      $tweet.appendTo($('.tweets'));
      index -= 1;      
    }
  },

  formatTweet: function(tweet) {
    var $tweet = $('<li></li>');
    var $user = $('<span class="user">@'+tweet.user+'</span>');    
    $user.appendTo($tweet);
    var $msg  = this.processHashtags(tweet.message);
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
  }
};

Application.init();