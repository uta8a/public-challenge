import asyncio
import websockets
import json

async def hello():
    async with websockets.connect("ws://localhost:8000") as socket:
        await socket.send('1000000')
        out = await socket.recv()
        print(json.loads(out))

asyncio.run(hello())
