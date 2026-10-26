const createBarScales = data => {
    const innerWidth = barWidth - barMargin.left - barMargin.right;
    const innerHeight = barHeight - barMargin.top - barMargin.bottom;

    return {
        x: d3.scaleLinear()
            .domain([0, d3.max(data, d => d.energyConsumption)])
            .nice()
            .range([0, innerWidth]),
        y: d3.scaleBand()
            .domain(data.map(d => d.screenTech))
            .range([0, innerHeight])
            .padding(0.2)
    };
};

const createBarColorScale = data => d3.scaleOrdinal()
    .domain(data.map(d => d.screenTech))
    .range(data.map(d => barTechnologyColors[d.screenTech] || "#75839a"));
