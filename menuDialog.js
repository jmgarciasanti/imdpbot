/*-----------------------------------------------------------------------------
 * Dialogo que muestra el menu de opciones
 *-----------------------------------------------------------------------------*/
module.exports = {
    load: function (bot, builder) {
        bot.dialog('/menu', [
            function (session) {
                session.send('Main menu:');
                builder.Prompts.choice(session, "How can I help you?", menuOptions);
            },
            function (session, results) {
                if (results.response) {
                    var menuOption = menuOptions[results.response.entity];
                    switch (menuOption.value) {
                        case 1:
                            session.beginDialog('/carProducts');
                            break;
                        case 2:
                            session.beginDialog('/help');
                            break;
                        case 3:
                            session.endDialog();
                            break;
                    }
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

var menuOptions = {
    "Car insurance products": { value: 1 },
    "General insurance teaching": { value: 2 },
    "(quit)": { value: 3 }
};