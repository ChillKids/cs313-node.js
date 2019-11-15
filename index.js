const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')

.get('/getRate', (req, res) => {
        console.log("got a get");
        var weight = Number(req.query.weight);
        var mailtype = Number(req.query.mailtype);
        var intweight = Math.round(weight)
        var total = 0.00;
        switch (mailtype) {
            case 0:
                if (weight <= 3)
                    total = (intweight - 1) * 0.15 + 0.55
                else if (weight <= 3.5 ^ 3) {
                    total = weight * 0.95
                } else total = -1
                break;

            case 1:

                if (weight <= 3)
                    total = (intweight - 1) * 0.15 + 0.5
                else if (weight <= 3.5 ^ 3) {
                    total = weight * 0.95
                } else total = -1
                break;
            case 2:
                if (weight <= 13)
                    total = (intweight - 1) * 0.15 + 1
                else
                    total = -1
                break;
            case 3:
                if (weight <= 4) {
                    total = weight * 3.66
                } else if (weight <= 8) {
                    total = weight * 4.39
                } else if (weight <= 12) {
                    total = weight * 5.19
                } else if (weight <= 13) {
                    total = weight * 5.71
                } else total = -1
                break;
        }
        console.log(total);
        if (total < 0) {
            console.log("Overweighted");
        }
        if (mailtype == 0)
            var type = "Letters (Stamped)"
        else if (mailtype == 1)
            var type = "Letters (Metered)"
        else if (mailtype == 2)
            var type = "Large Envelopes (Flats)"
        else if (mailtype == 3)
            var type = "First-Class Package Service—Retail"

        res.render('results', { total: total, weight: weight, type: type })

    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))