# 🟡 GoldMarket

**GoldMarket** is a microservice-based backend system for tracking gold prices and processing user orders. It is built with **NestJS**, **TypeScript**, and uses **Redis**, **RedLock**, and **gRPC** for distributed communication and locking.

---

## 🧭 Architecture Diagram

![GoldMarket Architecture](./documentation/goldMarket.svg)


## 📦 Project Structure

The system consists of 3 main services:

### 1. **MarketData Service**
- **Responsibility**: Fetches real-time gold prices from external APIs.
- **Technology**: gRPC server

### 2. **Pricing Service**
- **Responsibility**: Communicates with the `MarketData` service via gRPC to retrieve the latest price and apply pricing logic.
- **Technology**: gRPC client/server

### 3. **Ordering Service**
- **Responsibility**: Exposes REST APIs for users to place and manage orders.
- **Communicates**: With the `Pricing` service using gRPC.
- **Technology**: REST + gRPC client

---

## 🛠️ Technologies Used

- **NestJS** – Backend framework
- **TypeScript** – Typed JavaScript
- **Redis** – Caching and distributed lock storage
- **RedLock** – Distributed locking mechanism over Redis
- **gRPC** – Communication between services

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- Docker (for running Redis)
- `protoc` installed (for gRPC if needed)

### Setup

1. Install dependencies:

   ```bash
   npm install

2. Run Redis (you can use Docker):   

   ```bash
   docker run -p 6379:6379 redis


3. Start services (example for local dev):

   ```bash
   npm run start:dev

### 🌐 REST API (Ordering Service)

| Method | Endpoint | Description           |
| ------ | -------- | --------------------- |
| POST   | /orders  | Create a new order    |


### 📁 Environment Variables
...
