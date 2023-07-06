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
        toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
                download: true,
                selection: true,
                zoom: true,
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: true,
            },
        },
    },
    stroke: {
        curve: 'smooth'
    },
    markers: {
        size: 5,
    },
    grid: {
        padding: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
        },
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
    width: 100%;
    min-width: 0;
    display: grid;
    overflow: hidden;
    box-sizing: border-box;

}
</style>