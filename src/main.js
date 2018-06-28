let options = {
  cohort: '',
  cohortData: {
    users: '',
    progress: ''
  },
  orderBy: '',
  orderDirection: '',
  search: ''
}

const selectSedes = document.getElementById('selectSedes');
const selectPromos = document.getElementById('selectPromos');
const selectCursos = document.getElementById('selectCursos');
const empty = document.getElementById('empty');
const tableData = document.getElementById('tableData');
const headTable = document.getElementById('headTable');
const resultTable = document.getElementById('resultTable');
const loader = document.getElementById('loader');
const inputSearch = document.getElementById('input-search');
const radioAsc = document.getElementById('asc');
const radioDes = document.getElementById('des');
const selectOrderBy = document.getElementById('orderBy');

const switchSedes = (option) => {
  switch (option) {
    case 'lim':
      empty.style.display = "none";
      selectPromos.disabled = false;
      selectCursos.innerHTML = "";
      selectCursos.disabled = true;
      getPromo('lim');
      break;
    case 'scl':
      empty.style.display = "none";
      selectPromos.disabled = false;
      selectCursos.innerHTML = "";
      selectCursos.disabled = true;
      getPromo('scl');
      break;
    case 'cdm':
      empty.style.display = "none";
      selectPromos.disabled = false;
      selectCursos.innerHTML = "";
      selectCursos.disabled = true;
      getPromo('cdm');
      break;
    case 'gdl':
      empty.style.display = "none";
      selectPromos.disabled = false;
      selectCursos.innerHTML = "";
      selectCursos.disabled = true;
      getPromo('gdl');
      break;
    case 'aqp':
      empty.style.display = "none";
      selectPromos.disabled = false;
      selectCursos.innerHTML = "";
      selectCursos.disabled = true;
      getPromo('aqp');
      break;
    default:
      empty.style.display = "none";
      selectPromos.innerHTML = "";
      selectPromos.disabled = true;
      selectCursos.innerHTML = "";
      selectCursos.disabled = true;
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

// validacion por curso de cohorts para select
const setCohortsJson = (idCohort) => {
  selectCursos.disabled = true;
  selectCursos.innerHTML = "";
  let courses = [];
  getData('../data/cohorts.json', (err, cohortjson) => {
    cohortjson.map((cohort) => {
      if (cohort.id === idCohort) {
        courses.push(cohort.coursesIndex);
      }
    });
    // if (courses[0].intro) {
    selectCursos.disabled = false;
    let nameCourses = Object.keys(courses);
    nameCourses.map((course) => {
      if (courses[course] !== undefined && Object.values(courses[course]).length > 0) {
        empty.style.display = "none";
        let keyCourse = Object.keys(courses[course]);
        keyCourse.map((key) => {
          selectCursos.innerHTML += "<option value='" + keyCourse.toString() + "'>" + courses[course][key].title + "</option>";
        });
      } else {
        selectCursos.disabled = true;
        headTable.innerHTML = "";
        resultTable.innerHTML = "";
        empty.style.display = "block";
      }
    });
    // }
  });
  return courses;
}

// debe recibir el id seleccionado en la parte de la promocion
const getUsersJson = (idCohort) => {
  let newUsers = [];
  getData('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, userjson) => {
    userjson.map(user => {
      if (user.signupCohort === idCohort) {
        newUsers.push(user);
      }
    });
  });
  return newUsers;
}

const getCohortsJson = (idCohort) => {
  let cohorts = [];
  getData('../data/cohorts.json', (err, cohortjson) => {
    cohortjson.map(cohort => {
      if(cohort.id === idCohort) {
        cohorts.push(cohort);
      }
    });
  });
  return cohorts;
}

const getProgressJson = (idCohort, course) => {
  loader.style.display = "block";
  const users = getUsersJson(idCohort);
  const cohorts = getCohortsJson(idCohort);
  getData('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, progressjson) => {
    if (users.length > 0 && course === "intro") {
      empty.style.display = "none";
      //nombre de la función que llamará a processCohortData
      pasandoDatos(users, progressjson, cohorts);
    } else {
      empty.style.display = "block";
      headTable.innerHTML = "";
      resultTable.innerHTML = "";
      loader.style.display = "none";
    }
  });
}

