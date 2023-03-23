<script setup lang="ts">
import Chart from 'chart.js/auto'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useTypescalesStore } from '../../stores/typescales';

const typescales = useTypescalesStore()
const canvas = ref<HTMLCanvasElement>();

onMounted(() => {
  renderChart()
  watch(typescales, () => {
    renderChart()
  })
})

let chartInstance: Chart; 

onBeforeUnmount(() => {
  chartInstance?.destroy();
})

const renderChart = () => {
  if (!canvas.value) return;
  chartInstance?.destroy();
  chartInstance = new Chart(canvas.value, {
    type: "line",
    data: {
      labels: typescales.typescales[0].map((item) => item.breakpoint),
      datasets: typescales.typescales.map((scale) => ({
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
          min: typescales.minBreakpoint - typescales.offsetGraph,
          max: typescales.maxBreakpoint + typescales.offsetGraph,
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
        // mode: 'hover', TODO check which property is desired, 'hover' does not exist 
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
              const scale = typescales.typescales[context.datasetIndex];
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
</script>

<template>
  <canvas ref="canvas" />
</template>