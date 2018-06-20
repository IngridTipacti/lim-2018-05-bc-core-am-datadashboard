window.computeUserStats = (users, progress, courses) => {
  let usersWithStats = [];
  for (const user of users) {
    for (const key of arrProgress) {
      if (user.id === key && progress[key].hasOwnProperty('intro')) {
        // console.log(progress[key].intro.percent);
        // resultTable.innerHTML += "<tr><th scope='row'>" + user.name + "</th> <td>Intro</td> <td>" + progress[key].intro.percent +"%</td></tr>";
      }
    }
  }
}

window.sortUsers = (users, orderBy, orderDirection) => {users, orderBy, orderDirection}

window.filterUsers = (users, search) => {users, search}

window.processCohortData = (options) => {options}
