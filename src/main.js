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
let slideIndex = 1;
const selectSedes = document.getElementById('select-sedes');
const selectPromos = document.getElementById('select-promos');
const selectCursos = document.getElementById('select-cursos');
const empty = document.getElementById('empty');
const tableData = document.getElementById('tableData');
const headTable = document.getElementById('headTable');
const resultTable = document.getElementById('resultTable');
const loader = document.getElementById('loader');
const inputSearch = document.getElementById('input-search');
const selectOrderBy = document.getElementById('order-by');
const slideNext = document.getElementById('next');
const slidePrevious = document.getElementById('previous');
const carouselExampleControls = document.getElementById('carouselExampleControls');

const changeSlides = (n) => {
  showSlides(slideIndex += n);
}

const showSlides = (n) => {
  let i;
  let x = document.getElementsByClassName("mySlides");
  if (n > x.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = x.length
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
}

const switchSedes = (option) => {
  switch (option) {
    case 'lim':
      empty.style.display = "none";
      selectPromos.disabled = false;
      selectCursos.innerHTML = "";
      selectCursos.disabled = true;
      inputSearch.style.display = "none";
      selectOrderBy.style.display = "none";
      headTable.innerHTML = "";
      resultTable.innerHTML = "";
      getPromo('lim');
      break;
    case 'scl':
      empty.style.display = "none";
      selectPromos.disabled = false;
      selectCursos.innerHTML = "";
      selectCursos.disabled = true;
      inputSearch.style.display = "none";
      selectOrderBy.style.display = "none";
      headTable.innerHTML = "";
      resultTable.innerHTML = "";
      getPromo('scl');
      break;
    case 'cdm':
      empty.style.display = "none";
      selectPromos.disabled = false;
      selectCursos.innerHTML = "";
      selectCursos.disabled = true;
      inputSearch.style.display = "none";
      selectOrderBy.style.display = "none";
      headTable.innerHTML = "";
      resultTable.innerHTML = "";
      getPromo('cdm');
      break;
    case 'gdl':
      empty.style.display = "none";
      selectPromos.disabled = false;
      selectCursos.innerHTML = "";
      selectCursos.disabled = true;
      inputSearch.style.display = "none";
      selectOrderBy.style.display = "none";
      headTable.innerHTML = "";
      resultTable.innerHTML = "";
      getPromo('gdl');
      break;
    case 'aqp':
      empty.style.display = "none";
      selectPromos.disabled = false;
      selectCursos.innerHTML = "";
      selectCursos.disabled = true;
      inputSearch.style.display = "none";
      selectOrderBy.style.display = "none";
      headTable.innerHTML = "";
      resultTable.innerHTML = "";
      getPromo('aqp');
      break;
    default:
      empty.style.display = "none";
      selectPromos.innerHTML = "";
      selectPromos.disabled = true;
      selectCursos.innerHTML = "";
      selectCursos.disabled = true;
      inputSearch.style.display = "none";
      selectOrderBy.style.display = "none";
      headTable.innerHTML = "";
      resultTable.innerHTML = "";
      carouselExampleControls.style.display = "block";
      break;
  }
}

const switchOrderBy = (option) => {
  switch (option) {
    case "ascname":
      options.orderBy = "name";
      options.orderDirection = "asc";
      let ascname = processCohortData(options);
      createTableWithData(ascname);
      break;
    case "ascperc":
      options.orderBy = "perc";
      options.orderDirection = "asc";
      processCohortData(options);
      let ascperc = processCohortData(options);
      createTableWithData(ascperc);
      break;
    case "ascexer":
      options.orderBy = "exer";
      options.orderDirection = "asc";
      let ascexer = processCohortData(options);
      createTableWithData(ascexer);
      break;
    case "ascread":
      options.orderBy = "read";
      options.orderDirection = "asc";
      processCohortData(options);
      break;
    case "ascquiz":
      options.orderBy = "quiz";
      options.orderDirection = "asc";
      processCohortData(options);
      break;
    case "ascscor":
      options.orderBy = "scor";
      options.orderDirection = "asc";
      processCohortData(options);
      break;
    case "desname":
      options.orderBy = "name";
      options.orderDirection = "des";
      let desname = processCohortData(options);
      createTableWithData(desname);
      break;
    case "desperc":
      options.orderBy = "perc";
      options.orderDirection = "des";
      processCohortData(options);
      break;
    case "desexer":
      options.orderBy = "exer";
      options.orderDirection = "des";
      processCohortData(options);
      break;
    case "desread":
      options.orderBy = "read";
      options.orderDirection = "des";
      processCohortData(options);
      break;
    case "desquiz":
      options.orderBy = "quiz";
      options.orderDirection = "des";
      processCohortData(options);
      break;
    case "desscor":
      options.orderBy = "scor";
      options.orderDirection = "des";
      processCohortData(options);
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
  carouselExampleControls.style.display = "none";
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
        getProgressJson(idCohort, "intro");
        let keyCourse = Object.keys(courses[course]);
        keyCourse.map((key) => {
          selectCursos.innerHTML += "<option value='" + keyCourse.toString() + "'>" + courses[course][key].title + "</option>";
        });
      } else {
        selectCursos.disabled = true;
        headTable.innerHTML = "";
        resultTable.innerHTML = "";
        inputSearch.style.display = "none";
        selectOrderBy.style.display = "none";
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
      let courses = ["intro"];
      //nombre de la función que llamará a processCohortData
      pasandoDatos(users, progressjson, courses);
    } else {
      empty.style.display = "block";
      inputSearch.style.display = "none";
      selectOrderBy.style.display = "none";
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
  let todo = processCohortData(options);
  createTableWithData(todo);
}

const createTableWithData = (todo) => {
  headTable.innerHTML = "";
  resultTable.innerHTML = "";
  inputSearch.style.display = "block";
  selectOrderBy.style.display = "block";
  const tr1 = document.createElement("tr");
  const tr2 = document.createElement("tr");
  const thAlumnas = document.createElement("th");
  const thCompletitud = document.createElement("th");
  const thExercises = document.createElement("th");
  const thReads = document.createElement("th");
  const thQuizzes = document.createElement("th");
  const tdResExer = document.createElement("td");
  const tdPerExer = document.createElement("td");
  const tdResRead = document.createElement("td");
  const tdPerRead = document.createElement("td");
  const tdResQuiz = document.createElement("td");
  const tdPerQuiz = document.createElement("td");
  const tdSumScor = document.createElement("td");
  const tdAvgScor = document.createElement("td");
  const valueAlumnas = document.createTextNode("Alumnas");
  const valueCompletitud = document.createTextNode("%");
  const valueExercises = document.createTextNode("Ejercicios");
  const valueReads = document.createTextNode("Lecturas");
  const valueQuizzes = document.createTextNode("Quizzes");
  const valueResExer = document.createTextNode("Resuelto");
  const valuePerExer = document.createTextNode("Porcentaje");
  const valueResRead = document.createTextNode("Resuelto");
  const valuePerRead = document.createTextNode("Porcentaje");
  const valueResQuiz = document.createTextNode("Resuelto");
  const valuePerQuiz = document.createTextNode("Porcentaje");
  const valueSumScor = document.createTextNode("SumScore");
  const valueAvgScor = document.createTextNode("AvgScore");
  thAlumnas.appendChild(valueAlumnas);
  thAlumnas.setAttribute("class", "color-gray");
  thAlumnas.rowSpan = "2";
  thCompletitud.appendChild(valueCompletitud);
  thCompletitud.rowSpan = "2";
  thExercises.appendChild(valueExercises);
  thExercises.colSpan = "2";
  thExercises.setAttribute("class", "color-gray");
  thReads.appendChild(valueReads);
  thReads.colSpan = "2";
  thReads.setAttribute("class", "color-gray");
  thQuizzes.appendChild(valueQuizzes);
  thQuizzes.setAttribute("class", "color-gray");
  thQuizzes.colSpan = "4";
  tdResExer.appendChild(valueResExer);
  tdResExer.setAttribute("class", "color-gray");
  tdPerExer.appendChild(valuePerExer);
  tdResRead.appendChild(valueResRead);
  tdResRead.setAttribute("class", "color-gray");
  tdPerRead.appendChild(valuePerRead);
  tdResQuiz.appendChild(valueResQuiz);
  tdResQuiz.setAttribute("class", "color-gray");
  tdPerQuiz.appendChild(valuePerQuiz);
  tdSumScor.appendChild(valueSumScor);
  tdSumScor.setAttribute("class", "color-gray");
  tdAvgScor.appendChild(valueAvgScor);
  tr1.appendChild(thAlumnas);
  tr1.appendChild(thCompletitud);
  tr1.appendChild(thExercises);
  tr1.appendChild(thReads);
  tr1.appendChild(thQuizzes);
  tr2.appendChild(tdResExer);
  tr2.appendChild(tdPerExer);
  tr2.appendChild(tdResRead);
  tr2.appendChild(tdPerRead);
  tr2.appendChild(tdResQuiz);
  tr2.appendChild(tdPerQuiz);
  tr2.appendChild(tdSumScor);
  tr2.appendChild(tdAvgScor);
  headTable.appendChild(tr1);
  headTable.appendChild(tr2);

  //generar la tabla general
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
      const valuePercent = document.createTextNode(d.stats.percent + "%");
      const valueResueltoExer = document.createTextNode(d.stats.exercises.completed + " / " + d.stats.exercises.total);
      const valuePercentExer = document.createTextNode(d.stats.exercises.percent + "%");
      const valueResueltoRead = document.createTextNode(d.stats.reads.completed + " / " + d.stats.reads.total);
      const valuePercentRead = document.createTextNode(d.stats.reads.percent + "%");
      const valueResueltoQuiz = document.createTextNode(d.stats.quizzes.completed + " / " + d.stats.quizzes.total);
      const valuePercentQuiz = document.createTextNode(d.stats.quizzes.percent + "%");
      const valueScoreSumQuiz = document.createTextNode(d.stats.quizzes.scoreSum);
      const valueScoreAvgQuiz = document.createTextNode(d.stats.quizzes.scoreAvg);
      thName.appendChild(valueName);
      thName.setAttribute("class", "color-gray");
      tdPercent.appendChild(valuePercent);
      tdResueltoExer.appendChild(valueResueltoExer);
      tdResueltoExer.setAttribute("class", "color-gray");
      tdPercentExer.appendChild(valuePercentExer);
      tdResueltoRead.appendChild(valueResueltoRead);
      tdResueltoRead.setAttribute("class", "color-gray");
      tdPercentRead.appendChild(valuePercentRead);
      tdResueltoQuiz.appendChild(valueResueltoQuiz);
      tdResueltoQuiz.setAttribute("class", "color-gray");
      tdPercentQuiz.appendChild(valuePercentQuiz);
      tdScoreSumQuiz.appendChild(valueScoreSumQuiz);
      tdScoreSumQuiz.setAttribute("class", "color-gray");
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
  options.search = str.toUpperCase();
  let todo = processCohortData(options);
  createTableWithData(todo);
}

selectSedes.addEventListener('change', () => switchSedes(selectSedes.options[selectSedes.selectedIndex].value));

selectPromos.addEventListener('change', () => setCohortsJson(selectPromos.options[selectPromos.selectedIndex].value));

selectCursos.addEventListener('change', () => getProgressJson((selectPromos.options[selectPromos.selectedIndex].value), selectCursos.options[selectCursos.selectedIndex].value));

inputSearch.addEventListener("input", (e) => searchByName(e.target.value));

selectOrderBy.addEventListener("change", () => switchOrderBy(selectOrderBy.options[selectOrderBy.selectedIndex].value));

slideNext.addEventListener("click", () => changeSlides(1));

slidePrevious.addEventListener("click", () => changeSlides(-1));
