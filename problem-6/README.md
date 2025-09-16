
# ✅ Specification

# Scoreboard Module (Backend API)

This module provides secure APIs to update and fetch a live Top 10 scoreboard.

---

## Features

* RESTful API design.
* Secure score updates via authenticated PATCH requests.
* Prevents unauthorized manipulation using JWT + replay protection.
* Real-time scoreboard via WebSocket.
* Database persistence with optimized Top 10 query.

---

## API Endpoints

### PATCH /api/users/{id}/score

Increment the user’s score after completing an action.

Request:

```json
{ "actionId": "uuid", "authToken": "JWT" }
```

Response:

```json
{ "success": true, "newScore": 123 }
```

---

### GET /api/scores/top

Retrieve the Top 10 scoreboard.

Response:

```json
{
  "scores": [
    { "userId": "u1", "score": 150 },
    { "userId": "u2", "score": 140 }
  ]
}
```

---

### WebSocket /ws/scores

* Subscribes client to real-time updates.
* Emits `scoreboardUpdated` event with Top 10 scores whenever a change happens.

---

## Security

* JWT tokens required for all updates.
* Nonce (`actionId`) used to prevent replay attacks.
* Server validates and increments score — client cannot set arbitrary values.
* Rate limiting applied per user.

---

## Database Schema

**Users**

* `id`, `username`, `hashedPassword`

**Scores**

* `userId`, `score`, `updatedAt`

Indexes:

* `(score DESC)` for fast Top 10 queries.

---

## Improvements

* Use **Redis** to cache Top 10 scoreboard for sub-ms retrieval.
* Add **audit logs** to track suspicious activity.
* Add **leaderboard shards** (e.g., per region) for scalability.
* Apply **WebSocket scale-out** with a pub/sub backend (Redis or Kafka).

---

## 📊 Viewing the Execution Flow Diagram

The execution flow is described in a **Mermaid sequence diagram** (Diagram As Code).
```
Note: I generated the SequenceDiagram.png and C4ContainerDiagram.png that locates in current folder.
```


You can view it in one of the following ways:

1. **Online**
   Copy the diagram code into [https://mermaid.live](https://mermaid.live) to render it.

2. **CLI (Mermaid CLI)**
   Install the Mermaid CLI globally:

   ```bash
   npm install -g @mermaid-js/mermaid-cli
   ```

   Save the diagram code into a file , then run:

   ```bash
   mmdc -i SequenceDiagram.mmd -o SequenceDiagram.png
   ```

    ```bash
   mmdc -i C4ContainerDiagram.mmd -o C4ContainerDiagram.png
   ```

   This will generate a `SequenceDiagram.png`, `C4ContainerDiagram.png` image you can open in any viewer.



