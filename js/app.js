$(function(){



  $.get("http://localhost:8282/books").done(function(books) {
        for (var book of books) {
            addBook(book);
        }
    });


  function addBook(book){
  	var newRow = $(`<tr><td class="title">${book.title}</td><td>${book.author}
  		</td><td><a href="#" data-id="${book.id}" data-method="DELETE">Delete
  		</a></td></tr>`);
  	$(".table").append(newRow);

  	var divUnderTitle = $(`<div class="details" style="display: none ">
  								<b>isbn:</b> ${book.isbn}<br>
  								<b>publisher:</b> ${book.publisher}<br>
  								<b>type:</b> ${book.type}
  							</div>`);
  	$(".table tr").last().after(divUnderTitle);

  };

  var table = $(".table");
  table.on("click", ".title", function(){
    console.log(this);
  	
  	$(this).parent().next().toggle();

  });

});