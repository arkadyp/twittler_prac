var Application = {
  init: function() {
    var app = this;
    $(document).ready(function(){      
      app.updateTweets();

      $('button.updateTweets').on('click', app.updateTweets);          
    });
  },

  updateTweets: function() {
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<li></li>');
      var $user = $('<span class="user">@'+tweet.user+'</span>');    
      $user.appendTo($tweet);
      var $msg  = $('<span class="msg-body">: '+tweet.message+'</span>');
      $msg.appendTo($tweet);      
      $tweet.appendTo($('.tweets'));
      index -= 1;
    }
  },

  processHashtags: function(message) {
    var words = message.split(' '); //split message into individual words
    var spans = []; //store spans of either content or hashtags
    var content = ""; //store non hashtag content before dumping in 'spans' 
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
    
  }
};

Application.init();