let flag = false;
let ws = null;
let ms = "";

let flag2 = false

function connect() {

    if (flag == true) {
        return;
    }

    const url = document.getElementById("urlInputbox").value.trim();
    ws = new WebSocket(url);
    document.getElementById("connectResult").textContent = "検証中";

    ws.onopen = () => {
        console.log(url);
        flag = true;
        document.getElementById("connectResult").textContent = "接続中";
        ws.send("hello");
    };

    ws.onmessage = (e) => {
        console.log(e.data);
        if (flag2 == false) {
            ms += e.data + ms;
            flag2 = true
        } else {
            ms = e.data + "<br>" + ms;
        }
        
        document.getElementById("ms").innerHTML = ms;
    };

    ws.onerror = (err) => {
        console.log("error:", err);
        document.getElementById("connectResult").textContent = "接続失敗"
    };
}


function send() {
    if (flag == true) {
        ws.send(document.getElementById("messageInputbox").value);
        document.getElementById("messageInputbox").value = ""
    }
}
