# roh_simulation.py
import numpy as np

def wave_function(x, t, freq=10.0, amp=1.0):
    return amp * np.sin(2 * np.pi * freq * x - t)

def harmonic_spectrum(x, base_freq=10.0, harmonics=4):
    h = np.zeros_like(x)
    for n in range(1, harmonics + 1):
        h += (1/n) * np.sin(2 * np.pi * base_freq * n * x)
    return h

def observer_modulation(x, t, func):
    return func(x) * np.sin(2 * np.pi * t)

def roh_xt(x, t, freq=10.0, amp=1.0, harmonics=4, observer_func=None):
    ψ = wave_function(x, t, freq, amp)
    h = harmonic_spectrum(x, freq, harmonics)
    c = observer_modulation(x, t, observer_func or (lambda x: 0))
    return ψ * h + 0.5 * c

def info_density(r):
    r = np.abs(r)
    safe_r = np.where(r == 0, 1e-12, r)
    return r**2 * np.log2(safe_r)

def run_simulation(params):
    x = np.linspace(0, 1, 512)
    times = np.linspace(0, 2*np.pi, 300)
    roh_data = []
    info_data = []
    for t in times:
        r = roh_xt(x, t, **params)
        roh_data.append(r)
        info_data.append(info_density(r))
    return np.array(roh_data), np.array(info_data)
