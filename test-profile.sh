
# Login first to get token
echo "Logging in..."
curl -c cookies.txt -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "testuser_1770667462@example.com", "password": "password123"}' 

echo "\n\n"

# Update Profile
echo "Updating Profile..."
curl -b cookies.txt -X PUT http://localhost:3000/api/profile \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name", "bio": "I am a verification bot.", "gender": "non-binary", "preferences": {"budget": 1000}}'

echo "\n\n"

# Check Me to verify update
echo "Checking Profile..."
curl -b cookies.txt -X GET http://localhost:3000/api/auth/me
