# covinproject
# Slot Booking Backend

This is the backend server for the Slot Booking application. It provides APIs for managing vaccination centers, slots, and user bookings.

## Technologies Used

- Node.js
- Express.js
- MongoDB

## Installation

1. Clone the repository.
2. Install the dependencies.
3. Set up the database connection. Update the MongoDB connection URL in the `config.js` file.
4. Start the server.
5. The server will run at `http://localhost:8000`.

## API Endpoints

### Centers

- GET `/api/centers`: Get all vaccination centers.
- POST `/api/centers`: Create a new vaccination center.
- GET `/api/centers/:id`: Get a specific vaccination center.
- PUT `/api/centers/:id`: Update a specific vaccination center.
- DELETE `/api/centers/:id`: Delete a specific vaccination center.

### Slots

- GET `/api/slots`: Get all slots.
- POST `/api/slots`: Create a new slot.
- GET `/api/slots/:id`: Get a specific slot.
- PUT `/api/slots/:id`: Update a specific slot.
- DELETE `/api/slots/:id`: Delete a specific slot.

### Users

- POST `/api/users/signup`: User sign up.
- POST `/api/users/login`: User login.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any suggestions or improvements.
