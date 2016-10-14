/*-----------------------------------------------------------------------------
 * Dialogo de preguntas
 *-----------------------------------------------------------------------------*/
module.exports = {
    load: function (bot, builder) {
        bot.dialog('/prompts', [
            function (session) {
                session.send("Our Bot Builder SDK has a rich set of built-in prompts that simplify asking the user a series of questions. This demo will walk you through using each prompt. Just follow the prompts and you can quit at any time by saying 'cancel'.");
                builder.Prompts.text(session, "Prompts.text()\n\nEnter some text and I'll say it back.");
            },
            function (session, results) {
                session.send("You entered '%s'", results.response);
                builder.Prompts.number(session, "Prompts.number()\n\nNow enter a number.");
            },
            function (session, results) {
                session.send("You entered '%s'", results.response);
                session.send("Bot Builder includes a rich choice() prompt that lets you offer a user a list choices to pick from. On Skype these choices by default surface using buttons if there are 3 or less choices. If there are more than 3 choices a numbered list will be used but you can specify the exact type of list to show using the ListStyle property.");
                builder.Prompts.choice(session, "Prompts.choice()\n\nChoose a list style (the default is auto.)", "auto|inline|list|button|none");
            },
            function (session, results) {
                var style = builder.ListStyle[results.response.entity];
                builder.Prompts.choice(session, "Prompts.choice()\n\nNow pick an option.", "option A|option B|option C", { listStyle: style });
            },
            function (session, results) {
                session.send("You chose '%s'", results.response.entity);
                builder.Prompts.confirm(session, "Prompts.confirm()\n\nSimple yes/no questions are possible. Answer yes or no now.");
            },
            function (session, results) {
                session.send("You chose '%s'", results.response ? 'yes' : 'no');
                builder.Prompts.time(session, "Prompts.time()\n\nThe framework can recognize a range of times expressed as natural language. Enter a time like 'Monday at 7am' and I'll show you the JSON we return.");
            },
            function (session, results) {
                session.send("Recognized Entity: %s", JSON.stringify(results.response));
                builder.Prompts.attachment(session, "Prompts.attachment()\n\nYour bot can wait on the user to upload an image or video. Send me an image and I'll send it back to you.");
            },
            function (session, results) {
                var msg = new builder.Message(session)
            .ntext("I got %d attachment.", "I got %d attachments.", results.response.length);
                results.response.forEach(function (attachment) {
                    msg.addAttachment(attachment);
                });
                session.endDialog(msg);
            }
        ]);
    }
}
