
echo "\nLogin as User 1..."
curl -c cookies_map_user.txt -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "unique_test_user_1770667407@example.com", "password": "password123"}' 

# Create listing with coordinates (simulating client-side geocoding)
echo "\n\nCreating Listing with Coordinates..."
curl -b cookies_map_user.txt -X POST http://localhost:3000/api/listings \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Apartment with Map View", 
    "description": "Lovely view.", 
    "price": 2000, 
    "location": "Central Park, NY", 
    "latitude": 40.7812, 
    "longitude": -73.9665,
    "leaseDuration": "1 Year",
    "images": ["http://example.com/map.jpg"],
    "amenities": ["Park View"]
  }'

echo "\n\nFetching Listings (Verify Lat/Lng saved)..."
curl -b cookies_map_user.txt -X GET http://localhost:3000/api/listings
