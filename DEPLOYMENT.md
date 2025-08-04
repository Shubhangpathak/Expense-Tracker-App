# Deployment Guide for Expense Tracker

## Frontend Deployment (Vercel)

### 1. Vercel Configuration
- **Root Directory**: `client` (set this in Vercel dashboard)
- **Framework**: Vite (auto-detected)
- **Build Command**: `npm run build` (automatic)
- **Output Directory**: `dist` (automatic)

### 2. Environment Variables
Set this in Vercel dashboard:
```
VITE_API_BASE_URL=https://your-render-app.onrender.com
```

### 3. Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set **Root Directory** to `client`
4. Set the environment variable `VITE_API_BASE_URL` in Vercel dashboard
5. Deploy

## Backend Deployment (Render)

### 1. Environment Variables
Set these in Render dashboard:
- `NODE_ENV`: `production`
- `PORT`: `10000` (Render's default)
- `MONGO_URL`: Your MongoDB connection string
- `TOKEN_SECRET`: Your JWT secret key
- `SALT_ROUNDS`: `10`
- `FRONTEND_URL`: Your Vercel app URL

### 2. Render Configuration
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Root Directory**: `server`

### 3. Update CORS in server/index.js
Replace the CORS origin with your actual Vercel URL:
```javascript
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? [process.env.FRONTEND_URL, 'https://your-actual-vercel-app.vercel.app']
        : ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
}))
```

## Important Notes

1. **Update the CORS origin** in `server/index.js` with your actual Vercel URL
2. **Set all environment variables** in both Vercel and Render dashboards
3. **Use MongoDB Atlas** for production database
4. **Test the API endpoints** after deployment

## Testing Deployment

1. Deploy backend first (Render)
2. Get the Render URL
3. Update `VITE_API_BASE_URL` in Vercel with the Render URL
4. Deploy frontend (Vercel)
5. Test all functionality

## Troubleshooting

### Vercel 404 Error
1. **Check Root Directory**: Make sure it's set to `client` in Vercel dashboard
2. **Remove vercel.json**: Try deploying without the vercel.json file first
3. **Check Build Logs**: Look at the build logs in Vercel dashboard for specific errors
4. **Verify File Structure**: Ensure all files are in the correct locations:
   - `client/index.html` exists
   - `client/src/main.jsx` exists
   - `client/package.json` has correct scripts
5. **Environment Variables**: Make sure `VITE_API_BASE_URL` is set correctly
6. **Try Manual Build**: Run `npm run build` locally in the client directory to test

### Common Issues
- **Node Version**: Make sure you're using Node.js 18+ in Vercel
- **Dependencies**: All dependencies should be in `package.json`
- **Build Output**: Check that `dist` folder is created after build 