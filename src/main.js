// var c = document.getElementById("myCanvas");
// var ctx = c.getContext("2d");
// ctx.beginPath();
// ctx.arc(95,50,40,0,2*Math.PI);
// ctx.font = "30px Arial";
// ctx.fillStyle = "#bdbdbd";
// ctx.fillText("AJ", 75, 60);
// ctx.stroke();

let chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2",
    title: {text: "Gráfico de avance"},
    axisX: {interval: 1},
    axisY: {interval: 10, suffix: "%"},
    data: [{
        type: "bar",
        name: "am",
        legendText: "Turno AM",
        showInLegend: true,
        axisYType: "secondary", //Para que todos tengan el mismo color de barra
        color: "#FFF70F",
        dataPoints: [
			{y: 30, label: "Quizzes"},
        	{y: 100, label: "Lectura leídas"},
        	{y: 50, label: "Ejercicios completados"}
        ]
    },
    {
        type: "bar",
        name: "pm",
        legendText: "Turno PM",
        showInLegend: true,
        axisYType: "secondary", //Para que todos tengan el mismo color de barra
        color: "#FF0061",
        dataPoints: [
			{y: 50, label: "Quizzes"},
        	{y: 80, label: "Lectura leídas"},
        	{y: 100, label: "Ejercicios completados"}
        ]
    }
    ]
});
chart.render();
