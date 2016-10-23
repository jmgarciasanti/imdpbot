/*-----------------------------------------------------------------------------
 * Dialogo base
 *-----------------------------------------------------------------------------*/
module.exports = {
    load: function (bot, builder) {
        bot.dialog('/', [
            function (session) {
                session.beginDialog('/about');
            },
            function (session) {
                session.beginDialog('/help');
            },
            function (session) {
                // Display menu
                session.beginDialog('/menu');
            },
            function (session) {
                // Always say goodbye
                session.send("Ok... See you later!");
            }
        ]);
    }
}