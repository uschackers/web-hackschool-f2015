$(document).ready(function() {
  $('.new').keypress(function(e) {
    if(e.which == 13) {
      createPost($('.writesomething').val());
    }
  });

  loadPosts();
});

function appendHandlers() {
    $('.upvote.active').click(function(e) {
        var id = $(this).data('id');
        vote(id, 'up');
    });

    $('.downvote.active').click(function(e) {
        var id = $(this).data('id');
        vote(id, 'down');
    });
}

function createPost(text) {
  $.post('/posts', { content: text }, function(results) {
    if(results.success) {
      $('#message').html('Post successfully created');
      loadPosts(true);
    } else {
      $('#message').html(results.msg);
    }
  });
};

function renderPost(post) {
  var dateDiff = new Date().getHours() - new Date(post.created).getHours();

  var post = '<div class="post real-post"> \
      <div class="content"> \
          <p class="text">' + post.content + '</p> \
          <p class="info">' + dateDiff + ' hours ago</p> \
      </div> \
      <div class="votes"> \
          <div class="count">' + post.votes + '</div> \
          <div class="actions"> \
              <button class="upvote active" data-id="' + post._id + '"> \
                  <img src="img/chevron-up.svg" alt="upvote" class="chevron"> \
              </button> \
              <button class="downvote active" data-id="' + post._id + '"> \
                  <img src="img/chevron-down.svg" alt="downvote" class="chevron"> \
              </button> \
          </div> \
      </div> \
  </div>';

  $('#post-container').append(post);
};

function loadPosts(wipe) {
  $.get('/posts', function(results) {
    if(!results.success) {
      $('#message').html(results.msg);
    } else {
      if(wipe) removeAll();
      for(var i in results.posts) {
        renderPost(results.posts[i]);
      }
      appendHandlers();
    }
  });
}

function removeAll() {
  $('.real-post').remove();
};

function vote(id, type) {
  $.ajax({
    method: 'PUT',
    url: '/posts/' + id + '/vote/' + type,
    success: function(results) {
      if(results.success) {
        loadPosts(true);
      } else {
        $('#message').html(results.msg);
      }
    }
  })
};
