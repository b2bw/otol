function scatterLeaves() {
  var leaves = document.getElementsByClassName("leaf");
  var body = document.body,
      html = document.documentElement,
      width = window.innerWidth||e.clientWidth||g.clientWidth;

  var height = Math.max( body.scrollHeight, body.offsetHeight,
			 html.clientHeight, html.scrollHeight, html.offsetHeight );

  for(var i = 0; i < leaves.length; i++) {
    var horOffset = width * (leaves[i].getAttribute('data-hor')/100)
    var vertOffset = height * (leaves[i].getAttribute('data-vert')/100)
    var randoRot = Math.random()
    var myHeight = leaves[i].offsetHeight
    leaves[i].style.left = horOffset + 'px';
    leaves[i].style.top = vertOffset - myHeight + 'px';
  }
}

// window.addEventListener("resize", scatterLeaves);
// scatterLeaves()

// Accepts any class name
// var rellax = new Rellax('.rellax');


//   social
var twitter = function (e) {
  e.preventDefault()
  social_url = "https://twitter.com/intent/tweet?source=webclient&text=" +
    encodeURI(window.location + " Spende oder verschenke Setzlinge und erlebe, wie Dein Engagement in Borneo Wurzeln schlägt! #OneTreeOneLife").replace(/#/g, "%23");
  window.open(social_url, "_blank").focus();
}

var facebook = function (e) {
    e.preventDefault()
    social_url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURI(window.location);
    window.open(social_url, "_blank").focus();
}

var setShareHandler = function(className, handler) {
  var nodes = document.getElementsByClassName(className);
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].onclick = handler;
  }
}

setShareHandler('twitter-share', twitter);
setShareHandler('facebook-share', facebook);

function showGame() {
  document.getElementsByClassName('page-content')[0].style.display = 'none'
  document.getElementsByClassName('site-header')[0].style.display = 'none'
  document.getElementsByClassName('game')[0].style.display = 'block'
  document.body.classList = 'body-game'
}

function showCampaign() {
  document.getElementsByClassName('page-content')[0].style.display = 'block'
  document.getElementsByClassName('site-header')[0].style.display = 'block'
  document.getElementsByClassName('game')[0].style.display = 'none'
  document.body.classList = 'body-campaign'
}

// initially show campaign
showCampaign()

// routing
const route = Rlite(notFound, {
  '': function() { // # -> #game
    routeTo('game');
  },
  'game': showGame, // #game
  'campaign': showCampaign // #campaign
});

function notFound() {
  // noop, makes anchors work
}

// Hash-based routing
function processHash() {
  const hash = location.hash || '#';
  route(hash.slice(1));
  // scatterLeaves()
}

function routeTo(target) {
  window.location.hash = '#' + target;
}

window.addEventListener('hashchange', processHash);
processHash();


// game callbacks
function gameOn() {
  document.getElementsByClassName('spinner')[0].style.display = 'none'

  donateScore = document.getElementsByClassName('donate-score')[0]
  shareScore = document.getElementsByClassName('share-score')[0]

  donateScore.style.display = 'none';
  shareScore.style.display = 'none';
}

function gameOver(score) {
  document.getElementsByClassName('game-cta')[0].style.display = 'flex'

  document.getElementById('score-amount').value = ""+score+".00"

  donateScore = document.getElementsByClassName('donate-score')[0]
  shareScore = document.getElementsByClassName('share-score')[0]

  donateScore.style.display = 'flex';
  shareScore.style.display = 'flex';

  switch(score) {
  case 0:
    tweet = "Jetzt Ölpalmen vernichten und Urwald aufforsten."
    donateScore.innerHTML = `<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#gift"></use></svg> Spende Setzlinge`
    break;
  case 1:
    tweet = "Ich habe gerade eine Ölpalme vernichtet, schaffst du mehr?"
    donateScore.innerHTML = `<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#gift"></use></svg> Spende einen Setzling`
    break;
  default:
    tweet = "Ich habe gerade "+score+" Ölpalmen vernichtet, schaffst du mehr?"
    donateScore.innerHTML = `<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#gift"></use></svg> Spende ` + score + ` Setzlinge`
  }

  shareScore.onclick = function(e) {
    e.preventDefault();
    social_url = "https://twitter.com/intent/tweet?source=webclient&text=" +
      encodeURI(window.location + " " + tweet + " #OneTreeOneLife").replace(/#/g, "%23");
    window.open(social_url, "_blank").focus();
  };

  donateScore.onclick = function(e) {
    //    add spinner so there's some feedback you pressed the button
    e.target.classList.add('spinner')
   // TODO
    //    alert("Spende "+score+" Setzlinge.");
  }
}
