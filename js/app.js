$(function(){



  $.get("http://localhost:8282/books").done(function(books) {
        for (var book of books) {
            addBook(book);
        }
    });


  function addBook(book){
  	var newRow = $(`<tr class="title"><td>${book.title}</td><td>${book.author}
  		</td><td><a href="#" data-id="${book.id}" data-method="DELETE">Delete
  		</a></td></tr>`);
  	$(".table").append(newRow);

  	var divUnderTitle = $(`<div class="details" style="display: none ">
  								isbn:${book.isbn}
  								publisher: ${book.publisher}
  								type: ${book.type}
  							</div>`);
  	$(".table tr").last().after(divUnderTitle);

  };

  var table = $(".table");
  table.on("click", "tr", function(){
  	
  	$(this).next().toggle();

  });




});