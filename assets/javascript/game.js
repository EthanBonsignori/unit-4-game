$( document ).ready( function() {

// Declare variables
let playerChar, fighterChar, isFighting, gameOver, playerId, fighterId, enemies, defeatText, chosenString, consoleLog;

    let chars = [
      char1 = {
        name: 'Pooh the Destroyer',
        charId: 'char1',
        hp: 180,
        baseHp: 180,
        atk: 4,
        baseAtk: 4,
        counterAtk: 25,
        isPlayer: false,
        isEnemy: false,
        charGet: $( '#char1' ),
        charHpGet: $( '#char1-hp' ),
        dmgList: $( '#char1-dmg '),
      },

      char2 = {
        name: 'Man Bear Piglet',
        charId: 'char2',
        hp: 150,
        baseHp: 150,
        atk: 6,
        baseAtk: 6,
        counterAtk: 20,
        isPlayer: false,
        isEnemy: false,
        charGet: $( '#char2' ),
        charHpGet: $( '#char2-hp' ),
        dmgList: $( '#char2-dmg '),
      },

      char3 = {
        name: 'Convict Tigger',
        charId: 'char3',
        hp: 120,
        baseHp: 120,
        atk: 8,
        baseAtk: 8,
        counterAtk: 17,
        isPlayer: false,
        isEnemy: false,
        charGet: $( '#char3' ),
        charHpGet: $( '#char3-hp' ),
        dmgList: $( '#char3-dmg '),
      },

      char4 = {
        name: 'Owl, Feathery Wizard',
        charId: 'char4',
        hp: 100,
        baseHp: 100,
        atk: 12,
        baseAtk: 12,
        counterAtk: 5,
        isPlayer: false,
        isEnemy: false,
        charGet: $( '#char4' ),
        charHpGet: $( '#char4-hp' ),
        dmgList: $( '#char4-dmg '),
      },
    ];


  // Get html elements
  let charsGet = $( '.characters' );            // Every character div on screen
  let enemyDiv = $( '.enemies' );               // Div that will hold enemies when they are found
  let defenderDiv = $( '.defender' );           // Div that will hold fighter when they are selected
  let attack = $( '#attack' );                  // Attack button id
  let attackButton = $( '.attack-button' );     // Div that holds attack button
  let resetButton = $( '#reset-button' );       // Reset button id
  let resetPosition = $( '.characters-start' ); // Div for character start position
  let defeated = $( '.defeated' );              // Div for defeated enemies to hide
  let dmgContainer = $( '.dmg-container' );     // Every character's damage container

  // Text only
  let enemiesText = $( '#enemies-text' );      
  let playerText = $( '#your-char' );
  let fighterText = $( '#fighter-char' );
  let damageText = $( '.dmg-text' );
  let fighterNameText = $( '#fighter-name' );
  let playerDamageTaken = $( '#player-damage-taken' );
  let fighterDamageTaken = $( '#fighter-damage-taken' );
  let defeatedText = $( '.defeated-text' );


  // Run at start/new game to set/reset necessary variables
  initialize = () => {
    playerChar = null;
    fighterChar = null;
    isFighting = false;
    gameOver = false;
    playerId = '';
    fighterId = '';
    enemies = [];
    initHp();       // Display starting hp to screen
  };

  // Get clicks on any character for character and enemy selection
  charsGet.on( "click", function() {
    // Only run if no player has been selected and the game isn't over
    if (!playerChar && !gameOver ) {
      playerId = this.id;
      // Loop for each char object in the chars array
      charsGet.each( function( i ) {
        // Find which character was clicked for player selection
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
      hideDefeatedText();
      isFighting = true;
      // Only run if there is no current fighter and the game isn't over
      if ( !fighterChar && !gameOver ) {
        fighterId = this.id;
        // Loop for each char object in the chars array
        charsGet.each( function( i ) {
          // Find fighter
          if ( chars[i].charId === fighterId ) {
            fighterChar = chars[i];       // Set fighter
            defenderDiv.append( this );   // Move to defender positionn
            // Animations
            defenderDiv.show( 'slow' );
            attackButton.show();
          }
          enemiesText.fadeOut( 350, function() {
            enemiesText.text( 'Fighting...' ).fadeIn( 350 );
          } )
          fighterText.text( 'Defender' ).fadeIn( 'slow' )
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
      playerText.fadeOut( 350, function() {
        playerText.text( 'Your Character' ).fadeIn( 350 );
        enemiesText.text( 'Select an Enemy to fight!' ).fadeIn( 350 );
      } )
    } )
  };

  // Attack & Defend
  attack.on( 'click', function() {
    // Only run if player and fighter aren't at or below 0 hp
    if ( fighterChar && playerChar.hp > 0 ) {
      fightStatus();
      // Check if the fight has been won or lost
      if ( isFighting ) {
        playerChar.hp -= fighterChar.counterAtk;      // Player loses hp equal to fighter's counter attack
        fighterChar.hp -= playerChar.atk;             // Fighter loses hp equal to player's attack
        updateDamageList();
        updateHpText();
      }
      playerChar.atk += playerChar.baseAtk;         // Increment player's attack by base attack on each attack
    }
  } );

  // Check health values to see which character wins or loses the fight
  fightStatus = () => {
    // Check if fighter will fall to or below 0 hp on next attack
    if ( fighterChar.hp <= playerChar.atk ) {
      fighterChar.hp -= playerChar.atk
      updateHpText();
      winFight();
      isFighting = false;
    // Check if player will fall to or below 0 hp on next attack
    } else if ( playerChar.hp <= fighterChar.counterAtk ) {
      playerChar.hp -= fighterChar.counterAtk;
      updateHpText();
      loseGame();
      isFighting = false;
    }
  }

  // Display and animate damage taken by player and fighter
  updateDamageList = () => {
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
    updateDamageText();
  };
  
  // Update HP values on screen
  updateHpText = () => {
    playerChar.charHpGet.text( playerChar.hp );        
    fighterChar.charHpGet.text( fighterChar.hp );
  };
  

  // Update text below characters
  updateDamageText = () => {
    if ( gameOver ) {
      damageText.hide( 500 );
    } else {
      playerDamageTaken.text( fighterChar.counterAtk );
      fighterNameText.text( fighterChar.name );
      fighterDamageTaken.text( playerChar.atk );
      damageText.show( 500 )
    }
  }

  defeatText = [ ' bit the dust!', ' lost all their stuffing!', ' was obliterated!', ' was put in timeout!', ' ran home crying!',
                 ' got erased!', ' fell down the rabbit hole!', ' needs new underwear!', ' went down for a nap!', ' was never seen again!' ]
  
  updateDefeatedText = () => {
    chosenString = defeatText[Math.floor( Math.random() * defeatText.length )]; // Chose random string from defeatText to display
    defeatedText.text( fighterChar.name + chosenString )                        // Display name + random string
    defeatedText.show( 500 )
    fighterText.text( 'Defender' ).fadeOut( 250 )
  }

  // Hide the 'x was defeated' text and then clear it
  hideDefeatedText = () => {
    defeatedText.fadeOut( 500, function() {
      defeatedText.text( '' )
    } )
  };

  // Win & Lose
  winFight = () => {
    updateDefeatedText();
    defeated.append( fighterChar.charGet )                      // Hide defeated enemy
    enemies.splice( enemies.indexOf( fighterChar.name ), 1 );   // Remove enemy from enemies array
    // Check if all enemies are defeated
    if ( enemies.length === 0 ) {
      winGame();
    } else {
      fighterChar = null;   // Allows user to select a new fighter
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
    console.log( 'You win' )

    // Animations
    fighterText.hide();
    resetButton.show();
    attackButton.hide();
    damageText.hide()
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
    resetChars();    // Reset character object variables
    resetGame();     // Reset Text on screen
    updateDamageText();
    hideDefeatedText();
    fighterText.text( 'Defender' ).fadeOut( 250 );
    initialize();    // Reset needed variables
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
    playerText.fadeOut( 150, function() {
      playerText.text( 'Chose your Character!' ).fadeIn( 150 );
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
        console.log( "Is there a fight going on: " + isFighting );
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