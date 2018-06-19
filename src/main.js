const selectSedes = document.getElementById('selectSedes');
const selectPromos = document.getElementById('selectPromos');
const selectCursos = document.getElementById('selectCursos');
let resultTable = document.getElementById('resultTable');

const switchSedes = (option) => {
  switch (option) {
    case 'lim':
      selectPromos.disabled = false;
      getProm('lim');
      break;
    case 'scl':
      selectPromos.disabled = false;
      getProm('scl');
      break;
    case 'cdm':
      selectPromos.disabled = false;
      getProm('cdm');
      break;
    case 'gdl':
      selectPromos.disabled = false;
      getProm('gdl');
      break;
    case 'aqp':
      selectPromos.disabled = false;
      getProm('aqp');
      break;
    default:
      selectPromos.innerHTML = "";
      selectPromos.disabled = true;
      break;
  }
}

// promo = 3 letras solo muestra id de promos
const getProm = (promo) => {
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
    getData('../data/cohorts.json', (err, cohortjson) => {
      cohortjson.map((promotion) => {
        if (idPromo === promotion.id) {
          courses.push(promotion.coursesIndex);
        }
      });
    });
    getProgress(users, courses);
  });
}

// lista de usuarios que cumplen la condicion de ser estudiantes
const getProgress = (users, courses) => {
  let progress = [];
  getData('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, progressjson) => {
    for (const key in progressjson) {
      if (progressjson[key].intro) {
        progress.push(progressjson);
      }
    }
  });
  filterProgressByUser(users, progress, courses);
}

const filterProgressByUser = (users, progress, courses) => {
  resultTable.innerHTML = "";
  console.log(users);
  console.log(progress);
  console.log(courses);
}

// const getUsers = () => {
//  resultTable.innerHTML = "";
//   getData('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, userjson) => {
//     userjson.map((user) => {
//       name = user.name;
//       resultTable.innerHTML += "<tr> <th scope='row'>" + name + "</th> </tr>";
//     });
//   });
// }


selectSedes.addEventListener('change', () => switchSedes(selectSedes.options[selectSedes.selectedIndex].value));

selectPromos.addEventListener('change', () => filterUsersByIdPromo(selectPromos.options[selectPromos.selectedIndex].value));

// selectCursos.addEventListener('change', () => switchCursos(selectCursos.options[selectCursos.selectedIndex].value));
