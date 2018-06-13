computeUserStats = (users, progress, courses) => {users, progress, courses}

sortUsers = (users, orderBy, orderDirection) => {users, orderBy, orderDirection}

filterUsers = (users, search) => {users, search}

processCohortData = (options) => {options}




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