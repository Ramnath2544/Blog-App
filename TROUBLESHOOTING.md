# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 1. Build Errors

#### Issue: "Module not found" errors
**Solution:**
```bash
# Clear node_modules and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
```

#### Issue: Vite build warnings about chunk size
**Solution:** This is expected due to Three.js size. The app still works perfectly. To reduce warnings:
```javascript
// In vite.config.js
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three', '@react-three/fiber', '@react-three/drei']
        }
      }
    }
  }
})
```

### 2. Runtime Errors

#### Issue: White screen on load
**Solutions:**
1. Check browser console for errors
2. Verify all environment variables are set
3. Check MongoDB connection
4. Ensure backend is running on port 3000

#### Issue: 3D elements not rendering
**Solutions:**
1. Check WebGL support: Visit https://get.webgl.org/
2. Update graphics drivers
3. Try a different browser
4. Check console for Three.js errors

#### Issue: Animations are laggy
**Solutions:**
1. Close other browser tabs
2. Enable hardware acceleration in browser settings
3. Update browser to latest version
4. Check CPU/GPU usage

### 3. Backend Issues

#### Issue: Cannot connect to MongoDB
**Solutions:**
1. Verify MONGO connection string in `.env`
2. Check MongoDB Atlas network access
3. Ensure IP is whitelisted
4. Test connection with MongoDB Compass

#### Issue: JWT authentication fails
**Solutions:**
1. Check JWT_SECRET in `.env`
2. Clear browser cookies
3. Try signing in again
4. Check token expiration

#### Issue: Image upload fails
**Solutions:**
1. Verify Cloudinary credentials
2. Check file size limits
3. Ensure proper CORS configuration
4. Check network tab for failed requests

### 4. Development Environment

#### Issue: Hot reload not working
**Solutions:**
```bash
# Restart dev server
# Kill the process and restart
cd client
npm run dev
```

#### Issue: Port already in use
**Solutions:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### 5. Styling Issues

#### Issue: Tailwind classes not working
**Solutions:**
1. Check Tailwind config
2. Restart dev server
3. Clear browser cache
4. Verify `@import "tailwindcss"` in index.css

#### Issue: Dark mode not switching
**Solutions:**
1. Check Redux store for theme state
2. Clear localStorage
3. Check ThemeProvider wrapper
4. Verify theme toggle function

### 6. Performance Issues

#### Issue: Slow initial load
**Solutions:**
1. Check network speed
2. Enable compression in production
3. Use CDN for static assets
4. Implement code splitting

#### Issue: High memory usage
**Solutions:**
1. Reduce number of 3D elements on screen
2. Limit animation complexity
3. Check for memory leaks in DevTools
4. Optimize image sizes

### 7. Browser-Specific Issues

#### Chrome
- Clear cache: Ctrl + Shift + Delete
- Disable extensions
- Try incognito mode

#### Firefox
- Clear cache: Ctrl + Shift + Delete
- Check WebGL settings
- Update to latest version

#### Safari
- Enable WebGL in preferences
- Clear website data
- Update macOS/iOS

### 8. Deployment Issues

#### Issue: Build fails in production
**Solutions:**
1. Run `npm run build` locally first
2. Check for environment-specific code
3. Verify all dependencies are in package.json
4. Check Node version compatibility

#### Issue: API calls fail after deployment
**Solutions:**
1. Update API base URL for production
2. Check CORS configuration
3. Verify environment variables on server
4. Check SSL certificates

### 9. Database Issues

#### Issue: Posts not loading
**Solutions:**
```javascript
// Check database connection
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});
```

#### Issue: Duplicate key error
**Solutions:**
1. Check unique indexes in schemas
2. Verify data before insertion
3. Handle errors properly in controllers

### 10. Dependencies

#### Issue: Version conflicts
**Solutions:**
```bash
# Check for outdated packages
npm outdated

# Update packages carefully
npm update

# If issues persist, try:
npm install --legacy-peer-deps
```

## Debugging Tools

### Browser DevTools
1. **Console:** Check for errors
2. **Network:** Monitor API calls
3. **Performance:** Profile animations
4. **Application:** Check localStorage

### React DevTools
- Install React Developer Tools extension
- Inspect component tree
- Check props and state
- Profile component renders

### Redux DevTools
- Install Redux DevTools extension
- Track state changes
- Time-travel debugging
- Action monitoring

## Quick Fixes Checklist

- [ ] Clear browser cache
- [ ] Restart dev server
- [ ] Check environment variables
- [ ] Verify MongoDB connection
- [ ] Update dependencies
- [ ] Check browser console
- [ ] Test in different browser
- [ ] Clear node_modules and reinstall
- [ ] Check network requests
- [ ] Verify file permissions

## Getting Help

### Before Asking
1. Check this troubleshooting guide
2. Search existing issues
3. Check browser console
4. Try to reproduce in minimal setup

### When Reporting Issues
Include:
- Error message (full stack trace)
- Browser and version
- Node.js version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/videos if applicable

### Useful Commands

```bash
# Check versions
node --version
npm --version

# Clean install
rm -rf node_modules package-lock.json
npm install

# Build for production
npm run build

# Check bundle size
npm run build -- --report

# Run tests (if configured)
npm test

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

## Environment Variables Template

### Root `.env`
```env
MONGO=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_random_secret_key_here_min_32_chars
```

### Client `.env`
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_app_id
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
```

## Still Having Issues?

1. Check the [README.md](./README.md) for setup instructions
2. Review [FEATURES.md](./FEATURES.md) for feature documentation
3. Look at component comments in source code
4. Create an issue on GitHub with details

---

**Remember:** Most issues can be solved by:
1. Reading the error message carefully
2. Checking the documentation
3. Googling the exact error
4. Restarting the development server
