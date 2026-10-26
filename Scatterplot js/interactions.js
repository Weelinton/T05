// Create the tooltip used by the scatterplot.
const createTooltip = (data) => {
    const tooltip = innerChartS
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0)

    tooltip
    .append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", "#606464")
        .attr("fill-opacity", 0.75);

    tooltip.append("text")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white")
        .style("font-size", "12px");
};

// Show the hovered TV's energy consumption and star rating.
const handleMouseEvents = () => {
    const tooltip = innerChartS.select(".tooltip");

    innerChartS.selectAll("circle")
        .on("mouseenter", (e, d) => {
            console.log("Mouse entred circle", d);

            d3.select(".tooltip text")
            .text(`${d.energyConsumption} kWh · ${d.star} stars`);

            const cx = e.target.getAttribute("cx");
            const cy = e.target.getAttribute("cy");

            d3.select(".tooltip")
            .attr("transform", `translate(${cx - 0.5*tooltipWidth}, ${cy - 1.5*tooltipHeight})`)
            .transition()
                .duration(200)
                .style("opacity", 1);
        })

        .on("mouseleave", (e, d) => {
            console.log("Mouse left circle", d);

            d3.select(".tooltip")
            .style("opacity", 0)
            .attr("transform", `translate(0, 500)`);
        });
};