const drawBarLegend = (svg, data, colorScale) => {
    const itemWidth = 130;
    const legendWidth = data.length * itemWidth;
    const legend = svg.append("g")
        .attr("class", "bar-legend")
        .attr("transform", `translate(${(barWidth - legendWidth) / 2},${barHeight - 18})`);

    data.forEach((item, index) => {
        const entry = legend.append("g")
            .attr("transform", `translate(${index * itemWidth},0)`);
        entry.append("circle")
            .attr("r", 6)
            .attr("fill", colorScale(item.screenTech));
        entry.append("text")
            .attr("x", 12)
            .attr("y", 4)
            .attr("fill", "#5a3e2b")
            .style("font-size", "14px")
            .text(item.screenTech);
    });
};
