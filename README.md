In the project directory, you can start it up on Dev mode with the help of :
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Tests can also be run with the command below but since all Logic is BE embedded and type safety on both sides minimizing runtime errors. 

### `npm test`

To build App for Production please use :
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

> Application Use cases
- I have implimented the following features on this app version 
    1. Login user or SignUp . Be aware we only accept `[a-zA-Z]` characters for now. So no numbers or special characters in the name field. Also sessions only last for an Hour for now
    2. Once Logged in , -> You can view all listings and update any one of them . 
    3. On top of that you can add them to your Favorites list for later browsing
    4. Inside `Favorites` , you can Delete items for now , but it could also have view more details. 
    5. Lastly you may logout and come back later 

> Future goals
- Impliment the search by text or filters feature to connect with backend
- Write unit tests for all helper and utility functions
- Write JSDocs for each function inputs and outputs
- Deploy application to AWS lambda
  
  
#### Thank you very much!! 