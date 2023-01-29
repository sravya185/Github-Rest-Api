let button1 = document.getElementById("but1");
let field = document.getElementById("field1");
function dateformat(cd) {
  return cd.slice(8, 10) + "-" + cd.slice(5, 7) + "-" + cd.slice(0, 4);
}
function diffdays2(a1) {
  let a = new Date(a1)
  let c = new Date();
  var diff = Math.abs((c.getTime() - a.getTime()))
  return Math.ceil(diff / (1000 * 3600 * 24))
}
function diffdays(a, b) {
  var a1 = new Date(a);
  var b1 = new Date(b);
  var diff = Math.abs((b1.getTime() - a1.getTime()))
  return Math.ceil(diff / (1000 * 3600 * 24))
}
button1.addEventListener("click", function f() {
  fetch('https://api.github.com/users/' + field.value)
    .then(response => response.json())
    .then(data => f2(data))
})
let row1;
function f2(data) {
  if (data.message === "Not Found") {
    alert("invalid username")
    return false;
  }
  let tdata = document.getElementById("table1");
  let tdata2 = document.getElementById("table2");
  let tdata3 = document.getElementById("table3");
  let t = document.getElementById("label");
  t.style.visibility = "visible";
  tdata.style.visibility = "visible";
  tdata2.style.visibility = "visible";
  tdata3.style.visibility = "visible";
  console.log(data)
  row1 = ` 
    <tbody>
    <tr><th>Login</th><td><a href="${data.html_url}">${data.login}</a></td></tr>
    <tr><th>Avatar</th><td><img src="${data.avatar_url}" alt="avatar" width="50px" height="50px">
    <tr><th>url</th><td><a href="${data.url}">${data.url}</a></td></tr>
    <tr><th>Followers url</th><td>  ${data.followers}</a></td></tr>
    <tr><th>Following url</th><td>${data.following}</a></td></tr>
    <tr><th>repos url</th><td><a href="${data.repos_url}">${data.repos_url}</a></td></tr>
    <tr><th>public repositiries</th><td>${data.public_repos}</td></tr>
    <tr><th>account created on</th><td>${data.created_at}</td></tr>
    <tr><th>last updated on</th><td>${data.updated_at}</td></tr></tbody> `
  tdata.innerHTML = row1;
  let cd = data.created_at.slice(0, 10)
  let ud = data.updated_at.slice(0, 10)
  let row2 =
    ` <tr>    <th class="text-center">Username</th>
    <th class="text-center">No.of Repositories</th>
    <th class="text-center">Created Date</th>
    <th class="text-center">Updated Date</th>
    <th class="text-center">Difference Days</th></tr>
<tr>
 <td class="text-center">${data.login}</td>
        <td class="text-center">${data.public_repos}</td>
        <td class="text-center">${dateformat(cd)}</td>
        <td class="text-center">${dateformat(ud)}</td>
        <td class="text-center">${diffdays(cd, ud)}</td>
      </tr>`
  tdata2.innerHTML = row2;
  repos(data.repos_url);
}
function repos(reposdata) {
  fetch(reposdata)
    .then(response => response.json())
    .then(data2 => print(data2))
}
async function print(data) {
  let row3 = `<thead>
   <tr>
      <th class="text-center">Repository Name</th>
      <th class="text-center">No.of files</th>
      <th class="text-center">Created Date</th>
      <th class="text-center"> Updated Date</th>
       <th class="text-center">Last Updated Before(days)</th>
   </tr>
   <thead>`
  let repo = row3;
  for (let j = 0; j < data.length; j++) {
    let files;
    const URL = 'https://api.github.com/repos/' + data[j].full_name + '/contents';
    const Res = fetch(URL);
    const response = await Res;
    const json = await response.json();
    if (json.message == "This repository is empty.") {
      files = 0;
    }
    else {
      files = json.length;
    }
    let cdd = data[j].created_at.slice(0, 10);
    let udd = data[j].updated_at.slice(0, 10);
    let dcdd = dateformat(cdd)
    let dudd = dateformat(udd)
    row3 =
      `<tbody>
         <tr>
        <td class="text-center"><a href="${data[j].html_url}">${data[j].name}</a></td>
        <td class="text-center">${files}</td>
        <td class="text-center">${dcdd}</td>
        <td class="text-center">${dudd}</td>
        <td class="text-center"> ${diffdays2(udd)}</td>
        </tr>
         <tbody>`
    repo += row3
    table3.innerHTML = repo
  }
}

