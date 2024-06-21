from fastapi import FastAPI
import requests
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
# from fastapi.responses import JSONResponse


# coords = "39.76,-84.08"

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

def get_forecast_links(hourly: bool, coords: str):
    result = requests.get(f'https://api.weather.gov/points/{coords}').json()
    if hourly:
        return result["properties"]["forecastHourly"]
    else:
        return result["properties"]["forecast"]


@app.get('/hourly/{coords}')
async def get_hourly_forecast(coords: str):
    # global coords
    link = get_forecast_links(True, coords)
    result = requests.get(link).json()
    new_result = jsonable_encoder(result['properties']['periods'])
    return new_result


@app.get('/weekly/{coords}')
async def get_weekly_forecast(coords: str):
    # global coords
    link = get_forecast_links(False, coords)
    result = requests.get(link).json()
    new_result = jsonable_encoder(result['properties']['periods'])
    return new_result
    

# @app.get('/dashboard')
# async def dashboard():
#     return nws_links
