
# Login User 1 (Sender)
echo "Logging in as User 1..."
curl -c cookies_user1.txt -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "unique_test_user_1770667407@example.com", "password": "password123"}' 

# Login User 2 (Receiver) - creating/using the one from matches test
echo "\n\nLogging in as User 2..."
curl -c cookies_user2.txt -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "testuser_1770667462@example.com", "password": "password123"}' 

# User 1 sends message to User 2
echo "\n\nUser 1 Sending Message to User 2..."
# Assuming User 2 ID is 2
curl -b cookies_user1.txt -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"receiverId": 2, "content": "Hello from User 1!"}'

# User 2 Fetch Messages from User 1
echo "\n\nUser 2 Fetching Conversation with User 1..."
# Assuming User 1 ID is 1
curl -b cookies_user2.txt -X GET http://localhost:3000/api/messages/1
