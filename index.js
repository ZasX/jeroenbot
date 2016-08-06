'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const tg = new Telegram.Telegram(process.argv[2])

class PingController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    pingHandler($) {
        $.sendMessage('pong')
    }
    pongHandler($) {
        $.sendMessage('<b>That\'s not how it works...</b>', {parse_mode: 'html'})
    }

    get routes() {
        return {
            'ping': 'pingHandler',
			'pong': 'pongHandler'
        }
    }
}

class StartController extends TelegramBaseController {
    handle() {
        console.log('start')
    }
}

class StopController extends TelegramBaseController {
    handle() {
        console.log('stop')
    }
}

class RestartController extends TelegramBaseController {
    handle() {
        console.log('restart')
    }
}

class ReleaseController extends TelegramBaseController {
	releaseExplainedHandler($) {
		$.sendMessage('Use "/release game" to find out when the game will be released')
	}
	
	gameHandler($) {
		$.sendMessage('The game you want info on is ' + $.query.game)
		console.log($.query)
	}
	
	get routes() {
		return {
			'/release': 'releaseExplainedHandler',
			'/release :game': 'gameHandler'
		}
	}
}

class OtherwiseController extends TelegramBaseController {
    handle() {
        console.log('otherwise')
    }
}

class FifaController extends TelegramBaseController {
	fifaHandler($) {
        $.sendMessage('Fifa is not out yet, don\'t be so impatient')
	}
	
	get routes() {
		return {
			'fifa': 'fifaHandler'
		}
	}
}

tg.router
    .when('/start', new StartController())
    .when('/stop', new StopController())
    .when('/restart', new RestartController())
    .when('/release', new ReleaseController())
	.when('ping', new PingController())
	.when('pong', new PingController())
	.when('fifa', new FifaController())
    .otherwise(new OtherwiseController())