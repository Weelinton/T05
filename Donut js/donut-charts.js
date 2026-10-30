const drawDonutChart = data => {
    const container = d3.select("#donut");
    const svg = container.append("svg")
        .attr("viewBox", `0 0 ${donutWidth} ${donutHeight}`)
        .attr("role", "img")
        .attr("aria-labelledby", "donut-chart-title");

    svg.append("title")
        .attr("id", "donut-chart-title")
        .text("Mean annual TV energy consumption by screen technology");

    const centerX = donutWidth / 2 - 105;
    const centerY = donutHeight / 2;
    const outerRadius = 112;
    const innerRadius = 40;
    const pie = d3.pie()
        .sort(null)
        .value(d => d.energy)(data);
    const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .padAngle(0.015)
        .cornerRadius(9);
    const chart = svg.append("g")
        .attr("transform", `translate(${centerX},${centerY})`);
    const total = d3.sum(data, d => d.energy);

    const slices = chart.selectAll("path")
        .data(pie)
        .join("path")
        .attr("d", arc)
        .attr("fill", d => donutColorScale(d.data.technology))
        .attr("stroke", "#fff")
        .attr("stroke-width", 2);
    slices.append("title")
        .text(d => `${d.data.technology}: ${d3.format(",.1f")(d.data.energy)} kWh/year`);
    attachDonutTooltips(svg, slices, d => `${d.data.technology}: ${d3.format(",.1f")(d.value)} kWh (${d3.format(".1%")(d.value / total)})`);
    drawDonutLegend(svg, data, centerX + outerRadius + 32, centerY - 32);
};
