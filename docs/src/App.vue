<script setup lang="ts">
import TypescalesChart from './components/visualization/TypescalesChart.vue';
import TypescalesForm from './components/form/TypescalesForm.vue'
import TypescalesPreview from './components/visualization/TypescalesPreview.vue';
import TypescalesTable from './components/visualization/TypescalesTable.vue';
import { useTypescalesStore } from './stores/typescales';

const typescales = useTypescalesStore();

const downloadJSON = () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(typescales.designTokens, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "design-tokens.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
</script>

<template>
  <h1 class="text-3xl font-bold underline text-clifford">Fluid Typescale Visualizer</h1>
  
  <TypescalesForm @typescales="typescales = $event"/>

  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="graph-tab" data-bs-toggle="tab" data-bs-target="#graph-tab-pane" type="button"
        role="tab" aria-controls="graph-tab-pane" aria-selected="true">Graph</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="table-tab" data-bs-toggle="tab" data-bs-target="#table-tab-pane" type="button"
        role="tab" aria-controls="table-tab-pane" aria-selected="false">Table</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="scale-tab" data-bs-toggle="tab" data-bs-target="#scale-tab-pane" type="button"
        role="tab" aria-controls="scale-tab-pane" aria-selected="false">Scale</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="example-tab" data-bs-toggle="tab" data-bs-target="#example-tab-pane" type="button"
        role="tab" aria-controls="example-tab-pane" aria-selected="false">Example</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="json-tab" data-bs-toggle="tab" data-bs-target="#json-tab-pane" type="button" role="tab"
        aria-controls="json-tab-pane" aria-selected="false">Tokens</button>
    </li>
  </ul>

  <div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="graph-tab-pane" role="tabpanel" aria-labelledby="graph-tab" tabindex="0">
      <TypescalesChart />
    </div>
    <div class="tab-pane fade" id="table-tab-pane" role="tabpanel" aria-labelledby="table-tab" tabindex="0">
      <TypescalesTable v-if="typescales" :typescales="typescales.typescales" />
    </div>
    <div class="tab-pane fade" id="scale-tab-pane" role="tabpanel" aria-labelledby="scale-tab" tabindex="0">
      <TypescalesPreview />
    </div>
    <div class="tab-pane fade" id="example-tab-pane" role="tabpanel" aria-labelledby="example-tab" tabindex="0">
      example
    </div>
    <div class="tab-pane fade" id="json-tab-pane" role="tabpanel" aria-labelledby="json-tab" tabindex="0">
      <div class="py-3">
        <button class="btn btn-primary" @click="downloadJSON()">Download JSON</button>
      </div>
      <pre>{{ JSON.stringify(typescales.designTokens['font-scale'], null, 2) }}</pre>
    </div>
  </div>
</template>
