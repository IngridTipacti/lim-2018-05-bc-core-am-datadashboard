const selectSedes = document.getElementById('selectSedes');
const selectPromos = document.getElementById('selectPromos');
const selectCursos = document.getElementById('selectCursos');

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
  });
}

// const filterUsers = (cohortjson) => {
//   getData('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, userjson) => {
//   });
// }


selectSedes.addEventListener('change', () => switchSedes(selectSedes.options[selectSedes.selectedIndex].value));

// selectPromos.addEventListener('change', () => switchSedes(selectPromos.options[selectPromos.selectedIndex].value));

// selectCursos.addEventListener('change', () => switchSedes(selectCursos.options[selectCursos.selectedIndex].value));



// getProgress get getCohorts y getData son para jalar la data de manera global y reutilizar codigo
getProgress = () => {
  getData('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, progressjson) => {
    let arrProgress = Object.keys(progressjson);
    for (let index = 0; index < arrProgress.length; index++) {
      let element = arrProgress[index];
    }
  });
}

