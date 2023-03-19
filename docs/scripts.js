const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
    input.addEventListener("input", updateGraph);
});

function updateGraph() {
    const minBreakpoint = parseInt(document.getElementById("minBreakpoint").value);
    const minF0 = parseInt(document.getElementById("minF0").value);
    const minR = parseFloat(document.getElementById("minR").value);
    const minN = parseFloat(document.getElementById("minN").value);
    const maxBreakpoint = parseInt(document.getElementById("maxBreakpoint").value);
    const maxF0 = parseInt(document.getElementById("maxF0").value);
    const maxR = parseFloat(document.getElementById("maxR").value);
    const maxN = parseFloat(document.getElementById("maxN").value);
    const stepsDown = parseFloat(document.getElementById("stepsDown").value);
    const stepsUp = parseFloat(document.getElementById("stepsUp").value);
    const offsetGraph = 160;

    const typescales = generateTypescales(minBreakpoint, minF0, minR, minN, maxBreakpoint, maxF0, maxR, maxN, stepsDown, stepsUp, offsetGraph);
    renderChart(typescales, minBreakpoint, maxBreakpoint, offsetGraph);
    renderTable(typescales);
    renderVisualTypescale(typescales);
    generateDesignTokens(typescales, minBreakpoint, minF0, minR, minN, maxBreakpoint, maxF0, maxR, maxN);

    const designTokens = generateDesignTokens(typescales, minBreakpoint, minF0, minR, minN, maxBreakpoint, maxF0, maxR, maxN);


    const downloadButton = document.getElementById("downloadButton");
    downloadButton.addEventListener("click", () => {
        downloadJSON(designTokens, "design-tokens.json");
    });


}

updateGraph(); // Render the graph on initial load

function generateTypescales(minBreakpoint, minF0, minR, minN, maxBreakpoint, maxF0, maxR, maxN, stepsDown, stepsUp, offsetGraph) {

    const typescales = [];

    for (let i = -stepsDown; i <= stepsUp; i++) {
        const scale = [];
        const step = "f" + i;
        const minFontSize = Math.round(2 * (minF0 * Math.pow(minR, i / minN ))) /2;
        const maxFontSize = Math.round(2 * (maxF0 * Math.pow(maxR, i / maxN ))) /2;
        scale.push({ breakpoint: minBreakpoint-offsetGraph, fontSize: minFontSize, step: step });
        scale.push({ breakpoint: minBreakpoint, fontSize: minFontSize, step: step });
        scale.push({ breakpoint: maxBreakpoint, fontSize: maxFontSize, step: step });
        scale.push({ breakpoint: maxBreakpoint+offsetGraph, fontSize: maxFontSize, step: step });
        typescales.push(scale);
    }
    return typescales;
}

function renderChart(typescales, minBreakpoint, maxBreakpoint, offsetGraph) {
    const ctx = document.getElementById("typescaleChart").getContext("2d");
    if (window.chartInstance) {
        window.chartInstance.destroy();
    }
    window.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: typescales[0].map((item) => item.breakpoint),
            datasets: typescales.map((scale, index) => ({
                label: scale[0].step,
                data: scale.map((item) => item.fontSize),
                borderColor: `hsl(266, 100%, 64%)`,
                tension: 0,
                fill: false,
            })),
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    min: minBreakpoint-offsetGraph,
                    max: maxBreakpoint+offsetGraph,
                    ticks: {
                        stepSize: 160
                    },
                    title: {
                        display: true,
                        text: "Breakpoints in px",
                    },
                },
                y: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: "Font Size in px",
                    },
                },
            },
            interaction: {
                mode: 'hover',
                intersect: true,
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    displayColors: false,
                    callbacks: {
                        title: function (context) {
                            return `Breakpoint: ${context[0].parsed.x}px`;
                        },
                        label: function (context) {
                            const step = context.dataset.label;
                            const breakpoint = context.parsed.x;
                            const scale = typescales[context.datasetIndex];
                            const min = scale[1];
                            const max = scale[2];

                            const progress = (breakpoint - min.breakpoint) / (max.breakpoint - min.breakpoint);
                            const interpolatedFontSize = min.fontSize + (max.fontSize - min.fontSize) * progress;

                            return `${step}: ${interpolatedFontSize.toFixed(2)}px`;
                        },
                    },
                },
            },
        },
    });
}

