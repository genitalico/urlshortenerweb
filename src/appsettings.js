export default {
    API_URL: (process.env.NODE_ENV == 'development') ? "http://localhost:3000/api" : "/api",
    dev: process.env
}