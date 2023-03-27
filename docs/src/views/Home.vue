<script setup lang="ts">
import { ref } from "vue";
import TabMenu from 'primevue/tabmenu';
import TypescalesChart from '../components/visualization/TypescalesChart.vue';
import TypescalesForm from '../components/form/TypescalesForm.vue'
import TypescalesPreview from '../components/visualization/TypescalesPreview.vue';
import TypescalesTable from '../components/visualization/TypescalesTable.vue';
import { useTypescalesStore } from '../stores/typescales';

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

const tabs = ref([
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    to: '/'
  },
  {
    label: 'Graph',
    icon: 'pi pi-fw pi-chart-line',
    to: '/graph'
  },
  {
    label: 'Table',
    icon: 'pi pi-fw pi-table',
    to: '/table'
  },
  {
    label: 'Scale',
    icon: 'pi pi-fw pi-clone',
    to: '/scale'
  },
  {
    label: 'Tokens',
    icon: 'pi pi-fw pi-database',
    to: '/tokens'
  }
]);

</script>

<template>
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
</template>

<style scoped>
</style>