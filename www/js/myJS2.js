//declare global variables
var subTotal = 0;
localStorage.clear();
//console.log($("#total").val(subTotal));
var oldTotal = Number(localStorage.total);
if (oldTotal > 0){
console.log(oldTotal);
$("#total").text(oldTotal.toFixed(2));
}
var counterItem = "";
var selectedItem = "";
var counter = 0;

//object to set details for each Item, constructor
function basketItem(price, counter, itemName){
  this.price = price;
  this.counter = counter;
  this.itemName = itemName;
}

//create "instance" for each individual item
var milk1l = new basketItem(0.75, 0, "'1 Litre Milk'");
var milk2l = new basketItem(1.45, 0, "'2 Litre Milk'");
var breadWH = new basketItem(0.70, 0, "'White Bread'");
var breadBR = new basketItem(0.85, 0, "'Brown Bread'");
var breadGR = new basketItem(1.00, 0, "'Granary Bread'");
var tBags = new basketItem(3.10, 0, "'Delicious Barrys'");

//function to add selected Item to total.
var total = function(price){
  var addItem = $(price).attr("id"); // jquery to select current buttons id.
  var selectItem = window[addItem].price; //select selected item price
  subTotal += selectItem; // add price to subtotal
   //update total label/paragraph
  window[addItem].counter += 1;//increment counter for selected item.
}

//function to reduce price from total.
var reduce = function(price){
  var subItem = $(price).attr("id");
  var countItem = window[subItem].counter;
  var selectItem = window[subItem].price;
  var itemName = window[subItem].itemName;
  if (countItem > 0) { //if selected item is greater than 0
    subTotal -= selectItem; //subtract from subtotal
    $("#total").text(subTotal.toFixed(2)); //select element using id and update text
    window[subItem].counter -= 1; // decrement counter for selected item.
  } else {
    alert("No more " + itemName + " in basket"); //alert the user that there are no more of the selected item.
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
    var countItem = window[priceItem].counter; //select appropriate item from object above
    var selectItem = window[priceItem].price; //select appropriate item from object above
    getMultiply(newPrice, selectItem, countItem); // calls function directly above this
    $("#" + priceItem).text("€" + newPrice.toFixed(2)); // change price(text) of price button
    window[priceItem].price = newPrice; //change the value in the object constructor
  }
}
