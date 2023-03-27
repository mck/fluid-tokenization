<template>
  <span class="p-float-label">
    <InputText id="fontFamily" class="w-full" :value="fontFamily" @blur="loadFontFamily"/>
    <label for="fontFamily">Font Family</label>
  </span>
  <Button @click="loadFontFamily" label="Schriftart laden"/>
</template>

<script lang="ts">
  const loadedFontFamilies: string[] = []
</script>

<script lang="ts" setup>
  import {computed, ref} from 'vue'

  const props = defineProps<{
    modelValue: string
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', payload: string): unknown
  }>()

  /*const model = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value)
  })*/
  const fontFamily = ref('')
  const normalizedFontFamily = computed(() => fontFamily.value.split(' ').map(part => part.toLowerCase()).join('+'))
  const fontFamilyUrl = computed(() => `https://fonts.googleapis.com/css2?family=${normalizedFontFamily.value}:ital,wght@0,400;0,700;1,400;1,700&display=swap`)

  function loadFontFamily() {
    if(loadedFontFamilies.includes(normalizedFontFamily.value)) {
      return
    }
    loadedFontFamilies.push(normalizedFontFamily.value)
    const link = document.createElement('link')
    link.rel = 'stylesheet'

  }
</script>
