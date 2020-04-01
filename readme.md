Models/////////////////////////////////

User
Users can post new posts and leave comments. They have:

A String username
A String passwordHash
A String profilePhotoUrl

Routes/////////////////////////////////////////////////////////

Auth
Create authentication routes

POST /auth/signup
creates a new user
responds with the created user
POST /auth/signin
responds with a user
GET /auth/verify
uses the ensureAuth middleware
responds with a user
Posts
Create RESTful post routes

POST /posts
requires authentication
creates a new post
responds with the new post
HINT: get the user who created the post from req.user.
GET /posts
responds with a list of posts
GET /posts/:id
responds with a post by id
should include the populated user
should include all comments associated with the post (populated with commenter)
HINT: You'll need to make two separate queries and a Promise.all
PATCH /posts/:id
requires authentication
only can update the post caption
respond with the updated post
NOTE: make sure the user attempting to update the post owns it
DELETE /posts/:id
requires authentication
deletes a post
responds with the deleted post
NOTE: make sure the user attempting to delete the post owns it
GET /posts/popular
respond with a list of the 10 posts with the most comments


/////////////////////////////////////////////////////////////////
Comments
Create RESTful comments routes

POST /comments
requires authentication
create a new comment
respond with the comment
HINT: get the user who created the comment from req.user.
DELETE /comments/:id
requires authentication
delete a comment by id
respond with the deleted comment
NOTE: make sure the user attempting to delete the comment owns it