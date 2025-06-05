## Architecture and Rationales

This portfolio website was designed for a fine arts student to showcase visual artworks in a performant, scalable, and modern web environment. As the developer, I also used this project to demonstrate my full-stack engineering skills — balancing technical rigor with real-world usability.
// TODO remove and probably add to CV instead

---

### Goals

- Build a clean, responsive gallery experience optimised for visual content
- Prioritise fast load times and smooth UX
- Avoid vendor lock-in and unnecessary dependencies
- Showcase back-end and database modeling skills (SQL)
- Deploy a production-ready app with minimal ops overhead

---

### Chosen Stack

| Layer                    | Tech                  | Reasoning                                       |
| ------------------------ | --------------------- | ----------------------------------------------- |
| **Language**             | TypeScript            | Static typing for scalability                   |
| **Runtime**              | Node.js               | Compatible with Vercel and backend logic        |
| **Frontend**             | React + Next.js       | Component-driven UI + hybrid static/SSR routing |
| **Styling**              | Tailwind CSS          | Clean and fast UI                               |
| **Image Handling**       | Cloudinary            | Optimised image delivery for high-res artworks  |
| **Database**             | PostgreSQL (via Neon) | Relational modeling                             |
| **Authentication**       | NextAuth.js           | Secure and tailored for Next.js                 |
| **ORM**                  | Drizzle ORM           | Type-safe schema mapping                        |
| **Validation**           | Zod                   | Ensures schema correctness at runtime           |
| **Linting & Formatting** | ESLint + Prettier     | Code quality and style consistency              |
| **Deployment**           | Vercel                | Fast CI/CD and serverless Next.js support       |
| **Containers**           | Docker                | Portability and isolated dev environment        |

---

### Why Not Firebase or BaaS?

While BaaS tools like Firebase and Supabase offer fast setup, I opted for a more manual approach to showcase:

- Relational data modeling with SQL
- End-to-end understanding of the request pipeline
- Infrastructure configuration and deployment discipline
- Schema validation and modular backend logic

---
