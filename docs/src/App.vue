<script setup lang="ts">
import { ref } from "vue";
import TabMenu from 'primevue/tabmenu';
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
    label: 'Sample',
    icon: 'pi pi-fw pi-clone',
    to: '/sample'
  },
  {
    label: 'Tokens',
    icon: 'pi pi-fw pi-database',
    to: '/tokens'
  }
]);

</script>

<template>
  <main>
    <div class="mb-5">
      <h1>Fluid Typescale Generator & Design Token Integration</h1>
      <p>A practical web tool designed to streamline the process of creating fluid typescales, generating design tokens, and seamlessly integrating them into Figma using Tokens Studio for an efficient and consistent design workflow.</p>
    </div>

    <TypescalesForm @typescales="typescales = $event"/>
    <TabMenu :model="tabs" />
    <router-view />
  </main>

  <footer>
    <p>Special thanks to our dedicated contributors for their invaluable input and support in the development of this tool. Your commitment and expertise have played a crucial role in enhancing the design community's experience. We appreciate your contribution.</p>
  </footer>
</template>

<style scoped>
</style>
