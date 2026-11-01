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

  function ensureFrame() {
    if (document.getElementById("kit-frame")) return;
    var frame = document.createElement("iframe");
    frame.name = "kit-frame";
    frame.id = "kit-frame";
    frame.style.display = "none";
    frame.setAttribute("aria-hidden", "true");
    document.body.appendChild(frame);
  }

  function handleSubmit(event) {
    var form = event.target;
    var gate = form.closest(".gate");
    var input = form.querySelector('input[type="email"]');
    var email = (input.value || "").trim();
    if (!email || email.indexOf("@") < 1) {
      event.preventDefault();
      input.focus();
      return;
    }
    localStorage.setItem(KEY, email);
    setTimeout(unlockAll, 400);
  }

  document.addEventListener("DOMContentLoaded", function () {
    ensureFrame();
    document.querySelectorAll(".gate form").forEach(function (form) {
      var gate = form.closest(".gate");
      var endpoint = gate ? gate.getAttribute("data-endpoint") : null;
      if (endpoint) {
        form.setAttribute("action", endpoint);
        form.setAttribute("method", "post");
        form.setAttribute("target", "kit-frame");
      }
      form.addEventListener("submit", handleSubmit);
    });
    if (localStorage.getItem(KEY)) {
      unlockAll();
    }
  });
})();
