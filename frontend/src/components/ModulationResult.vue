<template>
  <div class="panel" style="margin-top:16px">
    <h3>🔬 调制识别结果</h3>
    <el-row :gutter="16">
      <el-col :span="8">
        <div class="result-card">
          <div class="label">检测类型</div>
          <div class="value highlight">{{ readings.type }}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="result-card">
          <div class="label">置信度</div>
          <div class="value">{{ readings.confidencePct }}%</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="result-card">
          <div class="label">符号速率</div>
          <div class="value">{{ readings.symbolRateText }}</div>
        </div>
      </el-col>
    </el-row>
    <div class="candidates" v-if="readings.hasCandidates">
      <div class="label" style="margin-top:12px">候选调制方式</div>
      <div v-for="c in readings.candidates" :key="c.type" class="candidate-row">
        <span class="c-type">{{ c.type }}</span>
        <el-progress :percentage="c.percentage" :stroke-width="8" :color="c.color" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSignalStore } from '../store/signal'
import { getModulationReadings } from '../utils/reading'
const store = useSignalStore()
const readings = computed(() => getModulationReadings(store.result?.modulation))
</script>

<style scoped>
.panel { background:#1a2332; border-radius:8px; padding:16px; border:1px solid #2a3a4a }
.panel h3 { margin-bottom:12px; color:#90caf9; font-size:14px }
.result-card { text-align:center; padding:12px; background:#0d1520; border-radius:8px }
.label { font-size:12px; color:#8899aa; margin-bottom:4px }
.value { font-size:20px; font-weight:700; color:#e0e0e0 }
.value.highlight { color:#64b5f6 }
.candidate-row { display:flex; align-items:center; gap:12px; margin:8px 0 }
.c-type { width:60px; font-size:13px; color:#e0e0e0 }
</style>
