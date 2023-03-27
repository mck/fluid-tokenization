<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {useTypescalesStore} from '../../stores/typescales'
import {computed} from 'vue'
import {calculateFluidFontSize} from '../../lib/calculateFluidFontSize'

const typescaleStore = useTypescalesStore()

const typescales = computed(() => {
  return typescaleStore.typescales.map(scale => {
    const minRem = (scale[1].cssValue / typescaleStore.rem).toFixed(2) + 'rem'
    const maxRem = (scale[3].cssValue / typescaleStore.rem).toFixed(2) + 'rem'
    const {fontR, fontV} = calculateFluidFontSize(scale[1].cssValue, scale[3].cssValue, 1)
    return {
      step: scale[0].step,
      min: scale[1].cssValue.toFixed(2) + 'px / ' + minRem,
      fluid: `${scale[2].cssValue.toFixed(2)}px / clamp(${minRem}, calc(${fontV.toFixed(2)}vw + ${(fontR / typescaleStore.rem).toFixed(2)}rem), ${maxRem})`,
      max: scale[3].cssValue.toFixed(2) + 'px / ' + maxRem,
    }
  })
})
</script>

<template>
  <DataTable :value="typescales">
    <Column field="step" header="Step" />
    <Column field="min" :header="typescaleStore.minBreakpoint + 'px'" />
    <Column field="fluid" :header="typescaleStore.screenWidth + 'px (fluid)'" />
    <Column field="max" :header="typescaleStore.maxBreakpoint + 'px'" />
  </DataTable>
</template>
