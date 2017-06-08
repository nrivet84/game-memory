var MatchGame = {};
var itiGame = 0;

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var sequentialValues = [];

  for (var value = 1; value <= 8; value++) {
    sequentialValues.push(value);
    sequentialValues.push(value);
  }

  var cardValues = [];

  while (sequentialValues.length > 0) {
    var randomIndex = Math.floor(Math.random() * sequentialValues.length);
    var randomValue = sequentialValues.splice(randomIndex, 1)[0];
    cardValues.push(randomValue);
  }

  return cardValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  /*var colors = [
    'hsl(10, 100%, 100%)',
    'hsl(210, 100%, 50%)',
    'hsl(135, 100%, 50%)',
    'hsl(56, 90%, 99%)',
    'hsl(28, 100%, 17%)',
    'hsl(0, 0%, 0%)',
    'hsl(339, 97%, 11%)',
    'hsl(6, 94%, 51%)'];*/

	var colors = [
    'rgb(0, 128, 255)',
    'rgb(96, 96, 96)',
    'rgb(253, 238, 0)',
    'rgb(0, 0, 0)',
    'rgb(255, 127, 0)',
    'rgb(253, 108, 158)',
    'rgb(0, 128, 32)',
    'rgb(127, 0, 255)'];
	
	var des = [
	'bleu',
	'gris',
	'jaune',
	'noir',
	'orange',
	'rose',
	'vert',
	'violet'];
	
  $game.empty();
  $game.data('flippedCards', []);

  for (var valueIndex = 0; valueIndex < cardValues.length; valueIndex++) {
    var value = cardValues[valueIndex];
    var color = colors[value - 1];
	var de = des[value - 1];
    var data = {
      value: value,
      color: color,
	  de: de,
      isFlipped: false
    };

    var $cardElement = $('<div class="col-xs-3 card"></div>');
    $cardElement.data(data);

    $game.append($cardElement);
  }

  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('isFlipped')) {
    return;
  }

  $card.css('background-color', $card.data('color'))
      .text($card.data('de'))
      .data('isFlipped', true);
  /*$card.css('color', $card.data('color'))*/
 
  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);

   if (flippedCards.length === 1) {
	$card.css('font-size', '3rem');
	$card.css('background-color', 'rgb(255,255,255)');
	$card.css('color', 'rgb(0,0,0)')
  } else {
	$card.css('font-size', '3rem');
	$card.css('color', $card.data('color'))
  }
  
  if (flippedCards.length === 2) {
	itiGame++;
	document.getElementById('countplay').innerHTML = itiGame;
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      var matchCss = {
        backgroundColor: $card.data('color'),
        color: 'rgb(204, 204, 204)'
      };
      flippedCards[0].css(matchCss);
      flippedCards[1].css(matchCss);
    } else {
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];
      window.setTimeout(function() {
        card1.css('background-color', 'rgb(119, 119, 76)')
            .text('')
            .data('isFlipped', false);
        card2.css('background-color', 'rgb(119, 119, 76)')
            .text('')
            .data('isFlipped', false);
      }, 2000);
    }
    $game.data('flippedCards', []);
  }
};