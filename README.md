<div align="center">

# ⚡ Trainly

### AutoML SaaS Platform — From Raw CSV to Trained Model in Minutes

[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=flat&logo=python&logoColor=white)](https://python.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![Flask](https://img.shields.io/badge/Flask-3.1-000000?style=flat&logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![mljar](https://img.shields.io/badge/mljar--supervised-1.2-6366F1?style=flat)](https://github.com/mljar/mljar-supervised)
[![Celery](https://img.shields.io/badge/Celery-5.6-37814A?style=flat&logo=celery&logoColor=white)](https://docs.celeryq.dev)
[![Redis](https://img.shields.io/badge/Redis-7-DC382D?style=flat&logo=redis&logoColor=white)](https://redis.io)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

[Live Demo](#) · [Report Bug](issues) · [Request Feature](issues)

![Trainly Dashboard](https://via.placeholder.com/900x500/1E1B4B/A5B4FC?text=Trainly+Dashboard+Screenshot)

</div>

---

## 📌 What is Trainly?

**Trainly** is a full-stack AutoML SaaS platform that lets anyone — data scientists or not — upload a CSV, train 10 machine learning algorithms simultaneously, and download a production-ready model in minutes. No code. No configuration. No ML expertise required.

Built as a Final Year Project at **Air University Islamabad** (Department of Creative Technologies, Faculty of Computing & AI), Trainly demonstrates end-to-end ML engineering — from data ingestion to model deployment.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 📁 **Smart CSV Upload** | Drag-and-drop upload with auto type detection, missing value analysis, and EDA |
| 🔍 **Automated EDA** | Correlation heatmaps, distribution plots, categorical analysis — zero code |
| ⚡ **10-Algorithm AutoML** | Trains Baseline, Linear, Decision Tree, Random Forest, Extra Trees, LightGBM, XGBoost, CatBoost, Neural Network, and KNN simultaneously |
| 🎯 **6 Training Modes** | Default, Explain, Perform, Compete, Optuna, and Fast — for any use case |
| ◉ **SHAP Explainability** | Feature importance charts, rankings table, radar chart, and SHAP summary plots |
| ↓ **Model Export** | Download trained pipeline as `.pkl` — ready for production |
| 📄 **Report Generation** | Full HTML training report with leaderboard, metrics, and feature importance |
| 🤖 **AI Chat** | Groq-powered AI assistant for data science Q&A |
| 🚀 **API Deployment** | One-click REST API deployment for real-time predictions |
| 🔐 **JWT Auth** | Secure user registration, login, and session management |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     React Frontend                       │
│         (Upload → EDA → Train → Results → Deploy)        │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP / REST
┌──────────────────────▼──────────────────────────────────┐
│                  Flask REST API                          │
│         Auth · Upload · Train · Deploy · Chat            │
└──────────┬───────────────────────────────┬──────────────┘
           │ Celery Task Queue             │ SQLAlchemy ORM
┌──────────▼───────────┐       ┌───────────▼──────────────┐
│   Celery + Redis     │       │      SQLite / PostgreSQL  │
│  (Async ML Training) │       │      (Jobs · Users · Exp) │
└──────────┬───────────┘       └──────────────────────────┘
           │
┌──────────▼───────────────────────────────────────────────┐
│                   ML Engine                              │
│  Preprocessor → Task Detector → mljar AutoML → Pipeline │
│  SHAP · Feature Importance · Report Generator · Predictor│
└──────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend
- **Flask 3.1** — REST API framework
- **mljar-supervised 1.2** — AutoML engine (10 algorithms, SHAP, ensembles)
- **Celery 5.6 + Redis** — Async background training jobs
- **SQLAlchemy + SQLite/PostgreSQL** — ORM and database
- **scikit-learn, XGBoost, LightGBM, CatBoost** — ML libraries
- **SHAP** — Model explainability
- **PyJWT + bcrypt** — Authentication

### Frontend
- **React 19** — UI framework
- **Recharts** — Interactive charts (bar, radar, comparison)
- **React Router 7** — Client-side routing
- **Axios** — API communication

### Infrastructure
- **Docker** — Redis containerisation
- **Celery** — Task queue for non-blocking training
- **Gunicorn** — Production WSGI server

---

## 🚀 Quick Start

### Prerequisites
- Python 3.12+
- Node.js 18+
- Docker (for Redis)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/trainly.git
cd trainly
```

### 2. Set up Python environment

```bash
python -m venv venv

# Windows
.\venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
SECRET_KEY=your-secret-key-here
DEBUG=False
DATABASE_URL=sqlite:///storage/autoflow.db
GROK_API_KEY=your-groq-api-key        # Free at console.groq.com
REDIS_URL=redis://localhost:6379/0
```

### 4. Create storage directories

```bash
mkdir -p storage/uploads storage/models storage/results
```

### 5. Start Redis

```bash
docker run -d -p 6379:6379 --name redis-trainly redis
```

### 6. Run all three services

```bash
# Terminal 1 — Flask API
python run.py

# Terminal 2 — Celery Worker (Windows: --pool=solo required)
celery -A celery_worker worker --loglevel=info --pool=solo

# Terminal 3 — React Frontend
cd frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📸 Screenshots

<table>
  <tr>
    <td><img src="https://via.placeholder.com/420x260/080614/818CF8?text=Landing+Page" alt="Landing"/></td>
    <td><img src="https://via.placeholder.com/420x260/1E1B4B/A5B4FC?text=Training+Modes" alt="Training"/></td>
  </tr>
  <tr>
    <td><img src="https://via.placeholder.com/420x260/F8FAFC/4F46E5?text=Results+Leaderboard" alt="Results"/></td>
    <td><img src="https://via.placeholder.com/420x260/F8FAFC/059669?text=SHAP+Explainability" alt="Explainability"/></td>
  </tr>
</table>

> Replace placeholder images with actual screenshots before publishing.

---

## 🎯 Training Modes

| Mode | Algorithms | Time Limit | Best For |
|------|-----------|-----------|---------|
| **Default** ⚡ | All 10 | 300s | Starting point for any dataset |
| **Explain** 🔍 | All 10 | 180s | Fastest with full SHAP output |
| **Perform** 🚀 | All 10 | 400s | Balanced speed vs accuracy |
| **Compete** 🏆 | All 10 + Ensemble | 600s | Maximum accuracy |
| **Optuna** 🎯 | LightGBM, XGB, CatBoost, NN | 500s | Bayesian hyperparameter search |
| **Fast** ⏩ | 4 algorithms | 120s | Quick experiments |

---

## 📁 Project Structure

```
trainly/
├── backend/
│   ├── models/          # SQLAlchemy models (User, Job, Experiment)
│   ├── routes/          # Flask blueprints (auth, train, upload, deploy, chat)
│   ├── utils/           # JWT auth helpers
│   └── config.py        # App configuration
├── frontend/
│   ├── src/
│   │   ├── pages/       # React pages (Landing, Login, Upload, EDA, Training, Results...)
│   │   └── components/  # DashboardLayout, shared components
│   └── package.json
├── ml_engine/
│   ├── pipeline.py      # Main AutoML orchestrator
│   ├── trainer.py       # mljar wrapper + leaderboard normalisation
│   ├── preprocessor.py  # Feature engineering + scaling
│   ├── task_detector.py # Classification vs regression detection
│   ├── predictor.py     # Inference engine
│   └── eda.py           # Automated exploratory data analysis
├── celery_worker.py     # Async task definitions
├── run.py               # App entry point
├── requirements.txt
└── .env.example
```

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register new user |
| `POST` | `/auth/login` | Login, returns JWT |
| `POST` | `/upload` | Upload CSV, returns EDA |
| `POST` | `/train` | Start training job |
| `GET` | `/train/status/:id` | Poll training status |
| `GET` | `/train/download-model/:id` | Download `.pkl` model |
| `GET` | `/train/download-report/:id` | Download HTML report |
| `GET` | `/train/shap/:id` | Get SHAP plot image |
| `POST` | `/predict` | Run inference on new data |
| `POST` | `/deploy` | Deploy model as API |
| `POST` | `/chat` | AI assistant (Groq) |

---

## 🧠 ML Engine Details

Trainly uses **mljar-supervised** as its AutoML backbone with custom extensions:

- **Algorithm name normalisation** — strips internal mljar slugs (`1_Default_LightGBM` → `LightGBM`)
- **10-model leaderboard guarantee** — Default mode always returns exactly 10 result rows
- **3-method feature importance extraction** — tries `get_additional_metrics()`, `automl.importance` DataFrame, and raw CSV files
- **Fallback HTML report** — generates a clean branded report if mljar doesn't produce one
- **Mode-aware training** — 6 presets map to different mljar configurations, time limits, and explain levels

---

## 👨‍💻 Author

**Hassan** — BSE Final Year Student, Air University Islamabad
- Department of Creative Technologies, Faculty of Computing & AI
- Supervisor: Dr. Humaira Waqas

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat&logo=linkedin)](https://linkedin.com/in/your-profile)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat&logo=github)](https://github.com/your-username)

---

## 📄 License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

**⭐ Star this repo if you found it useful — it helps with visibility!**

*Built with ❤️ as a Final Year Project · Air University Islamabad · 2025*

</div>
