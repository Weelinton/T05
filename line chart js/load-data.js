d3.csv("data/Ex5_ARE_Spot_Prices.csv", row => ({
    year: row.Year.trim() === "" ? NaN : Number(row.Year),
    price: row["Average Price (notTas-Snowy)"].trim() === ""
        ? NaN
        : Number(row["Average Price (notTas-Snowy)"])
})).then(data => {
    const validData = data.filter(row =>
        Number.isInteger(row.year) &&
        Number.isFinite(row.price)
    ).sort((a, b) => a.year - b.year);

    if (validData.length === 0) {
        throw new Error("The spot-price CSV contains no valid annual average values.");
    }

    drawLineChart(validData);
}).catch(error => {
    console.error("Could not load or render the spot-price line chart:", error);
    d3.select("#linechart")
        .append("p")
        .text("The spot-price data could not be loaded.");
});
