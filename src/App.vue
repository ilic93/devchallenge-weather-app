<template>
  <div id="app">
    <b-container fluid>
      <b-row>
        <b-col sm="5" id="first-half">
          <Today v-if="todayWeather" :defaultCity="defaultCity" :today="todayWeather" />
        </b-col>
        <b-col sm="7" id="second-half">
          <Future v-if="defaultCity.consolidated_weather" :weatherList="defaultCity.consolidated_weather"/>
          <Highlights />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Today from './components/Today.vue'
import Future from './components/Future.vue'
import Highlights from './components/Highlights.vue'
export default {
  name: 'App',
  components: {
    Today,
    Future,
    Highlights
  },
  data () {
    return {
      defaultCity: {},
      todayWeather: {}
    }
  },
  mounted () {
    fetch('https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=london')
      .then(x => x.json())
      .then(x => 
          fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${x[0].woeid}`)
            .then(x => x.json())
            .then(x => {
              this.defaultCity = {...x}
              this.todayWeather = {...x.consolidated_weather[0]}
            })
        )
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  font-size: 20px;
}

#first-half {
  background-color: rgb(66, 93, 245);
}

#second-half {
  background-color: rgb(34, 27, 84);
  padding-top: 20px;
  padding-left: 5%;
  padding-right: 5%;
}


@media only screen and (min-width: 992px) {
  #second-half {
    padding-left: 2%;
    padding-right: 2%;
  }
}
</style>
