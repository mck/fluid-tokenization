<script setup>
  import { computed } from 'vue'
  import { useTypescalesStore } from '../stores/typescales'
  import { PrismEditor } from 'vue-prism-editor'
  import 'vue-prism-editor/dist/prismeditor.min.css'
  import { highlight, languages } from 'prismjs/components/prism-core'
  import 'prismjs/components/prism-clike'
  import 'prismjs/components/prism-javascript'
  import 'prismjs/themes/prism-tomorrow.css'
  import Button from 'primevue/button'

  const typescales = useTypescalesStore()
  const code = computed(() => JSON.stringify(typescales.designTokens, null, 2))

  function highlighter (code) {
    return highlight(code, languages.js) // languages.<insert language> to return html with markup
  }

  function downloadTokens() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(code.value);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "design-tokens.json");
    downloadAnchorNode.click();
  }
</script>

<template>
  <div class="relative">
    <Button label="Download" class="download" @click="downloadTokens"/>
    <prism-editor class="my-editor" v-model="code" :highlight="highlighter" line-numbers></prism-editor>
  </div>
</template>


<style scoped>
  .download {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 999;
  }

  /* required class */
  .my-editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #2d2d2d;
    color: #ccc;

    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
  }

  /* optional class for removing the outline */
  .prism-editor__textarea:focus {
    outline: none;
  }
</style>
