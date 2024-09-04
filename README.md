# FluxKart 🛒

FluxKart is a Node.js-based backend service designed to identify and track customer identities across multiple purchases. The service uses Express.js, TypeScript, PostgreSQL, and Sequelize as its primary technology stack.

### Live Server

You can access the live version of the application here: [https://fluxkart-y927.onrender.com](https://fluxkart-y927.onrender.com)

### Health Check

To verify that the server is up and running, use the health check route:
[https://fluxkart-y927.onrender.com/checkHealthStatus](https://fluxkart-y927.onrender.com/checkHealthStatus)

## Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **PostgreSQL**
- **Sequelize**

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- PostgreSQL installed and running.
- A PostgreSQL database with appropriate credentials.

## Getting Started

### Fork the Project

To get a local copy up and running, fork the repository and then clone your forked repository:

```bash
git clone https://github.com/your-username/fluxkart.git
cd fluxkart
```

### Environment Setup

Create two environment files named `.env` and `.env.dev` in the root directory of the project.

#### `.env.dev`

Insert the following constants into your `.env.dev` file:
```bash
# SERVER
PORT=

# DATABASE CREDENTIALS
DATABASE=
DB_PORT=
DIALECT=postgres
DB_USER=
HOST=
DB_PASSWORD=
```
> **⚠️ Warning:** Use your own database credentials and server port in the `.env.dev` file. Ensure that the `DIALECT` is set to `postgres`.

### Install Dependencies

Install the necessary packages using npm:

```bash
npm install
```

Running the Server

To start the server locally in development mode, use the following command:

```bash
npm run start:dev
```

### API Usage

To test the service, you can hit the following route:

```bash
POST http://localhost:PORT/contact/identify
```
Replace `PORT` with the actual port number you've defined in your .env.dev file.

### Example Request

Here's an example of the JSON body you would send with the POST request:

```json
{
    "phoneNumber": "123456",
    "email": "random@email.com"
}
```

### Example Response

The service will return a JSON response similar to the following:

```json
{
    "primaryContactId": 1,
    "emails": ["lorraine@hillvalley.edu", "random@email.com"],
    "phoneNumbers": ["123456"],
    "secondaryUserIds": [23]
}
```

### Swagger Documentation

To explore the API using Swagger:

- **When running locally:** Use [http://localhost:PORT/fluxkart/docs](http://localhost:PORT/fluxkart/docs). Replace `PORT` with the actual port number defined in your `.env.dev` file.
- **When using the deployed server:** Use the direct link [https://fluxkart-y927.onrender.com/fluxkart/docs](https://fluxkart-y927.onrender.com/fluxkart/docs).

