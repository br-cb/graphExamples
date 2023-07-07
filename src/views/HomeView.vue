<template>
  <main>
    <h1 id="page_title">{{ title }}</h1>
    <nav>
      <ul id="nav_flex">
        <li class="option_button" v-for="(item, index) in options" :key="`option ${index}`" @click="libInUse(item)"
          :class="[title === item ? 'selected' : 'not_selected']">{{
            item }}</li>
      </ul>
      <button id="code_toggle" @click="setToggle()">Toggle Code</button>
    </nav>
    <section id="main_grid"
      :style="[toggle === 'open' ? { 'grid-template-columns': '4fr 2fr' } : { 'grid-template-columns': '1fr 0fr' }]">
      <article id="graph" class="page_content">
        <component :is="graph"></component>
      </article>
      <article id="code" class="page_content" v-highlight>
        <pre class="language-javascript">
    <code>
    {{ code }}
    </code>
    </pre>
      </article>
    </section>
  </main>
</template>

<script lang="ts" setup>
import '../../node_modules/vue-code-highlight/themes/duotone-sea.css'
import { ref, onMounted } from 'vue'
import { AmCharts, ApexCharts, ChartJS, Chartist, HighCharts } from '@/components/graphs';
import { AmChartsData, ApexChartsData, ChartJSData, ChartistData, HighChartsData } from '@/data';

const toggle = ref('')

function setToggle() {
  const currentState = toggle.value
  if (currentState === 'open') {
    localStorage.setItem('toggle', 'close')
    toggle.value = 'close'
  } else {
    localStorage.setItem('toggle', 'open')
    toggle.value = 'open'
  }
}

const code = ref();
const graph = ref();
const title = ref();

const options = [
  'Am Charts',
  'Apex Charts',
  'Chartist',
  'Chart.js',
  'High Charts'
]

const libInUse = (selected: string) => {
  title.value = selected;
  switch (selected) {
    case 'Am Charts':
    default:
      code.value = AmChartsData
      graph.value = AmCharts
      localStorage.setItem('location', 'Am Charts')
      break;
    case 'Apex Charts':
      code.value = ApexChartsData
      graph.value = ApexCharts
      localStorage.setItem('location', 'Apex Charts')
      break;
    case 'Chartist':
      code.value = ChartistData
      graph.value = Chartist
      localStorage.setItem('location', 'Chartist')
      break;
    case 'Chart.js':
      code.value = ChartJSData
      graph.value = ChartJS
      localStorage.setItem('location', 'Chart.js')
      break;
    case 'High Charts':
      code.value = HighChartsData
      graph.value = HighCharts
      localStorage.setItem('location', 'High Charts')
      break;
  }
}

onMounted(() => {
  const lsi = localStorage.getItem('toggle')
  if (lsi === null) {
    localStorage.setItem('toggle', 'open')
    toggle.value = 'open'
  } else {
    toggle.value = lsi
  }
  const location = localStorage.getItem('location')
  if (location !== null) {
    libInUse(location)
  } else {
    libInUse('Am Charts')
  }
})

</script>

<style scoped>
main {
  width: 100vw;
  box-sizing: border-box;
  height: 100vh;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(45deg, rgb(17, 24, 38), rgb(8, 19, 15));
  color: white;

}

#page_title {
  margin: 0px;
}

nav {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;

  >#nav_flex {
    display: flex;
    list-style: none;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 0;

    >li {
      cursor: pointer;
    }
  }

  >#code_toggle {
    padding: 0.5rem 5rem 0.5rem 5rem;
    font-weight: bold;
    border: none;
    border-radius: 50vw;
    margin: 0 0 1rem 0;
    cursor: pointer;
    transition: 0.3s;
    box-shadow: 0 0 3px 1px black;

    @media (width <=500px) {
      display: none;
    }

    &:focus {
      outline: none;
    }

    &:active {
      transition: 0.01s !important;
      transform: scale(0.99) !important;
      box-shadow: 0 0 1px 1px black !important;
    }

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 0 6px 3px black;
    }
  }
}

#main_grid {
  display: grid;
  gap: 1rem;
  transition: 0.5s ease-in-out;
  filter: drop-shadow(1px 1px 5px black);
  position: relative;
  height: 80%;
  box-sizing: border-box;

  @media (width <=500px) {
    grid-template-columns: 1fr !important;
  }

  >#graph {
    display: grid;
    background: whitesmoke;
    color: black;
  }

  >#code {
    display: grid;
    overflow-x: hidden;
    overflow-y: auto;
    background: #1d262f;

    @media (width <=500px) {
      display: none;
    }
  }

  >.page_content {
    border-radius: 5px;
  }
}

.selected {
  color: white;
  --shadow_color: rgb(33, 196, 153);
  text-shadow: 0 0 1px #fff, 0 0 5px #fff, 0 0 5px var(--shadow_color),
    0 0 10px var(--shadow_color), 0 0 15px var(--shadow_color), 0 0 20px var(--shadow_color),
    0 0 25px var(--shadow_color);

}
</style>
