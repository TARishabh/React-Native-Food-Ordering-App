The Project structure according to my current understanding is:
PS:- My Understanding is generally 70% Wrong.

SRC contains all the files and folders which are important for the running of the project during build:


Terms OR Folders which are same as React:

# Components -> ReUsable Pieces of Codes, which can be used in making app pages.
# Providers -> A Proivder is a place where you pass the required data to all the other pages of the app.



# Constants -> It a folder which contains constants such as Colors.ts
# App -> It contains all the sections or segments of the app

_layout.tsx -> is responsible for defining shared layout elements across the app, mostly focused on UI

index.tsx ->  is often the entry point or main file of a specific feature or section within your app.

so let's say first we open (user) route, we again see three files _layout.tsx,index.tsx, two.tsx

two.tsx is a tab which is commented because we don't want another tab at bottom.



// REACT QUERY CACHES THE DATA IN THE MEMORY WHICH HELPS IN FASTER RELOAD OF THE APPLICATION.

// leverage the power of caching mechanism