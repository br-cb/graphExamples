<template>
    <div class="wrapper">
        <div id="chart"></div>
    </div>
</template>

<script setup lang="ts">
import ApexCharts from 'apexcharts';
import { ApexChartsData } from '@/data';
import { onMounted } from 'vue';

const options = {
    chart: {
        type: 'line',
        dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 1,
            opacity: 0.5
        },
        height: '100%',
    },
    stroke: {
        curve: 'smooth'
    },
    markers: {
        size: 5,
    },
    colors: ['#2684cc'],
    series: ApexChartsData.series,
    xaxis: ApexChartsData.xaxis,
    yaxis: {
        min: 1,
        max: 8,
        tickAmount: 7,
        decimalsInFloat: 0,
    }
}
onMounted(() => {
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
})
</script>

<style>
.wrapper {
    max-height: 100%;

}
</style>