function renderTable(typescales) {
    const tableContainer = document.getElementById("tableContainer");
    let tableHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Step</th>
          ${typescales[0].slice(1, -1).map(item => `<th class="text-right">${item.breakpoint}px</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${typescales.map((scale, index) => `
          <tr>
            <td>${scale[0].step}</td>
            ${scale.slice(1, -1).map(item => `<td class="text-right">${item.fontSize}px</td>`).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

    tableContainer.innerHTML = tableHTML;
}
function renderVisualTypescale(typescales) {
    const tableContainer = document.getElementById("visualTypescale");
    let visualHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Step</th>
          ${typescales[0].slice(1, -1).map(item => `<th class="text-right">${item.breakpoint}px</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${typescales.map((scale, index) => `
          <tr class="align-bottom">
            <td>${scale[0].step}</td>
            ${scale.slice(1, -1).map(item => `<td style="font-size: ${item.fontSize.toFixed(2)}px; line-height: 1em;">Aa</td>`).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

    tableContainer.innerHTML = visualHTML;
}

function generateDesignTokens(typescale, minBreakpoint, minF0, minR, minN, maxBreakpoint, maxF0, maxR, maxN) {
    const jsonContainer = document.getElementById("jsonContainer");

    const designTokens = {
        "font-scale": {},
        "font-size": {},
        "viewport": {
            "width": { "value": "{viewport.min}", "type": "sizing" },
            "min": { "value": `${minBreakpoint}`, "type": "sizing" },
            "max": { "value": `${maxBreakpoint}`, "type": "sizing" }
        }
    };

    designTokens["font-scale"]["const"] = {
        "min": {
            "f0": { "value": `${minF0}`, "type": "fontSizes" },
            "r": { "value": `${minR}`, "type": "fontSizes" },
            "n": { "value": `${minN}`, "type": "fontSizes" }
        },
        "max": {
            "f0": { "value": `${maxF0}`, "type": "fontSizes" },
            "r": { "value": `${maxR}`, "type": "fontSizes" },
            "n": { "value": `${maxN}`, "type": "fontSizes" }
        }
    };

    typescale.forEach((scale, index) => {
        const step = scale[0].step.slice(1);
        const key = scale[0].step;

        designTokens["font-scale"][key] = {
            "min": {
                "value": `5*roundTo(({font-scale.const.min.f0}*{font-scale.const.min.r}^(${step}/{font-scale.const.min.n})/5),1)`,
                "type": "fontSizes"
            },
            "max": {
                "value": `5*roundTo(({font-scale.const.max.f0}*{font-scale.const.max.r}^(${step}/{font-scale.const.max.n})/5),1)`,
                "type": "fontSizes"
            },
            "v": {
                "value": `100 * ({font-scale.${key}.max}-{font-scale.${key}.min}) / ({viewport.max}-{viewport.min})`,
                "type": "fontSizes"
            },
            "r": {
                "value": `( {viewport.min} * {font-scale.${key}.max} - {viewport.max} * {font-scale.${key}.min}) / ({viewport.min}-{viewport.max})`,
                "type": "fontSizes"
            },
            "fluid": {
                "value": `round(({viewport.width}/100) * {font-scale.${key}.v} + {font-scale.${key}.r})`,
                "type": "fontSizes"
            }
        };

        designTokens["font-size"][key] = {
            "value": `min( max( {font-scale.${key}.min},  {font-scale.${key}.fluid}) ,{font-scale.${key}.max})`,
            "type": "fontSizes"
        };
    });

    jsonContainer.innerHTML = JSON.stringify(designTokens, null, 2);
    return designTokens;
}

function downloadJSON(jsonObj, filename) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonObj, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", filename);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}