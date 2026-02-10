
echo "\n--- Testing Match Status Update ---"

# 1. Login as User 1 (Listing Owner)
echo "\nLogging in as User 1 (Listing Owner)..."
curl -c cookies_owner.txt -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "testuser_1770667462@example.com", "password": "password123"}'

# 2. Get Matches for User 1 (to find a match ID)
echo "\n\nGetting matches for User 1..."
MATCHES_JSON=$(curl -s -b cookies_owner.txt -X GET http://localhost:3000/api/matches)
echo $MATCHES_JSON

# Extract the first match ID (requires jq, or just manual check if jq not available, using grep/sed for simplicity here)
# Assuming the response is {"matches":[{"matchId":1,...}]}
MATCH_ID=$(echo $MATCHES_JSON | grep -o '"matchId":[0-9]*' | head -1 | cut -d':' -f2)

if [ -z "$MATCH_ID" ]; then
  echo "\nNo matches found to update. (Did you run test-matches.sh first?)"
  exit 1
fi

echo "\n\nFound Match ID: $MATCH_ID"

# 3. Accept the match
echo "\nAccepting Match $MATCH_ID..."
curl -b cookies_owner.txt -X PATCH http://localhost:3000/api/matches/$MATCH_ID \
  -H "Content-Type: application/json" \
  -d '{"status": "accepted"}'

# 4. Verify update
echo "\n\nVerifying Match Status (should be accepted)..."
curl -b cookies_owner.txt -X GET http://localhost:3000/api/matches

echo "\n\n--- Test Complete ---"
