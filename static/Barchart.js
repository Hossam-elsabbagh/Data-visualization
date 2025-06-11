fetch('/get-datachart-bar')
  .then(response => response.json())
  .then(data => renderBarChart(data))
  .catch(error => console.error('Error fetching bar chart data:', error));

function renderBarChart(chartData) {
  var root = am5.Root.new("barchart-container");
  root.setThemes([am5themes_Animated.new(root)]);

  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
  }));
  var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
    categoryField: "Gender",
    renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }),
    tooltip: am5.Tooltip.new(root, {})
  }));

  xAxis.data.setAll(chartData);

  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  }));

  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "Count",
    categoryXField: "Gender"
  }));

  series.columns.template.setAll({
    tooltipText: "{categoryX}: {valueY}",
    width: am5.percent(80),
    tooltipY: 0
  });

  series.columns.template.adapters.add("fill", function (fill, target) {
    if (target.dataItem.dataContext.Gender === "Female") {
      return am5.color(0xFFB6C1); 
    }
    return fill; 
  });

  series.columns.template.adapters.add("stroke", function (stroke, target) {
    if (target.dataItem.dataContext.Gender === "Female") {
      return am5.color(0xFFB6C1);
    }
    return stroke;
  });

  series.data.setAll(chartData);
  series.appear(1000);
  chart.appear(1000, 100);
}
