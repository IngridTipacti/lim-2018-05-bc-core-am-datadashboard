let selectSede, selectPromo, selectTrack, selectTurno;
let functSede, functPromo, functTrack, functTurno;
let objectUsers, objectProgress, objectCohorts;
let setTable, tableUsers;

selectSede = document.getElementById('selectSedes');
selectPromo = document.getElementById('selectPromos');
selectTrack = document.getElementById('selectTracks');
selectTurno = document.getElementById('selectTurnos');
objectUsers = document.getElementById('objectUsers');
objectProgress = document.getElementById('objectProgress');
objectCohorts = document.getElementById('objectCohorts');
setTable = document.getElementById('setTable');
tableUsers = document.getElementById('tableUsers');

// generando tabla con js
generateTable = () => {
  let caracter = '';
  caracter += '<tr>'
  caracter += '<th>Alumna</th>';
  caracter += '<th>Cursos</th>';
  caracter += '<th>Duracion</th>';
  caracter += '<th>Total</th>';
  caracter += '<th>Completado</th>';
  caracter += '<th>Porcentaje</th>';
  caracter += '</tr>'

  // trabajar esto para mostrar data de tabla ordenada
  // getData('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, usersjson) => {
  //   getData('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, progressjson) => {
  //     for (let index = 0; index < usersjson.length; index++) {
  //       console.log(usersjson[index].name);
  //       let arrProgress = Object.keys(progressjson);
  //       for (let index = 0; index < arrProgress.length; index++) {}
  //     }
  //   });
  // });

  // Este codigo esta funcionando pero no mostrando la data en el lugar que le corresponde con el nombre
  getData('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, usersjson) => {
    for (let index = 0; index < usersjson.length; index++) {
      var userId = usersjson[index].id;
      const userName = usersjson[index].name;
      caracter += '<tr id=\'user-tabla-' + userId + '\'>'
      caracter += '<td>' + userName + '</td>' + '<br>';
      // caracter += '</tr>';
    }
    // tableUsers.innerHTML = caracter;
  });
  getData('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, progressjson) => {
    let arrProgress = Object.keys(progressjson);
    for (let index = 0; index < arrProgress.length; index++) {
      let element = arrProgress[index];
      let curseName = (Object.keys(progressjson[element])[0]);
      if (curseName === 'intro') {
        let duration = progressjson[element].intro.totalDuration;
        // console.log(duration);
        let unidadesTotales = progressjson[element].intro.totalUnits;
        // console.log(unidadesTotales);
        let unidadesCompletadas = progressjson[element].intro.completedUnits;
        // console.log(unidadesCompletadas);
        let percent = progressjson[element].intro.percent + "%";
        // console.log(percent);
        // caracter += '<tr>'
        caracter += '<td>' + curseName + '</td>' + '<br>';
        // caracter += '</tr>';
        // caracter += '<tr>'
        caracter += '<td>' + duration + '</td>' + '<br>';
        // caracter += '</tr>';
        // caracter += '<tr>'
        caracter += '<td>' + unidadesTotales + '</td>' + '<br>';
        // caracter += '</tr>';
        // caracter += '<tr>'
        caracter += '<td>' + unidadesCompletadas + '</td>' + '<br>';
        // caracter += '</tr>';
        // caracter += '<tr>'
        caracter += '<td>' + percent + '</td>' + '<br>';
        caracter += '</tr>';
      } else {
        // caracter += '<tr>'
        caracter += '<td>' + 'Curso' + '</td>' + '<br>';
        caracter += '</tr>';
      }

      // if (element === '00hJv4mzvqM3D9kBy3dfxoJyFV82') {
      //   console.log(progressjson[element].intro);
      //   getAlumnaById(element);
      // }
    }
    console.log(caracter);
    tableUsers.innerHTML = caracter;
  });
}


