const drawBarChart = data => {
    const innerWidth = barWidth - barMargin.left - barMargin.right;
    const innerHeight = barHeight - barMargin.top - barMargin.bottom;
    const svg = d3.select("#barchart")
        .append("svg")
        .attr("viewBox", `0 0 ${barWidth} ${barHeight}`)
        .attr("role", "img")
        .attr("aria-label", "Mean annual energy consumption by screen technology for 55-inch TVs");
    const chart = svg.append("g")
        .attr("transform", `translate(${barMargin.left},${barMargin.top})`);
    const { x, y } = createBarScales(data);
    const colorScale = createBarColorScale(data);
    const bars = chart.selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => y(d.screenTech))
        .attr("width", d => x(d.energyConsumption))
        .attr("height", y.bandwidth())
        .attr("fill", d => colorScale(d.screenTech));

    attachBarTooltips(svg, bars);
    bars.append("title")
        .text(d => `${d.screenTech}: ${d.energyConsumption.toFixed(1)} kWh/year`);

    chart.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x));
    chart.append("g")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("class", "axis-title")
        .attr("text-anchor", "middle")
        .attr("transform", `translate(18,${barMargin.top + innerHeight / 2}) rotate(-90)`)
        .text("Screen Technology");

    svg.append("text")
        .attr("class", "axis-title")
        .attr("x", barMargin.left + innerWidth / 2)
        .attr("y", barHeight - 38)
        .attr("text-anchor", "middle")
        .text("Mean Annual Energy Consumption (kWh/year)");
};
