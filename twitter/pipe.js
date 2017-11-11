const TwitterStream = require('./twitterStream').TwitterStream;
const SentimentRpc = require('./sentimentRpc').SentimentRpc;


class TwitterSentimentPipe {
    constructor() {
        this.srpc = new SentimentRpc(__dirname + '/sentiment.proto');
        this.ts = new TwitterStream(this.__handleTweet.bind(this));
    }

    __handleTweet(tweet) {
        this.srpc.getSentiment(tweet.text).then((res) => {
            tweet.sentiment = res.sentiment;
            //this.db.insert(tweet);
            console.log(`ID: ${tweet.id} | Handle: ${tweet.user.screen_name} | Tweet: ${tweet.text} | Sentiment: ${tweet.sentiment}`);
        }).catch((ex) => {
            console.error(ex);
        });
    }
}

async function main() {
    const pipe = new TwitterSentimentPipe();
    try {
        await pipe.ts.addKeyword('bitcoin');
        await pipe.ts.addKeyword('ethereum');
        pipe.ts.reset();
    } catch(ex) {
        console.error(ex);
    }
}


async function test() {
    const srpc = new SentimentRpc(__dirname + '/sentiment.proto');
    const t = ['A very good day!', 'A bad day!', 'Normal day', 'Bitcoin is awesome',
        'Ethereum Contracts will be candy for hackers. Code quality of dapps is currently low, sadly.'];
    t.forEach(str => {
        srpc.getSentiment(str).then((res) => {
            console.log(`"${str}" is ${res.sentiment}`);
        })
    })
}

main();
//test();