﻿/*-----------------------------------------------------------------------------
This Bot demonstrates how to use a LuisDialog to add natural language support
to a bot. The example also shows how to use TextBot.beginDialog() to push
notifications or start a new conversation with the user.

For a complete walkthrough of creating this bot see the article below.

    http://docs.botframework.com/builder/node/guides/understanding-natural-language/

-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');

// Create LUIS Dialog that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = process.env.model || 'https://api.projectoxford.ai/luis/v1/application?id=12acb77e-9578-4a79-aec9-9e84eed47b51&subscription-key=f43e7bcf41ec4af8bb3023fc12f846a2&q=';
var dialog = new builder.LuisDialog(model);
dialog.setThreshold(0.5);

// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: 'IMDP_AT_MAPFRE', appSecret: '167e15c91257421ebc79a4d7065de5d7' });

bot.configure({
    userWelcomeMessage: 'Hello user...Welcome to the insurance bot v0',
    groupWelcomeMessage: 'Hello group...Welcome to the insurance bot v0',
    goodbyeMessage: 'Goodbye...'
});

// LUIS dialogs...
bot.add('/', dialog);

// dialogo para identificar a la persona
bot.add('/profile', [
    function (session) {
        if (session.userData.name) {
            builder.Prompts.text(session, 'What would you like to change it to?');
        } else {
            builder.Prompts.text(session, 'Hi! What is your name?');
        }
    },
    function (session, results) {
        session.userData.name = results.response;
        session.send('Welcome %s!!!', session.userData.name);
        session.endDialog();
    }
]);

// Add intent handlers
dialog.on('ProductList', [
    function (session, results) {
        // Resolve and store any entities passed from LUIS.
        var productCategory = builder.EntityRecognizer.findEntity(results.entities, 'Product::Category');
        productCategory = productCategory != null? productCategory.entity:'';
        if (productCategory == '') {
            session.send('%s, I didn\'t understand the type of pet you have....', session.userData.name);
        } else if (productCategory == 'dogs') {
            session.send('You\'re lucky %s, we have a lot of products for %s', session.userData.name, productCategory);
        } else {
            session.send('Oooh, sorry %s! we don\'t have anything for %s', session.userData.name, productCategory);
        }
    }
]
);

// Add intent handlers
dialog.on('UnderstandInsurance1', [
    function (session, results) {
        session.send('OK %s! If you want to learn more about insurance you\'re welcome to my free course!!. It\'s only 1.000 hours....but it\'s free!!', session.userData.name);
        builder.Prompts.choice(session, "Now pick an option.", "Online course|No thanks", { listStyle: 2, retryPrompt: 'Please choose one of the options' });
    },
    function (session, results) {
        if (results && results.response && results.response.entity == 'Online course') {
            session.send('Good choice \"%s\"!!, please follow this link %s', results.response.entity, 'http://www.mapfre.es');
        } else {
            session.send('OK, maybe later');
        }
    }
]
);

// default response
dialog.onDefault(
    function (session, results, next) {
        session.send('I\'m sorry %s I didn\'t understand. In this moment I\'m a very basic insurance bot....maybe MAPFRE will invest on me in the future...', session.userData.name);
    }
);

// begining...
dialog.onBegin(
    function (session, results, next) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        } else {
            next();
        }
    }
);

// funciones varias
function respondPrivacy(req, res, next) {
    res.setHeader('content-type', 'text/plain');
    res.send('(c) MAPFRE');
    next();
}
function respondTerms(req, res, next) {
    res.setHeader('content-type', 'text/plain');
    res.send('Terms of use: (c) MAPFRE');
    next();
}
function respondAbout(req, res, next) {
    res.setHeader('content-type', 'text/plain');
    res.send('About IDMP - Awareness Team - Bot');
    next();
}

// Setup Restify Server
var server = restify.createServer();
server.get('/privacy', respondPrivacy);
server.get('/terms', respondTerms);
server.get('/about', respondAbout);
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1', function () {
    console.log('%s listening to %s', server.name, server.url);
});
