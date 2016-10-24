/*-----------------------------------------------------------------------------
 * Dialogo acerca de...
 *-----------------------------------------------------------------------------*/
module.exports = {
    load: function (bot, builder) {
        bot.dialog('/about', function (session) {
            // Send a greeting and show help.
            var card = new builder.HeroCard(session)
                .title("AwarenessBot @ MAPFRE - IMDP")
                .text("Hi " + session.message.user.name + ", I'm MAFRIUS a bot created by MAPFRE...let me help you better understand the world of insurance")
                .images([
                    builder.CardImage.create(session, "http://imdpbot-jmgarciasanti.rhcloud.com/resources/img/bot logo.jpg")
                ])
                .tap(builder.CardAction.openUrl(session, "https://www.mapfre.es"));
            var msg = new builder.Message(session).attachments([card]);
            session.endDialog(msg);
        });
    }
}