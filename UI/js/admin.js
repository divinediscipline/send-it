const  mouseOver = () => {
  document.getElementById("options-box").style.display="block";
}
document.getElementById('table-icon').addEventListener("mouseover", mouseOver);

window.onclick = () => {
  document.getElementById("options-box").style.display="none";
}