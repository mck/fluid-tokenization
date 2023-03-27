<template>
  <div class="grid my-5">
    <div class="field col-12 md:col-3">
      <span class="p-float-label">
        <InputText id="fontFamilyHeading" class="w-full" v-model="model.heading.family"/>
        <label for="fontFamilyHeading">Headings Font Family</label>
      </span>
    </div>
    <div class="field col-12 md:col-3">
      <span class="p-float-label">
        <Dropdown id="fontWeightHeading" v-model.number="model.heading.weight" :options="fontWeights" class="w-full"/>
        <label for="fontWeightHeading">Headings Font Weight</label>
      </span>
    </div>
    <div class="field col-12 md:col-3">
      <span class="p-float-label">
        <InputText id="fontFamilyBody" class="w-full" v-model="model.body.family"/>
        <label for="fontFamilyBody">Body Font Family</label>
      </span>
    </div>
    <div class="field col-12 md:col-3">
      <span class="p-float-label">
        <Dropdown id="fontWeightBody" v-model.number="model.body.weight" :options="fontWeights" class="w-full"/>
        <label for="fontWeightBody">Body Font Weight</label>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {computed} from 'vue'
  import {FontFamilies} from '../../../types/FontFamilies'
  import InputText from 'primevue/inputtext'
  import Dropdown from 'primevue/dropdown'

  const props = defineProps<{
    modelValue: FontFamilies
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', payload: FontFamilies): unknown
  }>()

  const model = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value)
  })

  const fontWeights = computed(() => {
    const output: number[] = []
    for (let i = 100; i <= 900; i += 100) {
      output.push(i)
    }
    return output
  })
</script>
