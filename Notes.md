## JWT Authentication 
- JSON web Token is a compact URL safe way to transmit information between parties as a JSON object
- Used for authentication and secure data exchange
- JWT consists or three parts 
    1. Header :: Metadata
    2. Payload :: Claims or Data 
    3. Signature :: Ensures token's integrity

## Q. How it works ??
- >> User logs in with their credentials
- >> Server verifies credentials and generated JWT
- >> Token is sent back to client and stored in localstorage or cookies
- >> For subsequent requests the client includes token in header eg {Authorization: Bearer<token>}
- >> Server verifies the token before processing the request.


## Sessions
- A sessions is a server side mechanism to store user data during interaction
- Each session is typically identified by a unique session id stoed in a cookie on the client side.

## Q. How Sessions Work
- >> User Logs in
- >> Server creates session and stores relevant data in memory , database or a file
- >> Session id is sent to the client and stored in a cookie.
- >> For subsequent requests the session ID is sent to the server and the server retrieves the associated session data


## Cookies
- Cookies are small piece of data stored in users browser
- They are used to remember information about the user such as session Ids or preferences
### Types of cookies
1. Session cookies :: Last until the browser is closed
2. Persistent cookies :: Have an expiration date and are stored until then
3. Secure cookies :: Only transmitted over HTTPs
4. HttpOnly Cookies :: Not accesible via Javascript enhancing Security.


## Caching
- Caching stores frequently accessed data to reduce latency and improve performance
- Commonly used cache systems are :: 
    1. In memory cache :: Redis, Memcached.
    2. Browser cache :: Stores static assets (image, CSS)