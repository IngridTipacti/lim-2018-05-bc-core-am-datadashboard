window.computeUsersStats = (users, progress, courses) => {
  console.log(users);
  console.log(progress);
  console.log(courses);









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

        // const percentTotal = nameUnits.reduce((sumProgress, u) => {
        //   sumProgress += intro.units[u].percent / nameUnits.length;
        //   return sumProgress;
        // }, 0);
        // const exeTotal;
        // const exeCompleted;
        // const exePercent;
        // const readTotal;
        // const readCompleted;
        // const readPercent;
        // const quizzTotal;
        // const quizzCompleted;
        // const quizzPercent;
        // const quizzScoreSum;
        // const quizzScoreAvg;

        // return percentTotal;
      //   return obj;
      // }
      // return user;
    // });
    // console.log(usersWithStats);
    // return course;
  // });
  // console.log(coursesProgress);
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
