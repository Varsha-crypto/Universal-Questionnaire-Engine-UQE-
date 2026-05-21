from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import sqlite3, json, os
from datetime import datetime

app = FastAPI(title="HopeLine Mental Health Assessment")

BASE_DIR = os.path.dirname(__file__)

templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))

# Serve /static  →  ./static/
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")

DB = os.path.join(BASE_DIR, "hopeline.db")

# ── DB ──────────────────────────────────────────────────
def get_db():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS assessments (
                id           INTEGER PRIMARY KEY AUTOINCREMENT,
                pid          TEXT    NOT NULL,
                name         TEXT    NOT NULL,
                date         TEXT    NOT NULL,
                answers      TEXT    NOT NULL,
                total_score  INTEGER NOT NULL,
                tier         INTEGER NOT NULL,
                mood_score   INTEGER DEFAULT 0,
                family_score INTEGER DEFAULT 0,
                dep_score    INTEGER DEFAULT 0,
                anger_score  INTEGER DEFAULT 0,
                red_flags    INTEGER DEFAULT 0,
                created_at   TEXT    NOT NULL
            )
        """)
        conn.commit()

init_db()

# ── Compatible render helper ─────────────────────────────
def render(request: Request, template: str, context: dict = {}):
    try:
        return templates.TemplateResponse(request=request, name=template, context=context)
    except TypeError:
        return templates.TemplateResponse(template, {"request": request, **context})

# ── Schemas ─────────────────────────────────────────────
class SubmitPayload(BaseModel):
    pid:        str
    name:       str
    date:       str
    answers:    dict
    scores:     dict
    tier:       int
    totalScore: int
    redFlags:   int

# ── Routes ──────────────────────────────────────────────
@app.get("/", response_class=HTMLResponse)
async def quiz(request: Request):
    return render(request, "quiz.html")

@app.post("/api/submit")
async def submit(payload: SubmitPayload):
    if not payload.pid or not payload.name:
        return {"error": "Missing required fields"}
    with get_db() as conn:
        conn.execute("""
            INSERT INTO assessments
              (pid, name, date, answers, total_score, tier,
               mood_score, family_score, dep_score, anger_score, red_flags, created_at)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
        """, (
            payload.pid.strip(), payload.name.strip(), payload.date,
            json.dumps(payload.answers),
            payload.totalScore, payload.tier,
            payload.scores.get("mood", 0),   payload.scores.get("family", 0),
            payload.scores.get("dep", 0),    payload.scores.get("anger", 0),
            payload.redFlags, datetime.now().isoformat(),
        ))
        conn.commit()
    return {"status": "ok"}

@app.get("/dashboard", response_class=HTMLResponse)
async def dashboard(request: Request):
    with get_db() as conn:
        rows = conn.execute("SELECT * FROM assessments ORDER BY created_at DESC").fetchall()
    patients = [dict(r) for r in rows]
    for p in patients:
        p["answers"] = json.loads(p["answers"])
    total     = len(patients)
    tier3     = sum(1 for p in patients if p["tier"] == 3)
    tier2     = sum(1 for p in patients if p["tier"] == 2)
    tier1     = sum(1 for p in patients if p["tier"] == 1)
    avg_score = round(sum(p["total_score"] for p in patients) / total, 1) if total else 0
    return render(request, "dashboard.html", {
        "patients": patients, "total": total,
        "tier1": tier1, "tier2": tier2, "tier3": tier3, "avg_score": avg_score,
    })

@app.get("/patient/{record_id}", response_class=HTMLResponse)
async def patient_detail(request: Request, record_id: int):
    with get_db() as conn:
        row = conn.execute("SELECT * FROM assessments WHERE id=?", (record_id,)).fetchone()
    if not row:
        return RedirectResponse("/dashboard")
    p = dict(row)
    p["answers"] = json.loads(p["answers"])
    return render(request, "patient.html", {"p": p})

@app.get("/api/stats")
async def stats():
    with get_db() as conn:
        rows = conn.execute(
            "SELECT tier, total_score, mood_score, dep_score, anger_score, family_score, date FROM assessments"
        ).fetchall()
    return [dict(r) for r in rows]

@app.get("/health")
async def health():
    return {"status": "ok", "service": "hopeline"}
