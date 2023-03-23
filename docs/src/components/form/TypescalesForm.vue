<script setup lang="ts">
import { useTypescalesStore } from '../../stores/typescales';

const typescales = useTypescalesStore();
</script>

<template>
    <form>
        <div class="mb-3">
            <label class="form-label">Min Breakpoint: <input v-model="typescales.minBreakpoint" type="number" id="minBreakpoint"
                    class="form-control"></label>
            <label class="form-label">Min f0: <input v-model="typescales.minF0" type="number" id="minF0" class="form-control"></label>
            <label class="form-label">Min r: <input v-model="typescales.minR" type="number" id="minR" step="0.1"
                    class="form-control"></label>
            <label class="form-label">Min n: <input v-model="typescales.minN" type="number" id="minN" step="1" class="form-control"></label>
        </div>
        <div class="mb-3">
            <label class="form-label">Max Breakpoint: <input v-model="typescales.maxBreakpoint" type="number" id="maxBreakpoint"
                    class="form-control"></label>
            <label class="form-label">Max f0: <input v-model="typescales.maxF0" type="number" id="maxF0" class="form-control"></label>
            <label class="form-label">Max r: <input v-model="typescales.maxR" type="number" id="maxR" step="0.1"
                    class="form-control"></label>
            <label class="form-label">Max n: <input v-model="typescales.maxN" type="number" id="maxN" step="1" class="form-control"></label>
        </div>
        <div class="mb-3">
            <label class="form-label">Steps Down: <input v-model="typescales.stepsDown" type="number" id="stepsDown" step="1"
                    class="form-control"></label>
            <label class="form-label">Steps Up: <input v-model="typescales.stepsUp" type="number" id="stepsUp" step="1"
                    class="form-control"></label>
            <label class="form-label">Step Width:
                <select v-model.number="typescales.stepWidth" id="stepWidth" class="form-control">
                    <option value="1">Full Steps</option>
                    <option value="2">Half Steps</option>
                </select>
            </label>

        </div>
    </form>
</template>