# Commit Ma3ana 🔥🔥

Commit Ma3ana Learning Management System is a platform designed to host programming courses for Computer Science students. The system is built to support courses containing videos, materials, and quizzes, enabling students to enroll and track their learning progress.

## Student App Features

- Enroll in any course or package
- Track your progress
- Earn points and certificates
- View course materials and videos
- Take quizzes and review results
- Rate courses
- Receive real-time notifications
- Read instructor announcements

## Dashboard Features

It contains 2 roles:

- Admin role
- Instructor role

### Admin role features

- Manage all users (students & instructors)
- Manage all courses and packages
- Manage all quizzes
- Manage all materials
- Manage all videos
- View platform statistics

### Instructor role features

- Manage his courses and packages
- Manage his quizzes and questions
- Manage his materials
- Manage his videos
- View enrolled students and their performance

---

## Project Structure

The codebase follows Angular best practices and is organized into the following primary directories:

### 1. `core/`

The backbone of the application. It contains shared logic and infrastructure that is feature-agnostic.

- **`interceptors/`**: HTTP interceptors for attaching JWT tokens and handling errors globally.
- **`guards/`**: Route guards enforcing Role-Based Access Control (RBAC).
- **`services/`**: Generic wrappers for HTTP communication with the backend API.
- **`models/`**: Shared TypeScript interfaces and types used across the application.

### 2. `features/`

Encapsulates domain-specific logic. Each feature (e.g., `auth`, `courses`, `quizzes`, `dashboard`) is structured into:

- **`components/`**: Smart and presentational components for each feature screen.
- **`services/`**: Feature-specific API service calls.
- **`models/`**: Feature-scoped interfaces and DTOs.

### 3. `shared/`

Contains reusable UI components, pipes, and directives used across multiple features.

- **`components/`**: Shared UI elements such as loaders, cards, buttons, and modals.
- **`pipes/`**: Custom Angular pipes for data transformation.
- **`directives/`**: Custom directives for reusable DOM behavior.

### 4. `app-routing.module.ts`

Centralized route definitions with lazy-loaded feature modules and role-based route guards.

### 5. `app.module.ts`

The root module. Handles global imports, provider registration, and app bootstrapping.

---

## Technical Stack

- **Framework**: [Angular](https://angular.io/) for building a scalable, component-based web application.
- **Language**: TypeScript for type-safe development.
- **State Management**: Angular Services with RxJS for reactive state and data streams.
- **HTTP Client**: Angular `HttpClient` with interceptors for JWT attachment and error handling.
- **Routing**: Angular Router with lazy loading and route guards for RBAC enforcement.
- **Styling**: CSS / SCSS with a responsive layout supporting desktop and laptop screens.
- **Authentication**: JWT (JSON Web Tokens) for stateless session management with access and refresh token support.
- **API Communication**: RESTful API over HTTPS connected to a Django REST Framework backend.

---

## New Screen Implementation Plan (For New Developers)

### Phase 1: Foundation

- **Feature Module**: Create a new Angular feature module under `features/` with its own routing module.
- **Data Modeling**: Define TypeScript interfaces in the feature's `models/` folder matching the API response.
- **Service**: Create a feature service that uses `HttpClient` to call the relevant API endpoints defined in `endpoints.ts`.
- **Shared Components**: Add reusable UI elements to `shared/components/` if needed across features.

### Phase 2: Logic & Routing

- **Component Logic**: Implement smart components that inject the feature service and handle loading, success, and error states using RxJS observables.
- **Route Guard**: Apply existing role guards (`AuthGuard`, `AdminGuard`, `InstructorGuard`) to protect new routes.
- **Routing**: Register the new route in the feature routing module and add lazy loading entry in `app-routing.module.ts`.

### Phase 3: Assets & Styling

- **Styles**: Add feature-specific styles in the component's `.scss` file; use shared CSS variables for consistent theming.
- **Icons & Images**: Place new static assets in the `assets/` folder and reference via Angular's asset pipeline.
- **Responsive Design**: Ensure all layouts are tested on desktop and wide-screen viewports.

### Phase 4: UI Development

- **Modularization**: Break screens into small presentational components inside the feature's `components/` folder.
- **Shared UI**: Use shared components such as loading spinners, empty-state placeholders, and action buttons.
- **Styling Rules**:
  - Use shared SCSS variables and mixins for colors and spacing (no hardcoded values).
  - Follow the project's existing naming conventions for CSS classes.
- **State Handling**: Use `*ngIf` and `async` pipe to handle all observable states (loading / loaded / error) gracefully.

Objective: Deliver high-performance, fully responsive screens through a clean and maintainable Angular codebase.

---

## Development Team

### Front-End Team
- [Rawan Bahaa](https://github.com/Rawanbahaa142) 
- [Reham Ahmed](https://github.com/reham14-ahmed)
- [Mohamed Hofny](https://github.com/MohamedHofny)

### Flutter (Mobile) Team

- [Abdallah Alqiran](https://github.com/Abdallah-Alqiran) — Team Leader
- [Taha Saber](https://github.com/Taha-Saber)
- [Mayar Abdelrahim](https://github.com/Mayar-Abdelrahim)

### Back-End Team

- [Omnia Abdelnasser](https://github.com/Omnia-Abdelnasser)
- [Rana Ahmed](https://github.com/Rana-A-Badawy)
- [Taha Fawy](https://github.com/Taha-M-Fawy)