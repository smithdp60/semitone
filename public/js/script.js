$(function() {

//AJAX for removing favorite from user list
$('.removeButton').on('click', function(e) {
  e.preventDefault();
  var delBtn = $(this);
  var myUrl = $(this).attr('href');
  console.log(myUrl);
  $.ajax({
    method: 'DELETE',
    url: myUrl
  }).done(function(data){
    delBtn.closest('div').parent().closest('div').fadeOut('slow', function(){
      $(this).remove();
    });
  })
})


//AJAX for adding favorite to user list
$('.addForm').on('click', function(e) {
  e.preventDefault();
  var myUrl = $(this).attr('action');
  var myData = $(this).serialize();
  $.ajax({
    method: 'POST',
    url: myUrl,
    data: myData
  }).done(function(data){
    $('.favBtn, #spaces').fadeOut('slow', function(){
      $(this).remove();
    });
  })
});


$('.search-button').on('click', function () {
  $(this).css("font-size", ".7em");
  var $btn = $(this).button('loading');
})


window.setTimeout(function() {
  $("#main-alert").fadeOut(300, function(){
    $(this).remove();
  });
}, 2200);


});