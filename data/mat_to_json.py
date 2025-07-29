import scipy.io
import json
import numpy as np
import os

def convert(obj):
    if isinstance(obj, np.ndarray):
        if obj.dtype == object:
            return [convert(i) for i in obj]
        else:
            return obj.tolist()
    if isinstance(obj, (list, tuple)):
        return [convert(i) for i in obj]
    if isinstance(obj, bytes):
        return obj.decode(errors='ignore')
    if isinstance(obj, dict):
        return {k: convert(v) for k, v in obj.items()}
    if isinstance(obj, complex):
        return abs(obj)
    if hasattr(obj, 'tolist'):
        return obj.tolist()
    return obj

def fallback(o):
    if isinstance(o, np.ndarray):
        return o.tolist()
    if isinstance(o, (np.generic,)):
        return o.item()
    if isinstance(o, complex):
        return abs(o)
    return str(o)

def mat_to_json(mat_path, json_path):
    mat = scipy.io.loadmat(mat_path)
    mat = {k: v for k, v in mat.items() if not k.startswith('__')}
    mat = convert(mat)
    with open(json_path, 'w') as f:
        json.dump(mat, f, indent=2, default=fallback)
    print(f"Converted {mat_path} to {json_path}")

if __name__ == "__main__":
    for fname in os.listdir('.'):
        if fname.endswith('.mat'):
            mat_to_json(fname, fname.replace('.mat', '.json'))