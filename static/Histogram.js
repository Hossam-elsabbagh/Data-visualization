fetch('/get-datachart-histogram')
  .then(response => response.json())
  .then(data => renderHistogram(data))
  .catch(error => console.error('Error fetching histogram data:', error));

function renderHistogram(sourceData) {
  var maxCols = 10; 
  var data = getHistogramData(sourceData, maxCols);

  function getHistogramData(source, maxCols) {
    var data = [];
    var min = Math.min.apply(null, source);
    var max = Math.max.apply(null, source);
    var range = max - min;
    var step = range / maxCols;

    for (var i = 0; i < maxCols; i++) {
      var from = min + i * step;
      var to = min + (i + 1) * step;
      data.push({ from: from.toFixed(2), to: to.toFixed(2), count: 0 });
    }
    
    for (var i = 0; i < source.length; i++) {
      var value = source[i];
      var item = data.find(function (el) {
        return (value >= el.from) && (value <= el.to);
      });
      if (item) item.count++;
    }

    return data;
  }

  var root = am5.Root.new("chartdiv-histogram");
  root.setThemes([am5themes_Animated.new(root)]);
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
  }));

  var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
    categoryField: "from",
    renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }),
    tooltip: am5.Tooltip.new(root, {})
  }));

  xAxis.data.setAll(data);

  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    maxPrecision: 0,
    renderer: am5xy.AxisRendererY.new(root, {})
  }));

  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "count",
    categoryXField: "from"
  }));

  series.columns.template.setAll({
    tooltipText: "From {categoryX} to {to}: {valueY}",
    width: am5.percent(90),
    tooltipY: 0
  });

  series.data.setAll(data);
  series.appear(1000);
}
