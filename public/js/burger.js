$(document).ready(function() {
     
      getBurgers();
	// Getting a reference to the input field where user adds a new burger
	var newBurgerInput	= $("input.form-control");
	var burgerRow 	   	= $(".burger-container");
	var buttonAreas    	= $(".button-size"); 
	var inputAreas 	  	= $("#devoured-area");
	var burgerArr      	= [];

	$(document).on("submit","#new-burger",insertBurger);
	$(document).on("click","button.devour",devouredT);
    
	// This function grabs burgers from the database and updates the main page which burger.html
  	function getBurgers() {
      $.get("/api/burger", function(data) {
        console.log("Burgers", data);
        burgerArr = data;
        initializeRows();
      });
    }// end of getBurgers

    function initializeRows() {
	 burgerRow.empty();
	 buttonAreas.empty();
	 inputAreas.empty();

	 var burgersNotDevoured  = [];
	 var devourItBtn 		 = [];
	 var burgersHaveDevoured = [];
	 for (var i =0; i < burgerArr.length; i++) {  
	 	if(!burgerArr[i].devoured) {
	 		burgersNotDevoured.push(createNewBurger(burgerArr[i].burger_name, burgerArr[i].id));
	 		devourItBtn.push(createNewButton(burgerArr[i]));
	 	}// end if
	 	else {
	 			burgersHaveDevoured.push(createNewInput(burgerArr[i].burger_name, burgerArr[i].id));
	 	}// end else

	 }// end for loop
	 burgerRow.prepend(burgersNotDevoured);
	 buttonAreas.prepend(devourItBtn);
	 inputAreas.append(burgersHaveDevoured);
}// end of initializeRowes function

	function insertBurger(event) {
	  event.preventDefault();
	  var newBurger = {
	 	burger_name: newBurgerInput.val(),
	 	devoured: false
	  };
	 	
	  $.post("/api/burger", newBurger, function() {
	    getBurgers();
	  });// end post
	 
	 newBurgerInput.val("");
	}// end of insertBurger Function

function createNewBurger(burger, id) {
	
	var newBurgerRow = $("<li>");
    newBurgerRow.addClass("list-group-item burger-item");

    var newBurgerSpan = $("<span>");
    newBurgerSpan.text(id +". " +  burger);
    newBurgerRow.append(newBurgerSpan);
    return newBurgerRow;
}// end of createNew Row

// Creaet Devour it button function
function createNewButton(btn) {
	var newDevourItBtn = $("<button>");
    newDevourItBtn.addClass("devour btn btn-default");
    newDevourItBtn.text("Devour It");
    newDevourItBtn.data("id", btn);
    return newDevourItBtn;
}// end of createNewButton

// Create input field function
function createNewInput(burgerName, id) {
	var newList = $("<li>");
	newList.addClass("list-reset");
	var newInput = $("<input>");
    newInput.attr("type", "text");
    newInput.val(id + ". " + burgerName);
    newInput.attr("readonly", true);
    newList.append(newInput);
    return newList;
}// end of createNewInput

    // This function reverse the boolean value in devoured col from false to true.
    function devouredT(event) {
	event.preventDefault();
    var burger = $(this).data("id");
    burger.devoured = !burger.devoured;
    console.log("hi im here " + burger.devoured);
    updateBurger(burger);
  }// end of function devouredT

  // This function updates a devoured column in our database
  function updateBurger(devour) {
    $.ajax({
      method: "PUT",
      url: "/api/burger",
      data: devour
    })
    .done(function() {
      getBurgers();
    });
  }
   
});//end of ready function
    

