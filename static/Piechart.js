fetch('/get-datachart-pie')
  .then(response => response.json())
  .then(data => renderPieChart(data))
  .catch(error => console.error('Error fetching pie chart data:', error));

console.log(fetch('/get-datachart-pie').then(response => response.json()).data)

function renderPieChart(data) {
  am5.ready(function () {
    let root = am5.Root.new("chartdiv-pie");
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {})
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category"
      })
    );

    series.data.setAll(data);
    series.appear(1000);
  });
}