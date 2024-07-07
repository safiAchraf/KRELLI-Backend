# Krelli - Algeria

## Overview

Welcome to Krelli, a comprehensive platform designed to simplify the process of finding and renting properties in Algeria. Whether you're a tenant searching for a new home or a landlord looking to list your property, our app offers a user-friendly interface and a range of features to meet your needs.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Indexing](#indexing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Property Listings**: Browse a wide range of properties available for rent across Algeria.
- **Advanced Search**: Use filters to find properties that match your criteria, including location, price range, property type, and more.
- **Property Details**: View detailed information about each property, including photos, descriptions, amenities, and contact information.
- **User Accounts**: Create and manage your account as a tenant or landlord.
- **Favorites**: Save your favorite properties for easy access later.
- **In-App Messaging**: Communicate directly with landlords or tenants through the app.
- **Reviews and Ratings**: Leave and read reviews about properties and landlords.

## Installation

To get started with Krelli, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/krelli.git
   ```

2. **Navigate to the front-end project directory**:

   ```bash
   cd krelli/front-end
   ```

3. **Install front-end dependencies**:

   ```bash
   npm install
   ```

4. **Run the front-end application**:

   ```bash
   npm run dev
   ```

5. **Open a new terminal** and navigate to the back-end project directory\*\*:

   ```bash
   cd ../back-end
   ```

6. **Install back-end dependencies**:

   ```bash
   npm install
   ```

7. **Run the back-end application**:

   ```bash
   npm run dev
   ```

8. **Open your browser** and navigate to `http://localhost:3000` to view the app.

## Technologies Used

- **Frontend**: React, Redux
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Hosting**: [Specify your hosting service, e.g., Heroku, AWS]

## API Endpoints

Here are some of the key API endpoints used in the app:

- `GET /api/properties`: Fetch all properties
- `GET /api/properties/:id`: Fetch a single property by ID
- `POST /api/properties`: Create a new property (for landlords)
- `PUT /api/properties/:id`: Update a property by ID
- `DELETE /api/properties/:id`: Delete a property by ID
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user


## Contributing

We welcome contributions to improve Krelli. Here’s how you can help:

1. **Fork the repository**.
2. **Create a new branch**: `git checkout -b feature/your-feature-name`.
3. **Commit your changes**: `git commit -m 'Add some feature'`.
4. **Push to the branch**: `git push origin feature/your-feature-name`.
5. **Open a pull request**.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, please contact us at:

- Team Name: X86
- Email: support@krelli.com
- Phone: +213-123-456-789
