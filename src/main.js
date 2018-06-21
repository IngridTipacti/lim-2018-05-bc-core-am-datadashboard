const selectSedes = document.getElementById('selectSedes');
const selectPromos = document.getElementById('selectPromos');
const selectCursos = document.getElementById('selectCursos');
let resultTable = document.getElementById('resultTable');
let empty = document.getElementById('empty');
let tableData = document.getElementById('tableData');

const switchSedes = (option) => {
  switch (option) {
    case 'lim':
      empty.style.display = "none";
      selectPromos.disabled = false;
      getPromo('lim');
      break;
    case 'scl':
      empty.style.display = "none";
      selectPromos.disabled = false;
      getPromo('scl');
      break;
    case 'cdm':
      empty.style.display = "none";
      selectPromos.disabled = false;
      getPromo('cdm');
      break;
    case 'gdl':
      empty.style.display = "none";
      selectPromos.disabled = false;
      getPromo('gdl');
      break;
    case 'aqp':
      empty.style.display = "none";
      selectPromos.disabled = false;
      getPromo('aqp');
      break;
    default:
      empty.style.display = "none";
      selectPromos.innerHTML = "";
      selectPromos.disabled = true;
      break;
  }
}

// método para reducir condigo, solo cambia la url para el request
const getData = (url, callback) => {
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

// promo = 3 letras
const getPromo = (promo) => {
  selectPromos.innerHTML = "";
  getData('../data/cohorts.json', (err, cohortjson) => {
    cohortjson.map((promotion) => {
      let idPromo = promotion.id;
      if (promo === idPromo.substring(0, 3)) {
        selectPromos.innerHTML += "<option value='" + idPromo + "'>" + idPromo + "</option>";
      }
    });
  });
}

// idPromo es la promo seleccionada
const filterUsersByIdPromo = (idPromo) => {
  let users = [];
  let courses = [];
  getData('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, userjson) => {
    userjson.map((user) => {
      if (idPromo === user.signupCohort) {
        users.push(user);
      } else console.log("No hay :(");
    });
    if (users.length > 0) {
      empty.style.display = "none";
      tableData.style.display = "block";
    } else {
      empty.style.display = "block";
    }
    getData('../data/cohorts.json', (err, cohortjson) => {
      cohortjson.map((promotion) => {
        if (idPromo === promotion.id) {
          courses.push(promotion.coursesIndex);
        }
      });
      getProgress(users, courses);
    });
  });
}

// lista de usuarios que cumplen la condicion de ser estudiantes
const getProgress = (users, courses) => {
  getData('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, progressjson) => {
    createTable(users, progressjson, courses);
  });
}

const createTable = (users, progress, courses) => {
  let usersWithStats = [];
  resultTable.innerHTML = "";
  for (const course of courses) {
    for (const user of users) {
      const userCopia = { ...user };
        const userProgress = progress[userCopia.id];
        if (userProgress.hasOwnProperty('intro') && Object.keys(course).toString() === Object.keys(userProgress).toString()) {
          const intro = userProgress.intro;
          const nameUnits = Object.keys(intro.units);
          const progressTotal = nameUnits.reduce((sumProgress, u) => {
            sumProgress += intro.units[u].percent;
            return sumProgress;
          }, 0);
          user.stats = {
            percent: progressTotal / Object.keys(intro.units).length,
            exercises: {
              total: 0,
              completed: 0,
              percent: 0
            },
            reads: {
              total: 0,
              completed: 0,
              percent: 0
            },
            quizzes: {
              total: 0,
              completed: 0,
              percent: 0,
              scoreSum: 0,
              scoreAvg: 0
            }
          }
          // resultTable.innerHTML += "<tr><th scope='row'>" + userCopia.name + "</th> <td>" + Object.keys(courses[0]).toString() + "</td> <td>" + progress[key].intro.percent + "%</td></tr>";
        }
      }
  }
  usersWithStats = users;
  console.log(usersWithStats);
}

const getUsers = () => {
  //  resultTable.innerHTML = "";
  //   getData('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, userjson) => {
  //     userjson.map((user) => {
  //       name = userCopia.name;
  //       resultTable.innerHTML += "<tr> <th scope='row'>" + name + "</th> </tr>";
  //     });
  //   });
}


selectSedes.addEventListener('change', () => switchSedes(selectSedes.options[selectSedes.selectedIndex].value));

selectPromos.addEventListener('change', () => filterUsersByIdPromo(selectPromos.options[selectPromos.selectedIndex].value));

// selectCursos.addEventListener('change', () => switchCursos(selectCursos.options[selectCursos.selectedIndex].value));
