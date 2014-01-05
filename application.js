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
  }

};

Application.init();