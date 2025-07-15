import numpy as np
from roh_simulation import wave_function, harmonic_spectrum, observer_modulation, roh_xt, info_density, run_simulation

def test_wave_function():
    x = np.linspace(0, 1, 10)
    t = 0
    y = wave_function(x, t)
    assert y.shape == (10,)

def test_harmonic_spectrum():
    x = np.linspace(0, 1, 10)
    y = harmonic_spectrum(x)
    assert y.shape == (10,)

def test_observer_modulation():
    x = np.linspace(0, 1, 10)
    t = 0
    func = lambda x: x**2
    y = observer_modulation(x, t, func)
    assert y.shape == (10,)

def test_roh_xt():
    x = np.linspace(0, 1, 10)
    t = 0
    y = roh_xt(x, t)
    assert y.shape == (10,)

def test_info_density():
    r = np.array([0, 1, 2])
    y = info_density(r)
    assert y.shape == (3,)

def test_run_simulation():
    params = {"freq": 10.0, "amp": 1.0, "harmonics": 4, "observer_func": None}
    roh_data, info_data = run_simulation(params)
    assert roh_data.shape == (300, 512)
    assert info_data.shape == (300, 512)
