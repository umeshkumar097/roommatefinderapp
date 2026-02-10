
echo "\n--- Testing Feed API ---"

# 1. Create User 3 (New Liker)
echo "\nCreating User 3..."
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "User 3", "email": "user3@example.com", "password": "password123"}'

# 2. Login as User 3
echo "\nLogging in as User 3..."
curl -c cookies_user3.txt -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user3@example.com", "password": "password123"}'

# 3. Create a Listing as User 1 (Owner) - ensuring there is something to swipe on
echo "\nLogin as User 1 to post listing..."
curl -c cookies_owner.txt -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "testuser_1770667462@example.com", "password": "password123"}'

echo "\nUser 1 posting a new listing..."
curl -b cookies_owner.txt -X POST http://localhost:3000/api/listings \
  -H "Content-Type: application/json" \
  -d '{"title": "Cozy Apartment", "description": "Nice place", "price": 500, "location": "Uptown", "amenities": ["Wifi"]}' > listing_response.json

LISTING_ID=$(cat listing_response.json | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
echo "\nCreated Listing ID: $LISTING_ID"

# 4. Fetch Feed for User 3 (Should include new listing)
echo "\nFetching Feed for User 3 (Expect Listing $LISTING_ID)..."
FEED_JSON=$(curl -s -b cookies_user3.txt -X GET http://localhost:3000/api/listings/feed)
echo $FEED_JSON

if echo "$FEED_JSON" | grep -q "\"id\":$LISTING_ID"; then
  echo "\nSUCCESS: Listing found in feed."
else
  echo "\nFAILURE: Listing NOT found in feed."
fi

# 5. User 3 Swipes Right (Matches)
echo "\nUser 3 Swiping Right on Listing $LISTING_ID..."
curl -b cookies_user3.txt -X POST http://localhost:3000/api/matches \
  -H "Content-Type: application/json" \
  -d "{\"listingId\": $LISTING_ID}"

# 6. Fetch Feed for User 3 Again (Should NOT include listed)
echo "\nFetching Feed for User 3 Again (Expect NO Listing $LISTING_ID)..."
FEED_JSON_2=$(curl -s -b cookies_user3.txt -X GET http://localhost:3000/api/listings/feed)
echo $FEED_JSON_2

if echo "$FEED_JSON_2" | grep -q "\"id\":$LISTING_ID"; then
  echo "\nFAILURE: Listing STILL found in feed after swiping."
else
  echo "\nSUCCESS: Listing correctly removed from feed."
fi

echo "\n--- Feed Test Complete ---"
