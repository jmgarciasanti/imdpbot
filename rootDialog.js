/*-----------------------------------------------------------------------------
 * Dialogo base
 *-----------------------------------------------------------------------------*/
module.exports = {
    load: function (bot, builder) {
        bot.dialog('/', [
            function (session) {
                // Send a greeting and show help.
                var card = new builder.HeroCard(session)
                    .title("Microsoft Bot Framework")
                    .text("Your bots - wherever your users are talking.")
                    .images([
                        builder.CardImage.create(session, "http://www.mapfre.es/seguros/images/894x248-general-quienessomos_tcm744-128789.jpg")
                    ])
                    .tap(builder.CardAction.openUrl(session, "http://www.mapfre.es"));
                var msg = new builder.Message(session).attachments([card]);
                session.send(msg);
                session.send("Hi... I'm the Microsoft Bot Framework demo bot for Skype. I can show you everything you can use our Bot Builder SDK to do on Skype.");
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