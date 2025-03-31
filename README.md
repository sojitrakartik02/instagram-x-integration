# Instagram to X.com Twitter Integration

This project integrates Instagram data fetching, LLM-based caption summarization, and posting summarized captions to X.com (formerly Twitter). The system includes an API with endpoints for fetching Instagram posts, summarizing captions, and posting them as tweets.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Environment Variables](#environment-variables)
4. [Endpoints](#endpoints)
5. [Sample Flow](#sample-flow)
6. [Testing](#testing)
7. [Setup and Usage](#setup-and-usage)
8. [Documentation](#documentation)

---

## Overview

The application connects to Instagram to fetch the most recent post from a given username (e.g., `bbcnews`), retrieves the caption and image URL, summarizes the caption using an LLM, and posts the summarized caption as a tweet to X.com.

---

## Prerequisites

To run this project, ensure that you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- Docker (optional, for containerization)

---

## Environment Variables

The following environment variables are required to run the project:

- **INSTAGRAM_ACCESS_TOKEN**: Access Token for Instagram Graph API (required for Instagram data retrieval).
- **INSTAGRAM_API_URL**: URL endpoint for the Instagram Graph API.
- **OPENAI_API_KEY**: API Key for OpenAI (or an alternative LLM service for summarizing captions).
- **TWITTER_BEARER_TOKEN**: Bearer Token for X.com API integration (required for authenticating API requests).

To set these variables locally, create a `.env` file in the root directory of your project and add the required keys:

```bash
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
INSTAGRAM_API_URL=https://graph.instagram.com
OPENAI_API_KEY=your_openai_api_key
TWITTER_BEARER_TOKEN=your_twitter_bearer_token
```
