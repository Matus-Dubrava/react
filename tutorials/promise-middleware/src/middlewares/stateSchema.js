export default {
    "definitions": {},
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://example.com/root.json",
    "type": "object",
    "title": "The Root Schema",
    "required": [
      "comments",
      "isAuthenticated"
    ],
    "properties": {
      "comments": {
        "$id": "#/properties/comments",
        "type": "array",
        "title": "The Comments Schema",
        "items": {
          "$id": "#/properties/comments/items",
          "type": "object",
          "title": "The Items Schema",
          "required": [
            "name",
            "id"
          ],
          "properties": {
            "name": {
              "$id": "#/properties/comments/items/properties/name",
              "type": "string",
              "title": "The Name Schema",
              "default": "",
              "examples": [
                "comment name"
              ],
              "pattern": "^(.*)$"
            },
            "id": {
              "$id": "#/properties/comments/items/properties/id",
              "type": "string",
              "title": "The Id Schema",
              "default": "",
              "examples": [
                "commentId"
              ],
              "pattern": "^(.*)$"
            }
          }
        }
      },
      "isAuthenticated": {
        "$id": "#/properties/isAuthenticated",
        "type": "boolean",
        "title": "The Isauthenticated Schema",
        "default": false,
        "examples": [
          false
        ]
      }
    }
  }