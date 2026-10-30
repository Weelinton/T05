// Create the tooltip used by the scatterplot.
const createTooltip = (data) => {
    const tooltip = innerChartS
        .append("g")
        .attr("class", "tooltip")
        .attr("pointer-events", "none")
        .style("opacity", 0)

    tooltip
    .append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", "#172b4d")
        .attr("fill-opacity", 0.75);

    tooltip.append("text")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white")
        .style("font-size", "12px");
};

// Show the hovered TV's technology, energy consumption, and star rating.
const handleMouseEvents = () => {
    const tooltip = innerChartS.select(".tooltip");
    const formatTwoDecimals = d3.format(".2f");

    innerChartS.selectAll(".scatter-point")
        .on("mouseenter", (e, d) => {
            innerChartS.selectAll(".scatter-point").attr("opacity", 0.25);
            d3.select(e.currentTarget)
                .attr("opacity", 1)
                .attr("stroke", "#2b211b")
                .attr("stroke-width", 1);

            tooltip.select("text")
                .text(`${d.screenTech} · ${formatTwoDecimals(d.energyConsumption)} kWh · ${formatTwoDecimals(d.star)} stars`);

            const point = d3.select(e.currentTarget);
            const cx = Number(point.attr("cx"));
            const cy = Number(point.attr("cy"));
            const x = Math.max(0, Math.min(innerWidth - tooltipWidth, cx - tooltipWidth / 2));
            const aboveY = cy - tooltipHeight - 8;
            const y = aboveY >= 0
                ? aboveY
                : Math.min(innerHeight - tooltipHeight, cy + 8);

            tooltip
                .attr("transform", `translate(${x}, ${y})`)
                .transition()
                .duration(200)
                .style("opacity", 1);
        })

        .on("mouseleave", (e, d) => {
            innerChartS.selectAll(".scatter-point")
                .attr("opacity", 0.5)
                .attr("stroke", null)
                .attr("stroke-width", null);

            tooltip
                .style("opacity", 0)
                .attr("transform", "translate(0, 500)");
        });
};