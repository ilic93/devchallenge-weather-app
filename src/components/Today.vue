<template>
  <div>

    <b-col id="header"> 
      <b-button class="btn-search" v-b-toggle href="#city-sidebar" @click.prevent >Search for places</b-button>
      <b-button class="btn-circle" @click="getLocation()">
        <i class="fas fa-search-location"></i>
      </b-button>
  
      <b-sidebar id="city-sidebar" bg-variant="dark" text-variant="light" shadow>
        <div>
        <b-form inline @submit.prevent="fetchThisCity()">
          <b-form-input list="input-list" id="input-with-list" @keyup="searchCity()"></b-form-input>
          <b-button variant="primary" @click="fetchThisCity()">Search</b-button>
          <b-form-datalist id="input-list" :options="cityList"></b-form-datalist>
        </b-form>
        </div>
      </b-sidebar>
    </b-col>

    <b-col id="weather-photo">
      <img src="../assets/Cloud-background.png" alt="weather-bcg">
      <img :src="require(`@/assets/${weatherPicture}.png`)" alt="weather-pic">
    </b-col>
    <b-col id="weather-temp">
      <h2>{{ temp || Math.round(today.the_temp) }}°c</h2>
      <p>{{ weatherState || today.weather_state_name }}</p>
    </b-col>
    <b-col id="weather-cond">
      <p>Today - {{ today.applicable_date || '' }}</p>
      <p>
        <i class="fas fa-map-marker-alt"></i>{{ cityName || defaultCity.title }}
      </p>
    </b-col>
    <b-col>
    </b-col>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: ['defaultCity', 'today'],
  data () {
    return {
      latitude: null,
      longitude: null,
      woeid: null,
      cityName: '',
      temp: null,
      weatherState: '',
      cityList: []
    }
  },
  methods: {
    ...mapActions(['changeCity']),
    success(position) {
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
      console.log(this.latitude, this.longitude)
      fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=${this.latitude}, ${this.longitude}`)
        .then(x => x.json())
        .then(x => {
          this.woeid = x[0].woeid
          fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${this.woeid}`)
            .then(x => x.json())
            .then(x => 
              this.changeCity(x)
            )
        })
    },
    error() {
      console.log('unable to retrieve your location')
    },
    getLocation() {
      if(!navigator.geolocation) {
        console.log('Geolocation not suported')
      } else {
        console.log('Locating…')
        navigator.geolocation.getCurrentPosition(this.success, this.error)
      }
    },
    searchCity() {
      const x = document.querySelector('#input-with-list').value
      if(x == '') return
      console.log(x)
      fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${x}`)
        .then(res => res.json())
        .then(res => {
          let list = res.map(x => x.title)
          this.cityList = list
        })
    },
    fetchThisCity() {
      const x = document.querySelector('#input-with-list').value
      console.log(x)
      fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${x}`)
        .then(x => x.json())
        .then(x => {
          this.woeid = x[0].woeid
          fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${this.woeid}`)
            .then(x => x.json())
            .then(x => 
              this.changeCity(x)
            )
        })
    }
  },
  computed: {
    ...mapState(['city']),
    weatherPicture() {
      let x = 'Clear'
      switch(this.weatherState || this.today.weather_state_name) {
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
      return x
    }
  },
  watch: {
    city () {
      this.cityName = this.city.title
      this.temp = Math.round(this.city.consolidated_weather[0].the_temp)
      this.weatherState = this.city.consolidated_weather[0].weather_state_name
    }
  }
}
</script>

<style>
#header {
  height: 10vh;
  padding: 20px;
}

.btn-circle {
  border-radius: 50% !important;
  float: right;
}

.btn-search {
  float:left;
}

#city-sidebar button {
  background-color: black;
  border: none;
}

#input-with-list {
  display: inline-block;
  width: 75%;
}

#weather-photo {
  height: 33vh;
  position: relative;
}

img:first-child {
  position: absolute;
  width: 100%;
  left: 0;
  opacity: 0.3;
}

[alt="weather-pic"] {
  position: relative;
  z-index: 5;
}

#weather-temp {
  height: 30vh;
}

#weather-temp h2 {font-size: 100px;}
#weather-temp p {font-size: 50px;}

#weather-cond {
  height: 27vh;
}

#weather-cond i {
  margin-right: 10px;
}

@media only screen and (min-width: 576px) {
  #city-sidebar {
    width: 33%;
  }
}
</style>