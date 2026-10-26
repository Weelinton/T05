// Load the provided T05 television energy records and convert chart values to numbers.
d3.csv("data/Ex5_TV_energy.csv", d => ({
    brand: d.brand,
    screenSize: +d.screensize,
    screenTech: d.screen_tech,
    energyConsumption: +d.energy_consumpt,
    star: +d.star2,
    count: +d.count
})).then(data => {
    // Log the processed data to the console
    console.log(data);

    // Draw the scatterplot and its hover details after the data is loaded.
    drawScatterplot(data);
    createTooltip();
    handleMouseEvents();

}).catch(error => {
    console.error("Error loading the CSV file:", error);
});