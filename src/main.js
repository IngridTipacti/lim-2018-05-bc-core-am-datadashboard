const selectSedes = document.getElementById('selectSedes');
const selectPromos = document.getElementById('selectPromos');

// método para reducir condigo, solo cambia la url para el request
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

switchSedes = (option) => {
  switch (option) {
    case 'lim':
      selectPromos.disabled = false;
      filterProm('lim');
      break;
    case 'scl':
      selectPromos.disabled = false;
      filterProm('scl');
      break;
    case 'cdm':
      selectPromos.disabled = false;
      filterProm('cdm');
      break;
    case 'gdl':
      selectPromos.disabled = false;
      filterProm('gdl');
      break;
    case 'aqp':
      selectPromos.disabled = false;
      filterProm('aqp');
      break;
    default:
      // selectPromos.innerHTML = "";
      selectPromos.disabled = true;
      break;
  }
}

// Filtraciones de Cohorts por los 3primeros caracteres para ubicar a que sedes pertenece
const filterProm = (promo) => {
  selectPromos.innerHTML = "";
  getData('../data/cohorts.json', (err, cohortjson) => {
    cohortjson.map((promotion) => {
      let idPromo = promotion.id;
      if (promo === idPromo.substring(0, 3)) {
        selectPromos.innerHTML += "<option value='" + idPromo + "'>" + idPromo + "</option>";
      }
    });
    filterUsers(cohortjson);
  });
}

const filterUsers = (cohortjson) => {
  getData('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, userjson) => {
  });
}




selectSedes.addEventListener('change', () => switchSedes(selectSedes.options[selectSedes.selectedIndex].value));







// getProgress get getCohorts y getData son para jalar la data de manera global y reutilizar codigo
getProgress = () => {
  getData('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, progressjson) => {
    let arrProgress = Object.keys(progressjson);
    for (let index = 0; index < arrProgress.length; index++) {
      let element = arrProgress[index];
    }
  });
}

