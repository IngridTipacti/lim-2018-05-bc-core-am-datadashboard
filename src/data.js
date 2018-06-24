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
