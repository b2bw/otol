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

window.addEventListener("resize", scatterLeaves);
scatterLeaves()

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
document.getElementsByClassName('site-header')[0].style.display = 'block'
