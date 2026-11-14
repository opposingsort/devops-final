const express = require('express')
const client = require('prom-client')

const app = express()

client.collectDefaultMetrics()

const httpRequests = new client.Counter({
  name: 'http_requests_total',
  help: 'Количество HTTP запросов',
  labelNames: ['method', 'route', 'status'],
})

// считаем каждый запрос после ответа
app.use((req, res, next) => {
  res.on('finish', () => {
    let route = 'unknown'
    if (req.route) route = req.route.path
    httpRequests.inc({ method: req.method, route: route, status: res.statusCode })
  })
  next()
})

app.get('/', (req, res) => {
  res.send('DevOps Final Project')
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.send(await client.register.metrics())
})

module.exports = app
