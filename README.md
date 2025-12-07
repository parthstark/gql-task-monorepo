# GQLTask Monorepo

Clean monorepo structure with isolated frontend and backend.

## Structure
```
gqltask-monorepo/
├── frontend/          React Native Web app
│   ├── src/
│   └── package.json
├── backend/           GraphQL API
│   ├── api/           Serverless functions
│   ├── src/           Source code
│   └── package.json
└── vercel.json        Deployment config
```

## How It Works
- Edit code in `frontend/` or `backend/` folders
- On deployment, Vercel copies `backend/api` and `backend/src` to root (required by Vercel)
- Root `api/` and `src/` are gitignored (build artifacts)

## Local Development
```bash
# Frontend
cd frontend
npm install --legacy-peer-deps
npm run web

# Backend
cd backend
npm install
npm run dev
```

## Deployment
```bash
git add .
git commit -m "Your changes"
git push
# Vercel auto-deploys
```

## URLs
- Frontend: https://gqltask.parthstark.com
- API: https://gqltask.parthstark.com/api/graphql
