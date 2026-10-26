const donutColorScale = d3.scaleOrdinal()
    .domain(donutFormats.map(format => format.id))
    .range(donutFormats.map(format => format.color));
