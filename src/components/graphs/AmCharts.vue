<template>
    <div ref="simpleGraph" class="simple_graph"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import graphData from "@/data/AmCharts"

const graphItems = [
    {
        name: 'Company Average',
        field: 'value',
        color: '#2684cc',
    },
]

// Create root and chart

const simpleGraph = ref<null | HTMLElement>(null);
if (import.meta.env.VITE_APP_AMCHARTS_LICENSE) {
    am5.addLicense(import.meta.env.VITE_APP_AMCHARTS_LICENSE);
}
let root: am5.Root | undefined = undefined;
let chart: any | undefined = undefined;
onMounted(async () => {
    root = am5.Root.new(simpleGraph.value ? simpleGraph.value : "");
    graphSetup();
});
onUnmounted(() => {
    chart?.dispose();
});
function graphSetup() {
    if (root === undefined) return;
    root.setThemes([am5themes_Animated.new(root)]);
    chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            panY: false,
            layout: root.verticalLayout,
            maxTooltipDistance: 0,
        })
    );
    // Define data
    // Create Y-axis
    const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
            min: 1,
            max: 8,
            renderer: am5xy.AxisRendererY.new(root, {}),
        })
    );

    // Create X-Axis
    const xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
            categoryField: "surveyName",
            renderer: am5xy.AxisRendererX.new(root, {}),
        })
    );
    xAxis.data.setAll(graphData);
    xAxis.get("renderer").labels.template.setAll({
        text: "{surveyName}",
    });
    // Create series

    const createSeries = (name: string, field: string, color: string) => {
        if (root === undefined) return;
        if (chart === undefined) return;
        const series = chart.series.push(
            am5xy.SmoothedXLineSeries.new(root, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: field,
                categoryXField: "surveyName",
                tooltip: am5.Tooltip.new(root, {}),
                stroke: am5.color(color),
            })
        );
        series.strokes.template.setAll({
            strokeWidth: 4,
            shadowColor: am5.color(0x000000),
            shadowBlur: 5,
            shadowOffsetX: 1,
            shadowOffsetY: 2,
            shadowOpacity: 0.5,
        });

        series.bullets.push((root: am5.Root) => {
            return am5.Bullet.new(root, {
                sprite: am5.Circle.new(root, {
                    radius: 4,
                    fill: am5.color(color),
                }),
            });
        });
        series.data.setAll(graphData);
    };

    graphItems.forEach((i) => {
        createSeries(i.name, i.field, i.color);
    });
    const legend = chart.children.push(am5.Legend.new(root, {}));

    legend.data.setAll(chart.series.values);
}

</script>

<style scoped>
.simple_graph {}
</style>
