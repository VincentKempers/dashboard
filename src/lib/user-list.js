var request = new XMLHttpRequest();
var username = 'VincentKempers';

request.open('GET', 'https://api.github.com/users/VincentKempers');

request.onload = function () {

  var data = JSON.parse(request.responseText);

  result.innerHTML = `
      <div class="row">
        <div class="col-9">
          <h3 class="data-title">${data.name}</h3>
          <p class="data-text">Bio : ${data.bio}</p>
          <div style="margin-top: 16px">
            <div class="data-badge">Repositories ${data.public_repos}</div>
            <div class="data-badge">Followers ${data.followers}</div>
            <div class="data-badge">Following ${data.following}</div>
          </div>
          <div>
            <button class="btn" onClick="window.open('${ data.html_url}');">Go to github</button>
          </div>
        </div>
      </div>
    `;
}

request.send();