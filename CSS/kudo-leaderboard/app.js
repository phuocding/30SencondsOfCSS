const rankingsBody = document.querySelector("#rankings > tbody");

function loadRankings() {
  const request = new XMLHttpRequest();

  request.open("get", "https://codepen.io/imisterk/pen/MLgwOa.js");
  request.onload = () => {
    try {
      const json = JSON.parse(request.responseText);
      populateRankings(json);
    } catch (e) {
      console.warn("Could not load Player Rankings! :(");
    }
  };

  request.send();
}

function populateRankings(json) {
  // Populate Leaderboard
  json.forEach((row) => {
    const tr = document.createElement("tr");

    row.forEach((cell) => {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    });

    rankingsBody.appendChild(tr);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadRankings();
});

$("#search-leaderboard").keyup(function () {
  var value = this.value;

  $("table")
    .find("tr")
    .each(function (index) {
      if (index === 0) return;

      var if_td_has = false;
      $(this)
        .find("td")
        .each(function () {
          if_td_has = if_td_has || $(this).text().indexOf(value) !== -1; //Check if td's text matches key and then use OR to check it for all td's
        });

      $(this).toggle(if_td_has);
    });
});
