<template>
  <div class="card-body">
    <h5 class="card-title">{{ forecast.name }}</h5>
    <p class="card-text mt-3">
      <b>Temps: </b>{{ forecast.highTemp }} / {{ forecast.lowTemp }}
    </p>
    <p class="card-text">
      <b>Chance of Rain: </b>{{ forecast.dayPrecipitation }} /
      {{ forecast.nightPrecipitation }}
    </p>
    <p class="card-text">
      <b>Wind: </b>{{ forecast.dayWind }} / {{ forecast.nightWind }}
    </p>
  </div>
  <div class="card-footer">
    <button type="button" class="btn btn-primary" @click="shown = !shown">
      View Detailed Forecast
    </button>
  </div>
  <div v-if="shown">
    <div class="mymodal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="close">&times;</span>
                <h1>{{ forecast.name }}'s Forecast</h1>
            </div>
            <div class="modal-body">
                <p>Some text in the Modal Body</p>
                <p>Some other text...</p>
            </div>
            </div>
      
      <div class="accordion" :id="`accordion${forecast.name}`">
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#collapse${forecast.name}day`"
            aria-expanded="false"
            :aria-controls="`collapse${forecast.name}day`"
          >
            Day Forecast
          </button>
        </h2>
        <div
          :id="`collapse${forecast.name}day`"
          class="accordion-collapse collapse"
          :data-bs-parent="`accordion${forecast.name}`"
        >
          <div class="accordion-body">
            <!-- <img :src="getNewIconSource(forecast.icon)"> -->
            <p><b>Detailed Forecast:</b>{{ forecast.dayDetailed }}</p>
            <p><b>Temperature:</b> {{ forecast.dayTemp }}</p>
            <p><b>Chance of Rain:</b> {{ forecast.dayPrecipitation }}</p>
            <!-- <p><b>Relative Humidity:</b> {{ forecast.dayHumidity }}</p> -->
            <p><b>Wind: </b> {{ forecast.dayWind }}</p>
          </div>
        </div>

        <div class="accordion-item mt-3">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#collapse${forecast.number}night`"
              aria-expanded="false"
              :aria-controls="`collapse${forecast.number}night`"
            >
              Night Forecast
            </button>
          </h2>
          <div
            :id="`collapse${forecast.number}night`"
            class="accordion-collapse collapse"
            :data-bs-parent="`accordion${forecast.number}`"
          >
            <div class="accordion-body">
              <!-- <img :src="getNewIconSource(forecast.nightIcon)"> -->
              <p><b>Detailed Forecast:</b> {{ forecast.nightDetailed }}</p>
              <p><b>Temperature:</b> {{ forecast.lowTemp }}</p>
              <p><b>Chance of Rain:</b> {{ forecast.nightPrecipitation }}</p>
              <!-- <p><b>Relative Humidity:</b> {{ forecast.nightHumidity }}</p> -->
              <p><b>Wind: </b> {{ forecast.nightWind }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["forecast"]);

const shown = ref(false);
// const getNewIconSource = (originalIcon) => {
//     originalIcon = originalIcon.replace('small', 'large')
//     originalIcon = originalIcon.replace('medium', 'large')
//     return originalIcon
// }
</script>

<style scoped>
.mymodal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.mymodal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}
</style>