/*-----------------------------------------------------------------------------
 * Dialogo base
 *-----------------------------------------------------------------------------*/
module.exports = {
    load: function (bot, builder) {
        bot.dialog('/', [
            function (session) {
                // Send a greeting and show help.
                var card = new builder.HeroCard(session)
                    .title("AwarenessBot @ MAPFRE - IMDP")
                    .text("Let me help you better understand the world of insurance")
                    .images([
                        builder.CardImage.create(session, "http://imdpbot-jmgarciasanti.rhcloud.com/resources/img/verti.jpg")
                    ])
                    .tap(builder.CardAction.openUrl(session, "http://www.verti.es"));
                var msg = new builder.Message(session).attachments([card]);
                session.send(msg);
                session.send("Hi... I'm a bot created by Verti...");
                session.beginDialog('/help');
            },
            function (session, results) {
                // Display menu
                session.beginDialog('/menu');
            },
            function (session, results) {
                // Always say goodbye
                session.send("Ok... See you later!");
            }
        ]);
    }
}