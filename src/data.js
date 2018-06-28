// Creando función con tres parametros y exportando al global
window.computeUsersStats = (users, progress, courses) => {
  // Recorriendo data users con map porque es un array de objetos
  let usersWithStats = users.map((user) => {
    const prog = progress[user.id];
    console.log(prog)
    console.log(courses)
    // courses.map(course => {
    nameCourse = courses.toString();
    console.log(nameCourse);
    if (prog.hasOwnProperty(nameCourse) && prog.intro.hasOwnProperty('units')) {
      const units = prog.intro.units;
      const nameUnits = Object.keys(units);

      let percentStats = () => {
        progressTotal = nameUnits.reduce((sumProgress, u) => {
          sumProgress += units[u].percent / nameUnits.length;
          return sumProgress;
        }, 0);
        return Math.round(progressTotal);
      }

      let exerTotal = () => {
        nameUnits.map(nameUnit => {
          const parts = prog.intro.units[nameUnit].parts;
          const nameParts = Object.keys(parts);
          nameParts.map(namePart => {
            if (prog.intro.units[nameUnit].parts[namePart].hasOwnProperty('exercises')) {
              const exercises = prog.intro.units[nameUnit].parts[namePart].exercises;
              const nameExercises = Object.keys(exercises);
              totalExer = nameExercises.map(nameExercise => {
                let total = Object.keys(prog.intro.units[nameUnit].parts[namePart].exercises[nameExercise]);
                return total;
              });
              return totalExer.length;
            }
          });
        });
        return totalExer.length;
      }

      let exerCompleted = () => {
        let sumCompleted = 0;
        nameUnits.map(nameUnit => {
          const parts = prog.intro.units[nameUnit].parts;
          const nameParts = Object.keys(parts);
          nameParts.map(namePart => {
            if (prog.intro.units[nameUnit].parts[namePart].hasOwnProperty('exercises')) {
              const exercises = prog.intro.units[nameUnit].parts[namePart].exercises;
              const nameExercises = Object.keys(exercises);
              nameExercises.map(nameExercise => {
                if (prog.intro.units[nameUnit].parts[namePart].exercises[nameExercise].hasOwnProperty('completed')) {
                  let completed = prog.intro.units[nameUnit].parts[namePart].exercises[nameExercise].completed;
                  if (completed > 0) {
                    sumCompleted += completed;
                    return sumCompleted;
                  }
                }
              });
            }
          });
        });
        return sumCompleted;
      }

      let exerPercent = (completed, total) => {
        if (completed !== 0 && total !== 0) {
          const percent = (completed / total) * 100;
          return Math.round(percent);
        } else return 0;
      }

      let readTotal = () => {
        let reads = [];
        nameUnits.map(nameUnit => {
          const parts = prog.intro.units[nameUnit].parts;
          const nameParts = Object.keys(parts);
          nameParts.map(namePart => {
            if (parts[namePart].type === 'read') {
              reads.push(parts[namePart]);
              return reads;
            }
          });
        });
        return reads.length;
      }

      let readCompleted = () => {
        let sumCompleted = 0;
        nameUnits.map(nameUnit => {
          const parts = prog.intro.units[nameUnit].parts;
          const nameParts = Object.keys(parts);
          nameParts.map(namePart => {
            if (parts[namePart].type === 'read') {
              let completed = prog.intro.units[nameUnit].parts[namePart].completed;
              if (completed > 0) {
                sumCompleted += completed;
                return sumCompleted;
              }
            }
          });
        });
        return sumCompleted;
      }

      let readPercent = (completed, total) => {
        if (completed !== 0 && total !== 0) {
          const percent = (completed / total) * 100;
          return Math.round(percent);
        } else return 0;
      }

      let quizTotal = () => {
        let quiz = [];
        nameUnits.map(nameUnit => {
          const parts = prog.intro.units[nameUnit].parts;
          const nameParts = Object.keys(parts);
          nameParts.map(namePart => {
            if (parts[namePart].type === 'quiz') {
              quiz.push(parts[namePart]);
              return quiz;
            }
          });
        });
        return quiz.length;
      }

      let quizCompleted = () => {
        let sumCompleted = 0;
        nameUnits.map(nameUnit => {
          const parts = prog.intro.units[nameUnit].parts;
          const nameParts = Object.keys(parts);
          nameParts.map(namePart => {
            if (parts[namePart].type === 'quiz') {
              let completed = prog.intro.units[nameUnit].parts[namePart].completed;
              if (completed > 0) {
                sumCompleted += completed;
                return sumCompleted;
              }
            }
          });
        });
        return sumCompleted;
      }

      let quizPercent = (completed, total) => {
        if (completed !== 0 && total !== 0) {
          const percent = (completed / total) * 100;
          return Math.round(percent);
        } else return 0;
      }

      let quizScoreSum = () => {
        let sumScore = 0;
        nameUnits.map(nameUnit => {
          const parts = prog.intro.units[nameUnit].parts;
          const nameParts = Object.keys(parts);
          nameParts.map(namePart => {
            if (parts[namePart].type === 'quiz' && parts[namePart].hasOwnProperty('score')) {
              let score = prog.intro.units[nameUnit].parts[namePart].score;
              sumScore += score;
              return sumScore;
            }
          });
        });
        return sumScore;
      }

      let quizScoreAvg = (sumScore, completed) => {
        if (sumScore !== 0 && completed !== 0) {
          const percent = sumScore / completed;
          return Math.round(percent);
        }
        else return 0;
      }

      user.stats = {
        percent: percentStats(),
        exercises: {
          total: exerTotal(),
          completed: exerCompleted(),
          percent: exerPercent(exerCompleted(), exerTotal()),
        },
        reads: {
          total: readTotal(),
          completed: readCompleted(),
          percent: readPercent(readCompleted(), readTotal())
        },
        quizzes: {
          total: quizTotal(),
          completed: quizCompleted(),
          percent: quizPercent(quizCompleted(), quizTotal()),
          scoreSum: quizScoreSum(),
          scoreAvg: quizScoreAvg(quizScoreSum(), quizCompleted())
        }
      }
    }
    return user;
  });
  // console.log(usersWithStats);
  return usersWithStats;
}

window.sortUsers = (users, orderBy, orderDirection) => {
      const orderByName = users.sort(function (a, b) {
      // console.log(a);
      // console.log(b);
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    });
    console.log(orderByName);
    // return orderByName;
  
  
}


window.filterUsers = (users, search) => {
  let filterByUsers = users.filter(user => {
    return user.name.toUpperCase().indexOf(search) > -1;
  });
  console.log(filterByUsers)
  return filterByUsers;
}

window.processCohortData = (options) => {
  const compute = computeUsersStats(options.cohortData.users, options.cohortData.progress, options.cohort);
  // console.log(compute);
  const sort = sortUsers(compute, options.orderBy, options.orderDirection);
  if (options.search !== '') {
    let filterU = filterUsers(compute, options.search);
  }

  // let estudiantes = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
  //   estudiantes = sortUsers(estudiantes, options.orderBy, options.orderDirection);
  //   if (options.search !== '') {
  //     estudiantes = filterUsers(users, search);
  //   }
  //   return estudiantes;
}
