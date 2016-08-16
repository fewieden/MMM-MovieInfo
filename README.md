# MMM-MovieInfo
Upcoming Movie Info Module for MagicMirror<sup>2</sup>

## Example

![](.github/example.jpg)

## Dependencies
  * An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
  * npm
  * [request](https://www.npmjs.com/package/request)

## Installation
 1. Clone this repo into `~/MagicMirror/modules` directory.
 2. Get a free api_key [here](https://www.themoviedb.org/faq/api)
 3. Configure your `~/MagicMirror/config/config.js`:

    ```
    {
        module: 'MMM-MovieInfo',
        position: 'top_right',
        config: {
            ...
        }
    }
    ```
 4. Run command `npm install` in `~/MagicMirror/modules/MMM-MovieInfo` directory.

## Config Options
| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `api_key` | `false` | Get a free api_key [here](https://www.themoviedb.org/faq/api) |
| `updateInterval` | `10800000` (3 hours) | How often new data should be fetched. (Changes only once per day) |
| `rotateInterval` | `180000` (3 mins) | How fast should be rotated between movies |