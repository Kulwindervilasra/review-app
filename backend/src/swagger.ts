// src/swagger.ts

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

// src/swagger.ts (add to the swaggerSpec definition)
const port = process.env.PORT
const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Review API',
            version: '1.0.0',
            description: 'A simple API for managing reviews',
        },
        servers: [
            {
                url: 'http://localhost:' + port,
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                Review: {
                    type: 'object',
                    required: ['title', 'content', 'dateTime'],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Unique identifier for the review',
                        },
                        title: {
                            type: 'string',
                            description: 'Title of the review',
                        },
                        content: {
                            type: 'string',
                            description: 'Content of the review',
                        },
                        dateTime: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date and time when the review was created',
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'],
});

export const setupSwagger = (app: Application) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
