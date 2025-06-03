
# Easeforms

> **🚀 [Try it live →](https://easeforms.vercel.app/)**

Easeforms is an open-source  and developer-centric form builder that lets users create smart, interactive forms with ease.

![image](https://github.com/user-attachments/assets/2adef77f-573d-475a-ae68-16516ae657ca)

## 🌟 Features

-   **Drag-and-Drop Interface** – Design forms effortlessly with a smooth layout experience
-   **Real-Time Preview** – See exactly what your form looks like as you build
-   **Timer-Based Logic** – Set time constraints on forms for quizzes or assessments
-   **Authentication** – Secure sign-in with Google using `auth.js` (NextAuth)
-   **Modern UX** – Built with `shadcn/ui` and `aceternity ui`

## 🧱 Tech Stack

-   **Framework**: Next.js
-   **Database**: MongoDB
-   **ORM**: Prisma
-   **Authentication**: Auth.js (NextAuth)
-   **UI**: shadcn/ui, aceternity ui, Tailwind CSS, Framer Motion
-   **Hosting**: Vercel

## 🚀 Getting Started (Local Dev)

```bash
# 1. Clone the repository
https://github.com/Bhavye2003Developer/EaseForms.git

# 2. Navigate into the project
cd easeforms

# 3. Install dependencies
npm install # or npm install

# 4. Generate Prisma client
npx prisma generate

# 5. Run dev server
npm run dev

```

## 🔐 Environment Variables

You'll need to configure the following in your `.env`:

```env
DATABASE_URL="your-mongodb-uri"
NEXT_PUBLIC_GITHUB_URL="https://github.com/Bhavye2003Developer/EaseForms.git"
AUTH_SECRET="your-secret"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-auth-secret"

```

## 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to open an issue or submit a PR.

## 📄 License

MIT License. See `LICENSE` file for more details.
