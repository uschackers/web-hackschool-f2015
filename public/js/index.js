$(document).ready(function() {

});

function appendHandlers() {

}

function createPost(text) {

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

}

function removeAll() {
  $('.real-post').remove();
};

function vote(id, type) {

};
