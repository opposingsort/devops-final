const request = require('supertest')
const { Client } = require('pg')
const app = require('../src/app')

test('GET / ', async () => {
  const res = await request(app).get('/')
  expect(res.status).toBe(200)
  expect(res.text).toBe('DevOps Final Project')
})

test('GET /health', async () => {
  const res = await request(app).get('/health')
  expect(res.status).toBe(200)
  expect(res.body).toEqual({ status: 'ok' })
})

test('GET /metrics', async () => {
  await request(app).get('/')
  const res = await request(app).get('/metrics')
  expect(res.status).toBe(200)
  expect(res.text).toContain('http_requests_total')
  expect(res.text).toContain('process_cpu_user_seconds_total')
})

// в CI поднимается postgres, локально без DATABASE_URL тест пропускается
const dbTest = process.env.DATABASE_URL ? test : test.skip

dbTest('postgres доступен', async () => {
  const db = new Client({ connectionString: process.env.DATABASE_URL })
  await db.connect()
  const result = await db.query('SELECT 1 AS ok')
  await db.end()
  expect(result.rows[0].ok).toBe(1)
})
