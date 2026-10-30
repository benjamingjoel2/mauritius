// Home page: show the best coast for the visitor's current month.
(function () {
  var el = document.querySelector("[data-this-month]");
  var data = window.COAST_DATA;
  if (!el || !data) return;
  var m = data.months[new Date().getMonth()];
  el.textContent = "This month (" + m.name + "): " + data.coastNames[m.best] + " coast for calm water. Kitesurfing: " + m.kite.split(". ")[0].replace(/\.$/, "") + ".";
  el.hidden = false;
})();
