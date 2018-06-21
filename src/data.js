window.computeUsersStats = (users, progress, courses) => {
  let usersWithStats = [];
  let arrProgress = Object.keys(progress);
  resultTable.innerHTML = "";
  for (const course of courses) {
    for (const user of users) {
      for (const key of arrProgress) {
        if (user.id === key && progress[key].hasOwnProperty('intro') && Object.keys(course).toString() === Object.keys(progress[key]).toString()) {
          let nameCourse = Object.keys(progress[key]).toString();
          
          // console.log(progress[key].nameCourse.percent) aun no estabien esta parte
          // stats = {
          //   percent: progress[key].nameCourse.percent,
          //   exercises: {
          //     total: 0,
          //     completed: 0,
          //     percent
          //   },
          //   reads: {
          //     total: 0,
          //     completed: 0,
          //     percent: 0
          //   },
          //   quizzes: {
          //     total: 0,
          //     completed: 0,
          //     percent: 0,
          //     scoreSum: 0,
          //     scoreAvg: 0
          //   }
          // }
          // resultTable.innerHTML += "<tr><th scope='row'>" + user.name + "</th> <td>" + Object.keys(courses[0]).toString() + "</td> <td>" + progress[key].intro.percent + "%</td></tr>";
        }
      }
    }
  }
}

window.sortUsers = (users, orderBy, orderDirection) => {
  users,
  orderBy,
  orderDirection
}

window.filterUsers = (users, search) => {
  users,
  search
}

window.processCohortData = (options) => {
  options
}
