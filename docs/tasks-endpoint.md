# Tasks
User email will be get directly from the token during the request.

## Creating a task
POST `/api/tasks` <br />
Create a new task and return a 201 status code, if successful.

### Request Body
```json
{
  "task": "string",
  "timeStart": "string",
  "timeEnd": "string"
}
```

### Response Body
```json
{
  "id": 0,
  "task": "string",
  "timeStart": 0,
  "timeEnd": 0,
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Response codes
| Status code | Description | Explanation                        |
|-------------|-------------|------------------------------------|
| 201         | Created     | The task was successfully created. |
| 400         | Bad Request | Invalid body.                      |

## Getting every task
GET `/api/tasks` <br />
Get every task and return a 200 status code, if successful.

### Response Body
```json
[
  {
    "id": 0,
    "task": "string",
    "timeStart": 0,
    "timeEnd": 0,
    "createdAt": "Date",
    "updatedAt": "Date"
  }
]
```

### Response codes
| Status code | Description | Explanation                        |
|-------------|-------------|------------------------------------|
| 200         | OK          | The tasks were successfully found. |
| 400         | Bad Request | Invalid board ID.                  |

## Getting a task by ID
GET `/api/tasks/{task_id}` <br />
Get a task by ID and return a 200 status code, if successful.

### Response Body
```json
{
  "id": 0,
  "task": "string",
  "timeStart": 0,
  "timeEnd": 0,
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Response codes
| Status code | Description | Explanation                      |
|-------------|-------------|----------------------------------|
| 200         | OK          | The task was successfully found. |
| 400         | Bad Request | Invalid task or board ID.        |

### Updating a task
PATCH `/api/tasks/{task_id}` <br />
Update a task and return a 200 status code, if successful.

### Request Body
```json
{
  "task": "string",
  "timeStart": 0,
  "timeEnd": 0
}
```

### Response Body
```json
{
  "id": 0,
  "task": "string",
  "timeStart": 0,
  "timeEnd": 0,
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Response codes
| Status code | Description | Explanation                        |
|-------------|-------------|------------------------------------|
| 200         | OK          | The task was successfully updated. |
| 400         | Bad Request | Invalid task or board ID.          |

## Deleting a task
DELETE `/api/tasks/{task_id}` <br />
Delete a task and return a 204 status code, if successful.
### Response codes
| Status code | Description | Explanation                        |
|-------------|-------------|------------------------------------|
| 204         | No Content  | The task was successfully deleted. |
| 400         | Bad Request | Invalid task ID.                   |