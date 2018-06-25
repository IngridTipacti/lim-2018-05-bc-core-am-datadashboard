const selectSedes = document.getElementById('selectSedes');
const selectPromos = document.getElementById('selectPromos');
const selectCursos = document.getElementById('selectCursos');
let empty = document.getElementById('empty');
let tableData = document.getElementById('tableData');
let headTable = document.getElementById('headTable');
let resultTable = document.getElementById('resultTable');
let loader = document.getElementById('loader');

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
const getCohortsJson = (idCohort) => {
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

const getProgressJson = (idCohort, course) => {
  // crear el loading
  loader.style.display = "block";
  const courses = getCohortsJson(idCohort);
  const users = getUsersJson(idCohort);
  getData('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, progressjson) => {
    if (users.length > 0 && course === "intro") {
      empty.style.display = "none";
      createTableWithData(users, progressjson, courses);
    } else {
      empty.style.display = "block";
      headTable.innerHTML = "";
      resultTable.innerHTML = "";
      loader.style.display = "none";
    }
  });
}

const percentStats = (progress, courses) => {
  courses.map(course => {
    nameCourse = Object.keys(course).toString();
    if (progress.hasOwnProperty(nameCourse) && progress.intro.hasOwnProperty('units')) {
      const units = progress.intro.units;
      const nameUnits = Object.keys(units);
      progressTotal = nameUnits.reduce((sumProgress, u) => {
        sumProgress += units[u].percent / nameUnits.length;
        return sumProgress;
      }, 0);
      return progressTotal;
    } else {
      console.log("no tiene porcentaje");
    }
  });
  return progressTotal;
}

const exerTotal = (progress, courses) => {
  courses.map(course => {
    nameCourse = Object.keys(course).toString();
    if (progress.hasOwnProperty(nameCourse) && progress.intro.hasOwnProperty('units')) {
      const units = progress.intro.units;
      const nameUnits = Object.keys(units);
      nameUnits.map(nameUnit => {
        const parts = progress.intro.units[nameUnit].parts;
        const nameParts = Object.keys(parts);
        nameParts.map(namePart => {
          if (progress.intro.units[nameUnit].parts[namePart].hasOwnProperty('exercises')) {
            const exercises = progress.intro.units[nameUnit].parts[namePart].exercises;
            const nameExercises = Object.keys(exercises);
            totalExer = nameExercises.map(nameExercise => {
              let total = Object.keys(progress.intro.units[nameUnit].parts[namePart].exercises[nameExercise]);
              return total;
            });
            return totalExer;
          }
        });
      });
    }
  });
  return totalExer;
}

const exerCompleted = (progress, courses) => {
  let sumCompleted = 0;
  courses.map(course => {
    nameCourse = Object.keys(course).toString();
    if (progress.hasOwnProperty(nameCourse) && progress.intro.hasOwnProperty('units')) {
      const units = progress.intro.units;
      const nameUnits = Object.keys(units);
      nameUnits.map(nameUnit => {
        const parts = progress.intro.units[nameUnit].parts;
        const nameParts = Object.keys(parts);
        nameParts.map(namePart => {
          if (progress.intro.units[nameUnit].parts[namePart].hasOwnProperty('exercises')) {
            const exercises = progress.intro.units[nameUnit].parts[namePart].exercises;
            const nameExercises = Object.keys(exercises);
            nameExercises.map(nameExercise => {
              if (progress.intro.units[nameUnit].parts[namePart].exercises[nameExercise].hasOwnProperty('completed')) {
                let completed = progress.intro.units[nameUnit].parts[namePart].exercises[nameExercise].completed;
                if (completed > 0) {
                  sumCompleted += completed;
                  return sumCompleted;
                }
              }
            });
          }
        });
      });
    }
  });
  return sumCompleted;
}

const exerPercent = (completed, total) => {
  const percent = (completed / total) * 100;
  return percent;
}

const readTotal = (progress, courses) => {
  let reads = [];
  courses.map(course => {
    nameCourse = Object.keys(course).toString();
    if (progress.hasOwnProperty(nameCourse) && progress.intro.hasOwnProperty('units')) {
      const units = progress.intro.units;
      const nameUnits = Object.keys(units);
      nameUnits.map(nameUnit => {
        const parts = progress.intro.units[nameUnit].parts;
        const nameParts = Object.keys(parts);
        nameParts.map(namePart => {
          if (parts[namePart].type === 'read') {
            reads.push(parts[namePart]);
            return reads;
          }
        });
      });
    }
  });
  return reads.length;
}

