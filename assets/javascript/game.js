$( document ).ready( function() {

// Declare variables
let playerChar, playerId, fighterChar, fighterId, hasId, gameOver, enemies, consoleLog, chars;

  //initialize = () => {
    
    playerChar = null;
    playerId = '';

    fighterChar = null;
    fighterId = '';

    hasId = false;
    gameOver = false;
 

    enemies = [];

    consoleLog = 0;


    chars = [
      char1 = {
        name: 'Pooh',
        charId: 'char1',
        hp: 100,
        atk: 7,
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
        atk: 100,
        baseAtk: 10,
        counterAtk: 1000,
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
  //}; // End Initialize

  // Get html elements
  let charsGet = $( '.characters' );
  let enemyDiv = $( '.enemies' );
  let selectText = $( '#your-char' );
  let enemiesText = $( '#enemies-text' );
  let defenderDiv = $( '.defender' );
  let attack = $( '#attack' );
  let attackButton = $( '.attack-button' );
  let resetButton = $( '#reset-button' );

  // Select a character
  charsGet.on( "click", function() {
    if ( !hasId && !playerChar && !gameOver ) { 
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
      } )
      moveEnemy();
      hasId = true;
    };

    // Select an enemy to Fight
    if ( $( this ).hasClass( 'enemy' ) ) {
      if ( !gameOver && !fighterChar ) {
        fighterId = this.id
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
          } )
          
        } )
      }    
    }
  } );

  // Pushes enemies to the enemy div
  moveEnemy = () => {
    $( '.enemy ').each( function( i ) {
      enemies.push( chars[i].name );
      enemyDiv.append( this );
      // Animations
      enemyDiv.show( 'slow' );
      selectText.fadeOut( 350, function() {
        selectText.text( 'Your Character' ).fadeIn( 350 );
      } )
    } )
  };

  // Attack & Defend
  attack.on( 'click', function() {
    if ( fighterChar && playerChar.hp > 0 ) {
        playerChar.hp -= fighterChar.counterAtk;        // Player loses hp equal to fighter's counter attack
        fighterChar.hp -= playerChar.atk;               // Fighter loses hp equal to player's attack
        // Update HP values on screen
        playerChar.charHpGet.text( playerChar.hp );     
        fighterChar.charHpGet.text( fighterChar.hp );
        // Check if player will fall to or below 0 hp on next attack
      if ( playerChar.hp <= fighterChar.counterAtk ) {
        playerChar.hp -= fighterChar.counterAtk;
        loseGame();
        // Check if fighter will fall to or below 0 hp on next attack
      } else if ( fighterChar.hp <= playerChar.atk ) {
        fighterChar.hp -= playerChar.atk;
        winFight();
      }
      playerChar.atk += playerChar.baseAtk;           // Increment player's attack by base attack
    }
  } );

  // Win & Lose
  winFight = () => {
    console.log( 'you won this fight' )
    fighterChar.charGet.hide();
    enemies.splice( enemies.indexOf( fighterChar.name ), 1 );
    if ( enemies.length === 0 ) {
      winGame();
    } else {
      fighterChar = null;
      isFighting = false;
      // Animations
      defenderDiv.hide();
      attackButton.hide();
      enemiesText.fadeOut( 350, function() {
        enemiesText.text( 'Select an Enemy to fight!' ).fadeIn( 350 );
      } )
    }
  };

  winGame = () => {
    gameOver = true;
    console.log( 'YOU WIN' )

    // Animations
    resetButton.show();
    attackButton.hide();
    enemiesText.fadeOut( 150, function() {
      enemiesText.text( 'You Win!!!' ).fadeIn( 150 );
    } )
  }

  loseGame = () => {
    gameOver = true;
    console.log( 'You lose' );

    resetButton.show();
    attackButton.hide();
    enemiesText.fadeOut( 150, function() {
      enemiesText.text( 'You lose, try again.' ).fadeIn( 150 );
    } )
  }

  // Reset
  resetButton.on( 'click', function() {
    initialize();
  } );


  // Console log on ` backquote `
  $( document ).keyup( function( event ) {
    if ( event.keyCode == 192 ) {
      consoleLog++;
      let enemyList = enemies.join( ', ' );
      console.log( '======== Begin Log ' + consoleLog + ' ========' )
      if (playerChar) { 
        console.log( 'Player: ' + playerChar.name + ' (' + playerId + ')');
        console.log( 'Player Attack: ' + playerChar.atk + " | HP: " + playerChar.hp )
      };
      if (fighterChar) { 
        console.log( 'Fighter: ' + fighterChar.name + ' (' + fighterId + ')' );
        console.log( 'Fighter Attack: ' + fighterChar.atk + " | HP: " + fighterChar.hp )
      };
      if ( playerChar ) { console.log( 'Enemies: ' + enemyList ) };
      console.log( '======== End Log ' + consoleLog + ' ========' )
    }
  } );

} );