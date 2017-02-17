# MMM-MovieInfo [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/fewieden/MMM-MovieInfo/master/LICENSE) [![Build Status](https://travis-ci.org/fewieden/MMM-MovieInfo.svg?branch=master)](https://travis-ci.org/fewieden/MMM-MovieInfo) [![Code Climate](https://codeclimate.com/github/fewieden/MMM-MovieInfo/badges/gpa.svg?style=flat)](https://codeclimate.com/github/fewieden/MMM-MovieInfo) [![Known Vulnerabilities](https://snyk.io/test/github/fewieden/mmm-movieinfo/badge.svg)](https://snyk.io/test/github/fewieden/mmm-movieinfo)

Upcoming Movie Info Module for MagicMirror<sup>2</sup>

## Example

![](.github/example.jpg)

## Dependencies

* An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
* npm
* [request](https://www.npmjs.com/package/request)
* [moment](https://www.npmjs.com/package/moment)

## Installation

1. Clone this repo into `~/MagicMirror/modules` directory.
1. Get a free api_key [here](https://www.themoviedb.org/faq/api)
1. Configure your `~/MagicMirror/config/config.js`:

    ```
    {
        module: 'MMM-MovieInfo',
        position: 'top_right',
        config: {
            ...
        }
    }
    ```

1. Run command `npm install --productive` in `~/MagicMirror/modules/MMM-MovieInfo` directory.

## Config Options

| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `api_key` | `false` | Get a free api_key [here](https://www.themoviedb.org/faq/api). |
| `discover` | check below for examples | Check the [docs](https://www.themoviedb.org/documentation/api/discover) for more Info. |
| `updateInterval` | `10800000` (3 hours) | How often new data should be fetched. (Changes only once per day). |
| `rotateInterval` | `180000` (3 mins) | How fast should be rotated between movies. |
| `genre` | `true` | Display genres of movies. |
| `rating` | `true` | Display rating of movies. |
| `plot` | `true` | Display plot of movies. |
| `useLanguage` | `false` | Use language from config instead of default english. WARNING: This can have missing data from api. |

### Discover Configuration Examples

Place the `discover` object in your config.

#### What movies are in theatres?

```javascript
discover: {
    "primary_release_date.gte": "now",  //now
    "primary_release_date.lte": "month" //day, week, month, quarter or year
}
```

You can also explicitly set the date

```javascript
discover: {
    "primary_release_date.gte": "2017-02-16",
    "primary_release_date.lte": "2017-03-16"
}
```

#### What are the most popular movies?

```javascript
discover: {
    "sort_by": "popularity.desc"
}
```

#### What are the highest rated movies rated R?

```javascript
discover: {
    "certification_country": "US",
    "certification": "R",
    "sort_by": "vote_average.desc"
}
```

#### What are the most popular kids movies?

```javascript
discover: {
    "certification_country": "US",
    "certification.lte": "G",
    "sort_by": "popularity.desc"
}
```

#### What is are the best movies from 2010?

```javascript
discover: {
    "primary_release_year": "2010",
    "sort_by": "vote_average.desc"
}
```

#### What are the highest rated science fiction movies that Tom Cruise has been in?

```javascript
discover: {
    "with_genres": "878",
    "with_cast": "500",
    "sort_by": "vote_average.desc"
}
```

#### What are the Will Ferrell's highest grossing comedies?

```javascript
discover: {
    "with_genres": "35",
    "with_cast": "23659",
    "sort_by": "revenue.desc"
}
```

#### Have Brad Pitt and Edward Norton ever been in a movie together?

```javascript
discover: {
    "with_people": "287,819",
    "sort_by": "vote_average.desc"
}
```

#### Has David Fincher ever worked with Rooney Mara?

```javascript
discover: {
    "with_people": "108916,7467",
    "sort_by": "popularity.desc"
}
```

#### What are the best drama's?

```javascript
discover: {
    "with_genres": "18",
    "sort_by": "vote_average.desc",
    "vote_count.gte": "10"
}
```

#### What are Liam Neeson's highest grossing rated 'R' movies?

```javascript
discover: {
    "certification_country": "US",
    "certification": "R",
    "sort_by": "revenue.desc",
    "with_cast": "3896"
}
```
