
# Easeforms

> **🚀 [Try it live →](https://easeforms.vercel.app/)** | Built for developers who value clean code and beautiful UX

Easeforms is an open-source  and developer-centric form builder that lets users create smart, interactive forms with ease.

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
git clone https://github.com/Bhavye2003Developer/EaseForms_v2.git

# 2. Navigate into the project
cd easeforms

# 3. Install dependencies
yarn install # or npm install

# 4. Setup environment variables
cp .env.example .env.local
# Fill in your DB and Auth credentials in .env.local

# 5. Generate Prisma client
npx prisma generate

# 6. Run dev server
npm run dev

```

## 🔐 Environment Variables

You'll need to configure the following in your `.env.local`:

```env
DATABASE_URL="your-mongodb-uri"
NEXT_PUBLIC_GITHUB_URL="https://github.com/Bhavye2003Developer/EaseForms_v2.git"
AUTH_SECRET="your-secret"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-auth-secret"

```

## 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to open an issue or submit a PR.

## 📄 License

MIT License. See `LICENSE` file for more details.
