## Architecture and Rationales

### Goals

- Build a clean, responsive gallery experience optimised for visual content
- Prioritise fast load times and smooth UX
- Avoid vendor lock-in and unnecessary dependencies
- Showcase back-end and database modeling skills (SQL)
- Deploy a production-ready app with minimal ops overhead

---

### Stack

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

### WIP Photos

![image](https://github.com/user-attachments/assets/fb6b244a-9136-46e8-9004-433b66ec2d2a)

![image](https://github.com/user-attachments/assets/5f6e47df-0cef-4107-ae17-3e89c543403b)

![image](https://github.com/user-attachments/assets/a9c5d803-2d58-47b5-a1c2-a34c84f510eb)


