// Inline the topics data to avoid import issues
const meetupTopics = [
  {
    "title": "From Notebook to Production",
    "description": "Walk through the exact steps you took to ship an ML model from a Jupyter notebook to a production API, including the challenges and fixes along the way.",
    "type": "presentation",
    "difficulty": "intermediate"
  },
  {
    "title": "Lessons Learned Building an AI Chatbot",
    "description": "Share code snippets, architecture diagrams, and lessons learned from creating a chatbot with LangChain, OpenAI, and a vector database for a real project.",
    "type": "workshop",
    "difficulty": "beginner"
  },
  {
    "title": "When AI Ethics Got Real",
    "description": "Tell the story of a bias or fairness issue you encountered in a model, how you detected it, and what you changed to resolve it.",
    "type": "discussion",
    "difficulty": "all"
  },
  {
    "title": "Making Search Smarter with Vector Databases",
    "description": "Show before/after results from adding Pinecone, Weaviate, or another vector DB to a search system, and explain the tuning that made the biggest difference.",
    "type": "demo",
    "difficulty": "intermediate"
  },
  {
    "title": "Fine-tuning an LLM for My Domain",
    "description": "Walk through how you adapted a pre-trained LLM to your organization’s needs, including data prep, training process, evaluation, and cost trade-offs.",
    "type": "presentation",
    "difficulty": "advanced"
  },
  {
    "title": "Automating Data Cleanup with AI",
    "description": "Show a data pipeline you built that uses AI to clean, validate, or enrich incoming data automatically.",
    "type": "workshop",
    "difficulty": "intermediate"
  },
  {
    "title": "Deploying Computer Vision in the Field",
    "description": "Demo a production CV application you’ve shipped — the hardware/software setup, latency, and unexpected real-world issues.",
    "type": "demo",
    "difficulty": "intermediate"
  },
  {
    "title": "Turning a Model into an API",
    "description": "How you wrapped a model with FastAPI, Flask, or Express, handled authentication, and deployed it for others to use.",
    "type": "workshop",
    "difficulty": "beginner"
  },
  {
    "title": "AI-Enhanced Business Dashboards",
    "description": "Show a BI dashboard where AI-generated insights or summaries improved decision-making for stakeholders.",
    "type": "presentation",
    "difficulty": "all"
  },
  {
    "title": "Running AI on the Edge",
    "description": "Walk through how you deployed a model to a Raspberry Pi or other edge device, including integration with IoT sensors and performance results.",
    "type": "demo",
    "difficulty": "advanced"
  },
  {
    "title": "NLP That Saved Me Hours",
    "description": "Share how you used NLP for summarization, entity extraction, or classification to reduce repetitive work in your daily workflow.",
    "type": "workshop",
    "difficulty": "intermediate"
  },
  {
    "title": "Catching Model Drift Before It Hurt",
    "description": "Explain the tools and process you use to monitor a model in production, detect drift, and decide when retraining is needed.",
    "type": "presentation",
    "difficulty": "intermediate"
  },
  {
    "title": "An AI Workflow That Runs While I Sleep",
    "description": "Show how you chained AI agents, scripts, or APIs to fully automate a multi-step business process.",
    "type": "workshop",
    "difficulty": "intermediate"
  },
  {
    "title": "The Reality of AI in Healthcare",
    "description": "Discuss an AI project you’ve worked on in a regulated space, covering privacy, compliance, and validation hurdles.",
    "type": "discussion",
    "difficulty": "all"
  },
  {
    "title": "Trying Reinforcement Learning for the First Time",
    "description": "Walk through a small RL project, how you set up the environment, and the biggest takeaways from the experiment.",
    "type": "presentation",
    "difficulty": "beginner"
  }
];

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
