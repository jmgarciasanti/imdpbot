﻿/*-----------------------------------------------------------------------------
 * Dialogo que muestra un carrusel de productos de automovil
 *-----------------------------------------------------------------------------*/
module.exports = {
    load: function (bot, builder) {
        bot.dialog('/carProducts', [
            function (session) {
                session.send("These are the products available for you");

                // crea las tarjetas
                var productCards = [];
                var productSelection = [];
                for (var i = 0; i < products.length; ++i) {
                    var card= new builder.HeroCard(session)
                    .title(products[i].name)
                    .text("The <b>" + products[i].name + "</b> product is for " + products[i].description + " ...")
                    .images([
                        builder.CardImage.create(session, products[i].img)
                    ])
                    .buttons([
                        builder.CardAction.openUrl(session, products[i].url, "Product description"),
                        builder.CardAction.imBack(session, "select:" + i, "Select")
                    ]);
                    productCards.push(card);
                    productSelection.push("select:" + i);
                }
                                    
                // Ask the user to select an item from a carousel.
                var msg = new builder.Message(session)
                    .textFormat(builder.TextFormat.xml)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments(productCards);
                builder.Prompts.choice(session, msg, productSelection);
            },
            function (session, results) {
                var action, item;
                var kvPair = results.response.entity.split(':');
                switch (kvPair[0]) {
                    case 'select':
                        action = 'selected';
                        break;
                }
                item = products[parseInt(kvPair[1])].name;
                session.endDialog('You %s "%s"', action, item);
            }
        ]);
    }
}

var products = [
    {
        name: 'Car insurance',
        description: 'cars and little truks',
        img: 'http://imdpbot-jmgarciasanti.rhcloud.com/resources/img/verti_car.png',
        url: 'https://www.verti.es/cars'
    },
    {
        name: 'Motorbike insurance',
        description: 'only bikes...',
        img: 'http://imdpbot-jmgarciasanti.rhcloud.com/resources/img/verti_motorbike.png',
        url: 'https://www.verti.es/motorbikes'
    },
    {
        name: 'Six wheel insurance',
        description: 'car and motorbike in a single product',
        img: 'http://imdpbot-jmgarciasanti.rhcloud.com/resources/img/verti_6wheels.png',
        url: 'https://www.verti.es/6wheels'
    }];