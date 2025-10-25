# feature-request.io

## A Developer-Themed Feature Request Platform

`feature-request.io` is a modern, full-stack web application designed to streamline the process of collecting, managing, and prioritizing feature requests. Built with a developer-centric aesthetic, it allows users to submit new feature ideas, upvote existing ones, and engage in discussions through comments. Administrators have enhanced capabilities to manage feature statuses and user roles, ensuring a dynamic and responsive development feedback loop.

This project served as a significant learning experience, particularly in building robust full-stack applications and integrating advanced services.

## Live Demo

*(Once deployed, insert live demo link here)*

## Key Features

-   **User Authentication:** Secure user registration and login powered by Clerk.
-   **Feature Submission:** Users can easily submit new feature requests with titles and descriptions.
-   **Interactive Voting:** Upvote system to prioritize popular features.
-   **Commenting System:** Engage in discussions and provide feedback on specific features.
-   **Dynamic Status Tracking:** Features progress through `PENDING`, `IN_PROGRESS`, and `COMPLETED` statuses.
-   **User Profiles:** Dedicated pages showcasing a user's submitted features, votes, and comments.
-   **Admin Role Request:** Users can request administrative privileges, transitioning their role to `PENDING_ADMIN` for review.
-   **Admin Feature Management:** Administrators can update the status of any feature directly from the feature card or detail page.
-   **Responsive UI:** A clean, intuitive, and mobile-friendly interface built with Tailwind CSS and Shadcn/UI.
-   **Dark Mode:** Seamless dark/light theme switching for enhanced user experience.

## Technologies Used

This project leverages a modern and powerful stack, demonstrating proficiency in:

-   **Next.js 14 (App Router):** For building a performant, SEO-friendly React application with server-side rendering and server actions.
-   **React 19:** The core library for constructing dynamic user interfaces.
-   **TypeScript:** Ensuring type safety and improving code quality and maintainability across the entire codebase.
-   **Clerk:** Integrated for comprehensive and secure user authentication, including user management and webhooks. This was a key learning area, mastering external authentication providers.
-   **Prisma (ORM):** Utilized as a next-generation ORM for seamless interaction with the PostgreSQL database. This project provided hands-on experience with schema design, migrations, and efficient data querying.
-   **Neon (PostgreSQL):** A serverless PostgreSQL database, demonstrating experience with modern cloud database solutions and their integration into full-stack applications.
-   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs and ensuring responsiveness.
-   **Shadcn/UI:** A collection of re-usable components built with Radix UI and Tailwind CSS, accelerating UI development and maintaining consistency.
-   **`next-themes`:** For implementing robust dark/light mode functionality.
-   **`react-hook-form` & `zod`:** For efficient form management and validation.

## Learning & Growth

This project was a deliberate effort to expand my full-stack development capabilities, particularly in areas that were new to me:

-   **Mastering Authentication with Clerk:** Gained in-depth understanding of integrating third-party authentication services, managing user sessions, and securing routes.
-   **Full-Stack Development with Prisma & Neon:** This project marked a significant step in building a truly full-stack application. I learned to design a relational database schema with Prisma, manage database migrations, and connect a Next.js application to a cloud-hosted PostgreSQL instance (Neon), handling data fetching and mutations efficiently.
-   **Next.js Server Actions:** Explored and implemented server actions for handling server-side logic directly within React components, optimizing data mutations and revalidations.
-   **Component-Driven UI Development:** Enhanced my skills in building modular and reusable UI components using Shadcn/UI and Tailwind CSS, focusing on accessibility and best practices.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn
-   A PostgreSQL database (e.g., a free tier on Neon.tech)
-   Clerk account for authentication

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd feature-request.io
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    DATABASE_URL="your_postgresql_connection_string"
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
    CLERK_SECRET_KEY="your_clerk_secret_key"
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
    ```
    Replace the placeholder values with your actual database connection string and Clerk API keys.

4.  **Run Prisma Migrations:**
    ```bash
    npx prisma migrate dev --name init
    ```
    This will apply your database schema.

5.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This project is designed for easy deployment to platforms like Vercel. Refer to the `vercel_deployment_guide.md` file for detailed instructions on deploying to Vercel, including environment variable configuration and running Prisma migrations post-deployment.

## Connect with Me

*(Optional: Add links to your LinkedIn, GitHub profile, personal website, etc.)*

---