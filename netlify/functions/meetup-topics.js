const meetupTopics = require('./meetup-topics.json')

exports.handler = async () => {
    const randomIndex = Math.floor(Math.random() * meetupTopics.length)
    const randomTopic = meetupTopics[randomIndex]
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(randomTopic)
    }
}
