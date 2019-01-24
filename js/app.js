$(function(){



  $.get("http://localhost:8282/books").done(function(books) {
        for (var book of books) {
            addBook(book);
        }
    });


  function addBook(book){
  	var newRow = $(`<tr><td class="title">${book.title}</td><td>${book.author}
  		</td><td><a href="#" data-id="${book.id}" data-method="DELETE" id="delete">Delete
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
     	
  	$(this).parent().next().toggle();

  });

  function getBookFromForm(){
    return{
      title:$(".newBook input[name=title]").val(),
      author:$(".newBook input[name=author]").val(),
      isbn:$(".newBook input[name=isbn]").val(),
      publisher:$(".newBook input[name=publisher]").val(),
      type:$(".newBook input[name=type]").val()
    }

  }
var submit = $(".btn-primary");

submit.on("click", function(event){
 event.preventDefault();
  var newBook = getBookFromForm();
  saveBook(newBook);
  
});


function saveBook(newBook){

        $.ajax({
    url: "http://localhost:8282/books/",
    data: JSON.stringify(newBook),
    type: "POST",
    dataType: "json",
     headers: {
            "Content-Type": "application/json"
        }
    }).done(addBook(newBook))
      .fail(function(xhr,status,err) {
    }).always(function(xhr,status) {
    });

  }

  function deleteBook(id){

            $.ajax({
    url: `http://localhost:8282/books/${id}`,
    type: "DELETE",
    
    }).done(function(result) {
}).fail(function(xhr,status,err) {
}).always(function(xhr,status) {
});

  }


  table.on("click","#delete", function(){

    var bookId = $(this).data("id");
    deleteBook(bookId);
    removeRow(this);

  });

  function removeRow(deleteButton){
    var deleteButton;
    $(deleteButton).parent().parent().next().remove();
    $(deleteButton).parent().parent().remove();

  }

});






