# Invoicing System README

## Project Overview

This project is an Invoicing System, developed using Node.js, Express, JavaScript, and MongoDB. It provides an intuitive user interface for an invoicing system that facilitates smooth operations and offers a user-friendly experience. It includes features like user login/signup, the ability to add products to a cart, and bill generation. The system also allows admin users to manage products, including specifying the tax percentage for each product.

## Accessing the Deployed Site

You can access the deployed site at the following link:
[https://zealous-sandals-pig.cyclic.app/](https://zealous-sandals-pig.cyclic.app/)

To test the site as an admin, use the following credentials:
- **Username:** admin
- **Password:** admin@123

## Project Structure

The project structure is organized as follows:

- `app.js`: The main entry point of the Node.js application.
- `routes/`: Contains all the route definitions.
- `models/`: Defines the MongoDB data models.
- `views/`: Contains the HTML templates for rendering pages.
- `public/`: Stores static files such as CSS, JavaScript, and images.
- `package.json`: Lists the project's dependencies and scripts.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js and npm installed on your system.
- MongoDB server installed and running.

### Installation

1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/shop_invoicing.git

2. Install the project dependencies using npm:
   
   ```shell
   npm install

3. Create a .env file in the project root and add the following configuration:

    ```shell
    PORT=3000
    MONGO_URI=mongodb+srv://admin:yC2kjoLOGYtKaIpM@cluster0.yl7jggw.mongodb.net/?retryWrites=true&w=majority
   
4. Start the server:
     ```shell
     npm start
     
## Acknowledgments
This project was developed to provide an efficient and user-friendly digital invoicing platform. We hope you find it useful and welcome any feedback or contributions.