const pasandoDatos = (users, progress, cohorts) => {
  options.cohort = cohorts;
  options.cohortData.users = users;
  options.cohortData.progress = progress;
  options.orderBy = "name";
  options.orderDirection = "asc";
  options.search = "";
  processCohortData(options);
  createTableWithData()
}

const createTableWithData = () => {
  headTable.innerHTML = "";
  resultTable.innerHTML = "";
  //se esta reduciendo  lo de total con completado cvon el nombre COMPLETE
  headTable.innerHTML =
    "<tr> <th scope='col' rowspan='2'>Alumnas</th>" +
    "<th scope='col' rowspan='2'>Porcentaje</th>" +
    "<th scope='col' colspan='3'>Ejercicios</th>" +
    "<th scope='col' colspan='3'>Lecturas</th>" +
    "<th scope='col' colspan='5'>Quizzes</th> </tr>" +
    "<tr> <td scope='col'>Total</td>" +
    "<td scope='col'>Completado</td>" +
    "<td scope='col'>Porcentaje</td>" +
    "<td scope='col'>Total</td>" +
    "<td scope='col'>Completado</td>" +
    "<td scope='col'>Porcentaje</td>" +
    "<td scope='col'>Total</td>" +
    "<td scope='col'>Completado</td>" +
    "<td scope='col'>Porcentaje</td>" +
    "<td scope='col'>SumScore</td>" +
    "<td scope='col'>AvgScore</td> </tr>";
  //generar la tabla general por defecto
  let todo = processCohortData(options);
  todo.map(d => {
    // console.log(d.stats)
    if (d.stats !== undefined) {
      // console.log('toma')
      //se esta reduciendo  lo de total con completado cvon el nombre COMPLETE
      resultTable.innerHTML +=
        "<tr><th scope='row'>" + d.name +
        "</th> <td>" + d.stats.percent +
        "%</td> <td>" + d.stats.exercises.total +
        "</td> <td>" + d.stats.exercises.completed +
        "</td> <td>" + d.stats.exercises.percent +
        "%</td> <td>" + d.stats.reads.total +
        "</td> <td>" + d.stats.reads.completed +
        "</td> <td>" + d.stats.reads.percent +
        "%</td> <td>" + d.stats.quizzes.total +
        "</td> <td>" + d.stats.quizzes.completed +
        "</td> <td>" + d.stats.quizzes.percent +
        "</td> <td>" + d.stats.quizzes.scoreSum +
        "</td> <td>" + d.stats.quizzes.scoreAvg +
        "</td></tr>";
    } else {
      // console.log(d.id)
      resultTable.innerHTML +=
        "<tr><th scope='row'>" + d.name +
        "</th> <td>" + 0 +
        "%</td> <td>" + 0 +
        "</td> <td>" + 0 +
        "</td> <td>" + 0 +
        "%</td> <td>" + 0 +
        "</td> <td>" + 0 +
        "</td> <td>" + 0 +
        "%</td> <td>" + 0 +
        "</td> <td>" + 0 +
        "</td> <td>" + 0 +
        "</td> <td>" + 0 +
        "</td> <td>" + 0 +
        "</td></tr>";
    }
  });
  //se cierra el loading
  loader.style.display = "none";
  inputSearch.style.display = "block";
}

const searchByName = () => {
  options.search = inputSearch.value.toUpperCase();
  processCohortData(options);
  createTableWithData()
  // let filter = inputSearch.value.toUpperCase();
  // tr = resultTable.getElementsByTagName("tr");
  // // console.log(tr);
  // for (let i = 0; i < tr.length; i++) {
  //   let th = tr[i].getElementsByTagName("th")[0];
  //   if(th) {
  //     if(th.innerHTML.toUpperCase().indexOf(filter) > -1) {
  //       tr[i].style.display = "";
  //     }
  //     else {
  //       tr[i].style.display = "none";
  //     }
  //   }
  // }
}
selectSedes.addEventListener('change', () => switchSedes(selectSedes.options[selectSedes.selectedIndex].value));

selectPromos.addEventListener('change', () => setCohortsJson(selectPromos.options[selectPromos.selectedIndex].value));

selectCursos.addEventListener('change', () => getProgressJson((selectPromos.options[selectPromos.selectedIndex].value), selectCursos.options[selectCursos.selectedIndex].value));

inputSearch.addEventListener("keyup", () => searchByName());

// selectOrderBy.addEventListener();
