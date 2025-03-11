# Smart Turism RestAPI

This project is a RESTful API designed to manage tourism-related data, such as countries, quality of life, adventure ratings, heritage, cost of living and restaurant price scores. It provides endpoints for creating, reading, updating, and deleting data.

**`A University of Piraeus project`**

## How to Run

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or remote instance)
- Docker (optional, for containerized deployment)

**Make sure nothing run at ports you will use.**

1. Download and unzip the repository.
2. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add variables like in `.env.example` file.
3. Run `docker-compose.yml`.
4. Hit the `POST` enpoint `http://localhost:PORT/api/v1/tourism/populate` to fill the database. 

### Access the API:

**The API will be available at http://localhost:`YOUR_PORT`. Below are the available endpoints:**

Endpoints:

**GET** `/api/v1/tourism/getAllCountries` - Retrieve all countries.

**POST** `/api/v1/tourism/create` - Create a new country.

**PUT** `/api/v1/tourism/update/:country` - Update a country by name.

**DELETE** `/api/v1/tourism/delete/:country` - Delete a country by name.

**GET** `/api/v1/tourism/filter` - Filter countries by criteria (e.g., quality of life, adventure, etc.).

**`Note: In folder included a Postman collection`**

### Features

- **CRUD Operations**: Create, read, update, and delete tourism data.
- **Filtering**: Filter countries by specific criteria (e.g., highest quality of life, lowest cost of living).
- **Validation**: Input validation for all endpoints using express-validator.
- **Error Handling**: Graceful error handling with meaningful error messages.
- **Docker Support**: Containerized deployment for easy setup and scalability.

### Technologies Used

- Backend: Node.js, Express.js
- Database: MongoDB
- Containerization: Docker

### Project Structure

```
smart-tourism-api/
├── config/ # Configuration file
├── controllers/ # Request handler
├── models/ # MongoDB model
├── routes/ # API route
├── data/ # Json file
├── services/ # Logic
├── .dockerignore         # Files to ignore in Docker builds
├── .env # Environment variables
├── .env.example # Use this
├── .gitignore Files to ignore in Git
├── config.js # ENV handling
├── Dockerfile # Docker configuration
├── docker-compose.yml # Docker Compose configuration
├── package.json # Project dependencies
├── README.md # Project documentation
└── script.js # Entry point for the application
```

### Troubleshooting

1. **MongoDB Connection Error:**

   - Ensure MongoDB is running and the `MONGO_URI` in `.env` is correct.
   - Check if the MongoDB credentials (username/password) are valid.

2. **Port Already in Use:**

   - Change the PORT value in `.env` to an available port.

3. **Validation Errors:**

   - Ensure all required fields are provided in the request body.
   - Check the error response for specific validation messages.

4. **Docker Issues:**
   - Ensure Docker is installed and running.
   - Use `docker logs <container-id>` to debug container issues.

### Disclaimer

This project is protected by copyright and is not available for public use. All rights are reserved. Please see the `LICENSE` file for more information.

Developed by **`Christos Ioannidis MPSP24013`**