const readCompleted = (progress, courses) => {
  let sumCompleted = 0;
  courses.map(course => {
    nameCourse = Object.keys(course).toString();
    if (progress.hasOwnProperty(nameCourse) && progress.intro.hasOwnProperty('units')) {
      const units = progress.intro.units;
      const nameUnits = Object.keys(units);
      nameUnits.map(nameUnit => {
        const parts = progress.intro.units[nameUnit].parts;
        const nameParts = Object.keys(parts);
        nameParts.map(namePart => {
          if (parts[namePart].type === 'read') {
            let completed = progress.intro.units[nameUnit].parts[namePart].completed;
            if (completed > 0) {
              sumCompleted += completed;
              return sumCompleted;
            }
          }
        });
      });
    }
  });
  return sumCompleted;
}

const readPercent = (completed, total) => {
  const percent = (completed / total) * 100;
  return percent;
}

const quizTotal = (progress, courses) => {
  let quiz = [];
  courses.map(course => {
    nameCourse = Object.keys(course).toString();
    if (progress.hasOwnProperty(nameCourse) && progress.intro.hasOwnProperty('units')) {
      const units = progress.intro.units;
      const nameUnits = Object.keys(units);
      nameUnits.map(nameUnit => {
        const parts = progress.intro.units[nameUnit].parts;
        const nameParts = Object.keys(parts);
        nameParts.map(namePart => {
          if (parts[namePart].type === 'quiz') {
            quiz.push(parts[namePart]);
            return quiz;
          }
        });
      });
    }
  });
  return quiz.length;
}

const quizCompleted = (progress, courses) => {
  let sumCompleted = 0;
  courses.map(course => {
    nameCourse = Object.keys(course).toString();
    if (progress.hasOwnProperty(nameCourse) && progress.intro.hasOwnProperty('units')) {
      const units = progress.intro.units;
      const nameUnits = Object.keys(units);
      nameUnits.map(nameUnit => {
        const parts = progress.intro.units[nameUnit].parts;
        const nameParts = Object.keys(parts);
        nameParts.map(namePart => {
          if (parts[namePart].type === 'quiz') {
            let completed = progress.intro.units[nameUnit].parts[namePart].completed;
            if (completed > 0) {
              sumCompleted += completed;
              return sumCompleted;
            }
          }
        });
      });
    }
  });
  return sumCompleted;
}

const quizPercent = (completed, total) => {
  const percent = (completed / total) * 100;
  return percent;
}

const quizScoreSum = (progress, courses) => {
  let sumScore = 0;
  courses.map(course => {
    nameCourse = Object.keys(course).toString();
    if (progress.hasOwnProperty(nameCourse) && progress.intro.hasOwnProperty('units')) {
      const units = progress.intro.units;
      const nameUnits = Object.keys(units);
      nameUnits.map(nameUnit => {
        const parts = progress.intro.units[nameUnit].parts;
        const nameParts = Object.keys(parts);
        nameParts.map(namePart => {
          if (parts[namePart].type === 'quiz' && parts[namePart].hasOwnProperty('score')) {
            let score = progress.intro.units[nameUnit].parts[namePart].score;
            sumScore += score;
            return sumScore;
          }
        });
      });
    }
  });
  return sumScore;
}

const quizScoreAvg = (sumScore, completed) => {
  const percent = sumScore / completed;
  return percent;
}

const createTableWithData = (users, progress, courses) => {
  headTable.innerHTML = "";
  resultTable.innerHTML = "";
  headTable.innerHTML =
    "<tr> <th scope='col' rowspan='2'>Alumnas</th>" +
    "<th scope='col' rowspan='2'>Porcentaje</th>" +
    "<th scope='col' colspan='3'>Ejercicios</th>" +
    "<th scope='col' colspan='3'>Lecturas</th>" +
    "<th scope='col' colspan='5'>Lecturas</th> </tr>" +
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
  const data = computeUsersStats(users, progress, courses);
  data.map(d => {
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
  });
  //se cierra el loading
  loader.style.display = "none";
}

selectSedes.addEventListener('change', () => switchSedes(selectSedes.options[selectSedes.selectedIndex].value));

selectPromos.addEventListener('change', () => getCohortsJson(selectPromos.options[selectPromos.selectedIndex].value));

selectCursos.addEventListener('change', () => getProgressJson((selectPromos.options[selectPromos.selectedIndex].value), selectCursos.options[selectCursos.selectedIndex].value));
