import flatpickr from "flatpickr/dist/flatpickr.js";

$( document ).ready(function() {
  var date = document.getElementById('daterange')
  date.flatpickr({mode: "range"});
});
