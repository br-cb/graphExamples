<template>
    <HighCharts :options="HighChartsData"></HighCharts>
</template>

<script setup lang="ts">
import { HighChartsData } from '@/data';
import { Chart as HighCharts } from 'highcharts-vue'

</script>