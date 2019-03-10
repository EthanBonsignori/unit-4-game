$( document ).ready(function() {

  // Declare variables
  let playerChar = null;
  let playerName = '';
  let charId = '';
  let hasId = false;

  chars = [
    char1 = {
      hp: 100,
      atk: 10,
      catk: 5,
      player: false,
      enemy: false,
      charSelected: false,
      charGet: $( '#char1' ),
    },

    char2 = {
      hp: 100,
      atk: 10,
      catk: 5,
      player: false,
      enemy: false,
      charSelected: false,
      charGet: $( '#char2' ),
    },

    char3 = {
      hp: 100,
      atk: 10,
      catk: 5,
      player: false,
      enemy: false,
      charSelected: false,
      charGet: $( '#char3' )
    },

    char4 = {
      hp: 100,
      atk: 10,
      catk: 5,
      player: false,
      enemy: false,
      charSelected: false,
      charGet: $( '#char4' )
    },
  ];

  // Get html elements
  let charsGet = $( '.characters' );
  let enemyDiv = $( '.hidden' );
  let selectText = $( '#your-char' )

  // Select a character
  charsGet.on("click", function() {
    if (!hasId) { 
      charId = this.id;
    }
    if (!playerChar) {
      if (charId == 'char1') {
        playerChar = char1;
        playerName = "Name1";
        char1.player = true;
        hasId = true;
      }
      if (charId == 'char2') {
        playerChar = char2;
        playerName = "Name2";
        char2.player = true;
        hasId = true;
      }
      if (charId == 'char3') {
        playerChar = char3;
        playerName = "Name3";
        char3.player = true;
        hasId = true;
      }
      if (charId == 'char4') {
        playerChar = char4;
        playerName = "Name4";
        char4.player = true;
        hasId = true;
      }
      findEnemy();
      moveEnemy();
    }
  });

  // Finds player and enemies
  findEnemy = () => {
    for (let i = 0; i < chars.length; i++) {
      if (chars[i].player) {
        chars[i].charSelected = true;
      } 
      if (!chars[i].charSelected) {
        chars[i].enemy = true;
      }
    }
  
  // Pushes enemies to the enemy div and changes player border
  moveEnemy = () => {
    for (let i = 0; i < chars.length; i++)
      if (chars[i].charSelected){
        chars[i].charGet.addClass( 'player' )
      } else {
        chars[i].charGet.addClass( 'enemy' )
        chars[i].charGet.appendTo( enemyDiv )
      }
      enemyDiv.show( 'slow' )
      selectText.fadeOut(350, function() {
        selectText.text( 'Your Character' ).fadeIn(350);
      })
  }
    
  }
  // Select an enemy

  // Attack & Defend

  // Win & Lose

  // Reset

  // Console log on ` backquote `
  $( document ).keyup(function(event) {
    if (event.keyCode == 192) {
      console.log("Selected Character: " + playerName)
      console.log("Character ID: " + charId);
    }
  });

});