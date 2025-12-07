# GQLTask Monorepo

Single deployment for frontend and backend with full git history preserved.

## Structure
```
gqltask-monorepo/
├── frontend/          React Native Web app
├── backend/           GraphQL API source
├── api/               Copy of backend/api for Vercel
├── src/               Copy of backend/src for Vercel
├── package.json       Root dependencies (backend deps)
└── vercel.json        Deployment config
```

## Important Notes
- `api/` and `src/` at root are copies from `backend/` (required by Vercel)
- When updating backend code, edit in `backend/` then copy to root:
  ```bash
  cp -r backend/api . && cp -r backend/src .
  ```

## Deployment
```bash
git add .
git commit -m "Your changes"
git push
# Vercel auto-deploys
```

## Local Development
```bash
# Frontend
cd frontend && npm install --legacy-peer-deps && npm run web

# Backend
cd backend && npm install && npm run dev
```

## URLs
- Frontend: https://gqltask.parthstark.com
- API: https://gqltask.parthstark.com/api/graphql
