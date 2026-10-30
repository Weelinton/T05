const attachBarTooltips = (svg, marks) => {
    const tooltip = svg.append("g")
        .attr("class", "bar-tooltip")
        .attr("pointer-events", "none")
        .style("opacity", 0);
    tooltip.append("rect")
        .attr("width", 220)
        .attr("height", 42)
        .attr("rx", 5)
        .attr("fill", "#172b4d")
        .attr("fill-opacity", 0.92);
    const text = tooltip.append("text")
        .attr("x", 10)
        .attr("y", 26)
        .attr("fill", "#fff")
        .style("font-size", "14px");

    marks
        .on("pointerenter pointermove", (event, datum) => {
            marks.attr("opacity", 0.5);
            d3.select(event.currentTarget)
                .attr("opacity", 1)
                .attr("stroke", "#172b4d")
                .attr("stroke-width", 1.5);

            const [x, y] = d3.pointer(event, svg.node());
            text.text(`${datum.screenTech}: ${d3.format(",.1f")(datum.energyConsumption)} kWh/year`);
            tooltip
                .attr("transform", `translate(${Math.max(0, Math.min(barWidth - 220, x + 12))},${Math.max(0, Math.min(barHeight - 42, y - 48))})`)
                .style("opacity", 1);
        })
        .on("pointerleave", () => {
            marks.attr("opacity", 1);
            marks.attr("stroke", null).attr("stroke-width", null);
            tooltip.style("opacity", 0);
        });
};
