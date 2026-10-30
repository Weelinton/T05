const drawLineChart = data => {
    const innerWidth = lineChartWidth - lineChartMargin.left - lineChartMargin.right;
    const innerHeight = lineChartHeight - lineChartMargin.top - lineChartMargin.bottom;
    const { x, y } = createLineChartScales(data);
    const svg = d3.select("#linechart")
        .append("svg")
        .attr("viewBox", `0 0 ${lineChartWidth} ${lineChartHeight}`)
        .attr("role", "img")
        .attr("aria-label", "Annual average Australian wholesale spot price from 1998 to 2024");
    const chart = svg.append("g")
        .attr("transform", `translate(${lineChartMargin.left},${lineChartMargin.top})`);

    chart.append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(y)
            .ticks(6)
            .tickSize(-innerWidth)
            .tickFormat(""));
    chart.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x).ticks(7).tickFormat(d3.format("d")));
    chart.append("g")
        .call(d3.axisLeft(y).ticks(6));

    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.price));
    const linePath = chart.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", lineChartColor)
        .attr("stroke-width", 3)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .attr("d", line);

    const points = chart.selectAll(".price-point")
        .data(data)
        .join("circle")
        .attr("class", "price-point")
        .attr("cx", d => x(d.year))
        .attr("cy", d => y(d.price))
        .attr("r", 4)
        .attr("fill", lineChartColor)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5);

    points.append("title")
        .text(d => `${d.year}: $${d3.format(",.2f")(d.price)} per MWh`);
    attachLineChartTooltips(svg, points, linePath, lineChartWidth, lineChartHeight);

    svg.append("text")
        .attr("class", "axis-title")
        .attr("x", lineChartMargin.left + innerWidth / 2)
        .attr("y", lineChartHeight - 8)
        .attr("text-anchor", "middle")
        .text("Year");
    svg.append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("x", -(lineChartMargin.top + innerHeight / 2))
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .text("Average Spot Price ($ / MWh)");
};
