from fastapi import FastAPI
import requests
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
# from fastapi.responses import JSONResponse


app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

coords = "39.770013,-84.082311"
nws_links = {
    "weekly": "",
    "hourly": ""
}

def get_forecast_links(coords):
    result = requests.get(f'https://api.weather.gov/points/{coords}').json()    # nws_links["hourly"] = result["properties"]["forecastHourly"]
    nws_links["weekly"] = result["properties"]["forecast"]
    nws_links["hourly"] = result["properties"]["forecastHourly"]
    return result

get_forecast_links(coords)


@app.get('/hourly')
async def get_weekly_forecast():
    result = requests.get(nws_links["hourly"]).json()
    new_result = jsonable_encoder(result['properties']['periods'])
    return new_result


@app.get('/weekly')
async def get_weekly_forecast():
    result = requests.get(nws_links["weekly"]).json()
    new_result = jsonable_encoder(result['properties']['periods'])
    return new_result
    

@app.get('/dashboard')
async def dashboard():
    return nws_links