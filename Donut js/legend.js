const drawDonutLegend = (svg, data, x, y) => {
    const legend = svg.append("g")
        .attr("transform", `translate(${x},${y})`);

    data.forEach((item, index) => {
        const row = legend.append("g")
            .attr("transform", `translate(0,${index * 28})`);
        row.append("circle")
            .attr("r", 6)
            .attr("fill", donutColorScale(item.technology));
        row.append("text")
            .attr("x", 14)
            .attr("y", 4)
            .attr("fill", "#42536b")
            .style("font-size", "14px")
            .text(`${item.technology} · ${d3.format(",.1f")(item.energy)} kWh/year`);
    });
};