switchSedes = (option) => {
  switch (option) {
    case 'lim':
      console.log("Lima");
      break;
    case 'sch':
      console.log("Santiago");
      break;
    case 'cdmx':
      console.log("Ciudad de Mexico");
      break;
    case 'gua':
      console.log("Guadalajara");
      break;
    case 'spa':
      console.log("Sao Paulo");
      break;
    case 'are':
      console.log("Arequipa");
      break;
    default:
      console.log("probando el default");
      break;
  }
}

switchPromos = (option) => {
  switch (option) {
    case 'ii18':
      console.log("2018-II");
      break;
    case 'i18':
      console.log("2018-I");
      break;
    case 'ii17':
      console.log("2017-II");
      break;
    case 'i17':
      console.log("2017-I");
      break;
    case 'ii16':
      console.log("2016-II");
      break;
    case 'i16':
      console.log("2016-I");
      break;
    case 'ii15':
      console.log("2015-II");
      break;
    case 'i15':
      console.log("2015-I");
      break;
    default:
      console.log("probando el default");
      break;
  }
}

switchTracks = (option) => {
  switch (option) {
    case 'core':
      console.log("Common Core");
      break;
    case 'front':
      console.log("Front-end");
      break;
    case 'selec':
      console.log("Selección");
      break;
    case 'ux':
      console.log("UX");
      break;
    default:
      console.log("probando el default");
      break;
  }
}

switchTurnos = (option) => {
  switch (option) {
    case 'am':
      console.log("AM");
      break;
    case 'pm':
      console.log("PM");
      break;
    default:
      console.log("probando el default");
      break;
  }
}

functSede = () => {
  document.getElementById("selectPromos").disabled = false;
  switchSedes(selectSede.options[selectSede.selectedIndex].value);
};
functPromo = () => {
  document.getElementById("selectTracks").disabled = false;
  // document.getElementById("bargraphTurno").classList.remove('none');
  switchPromos(selectPromo.options[selectPromo.selectedIndex].value);
};
functTrack = () => {
  document.getElementById("selectTurnos").disabled = false;
  switchTracks(selectTrack.options[selectTrack.selectedIndex].value);
};
functTurno = () => {
  document.getElementById("selectTurnos").disabled = false;
  switchTurnos(selectTurno.options[selectTurno.selectedIndex].value);
};

getProgress = () => {
  getData('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, progressjson) => {
    let arrProgress = Object.keys(progressjson);
    for (let index = 0; index < arrProgress.length; index++) {
      let element = arrProgress[index];
      if (element === '00hJv4mzvqM3D9kBy3dfxoJyFV82') {
        console.log(progressjson[element].intro);
        // document.getElementById('percent').innerHTML = progressjson[element].intro.percent + "%";
        // document.getElementById('total-unid-ejer').innerHTML = progressjson[element].intro.totalUnits;
        // document.getElementById('complet-unid-ejer').innerHTML = progressjson[element].intro.completedUnits;
        getAlumnaById(element);
      }
    }
  });
}

getAlumnas = () => {
  getData('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, usersjson) => {
    for (let index = 0; index < usersjson.length; index++) {
      const element = usersjson[index].name;
      let createP = document.createElement("p");
      dataUsers.appendChild(createP);
      let myTextNode = document.createTextNode(element + " ");
      createP.appendChild(myTextNode);
    }
  });
}

getAlumnaById = (idAlumna) => {
  getData('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, usersjson) => {
    for (let index = 0; index < usersjson.length; index++) {
      const element = usersjson[index].id;
      if (element === idAlumna) {
        // document.getElementById('name-user').innerHTML = usersjson[index].name;
        console.log(usersjson[index].name);
      }
    }
  });
}

getCohorts = () => {
  getData('../data/cohorts.json', (err, xhrjson) => {
    console.log(xhrjson);
  });
}

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

selectSede.addEventListener('change', () => functSede());
selectPromo.addEventListener('change', () => functPromo());
selectTrack.addEventListener('change', () => functTrack());
selectTurno.addEventListener('change', () => functTurno());
objectUsers.addEventListener('click', () => getAlumnas());
objectProgress.addEventListener('click', () => getProgress());
objectCohorts.addEventListener('click', () => getCohorts());
setTable.addEventListener('click', () => generateTable());
