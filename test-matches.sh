
echo "Logging in as User 2 (Liker)..."
curl -c cookies_liker.txt -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "testuser_1770667462@example.com", "password": "password123"}' 

# Assume listing ID 1 exists (created by another user, hopefully, or self-like for testing)

echo "\n\nLiking Listing ID 1..."
curl -b cookies_liker.txt -X POST http://localhost:3000/api/matches \
  -H "Content-Type: application/json" \
  -d '{"listingId": 1}'

echo "\n\nChecking Matches (should be empty for liker if they don't own listings)..."
curl -b cookies_liker.txt -X GET http://localhost:3000/api/matches
