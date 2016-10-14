/*-----------------------------------------------------------------------------
 * Dialogo que muestra el menu de opciones
 *-----------------------------------------------------------------------------*/
module.exports = {
    load: function (bot, builder) {
        bot.dialog('/menu', [
            function (session) {
                builder.Prompts.choice(session, "What demo would you like to run?", "prompts|picture|cards|list|carousel|receipt|actions|(quit)");
            },
            function (session, results) {
                if (results.response && results.response.entity != '(quit)') {
                    // Launch demo dialog
                    session.beginDialog('/' + results.response.entity);
                } else {
                    // Exit the menu
                    session.endDialog();
                }
            },
            function (session, results) {
                // The menu runs a loop until the user chooses to (quit).
                session.replaceDialog('/menu');
            }
        ]).reloadAction('reloadMenu', null, { matches: /^menu|show menu/i });
    }
}