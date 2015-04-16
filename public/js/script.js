$(function() {

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







})