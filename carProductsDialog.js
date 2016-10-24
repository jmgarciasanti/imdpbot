/*-----------------------------------------------------------------------------
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
        description: 'En MAPFRE te ofrecemos una gran variedad de seguros de coche entre los que puedes elegir dependiendo de tus necesidades. Con los Seguros de Coches Terceros Básico, Terceros Ampliado, Terceros Completo, Todo Riesgo con Franquicia y Todo Riesgo sin Franquicia podrás contratar desde una cobertura más básica, hasta paquetes de garantías más completas.',
        img: 'http://imdpbot-jmgarciasanti.rhcloud.com/resources/img/seguros coche.jpg',
        url: 'https://www.mapfre.es/seguros/particulares/coche/seguros-de-coche/comparativa-seguros-de-coche/'
    },
    {
        name: 'Car insurance YCAR',
        description: 'MAPFRE ofrece a los conductores noveles o menores de 30 años seguros para jóvenes YCAR, con mejores condiciones a través de pólizas cuyos precios serán más competitivos dependiendo de los hábitos de conducción del asegurado. ',
        img: 'http://imdpbot-jmgarciasanti.rhcloud.com/resources/img/seguros coche ycar.jpg',
        url: 'https://www.mapfre.es/seguros/particulares/coche/seguros-para-jovenes-ycar/comparativa-seguros-jovenes-ycar/'
    },
    
    {
        name: 'Ecologic car insurance',
        description: 'MAPFRE dispone de seguros para coches ecológicos que incluyen un sistema de pago por uso para vehículos eléctricos, híbridos y ecológicos con menos de 120 gramos de CO2 por Kilómetro y que premia a los buenos conductores.',
        img: 'http://imdpbot-jmgarciasanti.rhcloud.com/resources/img/seguros coche ecologicos.jpg',
        url: 'https://www.mapfre.es/seguros/particulares/coche/seguros-de-coches-ecologicos/comparativa-seguros-de-coches-ecologicos/'
    },
    {
        name: 'Motorbike insurance',
        description: 'Los seguros de moto de MAPFRE ofrecen a los conductores de ciclomotores y motocicletas las garantías más completas dependiendo de la amplitud de coberturas que necesite.',
        img: 'http://imdpbot-jmgarciasanti.rhcloud.com/resources/img/seguros moto.jpg',
        url: 'https://www.mapfre.es/seguros/particulares/moto/seguros-para-motos/comparativa-seguros-para-motos/'
    }];
