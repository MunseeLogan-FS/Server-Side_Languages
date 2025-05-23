# This is the 3.3 - Geospatial Data API

## API used is Nominatim Manual's openstreetmap API

[link to API](https://nominatim.org/release-docs/develop/api/Search/)

## Usage

### route

the main route is localhost:3000/api/v1/geo-data
running get on this route will return all stored loctation in the database

### Fetching a location

to fetch data from the API you can run GET localhost:3000/api/v1/geo-data?lat=AnyLATITUDE&lon=AnyLONGITUDE
if the lat and lon have already been saved it will return the data from the database.

You can get a loction that has been saved by id as well using GET localhost:3000/api/v1/geo-data/id

### Saving a location

to fetch data from the API and save it you can run POST localhost:3000/api/v1/geo-data?lat=AnyLATITUDE&lon=AnyLONGITUDE

### updating a location

to update a location put the update in the body and PUT localhost:3000/api/v1/geo-data/id

### deleting a location

to delete a location do DELETE localhost:3000/api/v1/geo-data/id
