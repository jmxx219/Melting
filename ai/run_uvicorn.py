import os
import shutil
import sys
now_dir = os.getcwd()
sys.path.append(now_dir)
# run_uvicorn.py
import uvicorn

if __name__ == "__main__":
    # uvicorn.run("melting_ai_api:app", reload=True)
    uvicorn.run("melting_ai_api:app", host="0.0.0.0", port=8000, reload=True)
