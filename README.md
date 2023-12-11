# BeatBlendr

## Made by Neema, Meelaud, Parker
Everyone made equal contributions while we worked on it together and commited code under 1 account.

## COMP 3170, Set G

## Description
Beatblendr is a web application that allows you to create/delete playlists, and add/delete songs to/from those playlists. It is automatically uploaded to your real spotify account.
Must sign in to a real spotify account to use BeatBlendr. (Because of the way the API works)

## Please use the Test Account to Sign In
At the bottom of the README, there are login details on the account to use when using the application.
Because of the way the Spotify API works, I can only have registered users access the functions of the app unless I get the app approved by the Spotify team.

## Troubleshooting
If you are experiencing problems, try:
1. Reloading
2. Use the log out button in the header to log out. Ensure local.storage 'token' does not exist/is clear after being logged out
3. Log back in after logging out

## To Run on Localhost
Please go onto the LandingPage.tsx component and change REDIRECT_URI to whichever url applies. There are comments below the variable that you can copy and paste to set the right URI. (Default is the vercel link)
Command to run is:
1. yarn run dev

## API Used: [Spotify Web API](https://developer.spotify.com/documentation/web-api)

## Library Used: [Mantine UI](https://mantine.dev) 

## Test Account:
1. username: neematotonchiwork@gmail.com
2. password: Comp3170!
3. DO NOT LOGIN WITH GOOGLE. Use Spotifys own email/password method.