const attachLineChartTooltips = (svg, points, chartWidth, chartHeight) => {
    const tooltipWidth = 220;
    const tooltipHeight = 42;
    const tooltip = svg.append("g")
        .attr("class", "line-chart-tooltip")
        .attr("pointer-events", "none")
        .style("opacity", 0);
    tooltip.append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 5)
        .attr("fill", "#606464")
        .attr("fill-opacity", 0.92);
    const text = tooltip.append("text")
        .attr("x", 10)
        .attr("y", 26)
        .attr("fill", "#fff")
        .style("font-size", "14px");

    points
        .on("pointerenter pointermove", (event, datum) => {
            const [x, y] = d3.pointer(event, svg.node());
            text.text(`${datum.year}: $${d3.format(",.2f")(datum.price)} / MWh`);
            tooltip
                .attr("transform", `translate(${Math.max(0, Math.min(chartWidth - tooltipWidth, x + 12))},${Math.max(0, Math.min(chartHeight - tooltipHeight, y - 48))})`)
                .style("opacity", 1);
        })
        .on("pointerleave", () => tooltip.style("opacity", 0));
};
