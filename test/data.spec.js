describe("data", () => {

  it("debería exponer función computeUsersStats en objeto global", () => {
    assert.isFunction(computeUsersStats);
  });

  it("debería exponer función sortUsers en objeto global", () => {
    assert.isFunction(sortUsers);
  });

  it("debería exponer función filterUsers en objeto global", () => {
    assert.isFunction(filterUsers);
  });

  it("debería exponer función processCohortData en objeto global", () => {
    assert.isFunction(processCohortData);
  });

  describe("computeUsersStats(users, progress, courses)", () => {

    const cohort = fixtures.cohorts.find(item => item.id === "lim-2018-03-pre-core-pw");
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it("debería retornar arreglo de usuarios con propiedad stats", () => {
      const processed = computeUsersStats(users, progress, courses);

      assert.equal(users.length, processed.length);

      processed.forEach(user => {
        assert.ok(user.hasOwnProperty("stats"));
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercises);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
    });

    describe("user.stats para el primer usuario en data de prueba - ver carpeta data/", () => {

      const processed = computeUsersStats(users, progress, courses);

      it(
        "debería tener propiedad percent con valor 53",
        () => assert.equal(processed[0].stats.percent, 53)
      );

      it("debería tener propiedad exercises con valor {total: 2, completed: 0, percent: 0}", () => {
        assert.deepEqual(processed[0].stats.exercises, {
          total: 2,
          completed: 0,
          percent: 0,
        });
      });

      it("debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 29}", () => {
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreSum: 57,
          scoreAvg: 29,
        });
      });

      it("debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}", () => {
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });

    });

  });

  describe("sortUsers(users, orderBy, orderDirection)", () => {
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;
    const processed = computeUsersStats(users, progress, courses);
    it("debería retornar arreglo de usuarios ordenado por nombre ASC", () => {
      const newSortUsers = sortUsers(processed, 'name', 'asc');
      newSortUsers.sort(function (a, b) {
        assert.isAtMost((a.name.toLowerCase() > b.name.toLowerCase()) - (a.name.toLowerCase() < b.name.toLowerCase()), 1)
      });
    });
    it("debería retornar arreglo de usuarios ordenado por nombre DESC", () => {
      const newSortUsers = sortUsers(processed, 'name', 'des');
      newSortUsers.sort(function (a, b) {
        assert.isAtLeast((a.name.toLowerCase() > b.name.toLowerCase()) - (a.name.toLowerCase() < b.name.toLowerCase()), -1)
      });
    });
    it("debería retornar arreglo de usuarios ordenado por porcentaje general ASC", () => {
      const newSortUsers = sortUsers(processed, 'perc', 'asc');
      for (let i = 0; i < newSortUsers.length; i++) {
        assert.isAtMost((newSortUsers[0].stats.percent) - (newSortUsers[1].stats.percent), 0);
      }
    });
    it("debería retornar arreglo de usuarios ordenado por porcentaje general DESC", () => {
      const newSortUsers = sortUsers(processed, 'perc', 'des');
      for (let i = 0; i < newSortUsers.length; i++) {
        assert.isAtLeast((newSortUsers[0].stats.percent) - (newSortUsers[1].stats.percent), 0);
      }
    });
    it("debería retornar arreglo de usuarios ordenado por ejercicios completados ASC", () => {
      const newSortUsers = sortUsers(processed, 'exer', 'asc');
      for (let i = 0; i < newSortUsers.length; i++) {
        assert.isAtMost((newSortUsers[0].stats.exercises.completed) - (newSortUsers[1].stats.exercises.completed), 0);
      }
    });
    it("debería retornar arreglo de usuarios ordenado por ejercicios completados DESC", () => {
      const newSortUsers = sortUsers(processed, 'exer', 'des');
      for (let i = 0; i < newSortUsers.length; i++) {
        assert.isAtLeast((newSortUsers[0].stats.exercises.completed) - (newSortUsers[1].stats.exercises.completed), 0);
      }
    });
    it("debería retornar arreglo de usuarios ordenado por quizzes completados ASC", () => {
      const newSortUsers = sortUsers(processed, 'quiz', 'asc');
      for (let i = 0; i < newSortUsers.length; i++) {
        assert.isAtMost((newSortUsers[0].stats.quizzes.completed) - (newSortUsers[1].stats.quizzes.completed), 0);
      }
    });
    it("debería retornar arreglo de usuarios ordenado por quizzes completados DESC", () => {
      const newSortUsers = sortUsers(processed, 'quiz', 'des');
      for (let i = 0; i < newSortUsers.length; i++) {
        assert.isAtLeast((newSortUsers[0].stats.quizzes.completed) - (newSortUsers[1].stats.quizzes.completed), 0);
      }
    });
    it("debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC", () => {
      const newSortUsers = sortUsers(processed, 'scAvg', 'asc');
      for (let i = 0; i < newSortUsers.length; i++) {
        assert.isAtMost((newSortUsers[0].stats.quizzes.scoreAvg) - (newSortUsers[1].stats.quizzes.scoreAvg), 0);
      }
    });
    it("debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC", () => {
      const newSortUsers = sortUsers(processed, 'scAvg', 'des');
      for (let i = 0; i < newSortUsers.length; i++) {
        assert.isAtLeast((newSortUsers[0].stats.quizzes.scoreAvg) - (newSortUsers[1].stats.quizzes.scoreAvg), 0);
      }
    });
    it("debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC", () => {
      const newSortUsers = sortUsers(processed, 'read', 'asc');
      for (let i = 0; i < newSortUsers.length; i++) {
        assert.isAtMost((newSortUsers[0].stats.reads.completed) - (newSortUsers[1].stats.reads.completed), 0);
      }
    });
    it("debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC", () => {
      const newSortUsers = sortUsers(processed, 'read', 'des');
      for (let i = 0; i < newSortUsers.length; i++) {
        assert.isAtLeast((newSortUsers[0].stats.reads.completed) - (newSortUsers[1].stats.reads.completed), 0);
      }
    });

  });

  describe("filterUsers(users, filterBy)", () => {
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;
    it("debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)", () => {
      const processed = computeUsersStats(users, progress, courses);
      const search = 'Ana';
      const newFilterUsers = filterUsers(processed, search);
      for (let i = 0; i < newFilterUsers.length; i++) {
        assert.isTrue(newFilterUsers[i].name.toUpperCase().indexOf(search.toUpperCase()) > -1, 0);
      }
    });
  });

  describe("processCohortData({ cohortData, orderBy, orderDirection, filterBy })", () => {
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const {users, progress } = fixtures;
    it("debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter", () => {
      const options = {
        cohort: courses,
        cohortData: {
          users: users,
          progress: progress
        },
        orderBy: 'asc',
        orderDirection: 'name',
        search: 'Ana'
      }
      const processed = processCohortData(options);
      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
      });
      processed.sort(function (a, b) {
        assert.isAtMost((a.name.toLowerCase() > b.name.toLowerCase()) - (a.name.toLowerCase() < b.name.toLowerCase()), 1)
      });
      for (let i = 0; i < processed.length; i++) {
        assert.isTrue(processed[i].name.toUpperCase().indexOf(options.search.toUpperCase()) > -1, 0);
      }
    });
  });

});
