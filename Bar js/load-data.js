d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv", row => ({
    screenTech: row.Screen_Tech,
    energyConsumption: Number(row["Mean(Labelled energy consumption (kWh/year))"])
})).then(data => {
    const validData = data.filter(d =>
        d.screenTech && Number.isFinite(d.energyConsumption) && d.energyConsumption > 0
    ).sort((a, b) => d3.ascending(a.energyConsumption, b.energyConsumption));

    if (validData.length === 0) {
        throw new Error("The 55-inch TV CSV contains no valid screen technology energy values.");
    }

    drawBarChart(validData);
}).catch(error => {
    console.error("Could not load or render the 55-inch TV bar chart:", error);
    d3.select("#barchart")
        .append("p")
        .text("The 55-inch TV energy data could not be loaded.");
});
