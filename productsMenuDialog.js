/*-----------------------------------------------------------------------------
 * Dialogo que muestra el menu de productos
 *-----------------------------------------------------------------------------*/
module.exports = {
    load: function (bot, builder) {
        bot.dialog('/productsMenu', [
            function (session) {
                builder.Prompts.choice(session, "These are the products we have, please select the type of product you'd like obtain more information", menuOptions.join("|"));                
            },
            function (session, results) {
                if (results.response) {
                    var menuOption = results.response.entity;
                    switch (menuOption) {
                        case menuOptions[0]:
                            session.beginDialog('/carProducts');
                            break;
                        case menuOptions[1]:
                            session.beginDialog('/homeProducts');
                            break;
                    }
                } else {
                    // Exit the menu
                    session.endDialog();
                }
            },
            function (session, results) {
                // Exit the menu
                session.endDialog();
            }
        ]);
    }
}

var menuOptions = [ 
    "Car insurance",
    "Home insurance"
];