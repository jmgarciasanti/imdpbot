/*-----------------------------------------------------------------------------
 * Dialogo de ayuda
 *-----------------------------------------------------------------------------*/
module.exports = {
    load: function (bot, builder) {
        bot.dialog('/help', [
            function (session) {
                session.endDialog(helpMessage);
            }
        ]);
    }   
}

var helpMessage =
    "Global commands that are available anytime:\n\n" + 
    "* menu - Exits demo and returns to the menu.\n" +
    "* goodbye - End this conversation.\n" +
    "* help - Displays these commands.";