
echo "\nLogin as User 1 (Admin)..."
# User 1 should be admin. Need to update role manually in DB or assume they are.
# For this test, let's just try to access. If it fails due to forbidden, we know auth works but role check failed (which is good).
# Ideally we have a seed script or we can update directly via SQL if we had that tool.
# I'll try to hit the stats endpoint.

curl -c cookies_admin.txt -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "unique_test_user_1770667407@example.com", "password": "password123"}' 

echo "\n\nChecking Admin Stats..."
curl -b cookies_admin.txt -X GET http://localhost:3000/api/admin/stats

echo "\n\nListing Users..."
curl -b cookies_admin.txt -X GET http://localhost:3000/api/admin/users
