let selectSede, selectPromo, selectTrack, selectTurno;
let functSede, functPromo, functTrack, functTurno;
let objectUsers, objectProgress;

objectUsers = document.getElementById("objectUsers");
selectSede = document.getElementById("selectSedes");
selectPromo = document.getElementById("selectPromos");
selectTrack = document.getElementById("selectTracks");
selectTurno = document.getElementById("selectTurnos");
objectProgress = document.getElementById("objectProgress");

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

// Grafica estatica
// let chart = new CanvasJS.Chart("chartContainer", {
//   animationEnabled: true,
//   theme: "light2",
//   title: {
//     text: "Gráfico de avance"
//   },
//   axisX: {
//     interval: 1
//   },
//   axisY: {
//     interval: 10,
//     suffix: "%"
//   },
//   data: [{
//       type: "bar",
//       name: "am",
//       legendText: "Turno AM",
//       showInLegend: true,
//       axisYType: "secondary", //Para que todos tengan el mismo color de barra
//       color: "#FFF70F",
//       dataPoints: [{
//           y: 30,
//           label: "Quizzes"
//         },
//         {
//           y: 100,
//           label: "Lectura leídas"
//         },
//         {
//           y: 50,
//           label: "Ejercicios completados"
//         }
//       ]
//     },
//     {
//       type: "bar",
//       name: "pm",
//       legendText: "Turno PM",
//       showInLegend: true,
//       axisYType: "secondary",
//       color: "#FF0061",
//       dataPoints: [{
//           y: 50,
//           label: "Quizzes"
//         },
//         {
//           y: 80,
//           label: "Lectura leídas"
//         },
//         {
//           y: 100,
//           label: "Ejercicios completados"
//         }
//       ]
//     }
//   ]
// });
// chart.render();

let xhttpUsers = new XMLHttpRequest();
xhttpUsers.open("GET", "../data/cohorts/lim-2018-03-pre-core-pw/users.json", true);
let xhttpProgress = new XMLHttpRequest();
xhttpProgress.open("GET", "../data/cohorts/lim-2018-03-pre-core-pw/progress.json", true);

getProgress = () => {
  xhttpProgress.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
      let progressjson = JSON.parse(xhttpProgress.responseText);
      let arrProgress = Object.keys(progressjson);
      for (let index = 0; index < arrProgress.length; index++) {
        console.log(progressjson[arrProgress[index]]);
        // const element = progressjson[index].name;
        // let createP = document.createElement("p");
        // data.appendChild(createP);
        // let myTextNode = document.createTextNode(element + " ");
        // createP.appendChild(myTextNode);
      }
    }
  };
  xhttpProgress.send();
}

getAlumnas = () => {
  xhttpUsers.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
      let usersjson = JSON.parse(xhttpUsers.responseText);
      for (let index = 0; index < usersjson.length; index++) {
        const element = usersjson[index].name;
        let createP = document.createElement("p");
        dataUsers.appendChild(createP);
        let myTextNode = document.createTextNode(element + " ");
        createP.appendChild(myTextNode);
      }
    }
  };
  xhttpUsers.send();
}




selectSede.addEventListener('change', () => functSede());
selectPromo.addEventListener('change', () => functPromo());
selectTrack.addEventListener('change', () => functTrack());
selectTurno.addEventListener('change', () => functTurno());
objectUsers.addEventListener('click', () => getAlumnas());
objectProgress.addEventListener('click', () => getProgress());
