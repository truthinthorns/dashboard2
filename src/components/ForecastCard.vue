<template>
        <div class="card-body">
        <h5 class="card-title">{{ forecast.name }}</h5>
        <p class="card-text mt-3"><b>High: </b>{{ forecast.highTemp }}</p>
        <p class="card-text"><b>Low: </b>{{ forecast.lowTemp }}</p>
        <p class="card-text"><b>Chance of Rain: </b>{{ forecast.highestChanceOfRain }}</p>
        <p class="card-text"><b>Wind </b>{{ forecast.highestWind }}</p>
    </div>
    <div class="card-footer">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
            :data-bs-target="`#staticBackdrop${forecast.number}`">
            View Detailed Forecast
        </button>
        <div class="modal fade" :id="`staticBackdrop${forecast.number}`" data-bs-backdrop="static"
            data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ forecast.name }}'s Forecast</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="accordion" :id="`accordion${forecast.number}`">
                            <div v-if="!forecast.onlyNight" class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        :data-bs-target="`#collapse${forecast.number}day`" aria-expanded="false"
                                        :aria-controls="`collapse${forecast.number}day`">
                                        Day Forecast
                                    </button>
                                </h2>
                                <div :id="`collapse${forecast.number}day`" class="accordion-collapse collapse"
                                    :data-bs-parent="`accordion${forecast.number}`">
                                    <div class="accordion-body">
                                        <img :src="getNewIconSource(forecast.dayIcon)">
                                        <p><b>Detailed Forecast:</b>{{ forecast.dayDetailed }}</p>
                                        <p><b>Temperature:</b> {{ forecast.highTemp }}</p>
                                        <p><b>Chance of Rain:</b> {{ forecast.dayPrecipitation }}</p>
                                        <p><b>Relative Humidity:</b> {{ forecast.dayHumidity}}</p>
                                        <p><b>Wind: </b> {{ forecast.dayWind }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item mt-3">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        :data-bs-target="`#collapse${forecast.number}night`" aria-expanded="false"
                                        :aria-controls="`collapse${forecast.number}night`">
                                        Night Forecast
                                    </button>
                                </h2>
                                <div :id="`collapse${forecast.number}night`" class="accordion-collapse collapse"
                                    :data-bs-parent="`accordion${forecast.number}`">
                                    <div class="accordion-body">
                                        <img :src="getNewIconSource(forecast.nightIcon)">
                                        <p><b>Detailed Forecast:</b> {{ forecast.nightDetailed }}</p>
                                        <p><b>Temperature:</b> {{ forecast.lowTemp }}</p>
                                        <p><b>Chance of Rain:</b> {{ forecast.nightPrecipitation }}</p>
                                        <p><b>Relative Humidity:</b> {{ forecast.nightHumidity}}</p>
                                        <p><b>Wind: </b> {{ forecast.nightWind }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['forecast'])

const getNewIconSource = (originalIcon) => {
    const newSource = import.meta.env.VITE_WEATHER_URL + originalIcon;
    return newSource.replace('medium', 'large')
}

</script>