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

	var imgs = [
	'../images/bull.svg',
	'../images/chick.svg',
	'../images/crab.svg',
	'../images/fox.svg',
	'../images/hedgehog.svg',
	'../images/hippopotamus.svg',
	'../images/koala.svg',
	'../images/lemur.svg'];
	
  $game.empty();
  $game.data('flippedCards', []);

  for (var valueIndex = 0; valueIndex < cardValues.length; valueIndex++) {
    var value = cardValues[valueIndex];
    color = 'rgb(255, 255, 255)'
	var img = imgs[value - 1];
    var data = {
      value: value,
      color: color,
	  img: img,
	  id: 'card'+valueIndex, 
      isFlipped: false
    };

	var $cardElement = $('<div class="col-xs-3 card"><img'+ ' id=card' + valueIndex +' src="" height=100rem></div>');
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
      .data('isFlipped', true)
	
  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);

  document.getElementById($card.data('id')).setAttribute('src', $card.data('img'));
  
  if (flippedCards.length === 2) {
	itiGame++;
	document.getElementById('countplay').innerHTML = itiGame;
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      var matchCss = {
        backgroundColor: 'rgb(230, 230, 230)',
      };
      flippedCards[0].css(matchCss);
      flippedCards[1].css(matchCss);
    } else {
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];
      window.setTimeout(function() {
        card1.css('background-color', 'rgb(119, 119, 76)')
            .data('isFlipped', false);
        card2.css('background-color', 'rgb(119, 119, 76)')
            .data('isFlipped', false);
		document.getElementById(flippedCards[0].data('id')).setAttribute('src', '');
		document.getElementById(flippedCards[1].data('id')).setAttribute('src', '');	
      }, 1000);  
    }
    $game.data('flippedCards', []);
  }
};