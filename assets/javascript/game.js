$( document ).ready( function() {

  // Declare variables
  let playerChar = null;
  let playerName = '';
  let fighterName = '';
  let charId = '';
  let fighterId = '';
  let hasId = false;
  let isFighting = false;
  let enemies = [];

  let consoleLog = 0;


  chars = [
    char1 = {
      name: 'Pooh',
      hp: 100,
      atk: 10,
      catk: 5,
      isPlayer: false,
      isEnemy: false,
      charSelected: false,
      charGet: $( '#char1' ),
      charId: 'char1',
    },

    char2 = {
      name: 'Piglet',
      hp: 100,
      atk: 10,
      catk: 5,
      isPlayer: false,
      isEnemy: false,
      charSelected: false,
      charGet: $( '#char2' ),
      charId: 'char2',
    },

    char3 = {
      name: 'Tigger',
      hp: 100,
      atk: 10,
      catk: 5,
      isPlayer: false,
      isEnemy: false,
      charSelected: false,
      charGet: $( '#char3' ),
      charId: 'char3',
    },

    char4 = {
      name: 'Owl',
      hp: 100,
      atk: 10,
      catk: 5,
      isPlayer: false,
      isEnemy: false,
      charSelected: false,
      charGet: $( '#char4' ),
      charId: 'char4',
    },
  ];

  // Get html elements
  let charsGet = $( '.characters' );

  let enemyDiv = $( '.enemies' );
  let selectText = $( '#your-char' )
  let defenderDiv = $( '.defender' )
  let attackButton = $( '.attack-button' )

  // Select a character
  charsGet.on( "click", function() {
    if ( !hasId && !playerChar ) { 
      charId = this.id;
      charsGet.each( function( i ) { 
        if ( chars[i].charId === charId ) {
          playerChar = chars[i];
          playerName = chars[i].name;
          chars[i].isPlayer = true;
          chars[i].charGet.addClass( 'player' )
        } else {
          chars[i].isEnemy = true;
          chars[i].charGet.addClass( 'enemy' )
        }
      })
      moveEnemy();
      hasId = true;
    }

    // Select an enemy to Fight
    if ( $( this ).hasClass( 'enemy' ) ) {
      if ( !isFighting )
        fighterId = this.id
        isFighting = true;
        charsGet.each( function( i ) {
          if ( chars[i].charId === fighterId ) {
            fighterName = chars[i].name
            defenderDiv.append( this )
            // Animations
            defenderDiv.show( 'slow' )
            attackButton.show( 'slow' )
          }
        })
    }
  });

  // Pushes enemies to the enemy div
  moveEnemy = () => {
    $( '.enemy ').each( function( i ) {
      enemies.push( chars[i].name );
      enemyDiv.append( this )
      // Animations
      enemyDiv.show( 'slow' )
      selectText.fadeOut( 350, function() {
        selectText.text( 'Your Character' ).fadeIn( 350 );
      })
    })
  }

  // Select an enemy to battle

  // Attack & Defend

  // Win & Lose

  // Reset

  // Console log on ` backquote `
  $( document ).keyup( function( event ) {
    if ( event.keyCode == 192 ) {
      consoleLog++;
      let enemyList = enemies.join( ', ' );
      console.log( '======== Begin Log ' + consoleLog + ' ========' )
      console.log( 'Player Name: ' + playerName );
      console.log( 'Character ID: ' + charId );
      console.log( 'Enemies: ' + enemyList );
      console.log( 'Fighter name: ' + fighterName );
      console.log( 'Fighter ID: ' + fighterId );
      console.log( '======== End Log ' + consoleLog + ' ========' )
    }
  });

});