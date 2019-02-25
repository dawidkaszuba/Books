$(function(){

  doAjax("GET");

	function doAjax(method,id,newBook){

		//var path = "http://localhost:8080/books/"
		var path = "https://catalogofbooks.herokuapp.com/books"

			if(id!=undefined){

				//path = `http://localhost:8080/books/${id}`
				path = `https://catalogofbooks.herokuapp.com/books/${id}`
			}

			switch(method) {
				case "DELETE": 
				 		$.ajaxSetup({
		            		url: path 
	        			});
	        			break;
	        	case "POST":
	        			$.ajaxSetup({
		            		data: JSON.stringify(newBook)
		             	});

						$.ajaxSetup({
		            		headers: {
			            	"Content-Type": "application/json"}
		             	});

						$.ajaxSetup({
		            		dataType: "json"
		             	});

						$.ajaxSetup({
		            		success: newBook => addBook(newBook)
		             	});
		             	break;
		        case "GET":
		         		$.ajaxSetup({
		            		headers: {
			            "Content-Type": "application/json"}
		            	 });

						$.ajaxSetup({
		            		dataType: "json"
		             	});
						$.ajaxSetup({
		            		success: books => populate(books)
		             	});
		             	break;
           
				}
	
 	$.ajax({
	    url: path,
	    type: `${method}`
	    	            
    })
      .fail(function(xhr,status,err) {
    }).always(function(xhr,status) {
    });

  }


   var table = $(".table");

   table.on("click","#delete", function(){

   var bookId = $(this).data("id");
   var method = $(this).data("method");
   doAjax(method,bookId);
   removeRow(this);

  });

    table.on("click","#edit", function(){

   var bookId = $(this).data("id");
   var method = $(this).data("method");
   doAjax(method,bookId);
   

  });

   
  var submit = $(".btn-primary");

  submit.on("click", function(){
        var newBook = getBookFromForm();
        var method = $(this).data("method");
        if(validateForm(newBook)){
           var id;
           doAjax(method,id,newBook);
            }else {
          window.alert("Popraw formularz");
      }
  
});

  var table = $(".table");
  table.on("click", ".title", function(){
     	
  	$(this).parent().next().toggle();

  });

  // var searchButton = $("#search");
  
  // searchButton.on("click", function(event){
  //     event.preventDefault();
  //     var titles = $(".title");
  //     var searchTitle = $("#searchTitle");
  //     var title = searchTitle.val();
  //     console.log(title);

  //     for (var i = 0; i<titles.length;i++){
  //       if(titles[i].textContent.includes(title)){
  //         var bookId = $(titles[i]).data("id");
  //         doAjax("GET",bookId);
  //         break;
  //       }
  //     }

  // })



function addBook(book){
  	var newRow = $(`<tr><td class="title">${book.title}</td><td>${book.author}
  		</td><td><a href="#" data-id="${book.id}" data-method="DELETE" id="delete">Delete
  		</a></td><td><a href="edit.html?id=${book.id}">Edit</a></td></tr>`);
  	$(".table").append(newRow);

  	var divUnderTitle = $(`<div class="details" style="display: none ">
  								<b>isbn:</b> ${book.isbn}<br>
  								<b>publisher:</b> ${book.publisher}<br>
  								<b>type:</b> ${book.type}
  							</div>`);
  	$(".table tr").last().after(divUnderTitle);


  };

function getBookFromForm(){
    return{
      title:$(".newBook input[name=title]").val(),
      author:$(".newBook input[name=author]").val(),
      isbn:$(".newBook input[name=isbn]").val(),
      publisher:$(".newBook input[name=publisher]").val(),
      type:$(".newBook input[name=type]").val()
    }

  }

function validateForm(newBook) {
      if((newBook.title==="") || (newBook.author==="") || (newBook.isbn==="") 
        || (newBook.isbn===null) || (newBook.publisher==="") || (newBook.type==="")){
         return false;
       if(isNaN(newBook.isbn)){
          return false;
       }
     }

    return true;
  }

function removeRow(deleteButton){
    var deleteButton;
    $(deleteButton).parent().parent().next().remove();
    $(deleteButton).parent().parent().remove();

  }


function populate(books){
  
   	 for (var book of books) {
            addBook(book);
        }
   }


});
