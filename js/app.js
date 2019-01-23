$(function(){

  $.get("http://localhost:8282/books").done(function(books) {
        for (var book of books) {
            console.log(book);
        }
    });



});