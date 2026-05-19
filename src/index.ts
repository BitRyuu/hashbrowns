import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { createHash } from 'crypto'

const app = new Hono()

// Serve static files from public directory
app.use('/*', serveStatic({ root: './public' }))

// Upload endpoint
app.post('/api/hash', async (c) => {
  try {
    const formData = await c.req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return c.json({ error: 'No file provided' }, 400)
    }

    // Read file as buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Calculate SHA256 hash
    const hash = createHash('sha256').update(buffer).digest('hex')

    return c.json({
      filename: file.name,
      size: file.size,
      hash: hash,
    })
  } catch {
    return c.json(
      { error: 'Failed to process file' },
      500
    )
  }
})

export default app
