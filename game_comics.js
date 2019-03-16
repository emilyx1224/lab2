var scoreD = 0;
var scoreM = 0;

$(document).ready(function() {
  $("#reset").click(function(){
    location.reload();
  });
  $("#scoreM").html(scoreM);
  $("#scoreD").html(scoreD);
  $("#bttn2").html("Which do you prefer?");
  $("#bttn1").hide();
  $("#bttn3").hide();
  // Simulation Variables
  // Config

  // In this version, you create new states like this
  // States are created as new objects, and take four parameters. first is a string name
  var state1 = new State("First",
    function(){
      scoreD = 0;
      scoreM = 0;
      $("#scoreM").html(scoreM);
      $("#scoreD").html(scoreD);
      $("#bttn2").html("Which do you prefer?");
      $("#bttn1").hide();
      $("#bttn3").hide();
    }, // The second is the enter function
    function() { // third is the update function
      
      console.log("state1 has only an update function");
      machine.change(state2);
    },
    null // fourth is the exit function
  );

  var state2 = new State("Second",
 
    function () {  // You can add functions to states this way
      $("#bttn1").show(),
      $("#bttn3").show(),
      $("#bttn1").html("Ironman");
      $("#bttn3").html("Batman");
      $("#bttn2").hide();
      console.log("state2 has enter and no exit function");
    },
    function() {
      changeToState(state3);
    },
    null
  );

  var state3 = new State("Third",
    function() {
      $("#bttn2").show(),
      $("#bttn2").html("Which do you prefer?");
      $("#bttn1").hide();
      $("#bttn3").hide();
      changeToState(state4);
    },
    function () {
      console.log("state3 has exit and no exit function");
    },
    null
  );

  var state4 = new State("Forth",
    function() {
      $("#bttn1").show(),
      $("#bttn3").show(),
      $("#bttn1").html("Thor");
      $("#bttn3").html("Wonder Woman");
      $("#bttn2").hide();
      changeToState(state5);
    },
    function () {
      console.log("state4 has exit and no exit function");
    },
    null
  );

  var state5 = new State("Fifth",
    function() {
      $("#bttn2").show(),
      $("#bttn2").html("Which do you prefer?");
      $("#bttn1").hide();
      $("#bttn3").hide();
      changeToState(state6);
    },
    function () {
      console.log("state5 has exit and no exit function");
    },
    null
  );

    var state6 = new State("Sixth",
    function() {
      $("#bttn1").show(),
      $("#bttn3").show(),
      $("#bttn1").html("Avengers");
      $("#bttn3").html("Justice League");
      $("#bttn2").hide();
      changeToState(state7);
    },
    function () {
      console.log("state6 has exit and no exit function");
    },
    null
  );
    var state7 = new State("Seventh",
      function() {
        $("#bttn1").hide(),
        $("#bttn3").hide(),
        $("#bttn2").show();
        if (scoreM>scoreD){
          $("#bttn2").html("You are more of a Marvel fan. <br>Click to restart");
        }else {
          $("#bttn2").html("You are more of a DC fan. <br>Click to restart");
        }
        
        changeToState(state1);
      },
      function () {
        console.log("state7 has exit and no exit function");
      },
      null
    );
  

  var changeToState = function (state) {
    machine.change(state);
  }

  // To start the StateMachine, just create a new state object and
  // pass it the initial state, like so
  var machine = new StateMachine(state1);

  // when the button is clicked, update the state machine
  $("#bttn1").click(function() {
    machine.update();
    $('#output').text(machine.currentState.name+" "+machine.timeStep);
    scoreM += 1;
    $("#scoreM").text(scoreM);
  }
  );


  $("#bttn2").click(function() {
    machine.update();
    $('#output').text(machine.currentState.name+" "+machine.timeStep);
  }
  );

    $("#bttn3").click(function() {
    machine.update();
    $('#output').text(machine.currentState.name+" "+machine.timeStep);
    scoreD += 1;
    $("#scoreD").text(scoreD);
  }
  );
});


