<script setup lang="ts">
import {useTypescalesStore} from '../../stores/typescales';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Slider from 'primevue/slider';
import Dropdown from 'primevue/dropdown';
import { ref } from "vue";

const stepWidths = ref([
  { name: 'Half Steps', code: '0.5' },
  { name: 'Full Steps', code: '1' }
]);

const typescales = useTypescalesStore();
</script>

<template>
  <form class="formgrid">
    <div class="grid mb-5">
      <div class="field col-12 md:col-3">
      <span class="p-float-label">
          <InputText id="minBreakpoint" v-model="typescales.minBreakpoint" class="w-full"/>
          <label for="minBreakpoint">Min Breakpoint</label>
      </span>
      </div>
      <div class="field col-12 md:col-3">
      <span class="p-float-label">
        <InputText id="minF0" v-model.number="typescales.minF0" class="w-full"/>
        <Slider v-model="typescales.minF0" :step="1" :min="8" :max="64"/>
        <label for="minBreakpoint">Min f0</label>
      </span>
      </div>
      <div class="field col-12 md:col-3">
      <span class="p-float-label">
        <InputText id="minR" v-model.number="typescales.minR" class="w-full"/>
        <Slider v-model="typescales.minR" :step="0.1" :min="1" :max="5"/>
        <label for="minR">Min r</label>
      </span>
      </div>
      <div class="field col-12 md:col-3">
      <span class="p-float-label">
        <InputText id="minF0" v-model.number="typescales.minN" class="w-full"/>
        <Slider v-model="typescales.minN" :step="1" :min="1" :max="32"/>
        <label for="minBreakpoint">Min N</label>
      </span>
      </div>
    </div>

    <div class="grid mb-5">
      <div class="field col-12 md:col-3">
        <span class="p-float-label">
            <InputText id="maxBreakpoint" v-model="typescales.maxBreakpoint" class="w-full"/>
            <label for="maxBreakpoint">Max Breakpoint</label>
        </span>
      </div>
      <div class="field col-12 md:col-3">
      <span class="p-float-label">
        <InputText id="maxF0" v-model.number="typescales.maxF0" class="w-full"/>
        <Slider v-model="typescales.maxF0" :step="1" :min="8" :max="64"/>
        <label for="maxBreakpoint">max f0</label>
      </span>
      </div>
      <div class="field col-12 md:col-3">
      <span class="p-float-label">
        <InputText id="maxR" v-model.number="typescales.maxR" class="w-full"/>
        <Slider v-model="typescales.maxR" :step="0.1" :min="1" :max="5"/>
        <label for="maxR">max r</label>
      </span>
      </div>
      <div class="field col-12 md:col-3">
      <span class="p-float-label">
        <InputText id="maxF0" v-model.number="typescales.maxN" class="w-full"/>
        <Slider v-model="typescales.maxN" :step="1" :min="1" :max="32"/>
        <label for="maxBreakpoint">max N</label>
      </span>
      </div>
    </div>


    <div class="grid mb-5">
      <div class="field col-12 md:col-3">
      <span class="p-float-label">
        <InputText id="rem" v-model.number="typescales.rem" class="w-full"/>
        <Slider v-model="typescales.rem" :step="1" :min="8" :max="64"/>
        <label for="rem">Rem</label>
      </span>
      </div>
      <div class="field col-12 md:col-3">
      <span class="p-float-label">
        <InputText id="stepsDown" v-model.number="typescales.stepsDown" class="w-full"/>
        <Slider v-model="typescales.stepsDown" :step="1" :min="0" :max="8"/>
        <label for="stepsDown">Steps Down</label>
      </span>
      </div>
      <div class="field col-12 md:col-3">
      <span class="p-float-label">
        <InputText id="stepsUp" v-model.number="typescales.stepsUp" class="w-full"/>
        <Slider v-model="typescales.stepsUp" :step="1" :min="1" :max="32"/>
        <label for="stepsUp">Steps Up</label>
      </span>
      </div>
      <div class="field col-12 md:col-3">
        <label class="form-label">Step Width:
          <select v-model.number="typescales.stepWidth" id="stepWidth" class="form-control">
            <option value="1">Full Steps</option>
            <option value="2">Half Steps</option>
          </select>
        </label>
      </div>
    </div>


    <template>
      <div class="card flex justify-content-center">

      </div>
    </template>


    <div class="mb-3">


    </div>
  </form>
</template>