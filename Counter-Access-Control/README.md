# Counter Access Control

## Overview
The "Counter-Access-Control" project implements a counter smart contract on the Stacks blockchain with role-based access control. This contract allows designated administrators to increment and decrement a counter, transfer admin rights, and retrieve the current count. The project includes comprehensive tests and deployment scripts to ensure functionality and security.

## Features
- **Increment and Decrement Counter**: Only administrators can modify the counter.
- **Role-Based Access Control**: Admin rights can be transferred to other users.
- **Error Handling**: Proper checks are in place to restrict access to admin functions.

## Project Structure
```
Counter-Access-Control
├── contracts
│   └── counter-access-control.clar
├── tests
│   └── counter-access-control_test.ts
├── scripts
│   ├── deploy.ts
│   └── setup-roles.ts
├── README.md
├── package.json
└── clarinet.json
```

## Setup Instructions
1. **Clone the Repository**: 
   ```
   git clone <repository-url>
   cd Counter-Access-Control
   ```

2. **Install Dependencies**: 
   ```
   npm install
   ```

3. **Configure Network Settings**: Update the `clarinet.json` file with your network settings if necessary.

## Usage
- **Deploying the Contract**: Use the deployment script to deploy the contract to the Stacks blockchain.
  ```
  ts-node scripts/deploy.ts
  ```

- **Setting Up Roles**: Run the setup script to initialize roles and permissions.
  ```
  ts-node scripts/setup-roles.ts
  ```

## Running Tests
To ensure the contract behaves as expected, run the comprehensive tests included in the project:
```
npm test
```

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgments
- Stacks Blockchain
- Clarity Smart Contracts
- Clarinet Testing Framework

For more information, please refer to the documentation of the respective tools and frameworks used in this project.