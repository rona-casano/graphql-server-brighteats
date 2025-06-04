# Lead Management GraphQL API

A simple GraphQL server for managing leads — register leads and query them easily.

---

## Getting Started

### 1. Start the Server

**Recommended: Using GitHub Codespaces**

- Open this repository in [GitHub Codespaces](https://github.com/features/codespaces).
- Once the Codespace is ready, open the integrated terminal.
- Run:

  ```bash
  npm start
   ```
Codespaces will forward port 4000 automatically.

Open the forwarded port URL in your browser to access the GraphQL playground.

Or, run locally

Clone the repo and run:
  ```bash
  npm install
  npm start
   ```

Open your browser and navigate to: http://localhost:4000

2. Try Out These GraphQL Operations
Feel free to edit the input values in mutations to register your own leads.

Register Leads (Mutations):
 ```bash
mutation {
  register(input: {
    email: "Ron@example.com",
    name: "Ron",
    age: 33,
    gender: "Female",
    interest: "Pick-Up"
  }) {
    email
    name
    age
    gender
    interest
  }
}


mutation {
  register(input: {
    email: "yenny@example.com",
    name: "Yenny",
    age: 32,
    gender: "Female",
    interest: "Delivery"
  }) {
    email
    name
    age
    gender
    interest
  }
}
 ```

Select All Lead (Query):
 ```bash
query {
  users {
    name
    email
    age
    gender
    interest
  }
}
 ```

Select Lead (Query):

 ```bash
query {
  users(filter: { name: "Ron" }) {
    name
    email
    age
    gender
    interest
  }
}
```

3. Stop the Server
Press Ctrl + C in your terminal.

5. Run Tests
Make sure your server is stopped, then run:
 ```bash
npm test
 ```

Notes
This project is designed to work smoothly in GitHub Codespaces but runs perfectly on your local machine as well.

The GraphQL playground on port 4000 is your gateway to exploring and testing the API interactively.

Happy coding! 🚀

 ```vbnet
If you want, I can also help you with a badge or instructions for deploying, just let me know!
 ```
