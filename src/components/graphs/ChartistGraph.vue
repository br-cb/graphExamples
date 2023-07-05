<template>
    <div id="chartist"></div>
</template>

<script setup lang="ts">
import { ChartistData } from '@/data';
import { onMounted } from 'vue';
import { LineChart } from 'chartist'
import 'chartist/dist/index.css'
const data = {
    // A labels array that can contain any sort of values
    labels: ChartistData.labels,
    // Our series array that contains series objects or in this case series data arrays
    series: ChartistData.series
};

// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object.

onMounted(() => {

    new LineChart('#chartist', data, {
        low: 1,
        high: 8,
        axisY: {
            onlyInteger: true
        }
    });
})
</script>

<style >
.ct-series-a .ct-line {
    stroke: #2684cc;
}

.ct-series-a .ct-point {
    stroke: #2684cc;
}
</style>