import flatpickr from "flatpickr";

$( document ).ready(function() {
  var date = document.getElementById('daterange')
  date.flatpickr({mode: "range"});
});
