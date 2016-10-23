/*-----------------------------------------------------------------------------
 * Dialogo que muestra el menu de opciones
 *-----------------------------------------------------------------------------*/
module.exports = {
    load: function (bot, builder) {
        bot.dialog('/menu', [
            function (session) {
                builder.Prompts.choice(session, "How can I help you?", menuOptions.join("|"), { listStyle: builder.ListStyle.button });                
            },
            function (session, results) {
                if (results.response) {
                    var menuOption = results.response.entity;
                    switch (menuOption) {
                        case menuOptions[0]:
                            session.beginDialog('/carProducts');
                            break;
                        case menuOptions[1]:
                            session.beginDialog('/help');
                            break;
                        case menuOptions[2]:
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

var menuOptions = [ 
    "Car insurance products",
    "General insurance teaching",
    "Quit"
];