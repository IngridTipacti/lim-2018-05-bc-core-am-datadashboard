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
      if (cohort.id === idCohort) {
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
  headTable.innerHTML =
    "<tr> <th scope='col' rowspan='2'>Alumnas</th>" +
    "<th scope='col' rowspan='2'>Porcentaje</th>" +
    "<th scope='col' colspan='2'>Ejercicios</th>" +
    "<th scope='col' colspan='2'>Lecturas</th>" +
    "<th scope='col' colspan='4'>Quizzes</th> </tr>" +
    "<tr> <td scope='col'>Resuelto</td>" +
    "<td scope='col'>Porcentaje</td>" +
    "<td scope='col'>Resuelto</td>" +
    "<td scope='col'>Porcentaje</td>" +
    "<td scope='col'>Resuelto</td>" +
    "<td scope='col'>Porcentaje</td>" +
    "<td scope='col'>SumScore</td>" +
    "<td scope='col'>AvgScore</td> </tr>";
  //generar la tabla general
  let todo = processCohortData(options);
  todo.map(d => {
    if (d.stats !== undefined) {
      const tr = document.createElement("tr");
      const thName = document.createElement("th");
      const tdPercent = document.createElement("td");
      const tdResueltoExer = document.createElement("td");
      const tdPercentExer = document.createElement("td");
      const tdResueltoRead = document.createElement("td");
      const tdPercentRead = document.createElement("td");
      const tdResueltoQuiz = document.createElement("td");
      const tdPercentQuiz = document.createElement("td");
      const tdScoreSumQuiz = document.createElement("td");
      const tdScoreAvgQuiz = document.createElement("td");
      const valueName = document.createTextNode(d.name);
      const valuePercent = document.createTextNode(d.stats.percent);
      const valueResueltoExer = document.createTextNode(d.stats.exercises.completed + " / " + d.stats.exercises.total);
      const valuePercentExer = document.createTextNode(d.stats.exercises.percent);
      const valueResueltoRead = document.createTextNode(d.stats.reads.completed + " / " + d.stats.reads.total);
      const valuePercentRead = document.createTextNode(d.stats.reads.percent);
      const valueResueltoQuiz = document.createTextNode(d.stats.quizzes.completed + " / " + d.stats.quizzes.total);
      const valuePercentQuiz = document.createTextNode(d.stats.quizzes.percent);
      const valueScoreSumQuiz = document.createTextNode(d.stats.quizzes.scoreSum);
      const valueScoreAvgQuiz = document.createTextNode(d.stats.quizzes.scoreAvg);
      thName.appendChild(valueName);
      tdPercent.appendChild(valuePercent);
      tdResueltoExer.appendChild(valueResueltoExer);
      tdPercentExer.appendChild(valuePercentExer);
      tdResueltoRead.appendChild(valueResueltoRead);
      tdPercentRead.appendChild(valuePercentRead);
      tdResueltoQuiz.appendChild(valueResueltoQuiz);
      tdPercentQuiz.appendChild(valuePercentQuiz);
      tdScoreSumQuiz.appendChild(valueScoreSumQuiz);
      tdScoreAvgQuiz.appendChild(valueScoreAvgQuiz);
      tr.appendChild(thName);
      tr.appendChild(tdPercent);
      tr.appendChild(tdResueltoExer);
      tr.appendChild(tdPercentExer);
      tr.appendChild(tdResueltoRead);
      tr.appendChild(tdPercentRead);
      tr.appendChild(tdResueltoQuiz);
      tr.appendChild(tdPercentQuiz);
      tr.appendChild(tdScoreSumQuiz);
      tr.appendChild(tdScoreAvgQuiz);
      resultTable.appendChild(tr);
    } else {
      const tr = document.createElement("tr");
      const thName = document.createElement("th");
      const tdPercent = document.createElement("td");
      const tdResueltoExer = document.createElement("td");
      const tdPercentExer = document.createElement("td");
      const tdResueltoRead = document.createElement("td");
      const tdPercentRead = document.createElement("td");
      const tdResueltoQuiz = document.createElement("td");
      const tdPercentQuiz = document.createElement("td");
      const tdScoreSumQuiz = document.createElement("td");
      const tdScoreAvgQuiz = document.createElement("td");
      const valueName = document.createTextNode(d.name);
      const valuePercent = document.createTextNode(0);
      const valueResueltoExer = document.createTextNode(0 + " / " + 0);
      const valuePercentExer = document.createTextNode(0);
      const valueResueltoRead = document.createTextNode(0 + " / " + 0);
      const valuePercentRead = document.createTextNode(0);
      const valueResueltoQuiz = document.createTextNode(0 + " / " + 0);
      const valuePercentQuiz = document.createTextNode(0);
      const valueScoreSumQuiz = document.createTextNode(0);
      const valueScoreAvgQuiz = document.createTextNode(0);
      thName.appendChild(valueName);
      tdPercent.appendChild(valuePercent);
      tdResueltoExer.appendChild(valueResueltoExer);
      tdPercentExer.appendChild(valuePercentExer);
      tdResueltoRead.appendChild(valueResueltoRead);
      tdPercentRead.appendChild(valuePercentRead);
      tdResueltoQuiz.appendChild(valueResueltoQuiz);
      tdPercentQuiz.appendChild(valuePercentQuiz);
      tdScoreSumQuiz.appendChild(valueScoreSumQuiz);
      tdScoreAvgQuiz.appendChild(valueScoreAvgQuiz);
      tr.appendChild(thName);
      tr.appendChild(tdPercent);
      tr.appendChild(tdResueltoExer);
      tr.appendChild(tdPercentExer);
      tr.appendChild(tdResueltoRead);
      tr.appendChild(tdPercentRead);
      tr.appendChild(tdResueltoQuiz);
      tr.appendChild(tdPercentQuiz);
      tr.appendChild(tdScoreSumQuiz);
      tr.appendChild(tdScoreAvgQuiz);
      resultTable.appendChild(tr);
    }
  });
  loader.style.display = "none";
  inputSearch.style.display = "block";
}

const searchByName = (str) => {
  console.log(str);
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

inputSearch.addEventListener("input", (e) => searchByName(e.target.value));

// selectOrderBy.addEventListener();
