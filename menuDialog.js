/*-----------------------------------------------------------------------------
 * Dialogo que muestra el menu de opciones
 *-----------------------------------------------------------------------------*/
module.exports = {
    load: function (bot, builder) {
        // Create LUIS recognizer that points at our model and add it as the root '/' dialog for our Cortana Bot.
        var model = 'https://api.projectoxford.ai/luis/v1/application?id=30b29ab2-39de-49c1-9423-d0cfbbb1c150&subscription-key=f43e7bcf41ec4af8bb3023fc12f846a2';
        var recognizer = new builder.LuisRecognizer(model);
        var intentDialog = new builder.IntentDialog({ recognizers: [recognizer] });
        
        bot.dialog('/menu', function (session) {
            session.send("I can show you available products or talk about general insurance. Please let me know what you want.");
            session.beginDialog('/menuIntent');
        });

        bot.dialog('/menuIntent', intentDialog);
        intentDialog.matches('About', [
            function (session) {
                session.beginDialog('/about');
            },
            function (session) {
                // The menu runs a loop until the user chooses to (quit).
                session.replaceDialog('/menu');
            }
        ]);
        
        intentDialog.matches('ShowMenu', [
            function (session) {
                // The menu runs a loop until the user chooses to (quit).
                session.replaceDialog('/menu');
            }
        ]);

        intentDialog.matches('ShowProducts', [
            function (session) {
                session.beginDialog('/productsMenu');
            },
            function (session) {
                // The menu runs a loop until the user chooses to (quit).
                session.replaceDialog('/menu');
            }
        ]);
        
        intentDialog.matches('InsuranceTeaching', [
            function (session) {
                var image = builder.CardImage.create(session, "http://imdpbot-jmgarciasanti.rhcloud.com/resources/img/worldwithoutinsurance.png");
                var attachment=new builder.ThumbnailCard(session)
                    .title("A World without insurance")
                    .text("We show you how the current world would be without insurers and the disadvantages of a world without them")
                    .images([image])
                    .tap(builder.CardAction.openUrl(session, "https://www.youtube.com/embed/cvZjfFEmwhE"))
                var msg=new builder.Message(session).textFormat(builder.TextFormat.xml).attachments([attachment]);
                session.send(msg);
            },
            function (session) {
                // The menu runs a loop until the user chooses to (quit).
                session.replaceDialog('/menu');
            }
        ]);

        intentDialog.matches('GivemeHelp', [
            function (session) {
                session.beginDialog('/help');
            },
            function (session) {
                // The menu runs a loop until the user chooses to (quit).
                session.replaceDialog('/menu');
            }
        ]);

        intentDialog.matches('Quit', function (session) {
            session.endDialog();
        });
    }
}

var menuOptions = [ 
    "Car insurance",
    "Home insurance",
    "Quit"
];