<template>
    <img :src="getNewIconSource()" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">{{ forecast.name }}</h5>
        <p class="card-text">{{ forecast.temperature }}&#176;{{ forecast.temperatureUnit }}</p>
        <p class="card-text">{{ forecast.shortForecast }}</p>
    </div>
    <div class="card-footer">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="`#staticBackdrop${forecast.number}`">
            View Detailed Forecast
        </button>
        <div class="modal fade" :id="`staticBackdrop${forecast.number}`" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ forecast.name }}'s Forecast</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>{{ forecast.detailedForecast }}</p>
                        <p><b>Temperature:</b> {{ forecast.temperature }}&#176;F</p>
                        <p><b>Chance of Rain:</b> {{ forecast.probabilityOfPrecipitation.value }}%</p>
                        <p><b>Dewpoint:</b> {{ cToF() }}&#176;F</p>
                        <p><b>Relative Humidity:</b> {{ forecast.relativeHumidity.value }}%</p>
                        <p><b>Wind Speed:</b> {{ forecast.windSpeed }}</p>
                        <p><b>Wind Direction:</b> {{ forecast.windDirection }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['forecast'])

const getNewIconSource = () => {
    return props.forecast.icon.replace('medium','large')
}

const cToF = () => {
    return (props.forecast.dewpoint.value * (9/5)) + 32;
}

</script>