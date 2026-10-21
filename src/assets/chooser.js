// "Which coast, which month?" chooser. The page is fully readable without
// this script (January is rendered, and the year table lists every month);
// this makes the month and mode pickers live.
(function () {
  var root = document.querySelector("[data-chooser]");
  var data = window.COAST_DATA;
  if (!root || !data) return;

  var RATING = ["Breezy, choppy", "Fine", "Calmest"];
  var ORDER = ["north", "east", "south", "west"];
  var panel = root.querySelector("[data-panel]");
  var field = function (name) { return panel.querySelector('[data-f="' + name + '"]'); };

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function render(key) {
    var m = data.months.filter(function (x) { return x.key === key; })[0];
    if (!m) return;
    field("season").textContent = m.season;
    field("wind").textContent = m.wind;
    field("name").textContent = m.name;
    field("bestName").textContent = data.coastNames[m.best];
    field("why").textContent = m.why;
    field("picks").textContent = data.calmPicks[m.best];
    field("kite").textContent = m.kite;
    field("air").textContent = m.air;
    field("sea").textContent = m.sea;
    field("rain").textContent = m.rain;
    field("cyclone").textContent = m.cyclone ? "Cyclone season" : "Outside cyclone season";
    field("ratings").innerHTML = ORDER.map(function (c) {
      return '<li class="rating-' + m.coasts[c] + '"><span class="coast-name">' + data.coastNames[c] +
        '</span> <span class="coast-rating">' + RATING[m.coasts[c]] + "</span></li>";
    }).join("");
    field("extras").innerHTML = m.extras.map(function (e) { return "<li>" + escapeHtml(e) + "</li>"; }).join("");

    root.querySelectorAll(".coast[data-coast]").forEach(function (path) {
      var c = path.getAttribute("data-coast");
      path.setAttribute("class", "coast coast-" + c + " rating-" + m.coasts[c]);
    });
  }

  root.addEventListener("change", function (e) {
    if (e.target.name === "month") render(e.target.value);
    if (e.target.name === "mode") root.setAttribute("data-mode", e.target.value);
  });

  function select(key) {
    var input = root.querySelector('input[name="month"][value="' + key + '"]');
    if (input) input.checked = true;
    render(key);
  }

  // Start on the visitor's current month, unless a month is in the URL hash
  // (e.g. /when-to-go/#jul).
  function fromHash() {
    var hash = location.hash.slice(1);
    return data.months.some(function (m) { return m.key === hash; }) ? hash : null;
  }
  window.addEventListener("hashchange", function () {
    var key = fromHash();
    if (key) select(key);
  });
  select(fromHash() || data.months[new Date().getMonth()].key);
})();
