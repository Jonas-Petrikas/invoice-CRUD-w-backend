const items = document.querySelectorAll('[data-item]');

const itemTotalUpdater = _ => {
    items.forEach((item) => {

        const qtyEl = item.querySelector('[data-item-qty]')
        const discEurEl = item.querySelector('[data-item-discount-eur]')
        const discPEl = item.querySelector('[data-item-discount-p]')
        let qty = parseInt(item.querySelector('[data-item-qty]').value)
        const price = parseFloat(item.querySelector('[data-item-price]').innerText)

        let discEur = parseFloat(item.querySelector('[data-item-discount-eur]').value)
        let discP = parseFloat(item.querySelector('[data-item-discount-p]').value)

        let itemTotal = item.querySelector('[data-item-discounted-total]');


        qtyEl.addEventListener('input', (e) => {
            qty = parseInt(item.querySelector('[data-item-qty]').value);



            let total;
            if (discEur && discEur > 0) {
                total = qty * price - discEur;
            } else {
                total = qty * price;
            }

            total > 0 ? total : total = 0;

            discP = (discEur * 100 / (price * qty));

            if (discP <= 0 || !discP) {
                discP = '';
            } else if (discP > 100) {
                discEur = qty * price;
                discP = 100;
                discP = parseFloat(discP).toFixed(2)
            }
            if (!discEur) {
                discEur = '';

            } else {
                discEur = parseFloat(discEur).toFixed(2);
            };

            discEurEl.value = discEur;


            discPEl.value = discP.toFixed(2);


            itemTotal.innerText = total.toFixed(2);

            totalsUpdater();
        });
        discEurEl.addEventListener('input', (e) => {
            discEur = parseFloat(item.querySelector('[data-item-discount-eur]').value)

            let total;
            if (discEur && discEur > 0) {
                total = qty * price - discEur;
            } else {
                total = qty * price;
            }

            total > 0 ? total : total = 0;
            itemTotal.innerText = total.toFixed(2);
            discPEl.value = (discEur * 100 / (price * qty)).toFixed(2);
            if (discEur === 0 || !discEur || discEur < 0) {
                discPEl.value = '';
            } else if (discEur > total) {
                discPEl.value = 100;
            }
            totalsUpdater();
        })

        discPEl.addEventListener('input', (e) => {
            discP = parseFloat(item.querySelector('[data-item-discount-p]').value)

            discEur = (price * qty - (price * qty * (1 - discP / 100)));

            let total;
            if (discEur && discEur > 0) {
                total = qty * price - discEur;
            } else {
                total = qty * price;
            }

            total > 0 ? total : total = 0;


            itemTotal.innerText = total.toFixed(2);
            if (discP === 0 || !discP || discP < 0) {
                discEur = '';
            } else if (discP > 100) {
                discEur = (price * qty).toFixed(2);
            } else { discEur = discEur.toFixed(2) };

            discEurEl.value = discEur;
            totalsUpdater();
        })

    });
};

const totalsUpdater = _ => {
    let subtotal = 0;
    let vat = 0;
    let totalDiscounts = 0;

    const subtotalHtml = document.querySelector('[data-pre-total]');
    let shipping = document.querySelector('[data-shipping-price]').innerText;
    shipping = parseFloat(shipping);

    const vatHtml = document.querySelector('[data-vat]');

    const totalDiscountsHtml = document.querySelector('[data-total-discounts]');

    const grandTotalHtml = document.querySelector('[data-total-final]');




    items.forEach(item => {
        let qty = parseInt(item.querySelector('[data-item-qty]').value);
        const price = parseFloat(item.querySelector('[data-item-price]').innerText);
        let discEur = parseFloat(item.querySelector('[data-item-discount-eur]').value);

        if (!discEur) {
            discEur = 0;
        };

        console.log(discEur)

        let itemTotal = qty * price;

        subtotal += itemTotal;

        totalDiscounts += discEur;
    });

    vat = ((subtotal + shipping) * 0.21);

    subtotalHtml.innerText = subtotal.toFixed(2);
    vatHtml.innerText = vat.toFixed(2);
    totalDiscountsHtml.innerText = totalDiscounts.toFixed(2);
    grandTotalHtml.innerText = (subtotal + shipping + vat - totalDiscounts).toFixed(2);








}

const init = _ => {
    itemTotalUpdater()
};

init();