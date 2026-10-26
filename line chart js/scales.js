const createLineChartScales = data => {
    const innerWidth = lineChartWidth - lineChartMargin.left - lineChartMargin.right;
    const innerHeight = lineChartHeight - lineChartMargin.top - lineChartMargin.bottom;

    return {
        x: d3.scaleLinear()
            .domain(d3.extent(data, d => d.year))
            .range([0, innerWidth]),
        y: d3.scaleLinear()
            .domain([0, d3.max(data, d => d.price)])
            .nice()
            .range([innerHeight, 0])
    };
};
