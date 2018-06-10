let selectSede, selectPromo, selectTurno, selectTrack;
let functSede, functPromo, functTurno, functTrack;

selectSede = document.getElementById("selectSedes");
selectPromo = document.getElementById("selectPromos");
selectTurno = document.getElementById("selectTurnos");
selectTrack = document.getElementById("selectTracks");

selectSede.addEventListener('change', () => functSede());
selectPromo.addEventListener('change', () => functPromo());
selectTurno.addEventListener('change', () => functTurno());
selectTrack.addEventListener('change', () => functTrack());

functSede = () => {
  document.getElementById("promociones").classList.remove('none');
  switchSedes(selectSede.options[selectSede.selectedIndex].value);
};
functPromo = () => {
	document.getElementById("turnos").classList.remove('none');
	document.getElementById("bargraphTurno").classList.remove('none');
  switchPromos(selectPromo.options[selectPromo.selectedIndex].value);
};
functTurno = () => {
	document.getElementById("tracks").classList.remove('none');
  switchTurnos(selectTurno.options[selectTurno.selectedIndex].value);
};
functTrack = () => {
	switchTracks(selectTrack.options[selectTrack.selectedIndex].value);
};

switchSedes = (option) => {
  switch (option) {
    case 'lim':
      console.log("Lima");
      break;
    case 'sch':
      console.log("Santiago")
      break;
    case 'cdmx':
      console.log("Ciudad de Mexico");
      break;
    case 'gua':
      console.log("Guadalajara")
      break;
    case 'spa':
      console.log("Sao Paulo");
      break;
    case 'are':
      console.log("Arequipa")
      break;
    default:
      console.log("probando el default")
      break;
  }
}

switchPromos = (option) => {
  switch (option) {
    case 'ii18':
      console.log("2018-II");
      break;
    case 'i18':
      console.log("2018-I")
      break;
    case 'ii17':
      console.log("2017-II");
      break;
    case 'i17':
      console.log("2017-I")
      break;
    case 'ii16':
      console.log("2016-II");
      break;
    case 'i16':
      console.log("2016-I")
      break;
    case 'ii15':
      console.log("2015-II");
      break;
    case 'i15':
      console.log("2015-I")
      break;
    default:
      console.log("probando el default")
      break;
  }
}

switchTurnos = (option) => {
  switch (option) {
    case 'am':
      console.log("AM");
      break;
    case 'pm':
      console.log("PM")
      break;
    default:
      console.log("probando el default")
      break;
  }
}

switchTracks = (option) => {
  switch (option) {
    case 'core':
      console.log("Common Core");
      break;
    case 'front':
      console.log("Front-end")
      break;
    case 'ux':
      console.log("UX")
      break;
    default:
      console.log("probando el default")
      break;
  }
}





let chart = new CanvasJS.Chart("chartContainer", {
  animationEnabled: true,
  theme: "light2",
  title: {
    text: "Gráfico de avance"
  },
  axisX: {
    interval: 1
  },
  axisY: {
    interval: 10,
    suffix: "%"
  },
  data: [{
      type: "bar",
      name: "am",
      legendText: "Turno AM",
      showInLegend: true,
      axisYType: "secondary", //Para que todos tengan el mismo color de barra
      color: "#FFF70F",
      dataPoints: [{
          y: 30,
          label: "Quizzes"
        },
        {
          y: 100,
          label: "Lectura leídas"
        },
        {
          y: 50,
          label: "Ejercicios completados"
        }
      ]
    },
    {
      type: "bar",
      name: "pm",
      legendText: "Turno PM",
      showInLegend: true,
      axisYType: "secondary",
      color: "#FF0061",
      dataPoints: [{
          y: 50,
          label: "Quizzes"
        },
        {
          y: 80,
          label: "Lectura leídas"
        },
        {
          y: 100,
          label: "Ejercicios completados"
        }
      ]
    }
  ]
});
chart.render();
