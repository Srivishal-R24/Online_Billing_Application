let bill = [];

document.getElementById("barcode").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        const barcode = this.value;

        fetch(`/product/${barcode}`)
        .then(res => res.json())
        .then(data => {
            if (data && data.name) {
                addToBill({
                    name: data.name,
                    price: data.price,
                    qty: 1
                });
            } else {
                alert("Product not found");
            }
        });

        this.value = "";
    }
});
 


function addToBill(product) {
    let existing = bill.find(p => p.name === product.name);

    if (existing) {
        existing.qty++;
    } else {
        bill.push(product);
    }

    render();
}

function render() {
    const table = document.getElementById("billTable");
    table.innerHTML = "";

    let total = 0;

    bill.forEach(item => {
        let row = `<tr>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>${item.price * item.qty}</td>
        </tr>`;

        table.innerHTML += row;
        total += item.price * item.qty;
    });

    document.getElementById("total").innerText = total.toFixed(2);
}


// 💾 SAVE BILL
function saveBill() {
    let total = document.getElementById("total").innerText;

    fetch('/save-bill', {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ items: bill, total })
    })
    .then(() => {
        alert("Bill Saved!");
        bill = [];
        render();
    });
}


// 🧾 PRINT
function printBill() {
    window.print();
}

