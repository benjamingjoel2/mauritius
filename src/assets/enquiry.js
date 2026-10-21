// Enquiry form: validation, then either POST to the configured endpoint
// (site.config.js > enquiry.endpoint) or open a pre-filled email.
(function () {
  var form = document.querySelector("[data-enquiry]");
  if (!form) return;
  form.noValidate = true; // we show our own error summary instead
  var errorBox = form.querySelector("[data-errors]");
  var endpoint = form.getAttribute("data-endpoint");
  var email = form.getAttribute("data-email");

  var LABELS = {
    name: "Enter your name",
    email: "Enter an email address we can reply to, like name@example.com",
    month: "Choose roughly when you'd like to travel",
    adults: "Enter how many adults are travelling (at least 1)",
    consent: "Tick the box so we can use your details to reply",
  };

  function validate() {
    var problems = [];
    form.querySelectorAll("[aria-invalid]").forEach(function (el) {
      el.removeAttribute("aria-invalid");
    });
    Object.keys(LABELS).forEach(function (name) {
      var el = form.elements[name];
      if (el && !el.checkValidity()) {
        el.setAttribute("aria-invalid", "true");
        problems.push({ id: el.id, text: LABELS[name] });
      }
    });
    return problems;
  }

  function showErrors(problems) {
    if (!problems.length) {
      errorBox.hidden = true;
      errorBox.innerHTML = "";
      return;
    }
    errorBox.innerHTML =
      "<h2>Please check " + (problems.length === 1 ? "one thing" : problems.length + " things") + "</h2><ul>" +
      problems.map(function (p) { return '<li><a href="#' + p.id + '">' + p.text + "</a></li>"; }).join("") +
      "</ul>";
    errorBox.hidden = false;
    errorBox.setAttribute("tabindex", "-1");
    errorBox.focus();
  }

  function collect() {
    var data = new FormData(form);
    var out = {};
    data.forEach(function (value, key) {
      if (key === "website" || key === "consent") return;
      out[key] = out[key] ? out[key] + ", " + value : value;
    });
    return out;
  }

  function mailto(fields) {
    var lines = Object.keys(fields).map(function (k) { return k + ": " + fields[k]; });
    var subject = "Trip enquiry from " + (fields.name || "the website");
    return "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var problems = validate();
    showErrors(problems);
    if (problems.length) return;
    if (form.elements.website.value) return; // bot

    var fields = collect();
    var button = form.querySelector('button[type="submit"]');

    if (!endpoint) {
      window.location.href = mailto(fields);
      return;
    }
    button.disabled = true;
    button.textContent = "Sending…";
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(fields),
    })
      .then(function (res) {
        if (!res.ok) throw new Error(res.status);
        window.location.href = "/enquire/thanks/";
      })
      .catch(function () {
        button.disabled = false;
        button.textContent = "Send enquiry";
        errorBox.innerHTML =
          '<h2>Sorry, that didn\'t send</h2><p>Please try again, or <a href="' + mailto(fields) +
          '">send it by email instead</a>.</p>';
        errorBox.hidden = false;
        errorBox.setAttribute("tabindex", "-1");
        errorBox.focus();
      });
  });
})();
