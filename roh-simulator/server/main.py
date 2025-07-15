from fastapi import FastAPI
from pydantic import BaseModel
from roh_simulation import run_simulation

app = FastAPI()

class SimulationParams(BaseModel):
    freq: float = 10.0
    amp: float = 1.0
    harmonics: int = 4
    observer_func: str | None = None

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

    sim_params = params.dict()
    sim_params["observer_func"] = observer_func

    roh_data, info_data = run_simulation(sim_params)
    return {"roh_data": roh_data.tolist(), "info_data": info_data.tolist()}

@app.post("/gemini")
async def gemini(prompt: str):
    # This will be implemented later
    return {"response": "Gemini integration is not implemented yet."}
