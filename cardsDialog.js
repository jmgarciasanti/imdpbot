/*-----------------------------------------------------------------------------
 * Dialogo que muestra unas tarjetas
 *-----------------------------------------------------------------------------*/
module.exports = {
    load: function (bot, builder) {
        bot.dialog('/cards', [
            function (session) {
                session.send("You can use Hero & Thumbnail cards to send the user visually rich information...");
                
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
                    .tap(builder.CardAction.openUrl(session, "https://en.wikipedia.org/wiki/Space_Needle"))
                ]);
                session.send(msg);
                
                msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([
                    new builder.ThumbnailCard(session)
                    .title("Thumbnail Card")
                    .subtitle("Pikes Place Market")
                    .text("<b>Pike Place Market</b> is a public market overlooking the Elliott Bay waterfront in Seattle, Washington, United States.")
                    .images([
                        builder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/PikePlaceMarket.jpg/320px-PikePlaceMarket.jpg")
                    ])
                    .tap(builder.CardAction.openUrl(session, "https://en.wikipedia.org/wiki/Pike_Place_Market"))
                ]);
                session.endDialog(msg);
            }
        ]);
    }
}