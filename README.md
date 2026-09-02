# Anand Jaiswal's personal site

Next.js portfolio, project archive, public blog, and private learning logs.

## Local development

Copy the environment template and add your MongoDB Atlas URI:

```bash
cp .env.example .env.local
npm ci
npm run dev -- --port 3001
```

Open [http://localhost:3001](http://localhost:3001).

## EC2 deployment

The Compose deployment runs only the Next.js application. MongoDB Atlas remains external, avoiding the RAM cost of a MongoDB daemon on the EC2 instance.

```bash
cp .env.example .env
# Edit .env and set production secrets.
docker compose up -d --build
```

The production container uses Next.js standalone output, a 192 MB V8 heap ceiling, and a 256 MB container memory limit. The MongoDB client uses at most five pooled connections and releases idle connections after one minute. These defaults target a small EC2 instance; increase both limits together if real traffic produces out-of-memory restarts.

Useful checks:

```bash
docker stats personal-site
docker compose logs -f app
curl --fail http://127.0.0.1:3000/
```

Do not commit `.env`; only `.env.example` belongs in Git.

## Vercel deployment

Add the variables from `.env.example` under **Project Settings → Environment Variables**, then redeploy. For Blogs, `MONGODB_URI` must use an Atlas **database user** and include the database path:

```text
mongodb+srv://<database-user>:<url-encoded-password>@<cluster>/personal-site?retryWrites=true&w=majority
```

In Atlas, allow Vercel to reach the cluster in **Network Access**. Because Vercel functions do not have one fixed outbound IP on Hobby, the usual setup is `0.0.0.0/0` together with a strong, least-privilege database user. An Atlas `bad auth` error means the database username/password is incorrect; it is not fixed by changing the frontend.
