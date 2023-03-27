<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

const props = defineProps<{
    typescales: StepSettings[][]
}>()
</script>

<template>
  <DataTable :value="typescales">
    <Column field="step" header="Step" />
  </DataTable>
    <table class="table">
      <thead>
        <tr>
          <th>Step</th>
          <th v-for="(item, index) in typescales[0].slice(1, -1)" :key="index">{{ item.breakpoint }}px</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(scale, i) in typescales" :key="i">
          <td>{{ scale[0].step }}</td>

          <td v-for="(item, index) in scale.slice(1, -1)" :key="index" class="text-right">{{ item.fontSize }}px</td>

        </tr>
      </tbody>
    </table>
</template>