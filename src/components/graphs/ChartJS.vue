<template>
    <div id="chart_js_wrapper" style="min-height: 0;">
        <canvas id="myChart"></canvas>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Chart from 'chart.js/auto'
import { ChartJSData } from '@/data'

onMounted(() => {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ChartJSData.labels,
                datasets: ChartJSData.datasets
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 8
                    }
                }
            }
        })
    }
})
</script>

<style scoped>
#mychart {
    height: 450px;
    width: 100%;
}
</style>