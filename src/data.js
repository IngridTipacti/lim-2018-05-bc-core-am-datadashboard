window.computeUsersStats = (users, progress, courses) => {
  let usersWithStats = users.map((user) => {
    user.stats = {
      percent: Math.round(percentStats(progress[user.id], courses)),
      exercises: {
        total: exerTotal(progress[user.id], courses).length,
        completed: exerCompleted(progress[user.id], courses),
        percent: Math.round(exerPercent(exerCompleted(progress[user.id], courses), exerTotal(progress[user.id], courses).length))
      },
      reads: {
        total: readTotal(progress[user.id], courses),
        completed: readCompleted(progress[user.id], courses),
        percent: Math.round(readPercent(readCompleted(progress[user.id], courses), readTotal(progress[user.id], courses)))
      },
      quizzes: {
        total: quizTotal(progress[user.id], courses),
        completed: quizCompleted(progress[user.id], courses),
        percent: Math.round(quizPercent(quizCompleted(progress[user.id], courses), quizTotal(progress[user.id], courses))),
        scoreSum: quizScoreSum(progress[user.id], courses),
        scoreAvg: Math.round(quizScoreAvg(quizScoreSum(progress[user.id], courses), quizCompleted(progress[user.id], courses)))
      }
    }
    return user;
  });
  console.log(usersWithStats);
  return usersWithStats;
}

window.sortUsers = (users, orderBy, orderDirection) => {
  users,
  orderBy,
  orderDirection
}

window.filterUsers = (users, search) => {
  users,
  search
}

window.processCohortData = (options) => {
  options
}


// const coursesProgress = courses.map((course) => {
  //   let usersWithStats = users.map((user) => {
  //     const userBackup = { ...user };
  //     const userProgress = progress[userBackup.id];
  //     const coursesName = Object.keys(userProgress);
  //     if (userProgress.hasOwnProperty('intro') && Object.keys(course).toString() === Object.keys(userProgress).toString()) {
  //arre acá va la logica de la funcion
  // const intro = userProgress.intro;
  // const nameUnits = Object.keys(intro.units);

  // RECORRIDO PARA COMPROBAR LOS EJERCICIOS.
  // const obj = coursesName.map(course => {
  //   const unitsName = Object.keys(progress[user.id][course].units);
  //   unitsName.map(unitName => {
  //     const partsName = Object.keys(progress[user.id][course].units[unitName].parts);
  //     partsName.map(partName => {
  //       if (progress[user.id][course].units[unitName].parts[partName].hasOwnProperty('exercises')) {
  //         const size = Object.values(progress[user.id][course].units[unitName].parts[partName].exercises);
  //         return size;
  //       }
  //     });
  // return partsName;
  // });
  // return unitsName;
  // });
  // console.log(obj)

