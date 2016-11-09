//declare global variables
var subTotal = 0;
var counterItem = "";
var selectedItem = "";
var counter = 0;

//object literal to set counter for each Item
counterItem = {
  milk1l: 0,
  milk2l: 0,
  breadWH: 0,
  breadBR: 0,
  breadGR: 0,
  tBags: 0,
};

literalName = {
  milk1l: "1 Litre Milk",
  milk2l: "2 Litre Milk",
  breadWH: "White Bread",
  breadBR: "Brown Bread",
  breadGR: "Granary Bread",
  tBags: "Delicious Barrys Tea!!!",
}

//object literal to define prices
selectedItem = {
  milk1l: 0.75,
  milk2l: 1.45,
  breadWH: 0.70,
  breadBR: 0.85,
  breadGR: 1.00,
  tBags: 3.10,
};

//function to add selected Item to total.
var total = function(price){
  var addItem = $(price).attr("id"); // jquery to select current buttons id.
  var countItem = counterItem[addItem]; //select counter Item above
  var selectItem = selectedItem[addItem]; //select selected item price
  subTotal += selectItem; // add price to subtotal
  $("#total").text(subTotal.toFixed(2)); //update total label/paragraph
  counterItem[addItem]++; //increment counter for selected item.
}

//function to reduce price from total.
var reduce = function(price){
  var subItem = $(price).attr("id");
  var countItem = counterItem[subItem];
  var selectItem = selectedItem[subItem];
  var itemName = literalName[subItem];
  if (countItem > 0) { //if selected item is greater than 0
    subTotal -= selectItem; //subtract from subtotal
    $("#total").text(subTotal.toFixed(2)); //select element using id and update text
    counterItem[subItem]--; // decrement counter for selected item.
  } else {
    alert("No more " + itemName); //alert the user that there are no more of the selected item.
  }
}

/*function is called by the function below it.
It calculates the difference between the old price
and new price and returns the new price*/
var getMultiply = function(newPrice, oldPrice, items){
  totalOldPrice = oldPrice * items; // total old price = old price times the items in the basket
  subTotal -= totalOldPrice; // take this from subtotal
  var newTotalPrice = newPrice * items; //newtotal is new price * items
  subTotal += newTotalPrice; // subtotal is this price added to the subtotal.
  $("#total").text(subTotal.toFixed(2)); // display in total paragraph
  return newPrice; // return new price
}

//function to allow the user to change price
var change = function(price){
  var newPrice = parseFloat(prompt("Change Price")); //prompt to user to change price
  if (!isNaN(newPrice) && (newPrice > 0)) { // if user enters a valid number
    var priceItem = $(price).attr("id"); //select id of selected button
    var countItem = counterItem[priceItem]; //select appropriate(count) item from object literal above
    var selectItem = selectedItem[priceItem]; //select appropriate (select) item from object literal above
    getMultiply(newPrice, selectItem, countItem); // calls function directly above this
    $("#" + priceItem).text("€" + newPrice.toFixed(2)); // change price(text) of price button
    selectedItem[priceItem] = newPrice; //change the value in the object literal
  }
}
