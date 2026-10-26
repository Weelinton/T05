d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv", row => ({
    technology: row.Screen_Tech,
    energy: Number(row["Mean(Labelled energy consumption (kWh/year))"])
})).then(data => {
    const validData = data.filter(row =>
        donutColorScale.domain().includes(row.technology) &&
        Number.isFinite(row.energy) &&
        row.energy > 0
    );

    if (validData.length === 0) {
        throw new Error("The all-sizes screen technology CSV contains no valid energy values.");
    }

    drawDonutChart(validData);
}).catch(error => {
    console.error("Could not load or render the donut chart data:", error);
});
