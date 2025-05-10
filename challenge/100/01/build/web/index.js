import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { readFile } from 'fs/promises';
import path from 'node:path';
import { serveStatic } from '@hono/node-server/serve-static'

const app = new Hono();
app.get('/',
    serveStatic({
        root: './public',
    })
);

app.get('/file', async (c) => {
    const filePath = c.req.query('path');
    try {
        const fileContent = await readFile(path.join(path.dirname(new URL(import.meta.url).pathname), filePath), 'utf-8');
        return c.text(fileContent);
    } catch (error) {
        return c.text('Error reading file.', 500);
    }
});

serve({
    fetch: app.fetch,
    port: 3000,
});
