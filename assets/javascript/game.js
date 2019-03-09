$( document ).ready(function() {

  // Declare variables
  let playerChar = null;


  char1 = {
    hp: 100,
    atk: 10,
    catk: 5,
  };

  char2 = {
    hp: 100,
    atk: 10,
    catk: 5,
  };

  char3 = {
    hp: 100,
    atk: 10,
    catk: 5,
  };

  char4 = {
    hp: 100,
    atk: 10,
    catk: 5,
  };

  // Get html elements
  let char1Get = $( '#char1' );
  let char2Get = $( '#char2' );
  let char3Get = $( '#char3' );
  let char4Get = $( '#char4' );

  let getChar = $( '.characters' );

  // Select a character
  getChar.on("click", function() {
    let charVal = $(this.getChar).val()
    console.log(charVal)
    if ($(this).val() == '1') {
      playerChar = getChar;
      console.log("!!!" + playerChar)
    }
  }); // End character select

  // Select an enemy

  // Attack & Defend

  // Win & Lose

  // Reset

});