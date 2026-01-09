# Render Deployment Checklist

## Critical: Environment Variables on Render

Go to your Render dashboard for the `fintrack-backend` service and verify these environment variables are set:

### Required Environment Variables

1. **MONGO_URL**
   ```
   mongodb+srv://Ishantpatil:Ishantpatil123@cluster0.dkqk2.mongodb.net/aiexpense?retryWrites=true&w=majority
   ```

2. **JWT_SECRET**
   ```
   TeamLaksh@2026
   ```

3. **EMAIL_USER**
   ```
   fintrack06@gmail.com
   ```

4. **EMAIL_PASS**
   ```
   tcap mbyz layg hfbj
   ```

5. **API_KEY**
   ```
   AIzaSyCE2bHMLgFjY3_OQ_UBbcdsBoHzww6AStA
   ```

6. **PORT** (usually auto-set by Render)
   ```
   3000
   ```

## MongoDB Atlas Network Access

Make sure MongoDB Atlas allows connections from Render:

1. Go to MongoDB Atlas → Network Access
2. Add IP Address: **0.0.0.0/0** (allows all IPs)
   - Or add Render's specific IP ranges if you want more security

## How to Set Environment Variables on Render

1. Go to https://dashboard.render.com
2. Select your `fintrack-backend` service
3. Click on **Environment** in the left sidebar
4. Click **Add Environment Variable**
5. Add each variable from the list above
6. Click **Save Changes**
7. Render will automatically redeploy

## Testing After Deployment

After setting the environment variables, test these endpoints:

1. **Health Check**
   ```
   https://fintrack-ai-finance-tracker-and-budget-h9x4.onrender.com/api/health
   ```
   Should return: `{"dbState":"connected","healthy":true,"timestamp":"..."}`

2. **Root API**
   ```
   https://fintrack-ai-finance-tracker-and-budget-h9x4.onrender.com/api
   ```
   Should return: `{"message":"Welcome to Smart Finance API 🚀"}`

## Common Issues & Solutions

### Issue: 500 Error on Login
**Cause:** Missing JWT_SECRET or MONGO_URL environment variable
**Solution:** Add environment variables on Render dashboard

### Issue: Database Connection Failed
**Cause:** MongoDB Atlas blocking Render's IP addresses
**Solution:** Allow all IPs (0.0.0.0/0) in MongoDB Atlas Network Access

### Issue: Service Not Starting
**Cause:** Missing dependencies or wrong start command
**Solution:** Verify `render.yaml` has correct build and start commands

## Verify Local Development Works

Before troubleshooting Render, make sure it works locally:

```bash
cd backend
npm install
npm start
```

Then test login:
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"yourpassword"}'
```

## Recent Code Improvements

✅ Added database connection validation before authentication
✅ Added environment variable checks
✅ Improved error messages and logging
✅ Added health check endpoint with connection status
✅ Better frontend error handling

## Next Steps After Fixing

1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "Fix authentication error handling and add deployment checks"
   git push
   ```

2. Render will auto-deploy if connected to GitHub
3. Check Render logs for any errors
4. Test login from your frontend

## Support

If issues persist after following this checklist, check:
- Render deployment logs
- MongoDB Atlas connection logs
- Browser console for specific error messages
