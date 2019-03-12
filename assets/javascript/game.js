$( document ).ready( function() {

// Declare variables
let playerChar, fighterChar, playerId, fighterId, hasId, gameOver, enemies, consoleLog;

  initialize = () => {
    playerChar = null;
    fighterChar = null;
    playerId = '';
    fighterId = '';
    hasId = false;
    gameOver = false;
    enemies = [];
    initHp();
  };
    
    consoleLog = 0;

    let chars = [
      char1 = {
        name: 'Pooh',
        charId: 'char1',
        hp: 100,
        baseHp: 100,
        atk: 7,
        baseAtk: 10,
        counterAtk: 5,
        isPlayer: false,
        isEnemy: false,
        charGet: $( '#char1' ),
        charHpGet: $( '#char1-hp' ),
        dmgList: $( '#char1-dmg '),
      },

      char2 = {
        name: 'Piglet',
        charId: 'char2',
        hp: 100,
        baseHp: 100,
        atk: 100,
        baseAtk: 10,
        counterAtk: 5,
        isPlayer: false,
        isEnemy: false,
        charGet: $( '#char2' ),
        charHpGet: $( '#char2-hp' ),
        dmgList: $( '#char2-dmg '),
      },

      char3 = {
        name: 'Tigger',
        charId: 'char3',
        hp: 100,
        baseHp: 100,
        atk: 10,
        baseAtk: 10,
        counterAtk: 5,
        isPlayer: false,
        isEnemy: false,
        charGet: $( '#char3' ),
        charHpGet: $( '#char3-hp' ),
        dmgList: $( '#char3-dmg '),
      },

      char4 = {
        name: 'Owl',
        charId: 'char4',
        hp: 100,
        baseHp: 100,
        atk: 10,
        baseAtk: 10,
        counterAtk: 5,
        isPlayer: false,
        isEnemy: false,
        charGet: $( '#char4' ),
        charHpGet: $( '#char4-hp' ),
        dmgList: $( '#char4-dmg '),
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

  // Select a player character
  charsGet.on( "click", function() {
    if ( !hasId && !playerChar && !gameOver ) { 
      playerId = this.id;
      charsGet.each( function( i ) { 
        if ( chars[i].charId === playerId ) {
          playerChar = chars[i];
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
        fighterId = this.id;
        charsGet.each( function( i ) {
          if ( chars[i].charId === fighterId ) {
            fighterChar = chars[i];
            fighterName = chars[i].name;
            defenderDiv.append( this );
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
        enemiesText.text( 'Select an Enemy to fight!' ).fadeIn( 350 );
      } )
    } )
  };

  // Attack & Defend
  attack.on( 'click', function() {
    if ( fighterChar && playerChar.hp > 0 ) {
        playerChar.hp -= fighterChar.counterAtk;        // Player loses hp equal to fighter's counter attack
        fighterChar.hp -= playerChar.atk;               // Fighter loses hp equal to player's attack
        damageText();
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

  // Display and animate damage taken and given
  damageText = () => {
    if ( ( playerChar.dmgList ).children().length >= 3 ) {
      playerChar.dmgList.children().last().fadeOut( 2000 )
    }
    if ( ( fighterChar.dmgList ).children().length >= 3 ) {
      fighterChar.dmgList.children().last().fadeOut( 2000 )
    }
    fighterChar.dmgList.prepend( '<p class="dmg-text"> -' + playerChar.atk + '</p>' );
    playerChar.dmgList.prepend( '<p class="dmg-text"> -' + fighterChar.counterAtk + '</p>' );
    //fighterChar.dmgTakenPlayer.fadeOut( 5000 );
    //playerChar.dmgTakenEnemy.fadeOut( 5000 );
  }

  // Win & Lose
  winFight = () => {
    console.log( 'you won this fight' );
    defeated.append( fighterChar.charGet )
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
  };

  loseGame = () => {
    gameOver = true;
    console.log( 'You lose' );

    resetButton.show();
    attackButton.hide();
    enemiesText.fadeOut( 150, function() {
      enemiesText.text( 'You lose, try again.' ).fadeIn( 150 );
    } )
  };

  // Reset
  resetButton.on( 'click', function() {
    initialize();
    resetChars();
    resetGameState();
    gameOver = false;
  } );

  resetChars = () => {
    $.each(chars, function ( i, prop ) {
      prop.isPlayer = false;
      prop.isEnemy = false;
      prop.hp = prop.baseHp;
      prop.atk = prop.baseAtk;
      resetPosition.prepend( prop.charGet );
      prop.charHpGet.text( prop.baseHp );
    } )
    charsGet.removeClass( 'player enemy' );
  };

  resetGameState = () => {
    resetButton.hide();
    attackButton.hide();
    selectText.fadeOut( 150, function() {
      selectText.text( 'Chose your Character!' ).fadeIn( 150 );
    } );
    enemiesText.fadeOut( 150, function() {
      enemiesText.text( 'Select an Enemy to fight!' );
    } );
  };

  initHp = () => {
    $.each(chars, function ( i, prop ) {
      prop.charHpGet.text( prop.baseHp );
    } )
  };


  initCl = () => {
    console.log( 
      'playerChar: '    + playerChar +
      'fighterChar: '   + fighterChar +
      'playerId: '      + playerId +
      'fighterId: '     + fighterId +
      'hasId: '         + hasId +
      'gameOver: '      + gameOver +
      'enemies: '       + enemies 
    )
  
  }

  // Console log on ` backquote `
  $( document ).keyup( function( event ) {
    if ( event.keyCode == 192 ) {
      consoleLog++;
      let enemyList = enemies.join( ', ' );
      console.log( '======== Begin Log ' + consoleLog + ' ========' );
      if (playerChar) { 
        console.log( 'Player: ' + playerChar.name + ' (' + playerId + ')');
        console.log( 'Player Attack: ' + playerChar.atk + " | HP: " + playerChar.hp );
      };
      if (fighterChar) { 
        console.log( 'Fighter: ' + fighterChar.name + ' (' + fighterId + ')' );
        console.log( 'Fighter Attack: ' + fighterChar.atk + " | HP: " + fighterChar.hp );
      };
      if ( playerChar ) { console.log( 'Enemies: ' + enemyList ) };
      console.log( '======== End Log ' + consoleLog + ' ========' );
    }
  } );


  initCl = () => {
    console.log( 
      'playerChar: '       + playerChar +
      ' | fighterChar: '   + fighterChar +
      ' | playerId: '      + playerId +
      ' | fighterId: '     + fighterId +
      ' | hasId: '         + hasId +
      ' | gameOver: '      + gameOver +
      ' | Enemies: '       + enemies 
    )
  
  }

  initialize();

} ); // End Document ready