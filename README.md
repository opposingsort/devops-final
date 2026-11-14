devops-final

Итоговая КТ по девопсу. Приложение на Node.js (express) с тремя маршрутами: / , /health и /metrics (метрики для Prometheus через prom-client).

Запуск всего стека:
docker compose up -d

Приложение - http://localhost:3000
Prometheus - http://localhost:9090
Grafana - http://localhost:3001 (логин admin, пароль admin)

CI/CD в .github/workflows/ci-cd.yml: lint, потом test (с postgres), потом при пуше в main собирается образ и пушится в ghcr.io/opposingsort/devops-final

Деплой через ansible (нужен sudo):
cd ansible
ansible-playbook deploy.yml -K
