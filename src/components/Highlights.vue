<template>
  <div class="highmain">
    <h2 class="highhead">Today's Highlights</h2>
    <div class="row highlights">

      <b-col cols="11" lg="5" class="wind">
        <p>Wind status</p>
        <h2>
          <span>{{ windSpeed }}</span>mph
        </h2>
        <p>
          <i class="fas fa-location-arrow"></i>
          <span>{{ windDirComp }}</span>
        </p>
      </b-col>

      <b-col cols="11" lg="5">
        <p>Humidity<p>
        <h2>
          <span>{{ humidity }}</span>%
        </h2>
        <div class="col-8 offset-2" style="margin-bottom:20px;">
          <b-row>
            <b-col cols="2" style="text-align:left;">0</b-col>
            <b-col cols="2" offset="3">50</b-col>
            <b-col cols="2" offset="3">100</b-col>
          </b-row>
          <b-progress :value="humidity" variant="warning"></b-progress>
          <b-row>
            <b-col cols="2" offset="10">%</b-col>
          </b-row>
        </div>
      </b-col>

      <b-col cols="11" lg="5" class="visibility">
        <p>Visibility<p>
        <h2>
          <span>{{ visibility }}</span> miles
        </h2>
      </b-col>
      <b-col cols="11" lg="5">
        <p>Air Pressure<p>
        <h2>
          <span>{{ pressure }}</span> mb
        </h2>
      </b-col>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['today'],
  data() {
    return {
      newCity: {},
      windSpeed: null,
      windDirComp: '',
      windDir: null,
      humidity: null,
      visibility: null,
      pressure: null
    }
  },
  computed: {
    ...mapState(['city'])
  },
  watch: {
    today() {
      this.windSpeed = Math.round(this.today.wind_speed)
      this.windDirComp = this.today.wind_direction_compass
      this.windDir = this.today.wind_direction
      this.humidity = this.today.humidity
      this.visibility = this.today.visibility.toFixed(1)
      this.pressure = this.today.air_pressure
      document.querySelector('.fa-location-arrow').style.transform = `rotate(${-45 + this.windDir}deg)`
    },
    city() {
      this.newCity = {...this.city.consolidated_weather[0]}
      this.windSpeed = Math.round(this.newCity.wind_speed)
      this.windDirComp = this.newCity.wind_direction_compass
      this.windDir = this.newCity.wind_direction
      this.humidity = this.newCity.humidity
      this.visibility = this.newCity.visibility.toFixed(1)
      this.pressure = this.newCity.air_pressure
      document.querySelector('.fa-location-arrow').style.transform = `rotate(${-45 + this.windDir}deg)`
    }
  }
}
</script>

<style>
.highmain {
  color: white;
}

.highhead {
  text-align: left;
  margin: 25px 0;
}

.highlights > div {
  padding-left: 0; 
  padding-right: 0;
  background-color: rgb(66, 93, 245);
  margin-bottom: 25px;
  border-radius: 10px;
  margin-left: 4.166%;
}

@media only screen and (min-width: 992px) {
  .highlights > div {
    margin-right: 4.166%;
  }
}

.highlights h2 {
  font-size: 50px;
}

.highlights h2 span {
  font-weight: bold;
}

.highlights p {
  margin: 0.5rem 0;
}

.wind p {
  margin-top: 25px;
}

.wind i {
  border-radius: 50%;
  background-color: #5c636a;
  margin-right: 15px;
  padding: 7px;
}

div.progress {
  border-radius: 8px;
}

.visibility h2 {
  margin-bottom: 30px;
}
</style>