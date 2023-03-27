<script setup>
import {computed, onMounted} from 'vue'
  import { useTypescalesStore } from '../stores/typescales'
  import { PrismEditor } from 'vue-prism-editor'
  import 'vue-prism-editor/dist/prismeditor.min.css'
  import { highlight, languages } from 'prismjs/components/prism-core'
  import 'prismjs/components/prism-clike'
  import 'prismjs/components/prism-javascript'
  import 'prismjs/themes/prism-tomorrow.css'

  const typescales = useTypescalesStore()
  const code = computed(() => JSON.stringify(typescales.designTokens, null, 2))

  function highlighter (code) {
    return highlight(code, languages.js) // languages.<insert language> to return html with markup
  }

  onMounted(() => {
    if (typeof Prism === 'undefined' || typeof document === 'undefined' || !document.querySelector) {
      return;
    }

    Prism.plugins.toolbar.registerButton('download-file', function (env) {
      var pre = env.element.parentNode;
      if (!pre || !/pre/i.test(pre.nodeName) || !pre.hasAttribute('data-src') || !pre.hasAttribute('data-download-link')) {
        return;
      }
      var src = pre.getAttribute('data-src');
      var a = document.createElement('a');
      a.textContent = pre.getAttribute('data-download-link-label') || 'Download';
      a.setAttribute('download', '');
      a.href = src;
      return a;
    });
  })
</script>

<template>
  <prism-editor class="my-editor" v-model="code" :highlight="highlighter" line-numbers></prism-editor>
</template>


<style>
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
