
echo "Logging in..."
curl -c cookies.txt -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "testuser_1770667462@example.com", "password": "password123"}' 

echo "\n\n"

# Create Listing
echo "Creating Listing..."
curl -b cookies.txt -X POST http://localhost:3000/api/listings \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Spacious Room in Downtown",
    "description": "A beautiful room with a view, close to subway.",
    "price": 1200,
    "location": "Downtown, NY",
    "amenities": ["WiFi", "Gym", "Pool"],
    "availableDate": "2026-03-01",
    "leaseDuration": "12 months"
  }'

echo "\n\n"

# Get All Listings
echo "Getting All Listings..."
curl -X GET "http://localhost:3000/api/listings?limit=5"

echo "\n\n"

# Get Specific Listing (assuming ID 1 for first one created)
echo "Getting Listing ID 1..."
curl -X GET http://localhost:3000/api/listings/1
