$( document ).ready( function() {

  // Declare variables
  let playerChar = null;
  let playerName = '';
  let playerId = '';

  let fighterChar = null;
  let fighterName = '';
  let fighterId = '';

  let hasId = false;
  let isFighting = false;
  let enemies = [];

  let consoleLog = 0;


  chars = [
    char1 = {
      name: 'Pooh',
      charId: 'char1',
      hp: 100,
      atk: 10,
      baseAtk: 10,
      counterAtk: 5,
      isPlayer: false,
      isEnemy: false,
      charGet: $( '#char1' ),
      charHpGet: $( '#char1-hp' ),
    },

    char2 = {
      name: 'Piglet',
      charId: 'char2',
      hp: 100,
      atk: 10,
      baseAtk: 10,
      counterAtk: 5,
      isPlayer: false,
      isEnemy: false,
      charGet: $( '#char2' ),
      charHpGet: $( '#char2-hp' ),
    },

    char3 = {
      name: 'Tigger',
      charId: 'char3',
      hp: 100,
      atk: 10,
      baseAtk: 10,
      counterAtk: 5,
      isPlayer: false,
      isEnemy: false,
      charGet: $( '#char3' ),
      charHpGet: $( '#char3-hp' ),
    },

    char4 = {
      name: 'Owl',
      charId: 'char4',
      hp: 100,
      atk: 10,
      baseAtk: 10,
      counterAtk: 5,
      isPlayer: false,
      isEnemy: false,
      charGet: $( '#char4' ),
      charHpGet: $( '#char4-hp' ),
    },
  ];

  // Get html elements
  let charsGet = $( '.characters' );
  let enemyDiv = $( '.enemies' );
  let selectText = $( '#your-char' )
  let enemiesText = $( '#enemies-text' )
  let defenderDiv = $( '.defender' )
  let attackButton = $( '.attack-button' )
  let attack = $( '#attack' )

  // Select a character
  charsGet.on( "click", function() {
    if ( !hasId && !playerChar ) { 
      playerId = this.id;
      charsGet.each( function( i ) { 
        if ( chars[i].charId === playerId ) {
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
    };

    // Select an enemy to Fight
    if ( $( this ).hasClass( 'enemy' ) ) {
      if ( !isFighting && !fighterChar )
        fighterId = this.id
        isFighting = true;
        charsGet.each( function( i ) {
          if ( chars[i].charId === fighterId ) {
            fighterChar = chars[i];
            fighterName = chars[i].name;
            defenderDiv.prepend( this );
            // Animations
            defenderDiv.show( 'slow' );
            attackButton.show();
          }
          enemiesText.fadeOut( 350, function() {
            enemiesText.text( 'Fighting...' ).fadeIn( 350 );
          })
        })
    }
  });

  // Pushes enemies to the enemy div
  moveEnemy = () => {
    $( '.enemy ').each( function( i ) {
      enemies.push( chars[i].name );
      enemyDiv.append( this );
      // Animations
      enemyDiv.show( 'slow' );
      selectText.fadeOut( 350, function() {
        selectText.text( 'Your Character' ).fadeIn( 350 );
      })
    })
  };

  // Attack & Defend
  attack.on( 'click', function() {
    // Check if player hp is greater than the incoming attack AND fighter hp is greater than the next player attack
    if ( playerChar.hp > 0 && fighterChar.hp > playerChar.atk ) {
      playerChar.hp -= fighterChar.counterAtk;        // Player loses hp equal to fighter's counter attack
      fighterChar.hp -= playerChar.atk;               // Fighter loses hp equal to player's attack
      playerChar.atk += playerChar.baseAtk;           // Increment player's attackk by base attack
      // Update HP values
      playerChar.charHpGet.text( playerChar.hp );     
      fighterChar.charHpGet.text( fighterChar.hp );
    } else if ( playerChar.hp <= 0 ) {
      loseGame();
    }
  });

  // Win & Lose

  // Reset

  // Console log on ` backquote `
  $( document ).keyup( function( event ) {
    if ( event.keyCode == 192 ) {
      consoleLog++;
      let enemyList = enemies.join( ', ' );
      console.log( '======== Begin Log ' + consoleLog + ' ========' )
      if (playerChar) { 
        console.log( 'Player: ' + playerChar.name + ' (' + playerId + ')');
        console.log( 'Enemies: ' + enemyList );
      };
      if (fighterChar) { 
        console.log( 'Fighter: ' + fighterChar.name + ' (' + fighterId + ')' );
      };
      console.log( '======== End Log ' + consoleLog + ' ========' )
    }
  });

});