$( document ).ready( function() {

// Declare variables
let playerChar, fighterChar, gameOver, fightOver, playerId, fighterId, enemies, consoleLog;

    let chars = [
      char1 = {
        name: 'Pooh',
        charId: 'char1',
        hp: 100,
        baseHp: 100,
        atk: 1,
        baseAtk: 1,
        counterAtk: 20,
        isPlayer: false,
        isEnemy: false,
        charGet: $( '#char1' ),
        charHpGet: $( '#char1-hp' ),
        dmgList: $( '#char1-dmg '),
        dmgListSelector: $( '#char1-dmg > p'),
      },

      char2 = {
        name: 'Piglet',
        charId: 'char2',
        hp: 100,
        baseHp: 100,
        atk: 2,
        baseAtk: 2,
        counterAtk: 1,
        isPlayer: false,
        isEnemy: false,
        charGet: $( '#char2' ),
        charHpGet: $( '#char2-hp' ),
        dmgList: $( '#char2-dmg '),
        dmgListSelector: $( '#char2-dmg > p'),
      },

      char3 = {
        name: 'Tigger',
        charId: 'char3',
        hp: 100,
        baseHp: 100,
        atk: 1,
        baseAtk: 1,
        counterAtk: 1,
        isPlayer: false,
        isEnemy: false,
        charGet: $( '#char3' ),
        charHpGet: $( '#char3-hp' ),
        dmgList: $( '#char3-dmg '),
        dmgListSelector: $( '#char3-dmg > p'),
      },

      char4 = {
        name: 'Owl',
        charId: 'char4',
        hp: 100,
        baseHp: 100,
        atk: 1,
        baseAtk: 1,
        counterAtk: 1,
        isPlayer: false,
        isEnemy: false,
        charGet: $( '#char4' ),
        charHpGet: $( '#char4-hp' ),
        dmgList: $( '#char4-dmg '),
        dmgListSelector: $( '#char4-dmg > p'),
      },
    ];


  // Get html elements
  let charsGet = $( '.characters' );
  let enemyDiv = $( '.enemies' );
  let selectText = $( '#your-char' );
  let enemiesText = $( '#enemies-text' );
  let defenderDiv = $( '.defender' );
  let attack = $( '#attack' );
  let attackButton = $( '.attack-button' );
  let resetButton = $( '#reset-button' );
  let resetPosition = $( '.characters-start' );
  let defeated = $( '.defeated' );
  let dmgContainer = $( '.dmg-container' );

  // Run at start/new game to set/reset necessary variables
  initialize = () => {
    playerChar = null;
    fighterChar = null;
    gameOver = false;
    fightOver = false;
    playerId = '';
    fighterId = '';
    enemies = [];
    initHp();       // Display starting hp to screen
  };

  // Get clicks on any character
  charsGet.on( "click", function() {
    // Only run if no player has been selected and the game isn't over
    if (!playerChar && !gameOver ) {
      playerId = this.id;
      // Loop for each char object in the chars array
      charsGet.each( function( i ) {
        // Find which character was character was clicked
        if ( chars[i].charId === playerId ) {
          playerChar = chars[i];    // Set character to player state
          chars[i].isPlayer = true;
          chars[i].charGet.addClass( 'player' )
        } else {
          chars[i].isEnemy = true;  // Set any character that is not player to enemy state
          chars[i].charGet.addClass( 'enemy' )
        }
      } )
      moveEnemy();
    };

    // Run if clicked on enemy only
    if ( $( this ).hasClass( 'enemy' ) ) {
      // Only run if there is no current fighter and the game isn't over
      if ( !fighterChar && !gameOver ) {
        fighterId = this.id;
        fightOver = false;
        // Loop for each char object in the chars array
        charsGet.each( function( i ) {
          // Find fighter
          if ( chars[i].charId === fighterId ) {
            fighterChar = chars[i];       // Set fighter
            fighterName = chars[i].name;  // (for console log)
            defenderDiv.append( this );   // Move to defender positionn
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

  // Moves enemies to the enemy position on screen
  moveEnemy = () => {
    // Loop for each enemy
    $( '.enemy' ).each( function( i ) {
      enemies.push( chars[i].name );  // Add enemy name to enemies array
      enemyDiv.append( this );        // Move to enemies position
      // Animations
      enemyDiv.show( 'slow' );
      selectText.fadeOut( 350, function() {
        selectText.text( 'Your Character' ).fadeIn( 350 );
        enemiesText.text( 'Select an Enemy to fight!' ).fadeIn( 350 );
      } )
    } )
  };

  // Attack & Defend
  attack.on( 'click', function() {
    // Only run if player and fighter aren't at or below 0 hp
    if ( fighterChar && playerChar.hp > 0 ) {
      playerChar.hp -= fighterChar.counterAtk;      // Player loses hp equal to fighter's counter attack
      fighterChar.hp -= playerChar.atk;             // Fighter loses hp equal to player's attack
      damageText();
      playerChar.charHpGet.text( playerChar.hp );   // Update HP values on screen     
      fighterChar.charHpGet.text( fighterChar.hp );
      fightStatus();
      playerChar.atk += playerChar.baseAtk;           // Increment player's attack by base attack on each attack
    }
  } );

  fightStatus = () => {
    // Check if fighter will fall to or below 0 hp on next attack
    if ( fighterChar.hp * 2 <= playerChar.atk ) {
      fighterChar.hp <= playerChar.atk
      winFight();
    // Check if player will fall to or below 0 hp on next attack
    } else if ( playerChar.hp * 2 <= fighterChar.counterAtk ) {
      playerChar.hp <= fighterChar.counterAtk;
      loseGame();      
    }
  }

  // Display and animate damage taken by player and fighter
  damageText = () => {
    fighterChar.dmgList.prepend( '<p> -' + playerChar.atk + '</p>' );
    playerChar.dmgList.prepend( '<p> -' + fighterChar.counterAtk + '</p>' );
    let playerDmgList = playerChar.dmgList.find( 'p' )
    let fighterDmgList = fighterChar.dmgList.find( 'p' )
    if ( playerChar.dmgList.children().length > 3 ) {
      playerDmgList.slice( 3 ).fadeOut( 500, function() {
        playerDmgList.slice( 3 ).remove();
      } )
    }
    if (fighterChar.dmgList.children().length > 3) {
      fighterDmgList.slice( 3 ).fadeOut( 500, function() {
        fighterDmgList.slice( 3 ).remove();
      } )
    }

  }

  // Win & Lose
  winFight = () => {
    defeated.append( fighterChar.charGet )                      // Hide defeated enemy
    enemies.splice( enemies.indexOf( fighterChar.name ), 1 );   // Remove enemy from enemies array
    // Check if all enemies are defeated
    if ( enemies.length === 0 ) {
      winGame();
    } else {
      fighterChar = null;   // Allows user to select a new fighter
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
  };

  loseGame = () => {
    gameOver = true;
    console.log( 'You lose' );

    // Animations
    resetButton.show();
    attackButton.hide();
    enemiesText.fadeOut( 150, function() {
      enemiesText.text( 'You lose, try again.' ).fadeIn( 150 );
    } )
  };

  // Reset
  resetButton.on( 'click', function() {
    initialize();    // Reset needed variables
    resetChars();    // Reset character object variables
    resetGame();     // Reset Text on screen
    gameOver = false;
  } );

  resetChars = () => {
    // Loop for each character object in the chars array
    $.each( chars, function ( i, prop ) {
      // Reset needed variables
      prop.isPlayer = false;
      prop.isEnemy = false;
      prop.hp = prop.baseHp;
      prop.atk = prop.baseAtk;
      resetPosition.prepend( prop.charGet );
      prop.charHpGet.text( prop.baseHp );
      prop.dmgList.remove( 'p' );
    } )
    charsGet.removeClass( 'player enemy' );
  };

  resetGame = () => {
    resetButton.hide();
    attackButton.hide();
    // Loop for each damage container
    $.each( dmgContainer, function() {
      dmgContainer.empty();     // Remove all children containing damage text
    } );
    // Reset texts
    selectText.fadeOut( 150, function() {
      selectText.text( 'Chose your Character!' ).fadeIn( 150 );
    } );
    enemiesText.fadeOut( 150, function() {
      enemiesText.text( 'Select an Enemy to fight!' );
    } );
  };

  // Display starting hp to screen
  initHp = () => {
    $.each( chars, function ( i, prop ) {
      prop.charHpGet.text( prop.baseHp );
    } )
  };

  consoleLog = 0;
  // Console log on ` backquote `
  $( document ).keyup( function( event ) {
    if ( event.keyCode == 192 ) {
      consoleLog++;
      let enemyList = enemies.join( ', ' );
      console.log( '======== Begin Log ' + consoleLog + ' ========' );
      if ( playerChar ) { 
        console.log( 'Player: ' + playerChar.name + ' (' + playerId + ')');
        console.log( 'Player Attack: ' + playerChar.atk + " | HP: " + playerChar.hp );
      };
      if ( fighterChar ) { 
        console.log( 'Fighter: ' + fighterChar.name + ' (' + fighterId + ')' );
        console.log( 'Fighter Counter Attack: ' + fighterChar.counterAtk + " | HP: " + fighterChar.hp );
      };
      if ( playerChar ) { console.log( 'Enemies: ' + enemyList ) };
      console.log( '======== End Log ' + consoleLog + ' ========' );
    }
  } );

  // Set initial variables
  initialize();

} ); // End Document ready