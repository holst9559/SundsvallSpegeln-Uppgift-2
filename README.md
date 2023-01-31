# BioSida

NAMNKONVENTIONER
--------------------------------------
filer = camelCase.js, camelCase.html, camelCase.scss
branch = camelCase

HTML/SASS klasser = my-class
Javascript variablar och funktioner = camelCase
Javascript klasser/objekt = MyClass

GIT TIPS & TRICKS
- Hålla commits små 
- Commita endast de filerna du vill inkludera i Pull-Request
- Göra git pull från main branch innan man gör en pull request (förminskar merge konflikter)
- Minst två "approves" på pull-requests innan merge.
- Lägg gärna upp bilder eller videor i din Pull-Request :)


## API DOCUMENTATION
---

### /api/movies
GET - Get all movies

### /api/movies/{id}
GET - Get specific movie with {id}

### /api/movies/{id}/ratings
GET - Get ratings for specific movie with {id}

### /api/movies/{id}/screenings
GET - Get all screenings for specific movie with {id}

Query Strings
    ?sortBy=upcoming

### /api/screenings
GET - Get all screenings

Query Strings
    ?end_time=(+5days from request) //Filter by coming 5 days
    ?items=10 //Limit to 10 items

### /api/movies/{id}/reviews
GET - Get reviews for specific movie with {id}
POST - Add a review for a specific movie with {id}

{
    header: {
        "ids": 4,
        "token": myToken
    },
    body {
        "comment": "Crap movie",
        "rating": "0.005",
        "author": "John Doe",
    },
}

Query Strings - Specifies review page
    ?page=1

### /api/movies/{id}/reviews/{id}
GET - Get specific review of a specific movie with {id} both for movie and review
PATCH - Update a specific review


MÖTE 2023-01-31
- Strukturerat upp projektet med hjälp av Whimsical
- Börjat bryta ner projektet i mindre delar med Canban board i Trello
- Designade API i Whimsical