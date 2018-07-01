window.computeUsersStats = (users, progress, courses) => {
  let usersWithStats = users.map((user) => {
    const prog = progress[user.id];
    nameCourse = courses.toString();
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
          const parts = units[nameUnit].parts;
          const nameParts = Object.keys(parts);
          nameParts.map(namePart => {
            if (parts[namePart].hasOwnProperty('exercises')) {
              const exercises = parts[namePart].exercises;
              const nameExercises = Object.keys(exercises);
              totalExer = nameExercises.map(nameExercise => {
                let total = Object.keys(parts[namePart].exercises[nameExercise]);
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
          const parts = units[nameUnit].parts;
          const nameParts = Object.keys(parts);
          nameParts.map(namePart => {
            if (parts[namePart].hasOwnProperty('exercises')) {
              const exercises = parts[namePart].exercises;
              const nameExercises = Object.keys(exercises);
              nameExercises.map(nameExercise => {
                if (exercises[nameExercise].hasOwnProperty('completed')) {
                  let completed = exercises[nameExercise].completed;
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
          const parts = units[nameUnit].parts;
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
          const parts = units[nameUnit].parts;
          const nameParts = Object.keys(parts);
          nameParts.map(namePart => {
            if (parts[namePart].type === 'read') {
              let completed = parts[namePart].completed;
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
          const parts = units[nameUnit].parts;
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
          const parts = units[nameUnit].parts;
          const nameParts = Object.keys(parts);
          nameParts.map(namePart => {
            if (parts[namePart].type === 'quiz') {
              let completed = parts[namePart].completed;
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
          const parts = units[nameUnit].parts;
          const nameParts = Object.keys(parts);
          nameParts.map(namePart => {
            if (parts[namePart].type === 'quiz' && parts[namePart].hasOwnProperty('score')) {
              let score = parts[namePart].score;
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
        } else return 0;
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
    } else {
      user.stats = {
        percent: 0,
        exercises: {
          total: 0,
          completed: 0,
          percent: 0,
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
    }
    return user;
  });
  return usersWithStats;
}

window.sortUsers = (users, orderBy, orderDirection) => {
    const newUsers = users.filter(user => user.stats !== undefined);
  if (orderBy === 'name' & orderDirection === 'asc') {
    const nameAsc = newUsers.sort(function (a, b) {
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    });
    return nameAsc;
  } else if (orderBy === 'name' & orderDirection === 'des') {
    const nameDes = newUsers.sort(function (a, b) {
      const x = a.name.toLowerCase();
      const y = b.name.toLowerCase();
      if (x < y) { return 1; }
      if (x > y) { return -1; }
      return 0;
    });
    return nameDes;
  } else if (orderBy === 'exer' && orderDirection === 'asc') {
    const exerAsc = newUsers.sort(function (a, b) { return a.stats.exercises.percent - b.stats.exercises.percent });
    return exerAsc;
  } else if (orderBy === 'exer' && orderDirection === 'des') {
    const exerDes = newUsers.sort(function (a, b) { return b.stats.exercises.percent - a.stats.exercises.percent });
    return exerDes;
  } else if (orderBy === 'percTotal' && orderDirection === 'asc') {
    const percAsc = newUsers.sort(function (a, b) { return a.stats.percent - b.stats.percent });
    return percAsc;
  } else if (orderBy === 'percTotal' && orderDirection === 'des') {
    const percDes = newUsers.sort(function (a, b) { return b.stats.percent - a.stats.percent });
    return percDes;
  } else if (orderBy === 'read' && orderDirection === 'asc') {
    const readAsc = newUsers.sort(function (a, b) { return a.stats.reads.percent - b.stats.reads.percent });
    return readAsc;
  } else if (orderBy === 'read' && orderDirection === 'des') {
    const readDes = newUsers.sort(function (a, b) { return b.stats.reads.percent - a.stats.reads.percent });
    return readDes;
  } else if (orderBy === 'quiz' && orderDirection === 'asc') {
    const quizAsc = newUsers.sort(function (a, b) { return a.stats.quizzes.percent - b.stats.quizzes.percent });
    return quizAsc;
  } else if (orderBy === 'quiz' && orderDirection === 'des') {
    const quizDes = newUsers.sort(function (a, b) { return b.stats.quizzes.percent - a.stats.quizzes.percent });
    return quizDes;
  } else if (orderBy === 'scAvg' && orderDirection === 'asc') {
    const scoreAvgAsc = newUsers.sort(function (a, b) { return a.stats.quizzes.scoreAvg - b.stats.quizzes.scoreAvg });
    return scoreAvgAsc;
  } else if (orderBy === 'scAvg' && orderDirection === 'des') {
    const scoreAvgDes = newUsers.sort(function (a, b) { return b.stats.quizzes.scoreAvg - a.stats.quizzes.scoreAvg });
    return scoreAvgDes;
  }
}

window.filterUsers = (users, search) => {
  let filterByUsers = users.filter(user => {
    return user.name.toUpperCase().indexOf(search) > -1;
  });
  return filterByUsers;
}

//Se cambio elnombre de la variable compute por students"
window.processCohortData = (options) => {
  // let arr = Object.keys(options.cohort);
  // let courses = Object.keys(options.cohort[arr].coursesIndex);
  let students = computeUsersStats(options.cohortData.users, options.cohortData.progress, options.cohort);
  students = sortUsers(students, options.orderBy, options.orderDirection);
  if (options.search !== '') {
    students = filterUsers(students, options.search);
    return students;
  }
  return students;
}
