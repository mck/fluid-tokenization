<script setup lang="ts">
import { useTypescalesStore } from '../../stores/typescales';

const typescales = useTypescalesStore();
</script>

<template>
	<table class="table">
		<thead>
			<tr>
				<th>Step</th>
				<th v-for="item in typescales.typescales[0].slice(1, -1)" class="text-right">{{ item.breakpoint }}px</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="scale in typescales.typescales" class="align-bottom">
				<td>{{ scale[0].step }}</td>
				<td v-for="item in scale.slice(1, -1)"
					:style="[{ 'line-height': '1em' }, { 'font-size': `${item.fontSize.toFixed(2)}px` }]">Aa</td>
			</tr>
		</tbody>
	</table>
</template>