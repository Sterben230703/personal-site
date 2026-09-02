# EC2 resource optimization report

Measured on 2026-09-02 using the production-equivalent Next.js standalone server. Both HTTP load runs used ApacheBench with 1,000 requests and concurrency 25 against the cached homepage on the same machine. RSS is resident set size reported by `ps`.

## Before and after

| Metric | Before | After | Change |
| --- | ---: | ---: | ---: |
| Cold server RSS | 114,000 KB | 109,488 KB | -4.0% |
| RSS after load | 174,544 KB | 155,344 KB | -11.0% |
| Requests per second | 5,347.65 | 6,213.42 | +16.2% |
| Mean request time at concurrency 25 | 4.675 ms | 4.024 ms | -13.9% |
| Failed requests | 0 / 1,000 | 0 / 1,000 | unchanged |
| Installed `node_modules` | 437 MB | 431 MB | -6 MB |
| Homepage first-load JavaScript | 113 KB | 113 KB | unchanged |
| Missing-MongoDB failure response | about 30 seconds | 5.02 seconds | -83% |

Local latency and throughput are useful regression measurements, not predictions of public internet performance. EC2 results will vary with instance type, CPU credits, region, TLS, reverse proxy, and MongoDB Atlas latency.

## What changed

- Removed the local MongoDB 7 container from Compose. The EC2 instance now runs one application container and connects to MongoDB Atlas through `MONGODB_URI`.
- Limited the application container to 256 MB RAM and 100 processes.
- Limited the production Node.js old-space heap to 192 MB. The build stage is intentionally uncapped because a measured Next.js build failed at a 192 MB heap limit.
- Reduced the Mongoose pool from the driver's default maximum of 100 connections to 5, with zero minimum connections and a 60-second idle timeout.
- Reduced MongoDB connection failure detection from roughly 30 seconds to 5 seconds and reset failed cached connection promises so a later retry can recover.
- Excluded full Markdown bodies from the blog listing query. Full content is fetched only for an individual post.
- Removed unused `gray-matter` and `luxon` packages and their transitive packages.
- Kept Next.js standalone output and the Alpine runtime image already present in the project.

## EC2 checks

After adding production secrets to `.env` and deploying, validate the real instance:

```bash
docker compose up -d --build
docker stats --no-stream personal-site
ab -n 1000 -c 25 http://127.0.0.1:3000/
curl --fail http://127.0.0.1:3000/api/blogs
```

If Docker reports out-of-memory restarts under real traffic, raise `mem_limit` to `384m` and `--max-old-space-size` to `256` together. Do not raise the MongoDB pool first; five connections are enough for a personal site unless measurements show connection wait time.
