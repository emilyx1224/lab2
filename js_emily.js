// Simulation Variables
/////////////////////
// Config
var shouldDebug = true;
// var grocerySelection = [
//   new Item("Cereal", 2),
//   new Item("Pie", 2),
//   new Item("Pizza", 2)
// ]
var foodSelection = [
    new Item("Bagel", 200),
    new Item("Creamcheese", 200),
    new Item("Milk", 200)
  ]

// State
var timeStep = 0;
// var money = 10;
var cal = 0;
// var shoppingCart = [];
var breakfast = [];

// Bookkeeping
var initialized = false;
var simState;

// Starting Function
/////////////////////
$(document).ready(function() {
  $("#selection").on("click","#bttn",function(event){
    AddToCart($(this).attr("data-index")); 
    // disable button
    //  $(this).prop('disabled', true);
    
  });
  $("#cart").on("click","#bttn",function(event){
    RemoveFromCart($(this).attr("data-index"));
  });
  //jhere
  $("#reset").click(function(){
    location.reload();
  });
  simState = new StateMachine();
  simState.Start(); 

});

// State Machine ////
///////////////////////////////////////////////
var StateMachine = function(){
  this.states = { // Add/Remove States Here
    "chooseFood" : new chooseFood(this)
  };
  this.currentState = this.states["chooseFood"];
  var nextState;

  // Largely don't mess with this section
  this.Start = function () {
    this.currentState.Enter();
    if (shouldDebug) this.Debug();
  };
  this.Update = function () {
    this.currentState.Update(function() {
      console.log("Transition");
      this.Transition();
    }.bind(this));
    if (shouldDebug) this.Debug();
  };
  this.Change = function (state) {
    nextState = state;
  };
  this.Transition = function() {
    if (nextState !== undefined) {    
      this.currentState.Exit();
      this.currentState = nextState;
      nextState = undefined;
      this.currentState.Enter();
    }
  }
  // Down to here
  this.Debug = function () { // Edit this function with important variables from your code
    console.log("-------------------------");
    console.log("timeStep = " + timeStep);
    console.log("----------------");
    console.log("State = " + this.currentState.name);
    console.log("----------------");
  };
};

var chooseFood = function (machine) {
  this.name = this.constructor.name;
  var fsm = machine;

  // Happens once when state is entered
  this.Enter = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Enter");
  //Display each item in the foodSelection
    for (let i = 0; i < foodSelection.length; i++) {
      const item = foodSelection[i];
      $("#selection").append([
        '<div>',
        '</span><button id="bttn" class="waves-effect waves-light btn" data-index="'+i+'">'+item.name+'</button>'+'<span> '+item.calorie+' cal',
        '</div>'
      ].join(''));
    }
    this.DrawCart();
    this.DrawCal();

    if (callback !== undefined) callback();
  };
  this.Update = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Update");
    
    this.DrawCart();
    this.DrawCal();

    if (callback !== undefined) callback();
  };
  this.DrawCart = function() {
    ClearByID("#cart");
    for (let i = 0; i < breakfast.length; i++) {
      const item = breakfast[i];
      $("#cart").append([
        '<div>',
          '<h6>'+item.name+'</h6><button id="bttn" class="waves-effect waves-light btn " data-index="'+i+'">Nah I\'ve changed my mind.</button>',
        '</div>'
      ].join(''));
    }
  }
  this.DrawCal = function() {
    ClearByID("#cal");
    // let cartCost = 0;
    let selectionCal = 0;
    for (let i = 0; i < breakfast.length; i++) {
        selectionCal += breakfast[i].calorie;
    }
    $("#cal").text("Total calorie for your breakfast "+(cal + selectionCal)+ " Cal");
  }
  this.Exit = function (callback) {
    if (shouldDebug) console.log("---- " + this.name + " Exit");
    if (callback !== undefined) callback();
  };
};
// Helpers /////////
///////////////////////////////////////////////
// I put misc functions that are used in many different places in a group I just called Helper
function AddToCart(groceryIndex) {
    breakfast.push(foodSelection[groceryIndex]);
  Update();
}
function RemoveFromCart(cartIndex) {
  RemoveByIndex(breakfast, cartIndex);
  Update();
}
function Change(newState) {
  simState.Change(simState.states[newState]);
  simState.Update();
}
function Update() {
  simState.Update();
}
function RemoveByIndex(array, index) {
  array.splice(index, 1);
}
function RemoveAllByElement(array, element) {
  return array.filter(e => e !== element);
}
// Data /////////
///////////////////////////////////////////////
// It's useful to treat user input in some standardized way. This function works as data storage object for user actions
// Edit this structure with whatever actions you want to happen
function Item(name, calorie) {
  this.name = name;
  this.calorie = calorie;
}
// Draw /////////////
///////////////////////////////////////////////

function ClearByID(id) {
  $(id).html($([]));
}
function FadeByID(id, state) {
  if (state) {
    $(id).fadeIn();
  } else {
    $(id).fadeOut();
  }
}
function DrawInID(id, stateName) {
  $(id).append(
    "<p class='d-inline-block py-1 my-1'>" + stateName + "</p>"
  );
}