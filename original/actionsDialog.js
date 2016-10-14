/*-----------------------------------------------------------------------------
 * Dialogo que permite la ejecucion de una accion
 *-----------------------------------------------------------------------------*/
module.exports = {
    load: function (bot, builder) {
        bot.dialog('/actions', [
            function (session) {
                session.send("Bots can register global actions, like the 'help' & 'goodbye' actions, that can respond to user input at any time. You can even bind actions to buttons on a card.");
                
                var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([
                    new builder.HeroCard(session)
                    .title("Hero Card")
                    .subtitle("Space Needle")
                    .text("The <b>Space Needle</b> is an observation tower in Seattle, Washington, a landmark of the Pacific Northwest, and an icon of Seattle.")
                    .images([
                        builder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Seattlenighttimequeenanne.jpg/320px-Seattlenighttimequeenanne.jpg")
                    ])
                    .buttons([
                        builder.CardAction.dialogAction(session, "weather", "Seattle, WA", "Current Weather")
                    ])
                ]);
                session.send(msg);
                
                session.endDialog("The 'Current Weather' button on the card above can be pressed at any time regardless of where the user is in the conversation with the bot. The bot can even show the weather after the conversation has ended.");
            }
        ]);

        // Create a dialog and bind it to a global action
        bot.dialog('/weather', [
            function (session, args) {
                session.endDialog("The weather in %s is 71 degrees and raining.", args.data);
            }
        ]);
        bot.beginDialogAction('weather', '/weather');   // <-- no 'matches' option means this can only be triggered by a button
    }
}