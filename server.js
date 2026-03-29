const express = require("express"); 
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let receipts = []; // simple storage (memory)

app.post("/save-receipt", (req, res) => {
    const data = req.body;

    const receipt = {
        id: receipts.length + 1,
        ...data,
        date: new Date()
    };

    receipts.push(receipt);

    res.json({
        message: "Receipt saved successfully",
        receipt
    });
});

app.get("/receipts", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(receipts, null, 2));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.get("/view-receipts", (req, res) => {
    let html = "<h2>Saved Receipts</h2>";

    receipts.forEach(r => {
        html += `
            <div style="border:1px solid black; padding:10px; margin:10px;">
                <p><b>ID:</b> ${r.id}</p>
                <p><b>Customer:</b> ${r.customer}</p>
                <p><b>Total:</b> Rs ${r.total}</p>
                <p><b>Date:</b> ${r.date}</p>
            </div>
        `;
    });

    res.send(html);
});