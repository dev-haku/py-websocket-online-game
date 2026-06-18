import os
import json
import asyncio
import websockets

clients = set()
chat_log = []

async def handler(websocket):
    print("client connected")
    clients.add(websocket)

    # 過去ログ送信
    await websocket.send(json.dumps(chat_log))

    try:
        async for data in websocket:
            print("recv:", data)

            chat_log.append(data)

            # broadcast
            dead_clients = set()

            for ws in clients:
                try:
                    await ws.send(data)
                except:
                    dead_clients.add(ws)

            for ws in dead_clients:
                clients.remove(ws)

    finally:
        if websocket in clients:
            clients.remove(websocket)
        print("client disconnected")


async def start_server():
    port = int(os.environ.get("PORT", 5000))

    print("WebSocket server starting...")

    async with websockets.serve(handler, "0.0.0.0", port):
        await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(start_server())