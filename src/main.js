const selectSedes = document.getElementById('selectSedes');
const selectPromos = document.getElementById('selectPromos');
const selectCursos = document.getElementById('selectCursos');
let resultTable = document.getElementById('resultTable');
let empty = document.getElementById('empty');
let tableData = document.getElementById('tableData');

const switchSedes = (option) => {
  switch (option) {
    case 'lim':
      selectPromos.disabled = false;
      getPromo('lim');
      break;
    case 'scl':
      selectPromos.disabled = false;
      getPromo('scl');
      break;
    case 'cdm':
      selectPromos.disabled = false;
      getPromo('cdm');
      break;
    case 'gdl':
      selectPromos.disabled = false;
      getPromo('gdl');
      break;
    case 'aqp':
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
  computeUserStats(users, progress, courses);
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
