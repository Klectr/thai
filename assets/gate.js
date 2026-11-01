(function () {
  var KEY = "thai.klectr.email";

  function unlockAll() {
    var email = localStorage.getItem(KEY);
    document.querySelectorAll(".gate").forEach(function (gate) {
      var url = gate.getAttribute("data-worksheet");
      var label = gate.getAttribute("data-label") || "Download the worksheet (PDF)";
      gate.innerHTML = "";
      var note = document.createElement("p");
      note.className = "unlocked-note";
      note.textContent = email
        ? "You are on the list as " + email + ". This device stays unlocked."
        : "You are on the list. This device stays unlocked.";
      var link = document.createElement("a");
      link.className = "btn";
      link.href = url;
      link.textContent = label;
      link.setAttribute("download", "");
      gate.appendChild(note);
      gate.appendChild(link);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    var form = event.target;
    var gate = form.closest(".gate");
    var input = form.querySelector('input[type="email"]');
    var email = (input.value || "").trim();
    if (!email || email.indexOf("@") < 1) {
      input.focus();
      return;
    }
    var endpoint = gate.getAttribute("data-endpoint");
    if (endpoint) {
      var body = new FormData();
      body.append("email_address", email);
      fetch(endpoint, { method: "POST", body: body, mode: "no-cors" }).catch(function () {});
    }
    localStorage.setItem(KEY, email);
    unlockAll();
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".gate form").forEach(function (form) {
      form.addEventListener("submit", handleSubmit);
    });
    if (localStorage.getItem(KEY)) {
      unlockAll();
    }
  });
})();
