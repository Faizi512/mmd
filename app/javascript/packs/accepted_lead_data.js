import flatpickr from "flatpickr";
require("flatpickr/dist/flatpickr.css")

$( document ).ready(function() {
  var date = document.getElementById('daterange')
  date.flatpickr({mode: "range"});
});
