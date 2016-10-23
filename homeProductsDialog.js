/*-----------------------------------------------------------------------------
 * Dialogo que muestra un carrusel de productos de hogar
 *-----------------------------------------------------------------------------*/
module.exports = {
    load: function (bot, builder) {
        bot.dialog('/homeProducts', function (session) {
            var card = new builder.HeroCard(session)
                .title("Home insurance products")
                .text("Under construction...")
                .images([
                builder.CardImage.create(session, "http://imdpbot-jmgarciasanti.rhcloud.com/resources/img/wip.png")
            ]);
            var msg = new builder.Message(session).attachments([card]);
            session.endDialog(msg);
        });
    }
}
