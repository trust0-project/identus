<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/trust0-project/ridb@latest/docs/logo.svg" alt="JavaScript Database" />
  <br />
</p>

# 🚀 Identus

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Rust](https://img.shields.io/badge/Rust-000000?logo=rust&logoColor=white)](https://www.rust-lang.org/)

> **Next-generation tooling for [Hyperledger Identus SDK](https://github.com/hyperledger-identus/sdk-ts)** - Bridging the gap between decentralized identity and production-ready applications.

## 🌟 Overview

Trust0 Identus provides a comprehensive suite of packages designed to streamline integration with Hyperledger Identus SDK. After years of collaboration with the Identus community, we've identified and solved critical gaps in storage solutions, React integrations, and developer experience.

### 🎯 Key Challenges Addressed

- **Secure Storage**: Enterprise-grade encrypted storage solutions
- **Developer Experience**: Simplified APIs and React components
- **Performance**: Lightweight, rust-powered database engine
- **Cross-Platform**: Seamless browser and Node.js compatibility

## 🏗️ Architecture

```mermaid
graph TD
    A[Trust0 Identus] --> B[RIDB Storage Engine]
    A --> C[Identus Store]
    A --> D[React Components]
    
    B --> E[Rust Core]
    B --> F[Web Assembly]
    
    C --> G[Hyperledger Identus SDK]
    C --> H[Encrypted Storage]
    
    D --> I[React Hooks]
    D --> J[UI Components]
```

## 📦 Packages

### 🗄️ RIDB - Next-Gen Storage Engine
Our flagship rust-powered database wrapper designed for modern web and Node.js applications.

**Features:**
- 🔒 **Security-First**: Built-in encryption and secure key management
- ⚡ **High Performance**: Rust core with WebAssembly bindings
- 🪶 **Lightweight**: Minimal footprint, maximum performance
- 🌍 **Cross-Platform**: Browser, Node.js, and mobile ready

[📖 Learn more about RIDB](https://trust0.id/ridb) | [🔗 Repository](https://github.com/trust0-project/RIDB)

### 🏪 Identus Store
Production-ready storage wrapper built on RIDB, specifically designed for Hyperledger Identus SDK.

**Key Benefits:**
- 🔄 **Drop-in Replacement**: Seamless migration from existing storage solutions
- 🛡️ **Enterprise Security**: Advanced encryption and access controls
- 📊 **Performance Monitoring**: Built-in metrics and debugging tools

[📖 Documentation](./packages/identus-store/README.md)

### ⚛️ React Components (Coming Soon)
A comprehensive set of React components and hooks for rapid Identus integration.

**Planned Features:**
- 🎨 **Pre-built UI Components**: Wallet management, credential display, QR codes
- 🪝 **Custom Hooks**: State management, storage, and SDK interactions
- 📱 **Responsive Design**: Mobile-first approach with modern styling

## 🚀 Quick Start

```bash
# Install the core package
npm install @trust0/identus-store

# For React integration
npm install @trust0/identus-react  # Coming soon
```

### Basic Usage

```typescript
import { IdentusStore } from '@trust0/identus-store';
import { Agent } from '@hyperledger/identus-sdk';

// Initialize with RIDB storage
const store = new IdentusStore({
  storage: 'ridb',
  encryption: true,
  dbName: 'my-identus-app'
});

// Create Identus agent with secure storage
const agent = new Agent({
  pluto: store.pluto,
  // ... other configurations
});
```

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/trust0-project/identus.git
cd identus

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev
```

## 📚 Resources

- 🌐 **Website**: [trust0.id](https://trust0.id)
- 📖 **Documentation**: [docs.trust0.id](https://docs.trust0.id)
- 💬 **Discord Community**: [Join us](https://discord.gg/trust0)
- 🐛 **Issues**: [GitHub Issues](https://github.com/trust0-project/identus/issues)

## 🏢 Enterprise Support

Looking for enterprise-grade support, custom integrations, or consulting services?

[📧 Contact our team](mailto:enterprise@trust0.id) for dedicated support and custom solutions.

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Hyperledger Identus Community** - For their continued collaboration and innovation
- **Contributors** - Thank you to all the developers who have contributed to this project
- **Open Source Community** - For the tools and libraries that make this work possible

---

<div align="center">

**Built with ❤️ by the Trust0 Team**

[Website](https://trust0.id) • [Twitter](https://twitter.com/trust0_id) • [LinkedIn](https://linkedin.com/company/trust0)

</div>