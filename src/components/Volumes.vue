<template>
  <div class="container">
    <v-card class="card">
      <v-card-text>
        <v-sparkline
            :value="selectedVolumes.map(v => v.volume)"
            :labels="selectedVolumes.map(v => formatDate(v.date))"
            :smooth="10"
            :line-width="1"
            :stroke-linecap="'round'"
            :gradient-direction="'top'"
            :fill="false"
            :type="'trend'"
            :auto-line-width="false"
            auto-draw
        />
        <v-select
            v-model="startDate"
            :items="dates"
            label="Date de début"
            outlined
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import v250162 from '../../api/volumes/250162.json'
import {formatDate, dateIsBeforeOrEquals} from '@/utils/date'

/*
Instructions:
- run npm serve
- go to the Local path
 */
export default {
  name: 'Volumes',
  data() {
    return {
      startDate: null,
      dates: null,
      volumes: v250162
    }
  },
  created () {
    this.dates = this.volumes.map(v => v.date).slice(0, this.volumes.length - 23)
    this.startDate = this.dates[this.dates.length - 1]
  },
  computed: {
    selectedVolumes() {
      if (this.startDate) {
        return this.volumes.filter(v => dateIsBeforeOrEquals(this.startDate, v.date)).slice(0, 24)
      }
      return this.volumes.slice(0, 24)
    }
  },
  methods: {
    formatDate(date) {
      return formatDate(date, 'dd/MM/yy')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  g > text {
    font-size: 2px;
  }
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: center;

  .card {
    width: 100%;
  }
}
</style>
