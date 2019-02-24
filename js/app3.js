$(function(){

  var paramWithName = window.location.search;
  var param = paramWithName.substring(4,paramWithName.length);

  doAjax("GET",param);


	function doAjax(method,id,newBook){

		  //var path = "http://localhost:8080/books/"
    var	path = "https://catalogofbooks.herokuapp.com/books/"

			if(id!=undefined){

		    //path = `http://localhost:8080/books/${id}`
        path = `https://catalogofbooks.herokuapp.com/books/${id}`
			}

			switch(method) {
					 case "PUT":
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
		            		success: book => fillGaps(book)
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

   
  var submit = $(".btn-primary");

  submit.on("click", function(event){

        event.preventDefault();
        var newBook = getBookFromForm();
        var method = $(this).data("method");
        if(validateForm(newBook)){
          
          doAjax(method,newBook.id,newBook);
          window.location.replace("index.html");
       
        }else {
          window.alert("Popraw formularz");
      }
  
});

  var table = $(".table");
  table.on("click", ".title", function(){
     	
  	$(this).parent().next().toggle();

  });




function addBook(book){
  	var newRow = $(`<tr><td class="title">${book.title}</td><td>${book.author}
  		</td><td><a href="#" data-id="${book.id}" data-method="DELETE" id="delete">Delete
  		</a></td><td><a href="edit.html" data-id="${book.id}" data-method="GET" id="edit">Edit
      </a></td></tr>`);
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
      id:$(".newBook input[name=id]").val(),
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


function fillGaps(book){
   	 var id = $("#id");
     var title = $("#title");
     var author = $("#author");
     var isbn = $("#isbn");
     var publisher = $("#publisher");
     var type = $("#type");

     id.attr("value", book.id);
     title.attr("value", book.title);
     author.attr("value", book.author);
     isbn.attr("value", book.isbn);
     publisher.attr("value", book.publisher);
     type.attr("value", book.type);

   }


});
