# Deployment Notes

## Overview

This document summarizes deployment, operational, and runbook guidance for the Week_4_Backend service. It focuses on production readiness: lifecycle management, observability, background processing, security, and deployment recommendations.

Intended audience: platform engineers, SREs, and backend developers responsible for staging and production deployments.

## Tech Stack

- Runtime: Node.js (ES Modules)
- Web framework: Express
- Database: MongoDB (Mongoose)
- Queue / cache: Redis + BullMQ
- Process manager: PM2
- Logging: Pino (structured JSON)
- Validation: Schema-based request validation
- Security: Helmet, CORS enforcement, rate limiting

## Repository layout (high level)

Week_4_Backend/

- logs/ # application and error logs (persist in prod)
- src/
  - config/ # environment-driven configuration
  - loaders/ # bootstrapping and dependency wiring
  - routes/ controllers/ services/ repositories/ middlewares/
  - jobs/ # background worker code
  - utils/ index.js
- ecosystem.config.cjs # PM2 process definitions
- SECURITY-REPORT.md
- QUERY-ENGINE-DOC.md
- DEPLOYMENT-NOTES.md

## Startup sequence

1.  Load environment configuration
2.  Initialize structured logger
3.  Bootstrap application (loaders)
4.  Register global middlewares (security, parsing, tracing)
5.  Establish external connections (MongoDB, Redis)
6.  Mount routes and health checks
7.  Start HTTP server and background worker(s)

Each stage emits structured logs to `logs/app.log` to facilitate troubleshooting.

## Runtime configuration

- Environment-driven via `.env` files; provide a `.env.example` for production.
- Key variables: `NODE_ENV`, `PORT`, `DB_URL`, `LOG_LEVEL`, `REDIS_HOST`, `REDIS_PORT`.

Recommended production practice: keep secrets in a managed secret store (Vault, AWS Secrets Manager, etc.) and inject them via the platform (Kubernetes Secrets, systemd unit, or process manager).

## Process management & lifecycle

We support two primary processes managed by PM2 (or a container orchestrator):

- API server
- Background worker

PM2 commands (local / lightweight deployments):

```bash
pm2 start ecosystem.config.cjs
pm2 status
pm2 stop all
```

The application listens for `SIGINT` / `SIGTERM` and implements a graceful shutdown:

- Stop accepting new connections
- Allow in-flight requests to complete within a configured timeout
- Close MongoDB and Redis connections
- Flush and close log streams
- Exit with appropriate status code

This same pattern is applied to background worker processes to avoid data loss and ensure idempotency.

## Background jobs (BullMQ)

- Example queue: `email-queue` (welcome email) — worker runs as a separate process
- Jobs are designed to be idempotent and safe to retry
- Retry strategy: up to 3 attempts with exponential backoff
- Failures: logged to `logs/error.log` and observable via metrics/alerts

Deployment notes:

- Run worker instances separately from the API to scale independently
- Monitor queue length, failure rates, and retry counts

## Observability

Logging

- Structured JSON logs using Pino; files located under `logs/`.
- `logs/app.log` contains lifecycle and info messages; `logs/error.log` contains errors.
- Persist or mount `logs/` in production (or stream to a log aggregator).
- Enable log rotation to avoid unbounded disk growth.

Tracing / Request correlation

- Support for an `X-Request-ID` header. If absent, the system generates one.
- The request ID is attached to logs and propagated into background jobs to enable end-to-end tracing.

Metrics & Monitoring

- Export process and application metrics (request latency, error rate, queue depth).
- Integrate with Prometheus/Grafana or a hosted monitoring solution.

Quick troubleshooting example:

```bash
# Search logs by request id
grep <REQUEST_ID> logs/app.log
```

## Security and hardening

- Input validation and centralized error handling
- Helmet for security headers, explicit CORS policy, and rate limiting
- Enforce payload size limits where appropriate
- Prefer soft-delete over hard delete for critical records
- Detailed test findings are in `SECURITY-REPORT.md`

Deployment security notes:

- Run Redis and MongoDB as managed services or in secure, network-isolated clusters
- Use TLS for all external connections and internal service-to-service traffic where possible

## Deployment recommendations

- Run processes under PM2 for simple deployments; use Docker + Kubernetes for production-grade orchestration
- Persist `logs/` (host mount or centralized logging)
- Configure log rotation and retention policy
- Use managed Redis and MongoDB or properly sized, monitored clusters
- Configure health checks and readiness probes (HTTP /health, /ready)

## Operational runbook (essential commands)

Start services:

```bash
pm2 start ecosystem.config.cjs
```

Stop services gracefully:

```bash
pm2 stop all
```

Check status:

```bash
pm2 status
```

Check logs (tail):

```bash
tail -f logs/app.log
tail -f logs/error.log
```

## Recommendations & next steps

- Provide a `.env.example` with required variables and notes for each entry
- Add automated health and readiness checks for container orchestration
- Integrate metrics and alerting for queue backlogs and worker failures
- Add CI/CD deployment steps and a minimal smoke-test to validate deployments

## Appendix

- See `SECURITY-REPORT.md` for detailed security findings and mitigations.
- See `QUERY-ENGINE-DOC.md` for domain-specific query notes.

---
