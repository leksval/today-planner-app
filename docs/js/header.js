var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (currentScrollPos > 100){
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbarA").style.top = "0";
  } else {
    document.getElementById("navbarA").style.top = "-100%";
  }
  prevScrollpos = currentScrollPos;
}
  else{
    prevScrollpos = currentScrollPos;
}}