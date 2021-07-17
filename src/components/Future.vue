<template>
  <div class="row equal">
    <b-col cols="5" class="span2" v-for="(item, index) in list" :key="index">
      <p class="date">{{ item.applicable_date }}</p>
      <img :src="require(`@/assets/${futurePicture[index]}.png`)" alt="future-pic">
      <p class="temp">
        <span style="float:left;">{{ Math.round(item.min_temp) }}°c</span>
        <span style="float:right;">{{ Math.round(item.max_temp) }}°c</span>
      </p>
    </b-col>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['weatherList'],
  data() {
    return {
      list: [...this.weatherList].splice(1, 5)
    }
  },
  computed: {
    ...mapState(['city']),
    futurePicture() {
      let x = 'Clear'
      let list2 = []
      for(let i = 0; i < this.list.length; i++) {
        switch(this.list[i].weather_state_name) {
          case 'Snow':
            x = 'Snow';
            break;
          case 'Sleet':
            x = 'Sleet';
            break;
          case 'Hail':
            x = 'Hail';
            break;
          case 'Thunderstorm':
            x = 'Thunderstorm';
            break;
          case 'Heavy Rain':
            x = 'HeavyRain';
            break;
          case 'Light Rain':
            x = 'LightRain';
            break;
          case 'Showers':
            x = 'Shower';
            break;
          case 'Heavy Cloud':
            x = 'HeavyCloud';
            break;
          case 'Light Cloud':
            x = 'LightCloud';
            break;
          case 'Clear':
            x = 'Clear';
            break;
        }
        list2.push(x)
      }
      return list2
    },
  },
  watch: {
    city() {
      this.list = [...this.city.consolidated_weather]
      this.list.splice(0, 1)
    }
  }
}
</script>

<style>
.span2 {
  color: white;
  background-color: rgb(66, 93, 245);
  margin: 25px 15px;
  border-radius: 10px; 
  position: relative;
}

[alt="future-pic"] {
  width: 100px;
  height: 100px;
}

@media only screen and (max-width: 390px) {
  .equal .span2 {
    width: 80%;
    margin-left: 10%;
  }
}

@media only screen and (min-width: 576px) {
  .equal .span2 {
    margin: 25px 10px;
  }
}

@media only screen and (min-width: 992px) {
  .equal .span2 {
    width: 15%;
    height: 20vh;
    margin-left: 2.5%;
    margin-right: 2.5%;
    font-size: 15px;
    padding: 0;
  }

  .span2 .temp {
    position: absolute;
    width: 80%;
    bottom: 0;
    left: 10%;
  }

  [alt="future-pic"] {
    width: 100%;
    object-fit: cover;
    height: auto;
  }
}

@media only screen and (min-width: 1200px) {
  [alt="future-pic"] {
    width: 80%;
  }

  .equal .span2 {
    font-size: 18px;
  }
}
</style>