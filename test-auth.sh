
EMAIL="testuser_$(date +%s)@example.com"
echo "Using email: $EMAIL" > test-results.txt

# 1. Register
echo "Registering..." >> test-results.txt
curl -v -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Test User\", \"email\": \"$EMAIL\", \"password\": \"password123\"}" \
  -c cookies.txt >> test-results.txt 2>&1

echo "\n\n" >> test-results.txt

# 2. Login
echo "Logging in..." >> test-results.txt
curl -v -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"password\": \"password123\"}" \
  -b cookies.txt -c cookies.txt >> test-results.txt 2>&1

echo "\n\n" >> test-results.txt

# 3. Check Me
echo "Checking Me..." >> test-results.txt
curl -v -X GET http://localhost:3000/api/auth/me \
  -b cookies.txt >> test-results.txt 2>&1

echo "\n\n" >> test-results.txt

# 4. Logout
echo "Logging out..." >> test-results.txt
curl -v -X POST http://localhost:3000/api/auth/logout \
  -b cookies.txt -c cookies.txt >> test-results.txt 2>&1

echo "\n\n" >> test-results.txt

# 5. Check Me (after logout)
echo "Checking Me (after logout)..." >> test-results.txt
curl -v -X GET http://localhost:3000/api/auth/me \
  -b cookies.txt >> test-results.txt 2>&1
