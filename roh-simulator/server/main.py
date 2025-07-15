from fastapi import FastAPI
from pydantic import BaseModel
from roh_simulation import run_simulation
import requests
import os

app = FastAPI()

class SimulationParams(BaseModel):
    freq: float = 10.0
    amp: float = 1.0
    harmonics: int = 4
    observer_func: str | None = None

class GeminiPrompt(BaseModel):
    prompt: str

@app.post("/simulate")
async def simulate(params: SimulationParams):
    # The observer_func is a string that needs to be evaluated
    # This is a security risk and should be handled carefully in a real application
    if params.observer_func:
        try:
            # WARNING: eval is not safe and should not be used in production
            observer_func = eval(params.observer_func)
        except:
            observer_func = lambda x: 0
    else:
        observer_func = lambda x: 0

    sim_params = params.model_dump()
    sim_params["observer_func"] = observer_func

    roh_data, info_data = run_simulation(sim_params)
    return {"roh_data": roh_data.tolist(), "info_data": info_data.tolist()}

@app.post("/gemini")
async def gemini(prompt: GeminiPrompt):
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        return {"response": "GEMINI_API_KEY not found."}

    res = requests.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
        headers={"Authorization": f"Bearer {api_key}"},
        json={"contents": [{"parts": [{"text": prompt.prompt}]}]}
    )
    if res.status_code == 200:
        return {"response": res.json()['candidates'][0]['content']['parts'][0]['text']}
    else:
        return {"response": "Error calling Gemini API."}
