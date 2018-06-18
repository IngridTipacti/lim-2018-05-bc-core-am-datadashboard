// método para reducir condigo, solo cambia la url para el request
window.getData = (url, callback) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let xhrjson = JSON.parse(xhr.responseText);
      callback(null, xhrjson);
    }
  };
  xhr.send();
}

window.computeUserStats = (users, progress, courses) => {users, progress, courses}

window.sortUsers = (users, orderBy, orderDirection) => {users, orderBy, orderDirection}

window.filterUsers = (users, search) => {users, search}

window.processCohortData = (options) => {options}
