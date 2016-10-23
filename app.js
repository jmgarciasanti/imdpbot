/*-----------------------------------------------------------------------------
This Bot uses the Bot Connector Service but is designed to showcase whats 
possible on Skype using the framework. The demo shows how to create a looping 
menu, use the built-in prompts, send Pictures, send Hero & Thumbnail Cards, 
send Receipts, and use Carousels. 

# RUN THE BOT:

    You can run the bot locally using the Bot Framework Emulator but for the best
    experience you should register a new bot on Skype and bind it to the demo 
    bot. You can then run the bot locally using ngrok found at https://ngrok.com/.

    * Install and run ngrok in a console window using "ngrok http 3978".
    * Create a bot on https://dev.botframework.com and follow the steps to setup
      a Skype channel.
    * For the endpoint you setup on dev.botframework.com, copy the https link 
      ngrok setup and set "<ngrok link>/api/messages" as your bots endpoint.
    * Next you need to configure your bots MICROSOFT_APP_ID, and
      MICROSOFT_APP_PASSWORD environment variables. If you're running VSCode you 
      can add these variables to your the bots launch.json file. If you're not 
      using VSCode you'll need to setup these variables in a console window.
      - MICROSOFT_APP_ID: This is the App ID assigned when you created your bot.
      - MICROSOFT_APP_PASSWORD: This was also assigned when you created your bot.
    * To use the bot you'll need to click the join link in the portal which will
      add it as a contact to your skype account. 
    * To run the bot you can launch it from VSCode or run "node app.js" from a 
      console window. 

-----------------------------------------------------------------------------*/

var restify         = require('restify');
var builder         = require('botbuilder');
var rootDialog      = require('./rootDialog');
var menuDialog      = require('./menuDialog');
var helpDialog      = require('./helpDialog');

//var menuDialog      = require('./original/menuDialog');
var actionsDialog   = require('./original/actionsDialog');
var cardsDialog     = require('./original/cardsDialog');
var carouselDialog  = require('./original/carouselDialog');
var listDialog      = require('./original/listDialog');
var pictureDialog   = require('./original/pictureDialog');
var promptsDialog   = require('./original/promptsDialog');
var receiptDialog   = require('./original/receiptDialog');

var carProductsDialog = require('./carProductsDialog');
//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1', function () {
    console.log('%s listening to %s', server.name, server.url);
});

// setup static file serving
server.get(/\/resources\/?.*/, restify.serveStatic({
    directory: __dirname
}));
server.get(/\/css\/?.*/, restify.serveStatic({
    directory: __dirname + '/node_modules/bootstrap/dist/'
}));
server.get(/\/fonts\/?.*/, restify.serveStatic({
    directory: __dirname + '/node_modules/bootstrap/dist/'
}));
server.get(/\/js\/?.*/, restify.serveStatic({
    directory: __dirname + '/node_modules/bootstrap/dist/'
}));

// webhook for Facebook
function processWebhook(req, res, next) {
    var botToken = 'EAAHuIvlRdNoBAKdDnXZBAZAWKPtothDSIl53QQUQ8G6t7ImT1yD43oHNMqe52quZAF8awIlfqZA80SBNFZAPYvfaEALkUFMVDB4DYX1JGJZBRoNawcZCdo7IkibUljPjJZBK9Lm0FkIxVjRUDZCA3noD0zX9tRZAKvNulYpaXTwYm9B1Hqch12sJRJ';
    console.log("Hook received:");
    console.log("Headers    --> " + JSON.stringify(req.headers));
    console.log("URL        --> " + JSON.stringify(req.url));
    console.log("Query      --> " + JSON.stringify(req.query));
    console.log("Body       --> " + JSON.stringify(req.body));
    
    if (typeof req.query != 'undefined' && typeof req.query.hub != 'undefined') {
        var mode = req.query.hub.mode;
        var challenge = req.query.hub.challenge;
        var token = req.query.hub.verify_token;
        if (mode == 'subscribe') {
            if (token == botToken) {
                res.end(challenge);
            } else {
                res.send({ "success": false, "reason": "Bad token " + token});
            }
        } else {
            res.send({ "success": false, "reason": "Unknown mode " + mode});
        }
    } else {
        res.send({ "success": true });
    }
}
server.use(restify.queryParser());
server.get(/\/webhook\/?.*/, processWebhook);
server.post(/\/webhook\/?.*/, processWebhook);

// Create chat bot
var connector = new builder.ChatConnector({
    appId: '8bb41ef7-4cab-4bf6-92af-9d80ffb8e9a8', 
    appPassword: 'vxEbY1YJUXMRyWdczVpRCoj'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Activity Events
//=========================================================
bot.on('conversationUpdate', function (message) {
    // Check for group conversations
    if (message.address.conversation.isGroup) {
        // Send a hello message when bot is added
        if (message.membersAdded) {
            message.membersAdded.forEach(function (identity) {
                if (identity.id === message.address.bot.id) {
                    var reply = new builder.Message()
                            .address(message.address)
                            .text("Hello everyone!");
                    bot.send(reply);
                }
            });
        }
        
        // Send a goodbye message when bot is removed
        if (message.membersRemoved) {
            message.membersRemoved.forEach(function (identity) {
                if (identity.id === message.address.bot.id) {
                    var reply = new builder.Message()
                        .address(message.address)
                        .text("Goodbye");
                    bot.send(reply);
                }
            });
        }
    }
});

bot.on('contactRelationUpdate', function (message) {
    if (message.action === 'add') {
        var name = message.user ? message.user.name : null;
        var reply = new builder.Message()
                .address(message.address)
                .text("Hello %s... Thanks for adding me. Say 'hello' to see how I can help you.", name || 'there');
        bot.send(reply);
    } else {
        // delete their data
    }
});

bot.on('deleteUserData', function (message) {
    // User asked to delete their data
});


//=========================================================
// Bots Middleware
//=========================================================

// Anytime the major version is incremented any existing conversations will be restarted.
bot.use(builder.Middleware.dialogVersion({ version: 1.0, resetCommand: /^reset/i }));

//Adds a first run experience to a bot
bot.use(builder.Middleware.firstRun({ version: 1.0, dialogId: '*:/firstRun' }));

bot.dialog('/firstRun', [
    function (session, args) {
        builder.Prompts.text(session, "Hi! Who are you?");
    },
    function (session, results) {
        session.userData.name = results.response;
        session.send('Hi %s! Nice to meet you! Please, say something else.', session.userData.name);
        session.beginDialog('/');
    }
]);

// tracing
bot.use({
    botbuilder: function (session, next) {
        console.log(session.message);
        next();
    }
});

//=========================================================
// Bots Global Actions
//=========================================================
bot.endConversationAction('goodbye', 'Goodbye :)', { matches: /^goodbye/i });
bot.beginDialogAction('help', '/help', { matches: /^help/i });

//=========================================================
// Bots Dialogs
//=========================================================
rootDialog.load(bot, builder);
menuDialog.load(bot, builder);
helpDialog.load(bot, builder);

actionsDialog.load(bot, builder);
cardsDialog.load(bot, builder);
carouselDialog.load(bot, builder);
listDialog.load(bot, builder);
pictureDialog.load(bot, builder);
promptsDialog.load(bot, builder);
receiptDialog.load(bot, builder);

carProductsDialog.load(bot, builder);

bot.dialog('/signin', [ 
    function (session) {
        // Send a signin 
        var msg = new builder.Message(session)
            .attachments([ 
            new builder.SigninCard(session)
                    .text("You must first signin to your account.")
                    .button("signin", "http://example.com/")
        ]);
        session.endDialog(msg);
    }
]);
