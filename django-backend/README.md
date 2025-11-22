# NeatoFood Django Backend

Django REST API backend for NeatoFood application.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create environment file:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create superuser (optional):
```bash
python manage.py createsuperuser
```

6. Run development server:
```bash
python manage.py runserver 8000
```

The API will be available at `http://localhost:8000/api/`

## API Endpoints

- `GET /api/health/` - Health check endpoint

## Admin Panel

Access the Django admin panel at `http://localhost:8000/admin/`
