fetch('/get-datachart-pyramid')
    .then(response => response.json())
    .then(data => renderPyramidChart(data))
    .catch(error => console.error('Error fetching pyramid chart data:', error));

function renderPyramidChart(data) {
    var root = am5.Root.new("chartdiv-pyramid");
    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(am5percent.SlicedChart.new(root, {
        layout: root.verticalLayout
    }));

    var series = chart.series.push(am5percent.PyramidSeries.new(root, {
        orientation: "vertical",
        valueField: "value",
        categoryField: "category"
    }));
    series.data.setAll(data);
    series.appear();

    var legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15
    }));

    legend.data.setAll(am5.array.copy(series.dataItems).reverse());

    chart.appear(1000, 100);
}
