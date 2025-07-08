## Architecture and Rationales

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
| **Docker is Docker**     | Docker                | Portability and isolated dev environment        |

---

### Why Not Firebase or other BaaS?

While BaaS tools like Firebase and Supabase offer fast setup, I opted for a more manual approach to showcase:

- Relational data modeling with SQL
- End-to-end understanding of the request pipeline
- Infrastructure configuration and deployment discipline
- Schema validation and modular backend logic

---
