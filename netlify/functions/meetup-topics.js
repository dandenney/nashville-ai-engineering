// Inline the topics data to avoid JSON import issues
const meetupTopics = [
  {
    "title": "Production ML Model Deployment",
    "description": "How to deploy machine learning models to production environments using Docker, Kubernetes, and cloud platforms.",
    "type": "presentation",
    "difficulty": "intermediate"
  },
  {
    "title": "Building AI-Powered Chatbots",
    "description": "Create intelligent chatbots using modern frameworks like LangChain, OpenAI, and vector databases.",
    "type": "workshop",
    "difficulty": "beginner"
  },
  {
    "title": "AI Ethics in Practice",
    "description": "Real-world considerations for building responsible AI systems and avoiding bias in your models.",
    "type": "discussion",
    "difficulty": "all"
  },
  {
    "title": "Vector Databases for AI",
    "description": "Explore Pinecone, Weaviate, and other vector databases for building semantic search and RAG applications.",
    "type": "demo",
    "difficulty": "intermediate"
  },
  {
    "title": "Fine-tuning Large Language Models",
    "description": "How to customize pre-trained LLMs for your specific domain and use case.",
    "type": "presentation",
    "difficulty": "advanced"
  },
  {
    "title": "AI-Powered Data Pipelines",
    "description": "Building automated data processing workflows that leverage machine learning for data quality and insights.",
    "type": "workshop",
    "difficulty": "intermediate"
  },
  {
    "title": "Computer Vision in Production",
    "description": "Deploying computer vision models for real-time applications like surveillance, quality control, and automation.",
    "type": "demo",
    "difficulty": "intermediate"
  },
  {
    "title": "Building AI APIs",
    "description": "Design and implement RESTful APIs for your AI models using FastAPI, Flask, or Express.",
    "type": "workshop",
    "difficulty": "beginner"
  },
  {
    "title": "AI for Business Intelligence",
    "description": "How AI is transforming traditional BI tools and creating new opportunities for data-driven decision making.",
    "type": "presentation",
    "difficulty": "all"
  },
  {
    "title": "Edge AI and IoT",
    "description": "Running AI models on edge devices and integrating with IoT sensors for real-time intelligence.",
    "type": "demo",
    "difficulty": "advanced"
  },
  {
    "title": "Natural Language Processing for Business",
    "description": "Practical applications of NLP in customer service, content analysis, and business automation.",
    "type": "workshop",
    "difficulty": "intermediate"
  },
  {
    "title": "AI Model Monitoring and Observability",
    "description": "Tools and techniques for monitoring AI models in production and detecting drift or performance issues.",
    "type": "presentation",
    "difficulty": "intermediate"
  },
  {
    "title": "Building AI-Powered Workflows",
    "description": "Automate complex business processes using AI agents, workflow engines, and intelligent decision systems.",
    "type": "workshop",
    "difficulty": "intermediate"
  },
  {
    "title": "AI in Healthcare Applications",
    "description": "Ethical considerations and practical implementations of AI in medical diagnosis and patient care.",
    "type": "discussion",
    "difficulty": "all"
  },
  {
    "title": "Reinforcement Learning Basics",
    "description": "Introduction to RL concepts and how they're being applied in gaming, robotics, and optimization.",
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
