## Instagram to X.com Twitter Integration

### Endpoints

#### GET `/instagram/fetch-post/:username`

Fetches the most recent post from the specified Instagram username, summarizes the caption, and posts it as a tweet.

- **URL Params**:
  - `username`: Instagram handle (e.g., `bbcnews`).
- **Environment Variables**:

  - `TWITTER_BEARER_TOKEN`: Twitter Bearer Token for X.com integration.
  - `OPENAI_API_KEY`: API Key for OpenAI to summarize captions.
  - `INSTAGRAM_ACCESS_TOKEN`: Access Token for Instagram Graph API.

- **Sample Response**:
  ```json
  {
    "message": "Tweet posted successfully",
    "tweetResponse": {
      "id": "123456789",
      "status": "Summarized tweet caption."
    }
  }
  ```
