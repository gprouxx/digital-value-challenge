<template>
  <div class="container">
    <v-card class="card">
      <v-card-text>
        <v-select
            v-model="category"
            :items="categories"
            label="Catégorie"
            item-text="name"
            item-value="id"
            outlined
            @input="updateSparkline($event)"
        />
        <div v-if="!!category">
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
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import v250162 from '../../api/volumes/250162.json'
import v250222 from '../../api/volumes/250222.json'
import v250224 from '../../api/volumes/250224.json'
import v250301 from '../../api/volumes/250301.json'
import v250303 from '../../api/volumes/250303.json'
import v250328 from '../../api/volumes/250328.json'
import v250332 from '../../api/volumes/250332.json'
import v250333 from '../../api/volumes/250333.json'
import v250378 from '../../api/volumes/250378.json'
import v253921 from '../../api/volumes/253921.json'
import v258361 from '../../api/volumes/258361.json'
import v274714 from '../../api/volumes/274714.json'
import v274734 from '../../api/volumes/274734.json'
import v274736 from '../../api/volumes/274736.json'
import categories from '../../api/categories.json'
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
      volumes: null,
      categories: categories,
      category: null
    }
  },
  computed: {
    selectedVolumes () {
      if (this.startDate) {
        return this.volumes.filter(v => dateIsBeforeOrEquals(this.startDate, v.date)).slice(0, 24)
      }
      return this.volumes.slice(0, 24)
    }
  },
  methods: {
    formatDate (date) {
      return formatDate(date, 'dd/MM/yy')
    },
    updateSparkline (category) {
      this.category = category
      this.volumes = this.getVolumes(category)
      this.updateDates()
    },
    getVolumes (categoryId) {
      switch (categoryId) {
        case 250162:
          return v250162
        case 250222:
          return v250222
        case 250224:
          return v250224
        case 250301:
          return v250301
        case 250303:
          return v250303
        case 250328:
          return v250328
        case 250332:
          return v250332
        case 250333:
          return v250333
        case 250378:
          return v250378
        case 253921:
          return v253921
        case 258361:
          return v258361
        case 274714:
          return v274714
        case 274734:
          return v274734
        case 274736:
          return v274736
      }
    },
    updateDates () {
      this.dates = this.volumes.map(v => v.date).slice(0, this.volumes.length - 23)
      this.startDate = this.dates[this.dates.length - 1]
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
