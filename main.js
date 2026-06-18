const url = "https://py-websocket-online-game.onrender.com";
let ws = null;
let ms = "";

function connect() {
    if (ws && ws.readyState === WebSocket.OPEN) {
        return;
    }

    ws = new WebSocket(url);

    document.getElementById("connectResult").textContent = "接続中...";

    ws.onopen = () => {
        console.log("connected:", url);
        document.getElementById("connectResult").textContent = "接続完了";
        ws.send("hello");
    };

    ws.onmessage = (e) => {
    console.log(e.data);

    let data = e.data;

    try {
        const parsed = JSON.parse(e.data);

        if (Array.isArray(parsed)) {
            data = parsed.join("<br>");
        } else {
            data = String(parsed);
        }

    } catch (err) {
        data = e.data;
    }

    ms = data + "<br>" + ms;
    document.getElementById("ms").innerHTML = ms;
    };

    ws.onerror = () => {
        document.getElementById("connectResult").textContent = "接続失敗";
    };

    ws.onclose = () => {
        document.getElementById("connectResult").textContent = "切断";
    };
}

function send() {
    const input = document.getElementById("messageInputbox");

    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(input.value);
        input.value = "";
    }
}