let selectSede, selectPromo, selectTrack, selectTurno;
let functSede, functPromo, functTrack, functTurno;
let objectUsers, objectProgress, objectCohorts;
let xhttpUsers = new XMLHttpRequest();
let xhttpProgress = new XMLHttpRequest();
let xhttpCohorts = new XMLHttpRequest();

selectSede = document.getElementById('selectSedes');
selectPromo = document.getElementById('selectPromos');
selectTrack = document.getElementById('selectTracks');
selectTurno = document.getElementById('selectTurnos');
objectUsers = document.getElementById('objectUsers');
objectProgress = document.getElementById('objectProgress');
objectCohorts = document.getElementById('objectCohorts');

xhttpProgress.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/progress.json', true);
xhttpUsers.open('GET', '../data/cohorts/lim-2018-03-pre-core-pw/users.json', true);
xhttpCohorts.open('GET', '../data/cohorts.json', true);

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
  xhttpProgress.onload = () => {
    if (xhttpProgress.readyState == 4 && xhttpProgress.status == 200) {
      let progressjson = JSON.parse(xhttpProgress.responseText);
      let arrProgress = Object.keys(progressjson);
      for (let index = 0; index < arrProgress.length; index++) {
        const element = arrProgress[index];
        console.log(element);
        
        // by Lalo
        // Object.keys(arrProgress[index]).find(key => 
        //   key === '00hJv4mzvqM3D9kBy3dfxoJyFV82'
        // );
        
        // by Lulu
        // var arrProperty = Object.keys(miObject);
        // for (var i = 0; i < arrProperty.length; i++) {
        //   console.log(miObject[arrProperty[i]]);
        // }

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
  xhttpUsers.onload = () => {
    if (xhttpUsers.readyState == 4 && xhttpUsers.status == 200) {
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

getCohorts = () => {
  xhttpCohorts.onload = () => {
    if (xhttpCohorts.readyState == 4 && xhttpCohorts.status == 200) {
      let cohortsjson = JSON.parse(xhttpCohorts.responseText);
      console.log(cohortsjson);
    }
  };
  xhttpCohorts.send();
}

selectSede.addEventListener('change', () => functSede());
selectPromo.addEventListener('change', () => functPromo());
selectTrack.addEventListener('change', () => functTrack());
selectTurno.addEventListener('change', () => functTurno());
objectUsers.addEventListener('click', () => getAlumnas());
objectProgress.addEventListener('click', () => getProgress());
objectCohorts.addEventListener('click', () => getCohorts());
