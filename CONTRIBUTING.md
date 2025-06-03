# Contributing to Easeforms

Thank you for your interest in contributing to Easeforms! We welcome contributions from developers of all skill levels. This guide will help you get started.

## 🚀 Quick Start

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/EaseForms.git
   cd EaseForms
   ```

2. **Set up your development environment**
   ```bash
   yarn install
   # Fill in your environment variables
   npx prisma generate
   npm run dev
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📋 How to Contribute

### 🐛 Bug Reports
- Use the issue template when reporting bugs
- Include steps to reproduce the issue
- Provide browser/OS information
- Include screenshots if applicable

### ✨ Feature Requests
- Check existing issues first to avoid duplicates
- Clearly describe the feature and its use case
- Explain why this feature would benefit other users
- Consider implementation complexity

### 🔧 Code Contributions

#### Before You Start
- Check existing issues and PRs to avoid duplicate work
- Discuss major changes in an issue first
- Follow our coding standards and conventions

#### Development Guidelines
- **Code Style**: We use ESLint and Prettier for consistent formatting
- **Commit Messages**: Use conventional commits (feat:, fix:, docs:, etc.)
- **Testing**: Write tests for new features and bug fixes
- **Documentation**: Update relevant docs for any changes

#### Pull Request Process
1. Ensure your code follows the project's style guidelines
2. Update documentation if needed
3. Add tests for new functionality
4. Make sure all tests pass
5. Write clear, descriptive commit messages
6. Fill out the PR template completely

## 🏗️ Project Structure

```
├── app/                # Next.js app directory
├── components/         # Reusable React components
├── utils/              # Utility functions and configurations
├── prisma/             # Database schema and migrations
├── public/             # Static assets
├── types/              # TypeScript type definitions
└── styles/             # Global styles and Tailwind config
```

## 🛠️ Tech Stack Knowledge

To contribute effectively, familiarity with these technologies is helpful:

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui, aceternity ui
- **Database**: MongoDB with Prisma ORM
- **Authentication**: Auth.js (NextAuth)
- **Animation**: Framer Motion

## 📝 Code Standards

### JavaScript/TypeScript
- Use TypeScript for type safety
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### React Components
- Use functional components with hooks
- Keep components small and focused
- Use proper prop typing with TypeScript
- Follow React best practices

### Styling
- Use Tailwind CSS utility classes
- Leverage shadcn/ui components when possible
- Maintain consistent spacing and typography
- Ensure responsive design

## 🧪 Testing

- Write unit tests for utility functions
- Add integration tests for complex features
- Test cross-browser compatibility
- Verify mobile responsiveness

## 📚 Documentation

- Update README.md for new features
- Add inline code comments for complex logic
- Update type definitions
- Include examples for new APIs

## 🎯 Priority Areas

We're particularly looking for help with:

- **Performance optimization**
- **Accessibility improvements**
- **Mobile responsiveness**
- **Form validation enhancements**
- **UI/UX improvements**
- **Documentation and examples**

## 🤝 Community Guidelines

- Be respectful and inclusive
- Provide constructive feedback
- Help other contributors
- Follow the code of conduct
- Ask questions when in doubt

## 🔍 Getting Help

- **Issues**: Use GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub discussions for general questions
- **Discord**: Join our community Discord (link in README)

## 📄 License

By contributing to Easeforms, you agree that your contributions will be licensed under the MIT License.

---

**Ready to contribute?** Check out our [good first issues](https://github.com/Bhavye2003Developer/EaseForms/labels/good%20first%20issue) to get started!
