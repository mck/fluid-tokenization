<script setup lang="ts">
  import {ref} from 'vue'
  import TabMenu from 'primevue/tabmenu'
  import TypescalesForm from './components/form/TypescalesForm.vue'
  import {useTypescalesStore} from './stores/typescales'

  const typescales = useTypescalesStore();

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
    <div class="p-5">
      <h1 class="text-color-secondary">Fluid Typescale Generator & Design Token Integration</h1>
      <p class="text-color-secondary mb-7">A practical web tool designed to streamline the process of creating fluid typescales, generating design tokens, and seamlessly integrating them into Figma using Tokens Studio for an efficient and consistent design workflow.</p>

      <TypescalesForm @typescales="typescales = $event"/>


      <TabMenu :model="tabs" />
      <div class="">
        <router-view />
      </div>

    </div>

  </main>

  <footer class="p-5">
    <p>Special thanks to our dedicated contributors for their invaluable input and support in the development of this tool. Your commitment and expertise have played a crucial role in enhancing the design community's experience. We appreciate your contribution.</p>
  </footer>
</template>

<style scoped>
</style>
