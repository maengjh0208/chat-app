from fastapi import FastAPI


def create_app():
    app = FastAPI()
    return app


app = create_app()


@app.get("/health-check")
async def health_check():
    return {"status": "OK!!"}
