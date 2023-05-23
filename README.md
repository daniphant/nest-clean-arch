# nest-clean-arch

This project utilizes the NestJS framework and implements a clean architecture pattern. The main focus of this project is to separate concerns, making the code modular, easy to manage, and efficient to test. 

## Project structure

The project is divided into different layers:

- **Application:** Contains the exceptions, interfaces, and services that define the behavior of the application. It acts as a boundary between the domain and the infrastructure layers.

    For example, there are multiple exception classes defined in `application/exceptions` like `BadRequestException`, `AlreadyExistsException`, and `ForbiddenException` which are extended from a `BaseException` class. These classes define custom exceptions that can be used throughout the application.


- **Domain:** The Domain layer is where the core business logic of the application resides. This includes entities, value objects, repositories interfaces, and domain services. The entities and value objects encapsulate the core business rules and logic. The repository interfaces provide a way to persist and retrieve these entities. However, this layer should be completely independent and should not be concerned with any infrastructure or presentation details.

    Looking at the 'Product' entity in the Domain layer as an example, it contains properties such as 'id', 'title', 'description', 'price', etc. It also has methods that enforce business rules, like a method to update the product's price.

- **Infrastructure:** The Infrastructure layer is where all the I/O operations of the system are performed. This includes database operations, file system interactions, network requests, etc. This layer is also responsible for implementing the interfaces defined in the Domain layer.

    For instance, the 'HttpService' in the Infrastructure layer is responsible for making HTTP requests. It has a 'get' method that takes a URL as a parameter and returns a Promise that resolves with the response data.

- **Presentation:** The Presentation layer is responsible for handling user interface and user interaction. It interacts with the Application layer to perform operations and displays the results to the user.

## Dependencies

The project uses a number of dependencies including:

- NestJS related dependencies for building scalable Node.js server-side applications.
- Axios for promise-based HTTP requests.
- Class-transformer and class-validator for validation and transformation of objects.
- Knex for SQL query building and execution.
- dotenv for loading environment variables from a `.env` file.

Development dependencies include:

- Jest for testing.
- Prettier and ESLint for code formatting and linting.
- ts-jest for TypeScript pre-processing in Jest.
- Supertest for making HTTP assertions.
