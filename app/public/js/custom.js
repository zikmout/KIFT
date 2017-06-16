// Because, who doesn't love jQuery?
jQuery(document).ready(function($) {
  $('.show-login-modal').on('click', function(e) {
    $('#login-modal').modal('show');
    $('#signup-modal').modal('hide');
    e.preventDefault();
  });
  $('.show-signup-modal').on('click', function(e) {
    $('#signup-modal').modal('show');
    $('#login-modal').modal('hide');
    e.preventDefault();
  });
});
