```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: A user is adding a message and clicking the button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server

    Note right of browser: In Content-Type header of the request it informs server that the included data is represented in JSON format
    Note left of server: server reads JSON format

    server-->>browser: {"message":"note created"}
    deactivate server
```
