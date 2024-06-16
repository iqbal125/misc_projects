# Product Roadmap

## Longer Term Goals

### Cerego

- **Update Cerego API Server**

  - Allow search of all users only by term.
  - Return 404 if term or user ID not found.

- **Bulk Upload Processing**
  - Implement bulk upload processing for POST requests.
  - Return data directly after making POST request from the server.
  - _Notes:_
    - Tried using `Promise.all` for POST requests, but received 500 error. Worked after rate limiting on client.

### Testing / CI/CD

- **Unit Tests**

  - Add more unit tests.

- **Integration / Playwright Tests**

  - Add more integration and Playwright tests.

- **UI Testing**

  - Add Storybook for UI testing.

- **CI Testing**

  - Add Sauce Labs for CI testing against real devices.

- **CI/CD Pipeline**
  - Add a full CI/CD pipeline.

### Front End

- **Caching**

  - Refactor to have a server page.
  - Use React Query for caching requests.

- **Form Validation and State Management**
  - Add React Hook Forms and Zod for form validation and state management.

### Other

- **Authentication**
  - Implement authentication features.
