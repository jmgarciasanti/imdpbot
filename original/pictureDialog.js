/*------------------------------------------------------------------------------
 * Dialogo que muestra una imagen
 * -----------------------------------------------------------------------------*/
module.exports = {
    load: function (bot, builder) {
        bot.dialog('/picture', [
            function (session) {
                session.send("You can easily send pictures to a user...");
                var msg = new builder.Message(session)
            .attachments([{
                        contentType: "image/jpeg",
                        contentUrl: "http://www.theoldrobots.com/images62/Bender-18.JPG"
                    }]);
                session.endDialog(msg);
            }
        ]);
    }
}