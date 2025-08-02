
function dropdownEventListeners() {
    window.addEventListener('click', function(e) {
        document.querySelectorAll('.dropdown').forEach(function(dropdown) {
          if (!dropdown.contains(e.target)) {
            // Click was outside the dropdown, close it
            dropdown.open = false;
          }
        });
    });
}

function startTime() {
  if (document.getElementById('time') == null) {
    return;
  }
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  let ampm = h >= 12 ? 'PM' : 'AM';
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('time').innerHTML =  (h > 12 ? h - 12 : h) + ":" + m + ":" + s + " " + ampm;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

dropdownEventListeners();
