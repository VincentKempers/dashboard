var request = new XMLHttpRequest();
var username = 'VincentKempers'

request.open('GET', 'https://api.github.com/users/' + username);
console.log(request);
request.onload = function () {
  var data = JSON.parse(request.responseText);
  console.log(data);
  result.innerHTML = `
      <div class="row">
        <div class="col-9">
          <h3 class="data-title">${ data.name}</h3>
          <p class="data-text">Bio : ${ data.bio}</p>
          <p class="data-text">Blog : ${ data.blog}</p>
          <div style="margin-top: 16px">
            <div class="data-badge">Repositories ${data.public_repos}</div>
            <div class="data-badge">Followers ${data.followers}</div>
            <div class="data-badge">Following ${data.following}</div>
          </div>
          <div>
            <button class="btn" onClick="window.open('${ data.html_url}');">View ${data.name}'s profile</button>
          </div>
        </div>
      </div>
    `;
}
request.send();