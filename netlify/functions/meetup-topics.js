const meetupTopics = require('./meetup-topics.json')

exports.handler = async (event, context) => {
    console.log('Function invoked:', {
        path: event.path,
        httpMethod: event.httpMethod,
        queryStringParameters: event.queryStringParameters,
        headers: event.headers,
        timestamp: new Date().toISOString()
    })

    try {
        // Validate that meetupTopics data exists and is an array
        if (!meetupTopics || !Array.isArray(meetupTopics)) {
            console.error('Invalid meetupTopics data:', typeof meetupTopics, meetupTopics)
            return {
                statusCode: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    error: 'Internal server error: Invalid data structure',
                    timestamp: new Date().toISOString()
                })
            }
        }

        // Log the data we're working with
        console.log(`Processing ${meetupTopics.length} meetup topics`)

        // Generate random index
        const randomIndex = Math.floor(Math.random() * meetupTopics.length)
        const randomTopic = meetupTopics[randomIndex]

        // Validate the selected topic
        if (!randomTopic) {
            console.error('Failed to select random topic, index:', randomIndex)
            return {
                statusCode: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    error: 'Internal server error: Failed to select topic',
                    timestamp: new Date().toISOString()
                })
            }
        }

        console.log('Successfully selected topic:', {
            index: randomIndex,
            topic: randomTopic,
            timestamp: new Date().toISOString()
        })

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({
                topic: randomTopic,
                totalTopics: meetupTopics.length,
                selectedIndex: randomIndex,
                timestamp: new Date().toISOString()
            })
        }

    } catch (error) {
        console.error('Function error:', {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        })

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message,
                timestamp: new Date().toISOString()
            })
        }
    }
}
