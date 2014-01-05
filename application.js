var Application = {
  init: function() {
    var app = this;
    $(document).ready(function(){      
      app.updateTweets();          
    });
  },

  updateTweets: function() {
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<li></li>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($('.tweets'));
      index -= 1;
    }
  }

};

Application.init();