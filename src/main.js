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


//NUEVO CODIGO

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
      if (courses[course] !== undefined) {
        let keyCourse = Object.keys(courses[course]);
        keyCourse.map((key) => {
          selectCursos.innerHTML += "<option value='" + keyCourse.toString() + "'>" + courses[course][key].title + "</option>";
        });
      } else {
        selectCursos.disabled = true;
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
  const courses = getCohortsJson(idCohort);
  const users = getUsersJson(idCohort);
  getData('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, progressjson) => {
    if (users.length > 0 && course === "intro") {
      empty.style.display = "none";
      computeUsersStats(users, progressjson, courses);
    } else empty.style.display = "block";
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
          if (parts[namePart].type === 'read'){
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
          if (parts[namePart].type === 'read'){
            let completed = progress.intro.units[nameUnit].parts[namePart].completed;
            if(completed > 0) {
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
          if (parts[namePart].type === 'quiz'){
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
          if (parts[namePart].type === 'quiz'){
            let completed = progress.intro.units[nameUnit].parts[namePart].completed;
            if(completed > 0) {
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
          if (parts[namePart].type === 'quiz' && parts[namePart].hasOwnProperty('score')){
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





//antiguo codigoooooooooooooooooooooooooooooooooooooooooooooooooooooo

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
    if (users > 0) {
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
// const getProgress = (users, courses) => {
//   getData('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, progressjson) => {
//     createTable(users, progressjson, courses);
//   });
// }

const createTable = (users, progress, courses) => {
  let usersWithStats = [];
  resultTable.innerHTML = "";
  for (const course of courses) {
    for (const user of users) {
      // const userCopia = { ...user
      // };
      const userProgress = progress[userCopia.id];
      if (userProgress.hasOwnProperty('intro') && Object.keys(course).toString() === Object.keys(userProgress).toString()) {
        const intro = userProgress.intro;
        const nameUnits = Object.keys(intro.units);
        const progressTotal = nameUnits.reduce((sumProgress, u) => {
          sumProgress += intro.units[u].percent;
          return sumProgress;
        }, 0);
        const uniTotales = nameUnits.reduce((sumTotales) => {
          sumTotales = intro.totalUnits;
          return sumTotales;
        }, 0);
        const uniCompletadas = nameUnits.reduce((sumCompletadas) => {
          sumCompletadas = intro.completedUnits;
          if (sumCompletadas % 1 == 0) return sumCompletadas;
          else return sumCompletadas.toFixed(2);
          // return sumCompletadas;
        }, 0);
        // const exerTotal = nameUnits.map(name => {return name});
        // console.log(exerTotal);
        user.stats = {
          percent: Math.round(progressTotal / Object.keys(intro.units).length),
          totalUnits: uniTotales,
          completedUnits: uniCompletadas
          // exercises: {
          //   total: 0,
          //   completed: 0,
          //   percent: 0
          // },
          // reads: {
          //   total: 0,
          //   completed: 0,
          //   percent: 0
          // },
          // quizzes: {
          //   total: 0,
          //   completed: 0,
          //   percent: 0,
          //   scoreSum: 0,
          //   scoreAvg: 0
          // }
        }
        resultTable.innerHTML += "<tr><th scope='row'>" + userCopia.name + "</th> <td>" + Object.keys(courses[0]).toString() + "</td> <td>" + user.stats.totalUnits + "</td> <td>" + user.stats.completedUnits + "</td> <td>" + user.stats.percent + "%</td></tr>";
      }
    }
  }
  usersWithStats = users;
  console.log(usersWithStats);
}

selectSedes.addEventListener('change', () => switchSedes(selectSedes.options[selectSedes.selectedIndex].value));

selectPromos.addEventListener('change', () => getCohortsJson(selectPromos.options[selectPromos.selectedIndex].value));

selectCursos.addEventListener('change', () => getProgressJson((selectPromos.options[selectPromos.selectedIndex].value), selectCursos.options[selectCursos.selectedIndex].value));
