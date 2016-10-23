/*-----------------------------------------------------------------------------
 * Dialogo acerca de...
 *-----------------------------------------------------------------------------*/
module.exports = {
    load: function (bot, builder) {
        bot.dialog('/about', function (session) {
            // Send a greeting and show help.
            var card = new builder.HeroCard(session)
                .title("AwarenessBot @ MAPFRE - IMDP")
                .text("Hi " + session.message.user.name + ", I'm a bot created by Verti...let me help you better understand the world of insurance")
                .images([
                    builder.CardImage.create(session, "http://imdpbot-jmgarciasanti.rhcloud.com/resources/img/verti.jpg")
                ])
                .tap(builder.CardAction.openUrl(session, "https://www.verti.es"));
            var msg = new builder.Message(session).attachments([card]);
            session.endDialog(msg);
        });
    }
}