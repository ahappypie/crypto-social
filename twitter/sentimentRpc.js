const grpc = require('grpc');

class SentimentRpc {
    constructor(protofile) {
        const protoDescriptor = grpc.load(protofile).com.watershed.sentiment.protos;
        this.client = new protoDescriptor.Sentiment('localhost:8980', grpc.credentials.createInsecure());
    }

    async getSentiment(string) {
        return new Promise((resolve, reject) => {
            this.client.getSentiment({text: string}, (err, response) => {
                if(!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            });
        });
    }
}

module.exports = {SentimentRpc: SentimentRpc};