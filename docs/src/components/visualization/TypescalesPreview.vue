<script setup lang="ts">
import { useTypescalesStore } from '../../stores/typescales';

const typescales = useTypescalesStore();
</script>

<template>
	<table class="table w-full">
		<thead>
			<tr>
				<th class="text-left">Step</th>
				<th v-for="item in typescales.typescales[0].slice(1, -1)" class="text-left">{{ item.breakpoint }}px</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="scale in typescales.typescales" class="align-bottom" :class="scale[0].step">
				<td>{{ scale[0].step }}</td>
				<td :style="[{ 'line-height': '1em' }, { 'font-size': scale[1].cssValue.toFixed(2) + 'px' }]">
          Aa <span class="font-size-info">{{scale[1].cssValue}}px</span>
        </td>
				<td :style="[{ 'line-height': '1em' }, { 'font-size': scale[2].cssValue.toFixed(2) + 'px' }]">
          Aa <span class="font-size-info">{{scale[2].cssValue.toFixed(2)}}px</span>
        </td>
				<td :style="[{ 'line-height': '1em' }, { 'font-size': scale[3].cssValue.toFixed(2) + 'px' }]">
          Aa <span class="font-size-info">{{scale[3].cssValue}}px</span>
        </td>
			</tr>
		</tbody>
	</table>
</template>
