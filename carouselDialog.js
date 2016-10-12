/*-----------------------------------------------------------------------------
 * Dialogo que muestra un carrusel
 *-----------------------------------------------------------------------------*/
module.exports = {
    load: function (bot, builder) {
        bot.dialog('/carousel', [
            function (session) {
                session.send("You can pass a custom message to Prompts.choice() that will present the user with a carousel of cards to select from. Each card can even support multiple actions.");
                
                // Ask the user to select an item from a carousel.
                var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
                    new builder.HeroCard(session)
                    .title("Space Needle")
                    .text("The <b>Space Needle</b> is an observation tower in Seattle, Washington, a landmark of the Pacific Northwest, and an icon of Seattle.")
                    .images([
                        builder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Seattlenighttimequeenanne.jpg/320px-Seattlenighttimequeenanne.jpg")
                            .tap(builder.CardAction.showImage(session, "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Seattlenighttimequeenanne.jpg/800px-Seattlenighttimequeenanne.jpg")),
                    ])
                    .buttons([
                        builder.CardAction.openUrl(session, "https://en.wikipedia.org/wiki/Space_Needle", "Wikipedia"),
                        builder.CardAction.imBack(session, "select:100", "Select")
                    ]),
                    new builder.HeroCard(session)
                    .title("Pikes Place Market")
                    .text("<b>Pike Place Market</b> is a public market overlooking the Elliott Bay waterfront in Seattle, Washington, United States.")
                    .images([
                        builder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/PikePlaceMarket.jpg/320px-PikePlaceMarket.jpg")
                            .tap(builder.CardAction.showImage(session, "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/PikePlaceMarket.jpg/800px-PikePlaceMarket.jpg")),
                    ])
                    .buttons([
                        builder.CardAction.openUrl(session, "https://en.wikipedia.org/wiki/Pike_Place_Market", "Wikipedia"),
                        builder.CardAction.imBack(session, "select:101", "Select")
                    ]),
                    new builder.HeroCard(session)
                    .title("EMP Museum")
                    .text("<b>EMP Musem</b> is a leading-edge nonprofit museum, dedicated to the ideas and risk-taking that fuel contemporary popular culture.")
                    .images([
                        builder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Night_Exterior_EMP.jpg/320px-Night_Exterior_EMP.jpg")
                            .tap(builder.CardAction.showImage(session, "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Night_Exterior_EMP.jpg/800px-Night_Exterior_EMP.jpg"))
                    ])
                    .buttons([
                        builder.CardAction.openUrl(session, "https://en.wikipedia.org/wiki/EMP_Museum", "Wikipedia"),
                        builder.CardAction.imBack(session, "select:102", "Select")
                    ])
                ]);
                builder.Prompts.choice(session, msg, "select:100|select:101|select:102");
            },
            function (session, results) {
                var action, item;
                var kvPair = results.response.entity.split(':');
                switch (kvPair[0]) {
                    case 'select':
                        action = 'selected';
                        break;
                }
                switch (kvPair[1]) {
                    case '100':
                        item = "the <b>Space Needle</b>";
                        break;
                    case '101':
                        item = "<b>Pikes Place Market</b>";
                        break;
                    case '102':
                        item = "the <b>EMP Museum</b>";
                        break;
                }
                session.endDialog('You %s "%s"', action, item);
            }
        ]);
    }
}