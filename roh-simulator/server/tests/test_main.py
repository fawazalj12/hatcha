from fastapi.testclient import TestClient
from server.main import app

client = TestClient(app)

def test_simulate():
    response = client.post("/simulate", json={"freq": 10.0, "amp": 1.0, "harmonics": 4})
    assert response.status_code == 200
    data = response.json()
    assert "roh_data" in data
    assert "info_data" in data
    assert len(data["roh_data"]) == 300
    assert len(data["roh_data"][0]) == 512
    assert len(data["info_data"]) == 300
    assert len(data["info_data"][0]) == 512
