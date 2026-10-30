const drawScatterplot = (data) => {
    // T06-2 Step 2.2
    /// Set the dimensions and margins of the chart area
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`) //responsive svg

    /// Create an inner chart group with margins
    innerChartS = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    // T06-2 Step 2.3
    /// Set up x and y scales using data extents
    const xExtent = d3.extent(data, d => d.star);
    const yExtent = d3.extent(data, d => d.energyConsumption);
    /// Map star ratings and energy consumption to positions within the chart area.
    const xScaleS = d3.scaleLinear()
        .domain([0, xExtent[1]])
        .nice()
        .range([0, innerWidth]);

    const yScaleS = d3.scaleLinear()
        .domain(yExtent)
        .range([innerHeight, 0])
        .nice();

    // T06-2 Step 2.4
    /// (Corrected code) Set up colours for screen technologies
    const uniqueTechs = [...new Set(data.map(d => d.screenTech))];

    const colorScale = d3.scaleOrdinal()
        .domain(uniqueTechs)
        .range(uniqueTechs.map(tech =>
            tech === "LCD" ? "#0072b2" :
                tech === "OLED" ? "#cc79a7" : "#e69f00"
        ));

    innerChartS.append("g")
        .attr("class", "scatter-grid")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScaleS)
            .tickSize(-innerHeight)
            .tickFormat(""));
    innerChartS.append("g")
        .attr("class", "scatter-grid")
        .call(d3.axisLeft(yScaleS)
            .tickSize(-innerWidth)
            .tickFormat(""));

    // T06-2 Step 2.5 Draw the circles
    innerChartS.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("class", "scatter-point")
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("r", 4)
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5)
        .append("title")
        .text(d => `${d3.format(".2f")(d.energyConsumption)} kWh · ${d3.format(".2f")(d.star)} stars`);

    // T06-2 Step 2.6 Add bottom and left axis
    /// Add axes
    const bottomAxis = d3.axisBottom(xScaleS);
    innerChartS.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    svg.append("text")
        .text("Star Rating")
        .attr("text-anchor", "middle")
        .attr("x", margin.left + innerWidth / 2)
        .attr("y", innerHeight + margin.top + 40)
        .attr("class", "axis-title");

    const leftAxis = d3.axisLeft(yScaleS);
    innerChartS.append("g")
        .call(leftAxis);

    svg.append("text")
        .text("Energy Consumption (kWh/year)")
        .attr("text-anchor", "middle")
        .attr("transform", `translate(12, ${margin.top + innerHeight / 2}) rotate(-90)`)
        .attr("class", "axis-title");

    // T06-2 Step 2.7 Add legend

    /// Place the legend outside the plot area on the right.
    const legend = svg.append("g")
        .attr('class', 'legend')
        .attr("transform", `translate(${margin.left + innerWidth + 20}, ${margin.top + (innerHeight - uniqueTechs.length * 22) / 2})`);
    
    uniqueTechs.forEach((tech, i) => {
        const g = legend.append("g").attr("transform", `translate(0, ${i * 22})`);
        g.append("circle")
        .attr("r", 6)
        .attr("cx", 6)
        .attr("cy", 6)
        .attr("fill", colorScale(tech));
        g.append("text")
        .attr("x", 18)
        .attr("y", 10)
        .text(tech)
        .attr ("class", "axis-label");
    });

    // Show each screen technology with its matching point colour.

};