TEXT = r'''
NumPy|9
ndarray|An ndarray is NumPy's n-dimensional array: one dtype and a shape.|import numpy as np|-|NumPy
dtype|A dtype is the type of every element in an array, such as float64 or int32.|import numpy as np|-|ndarray
ndarray shape|shape is the tuple of lengths along each axis.|import numpy as np|-|ndarray
axis|An axis is one dimension of an array: axis 0 runs down rows of a 2-d array.|import numpy as np|-|ndarray shape
broadcasting|Broadcasting stretches arrays with compatible shapes so an operation can pair their elements.|import numpy as np|-|ndarray
ufunc|A ufunc applies an element-wise operation, such as add or sqrt, across arrays.|import numpy as np|-|vectorisation
boolean index|A boolean index keeps the elements where a mask is true.|import numpy as np|-|ndarray
slice on array|Slicing an ndarray returns a view when the slice is basic, so writes can show through in the original.|import numpy as np|-|slicing
view vs copy|A view shares memory with the original array, and a copy does not.|import numpy as np|-|shallow copy
np.array|np.array builds an array from a sequence.|import numpy as np|-|ndarray
np.zeros|np.zeros builds an array filled with 0.|import numpy as np|-|ndarray
np.arange|np.arange builds evenly spaced values over a half-open interval, like range.|import numpy as np|-|range
np.linspace|np.linspace builds a set number of values from a start to a stop, including both ends by default.|import numpy as np|-|np.arange
reshape|reshape reinterprets the same elements under a new shape that still holds them all.|import numpy as np|-|ndarray shape
transpose|transpose swaps axes, so rows become columns in the 2-d case.|import numpy as np|-|axis
reduction|A reduction such as sum or mean folds an axis down to a smaller array.|import numpy as np|-|axis
nan|nan is a floating-point value that means not a number, and it compares unequal to itself.|print(float('nan') != float('nan'))|True|float
np.isnan|np.isnan is true for NaN elements and false for ordinary numbers.|import numpy as np|-|nan
vector norm|A vector norm is a measure of length, and np.linalg.norm computes several of them.|import numpy as np|-|NumPy
dot product|A dot product multiplies paired elements and sums them.|import numpy as np|-|ndarray
matrix multiply|The @ operator performs matrix multiplication, which is not the same as element-wise *.|import numpy as np|-|dot product
random Generator|numpy.random.Generator draws arrays of random numbers from an explicit bit generator.|import numpy as np|-|random module
seed sequence|A seed makes a Generator repeat the same draws, which keeps experiments comparable.|import numpy as np|-|random Generator
masked array|A masked array keeps a mask of elements that should be ignored by calculations.|import numpy as np|-|ndarray
structured array|A structured array holds records with named fields of fixed dtypes.|import numpy as np|-|dtype
einsum|einsum writes many array products as a short subscript string.|import numpy as np|-|dot product
memory order|C order stores rows contiguously, and Fortran order stores columns contiguously.|import numpy as np|-|ndarray
---
pandas|9
Series|A Series is a one-dimensional labelled array.|import pandas as pd|-|pandas
DataFrame column|A column of a DataFrame is a Series that shares the DataFrame's index.|import pandas as pd|-|DataFrame
Index object|An Index holds the row or column labels.|import pandas as pd|-|DataFrame
loc|loc selects by label.|import pandas as pd|-|Index object
iloc|iloc selects by integer position, starting at 0.|import pandas as pd|-|index
boolean mask|A boolean mask filters rows where a condition is true.|import pandas as pd|-|DataFrame
DataFrame groupby|DataFrame.groupby splits rows by a key, applies a calculation, and combines the results.|import pandas as pd|-|DataFrame
aggregation|An aggregation reduces each group to a value, such as a sum or a count.|import pandas as pd|-|groupby
transform method|transform returns a result aligned with the original index, unlike an aggregation that shrinks the rows.|import pandas as pd|-|groupby
DataFrame merge|DataFrame.merge joins two frames on keys, in the style of a SQL join.|import pandas as pd|-|DataFrame
concat|concat stacks DataFrames along an axis.|import pandas as pd|-|DataFrame
join method|DataFrame.join combines frames on their indexes.|import pandas as pd|-|merge
read_csv|read_csv builds a DataFrame from a CSV file or buffer.|import pandas as pd|-|CSV
to_csv|to_csv writes a DataFrame as CSV text.|import pandas as pd|-|read_csv
missing value|pandas uses NaN and, for some dtypes, pd.NA to mark missing data.|import pandas as pd|-|None
dropna|dropna drops rows or columns that contain missing values.|import pandas as pd|-|missing value
fillna|fillna replaces missing values with a constant or a computed fill.|import pandas as pd|-|missing value
astype|astype converts a column to another dtype when the values allow it.|import pandas as pd|-|dtype
category dtype|A category dtype stores repeated labels as codes plus a small list of categories.|import pandas as pd|-|dtype
datetime accessor|The dt accessor pulls parts such as year or day from a datetime Series.|import pandas as pd|-|datetime module
string accessor|The str accessor applies string methods to a whole Series.|import pandas as pd|-|string
apply row|apply walks a function along an axis, and it is usually slower than a vectorised column operation.|import pandas as pd|-|vectorisation
copy on write|Copy-on-Write is a pandas mode that delays copies until something writes, so a slice is not always a private copy.|import pandas as pd|-|view vs copy
setting with copy|Setting on a slice can fail to change the original frame, which is why pandas warns about chained assignment.|import pandas as pd|-|copy on write
reset_index|reset_index turns the index back into columns and builds a new default index.|import pandas as pd|-|Index object
set_index|set_index uses one or more columns as the index.|import pandas as pd|-|Index object
pivot|pivot reshapes long rows into columns, and it refuses duplicate index and column pairs.|import pandas as pd|-|DataFrame
melt|melt turns columns into rows, the reverse direction of a pivot.|import pandas as pd|-|pivot
query method|query filters rows with a string expression.|import pandas as pd|-|boolean mask
pipe method|pipe passes a DataFrame into a function so a chain of steps can stay in one expression.|import pandas as pd|-|DataFrame
---
matplotlib|9
matplotlib|matplotlib draws plots. Most scripts import its state-based interface as pyplot.|import matplotlib.pyplot as plt|-|pyplot
pyplot|pyplot is matplotlib's state-based interface, usually imported as plt.|import matplotlib.pyplot as plt|-|matplotlib
Figure|A Figure is the whole canvas a plot is drawn on.|import matplotlib.pyplot as plt|-|pyplot
Axes|An Axes is one plotting area inside a Figure, with its own x and y scales.|import matplotlib.pyplot as plt|-|Figure
plot method|plot draws lines or markers from x and y sequences.|import matplotlib.pyplot as plt|-|Axes
scatter plot|scatter draws one marker per point.|import matplotlib.pyplot as plt|-|Axes
bar chart|A bar chart draws a bar for each category.|import matplotlib.pyplot as plt|-|Axes
histogram|A histogram counts how many values fall into each bin.|import matplotlib.pyplot as plt|-|Axes
legend|A legend names the series drawn on an Axes.|import matplotlib.pyplot as plt|-|Axes
axis label|An axis label is the text that says what a scale means.|import matplotlib.pyplot as plt|-|Axes
title text|A title is the heading on an Axes or a Figure.|import matplotlib.pyplot as plt|-|Figure
subplot|A subplot is one Axes in a grid of Axes on the same Figure.|import matplotlib.pyplot as plt|-|Axes
tight layout|tight_layout adjusts padding so labels are less likely to be clipped.|import matplotlib.pyplot as plt|-|Figure
savefig|savefig writes the Figure to a file such as PNG or SVG.|import matplotlib.pyplot as plt|-|Figure
colourmap|A colourmap maps numbers to colours, which is how a raster becomes an image.|import matplotlib.pyplot as plt|-|raster
imshow|imshow displays a 2-d array as an image.|import matplotlib.pyplot as plt|-|raster
artist|An artist is a drawable piece, such as a line, a patch, or a text label.|import matplotlib.pyplot as plt|-|Axes
---
SQL and databases|9
database|A database is an organised store of data that a program queries.|import sqlite3|-|SQL
table|A table stores rows that share a set of columns.|SELECT 1|-|database
column|A column is one field of a table, with a name and a type.|SELECT 1|-|table
row|A row is one record in a table.|SELECT 1|-|table
primary key|A primary key is a column, or a set of columns, that identifies each row.|SELECT 1|-|table
foreign key|A foreign key is a column that points at a key in another table.|SELECT 1|-|primary key
SELECT|SELECT reads columns from a table.|SELECT 1|-|SQL
WHERE|WHERE keeps the rows that match a condition.|SELECT 1|-|SELECT
SQL JOIN|JOIN combines rows from two tables by a condition.|SELECT 1|-|table
INNER JOIN|An INNER JOIN keeps only rows that match on both sides.|SELECT 1|-|JOIN
LEFT JOIN|A LEFT JOIN keeps every row from the left table and fills missing right-hand columns with null.|SELECT 1|-|JOIN
GROUP BY|GROUP BY folds rows that share a key into one group for an aggregate.|SELECT 1|-|SELECT
ORDER BY|ORDER BY sorts the result.|SELECT 1|-|sorting
LIMIT|LIMIT caps how many rows a query returns.|SELECT 1|-|SELECT
INSERT statement|INSERT adds rows to a table.|SELECT 1|-|table
UPDATE statement|UPDATE changes values in existing rows.|SELECT 1|-|table
DELETE statement|DELETE removes rows.|SELECT 1|-|table
transaction|A transaction is a group of changes that commit together or roll back together.|SELECT 1|-|database
index SQL|An index is an extra structure that speeds lookups and can slow writes.|SELECT 1|-|table
SQLite|SQLite is a file-backed SQL database in the standard library, and it is not in this offline Pyodide bundle.|import sqlite3|-|database
in-memory database|A SQLite database opened on :memory: lives in the process and disappears when the connection closes.|import sqlite3|-|SQLite
SQLAlchemy|SQLAlchemy is a Python SQL toolkit and optional object-relational mapper.|import sqlalchemy|-|SQL
Engine|An Engine is SQLAlchemy's pool of connections to one database.|import sqlalchemy|-|SQLAlchemy
Session|A Session tracks mapped objects and flushes their changes in a transaction.|import sqlalchemy|-|SQLAlchemy
select construct|SQLAlchemy 2 builds queries with select() rather than Query.|import sqlalchemy|-|SELECT
text SQL|text() wraps a SQL string when you need to write the statement yourself.|import sqlalchemy|-|SQL
parameter binding|Binding passes values beside the SQL so they are not pasted into the statement text.|SELECT 1|-|SQL injection
NULL|NULL means unknown or missing, and it is not equal to another NULL.|SELECT 1|-|None
SRID|An SRID is the integer id of a spatial reference, often an EPSG code stored with a geometry.|SELECT 1|-|EPSG
PostGIS|PostGIS adds geometry types and spatial functions to PostgreSQL.|SELECT ST_AsText(ST_GeomFromText('POINT(0 0)'))|-|SQL
ST_Intersects|ST_Intersects is true when two geometries share any point.|SELECT 1|-|PostGIS
ST_Within|ST_Within is true when the first geometry is inside the second.|SELECT 1|-|PostGIS
ST_Distance|ST_Distance returns the distance between two geometries in the units of their CRS.|SELECT 1|-|PostGIS
ST_Transform|ST_Transform reprojects a geometry to another SRID.|SELECT 1|-|projection
ST_Buffer|ST_Buffer builds a polygon around a geometry at a given distance.|SELECT 1|-|buffer
GIST index|A GiST index is the usual PostgreSQL index for PostGIS geometry columns.|SELECT 1|-|index SQL
geography type|The geography type treats coordinates as lon/lat on a spheroid, so distances come back in metres.|SELECT 1|-|PostGIS
---
APIs and web|9
HTTP|HTTP is the request and response protocol of the web.|print('GET')|GET|API
HTTP method|An HTTP method is the verb of a request, such as GET or POST.|print('POST')|POST|HTTP
GET|GET asks for a representation of a resource and is not supposed to change it.|print('read')|read|HTTP method
POST|POST sends data to a resource, often to create something.|print('create')|create|HTTP method
PUT|PUT replaces the resource at a URL.|print('replace')|replace|HTTP method
PATCH|PATCH applies a partial change.|print('partial')|partial|HTTP method
DELETE method|DELETE asks the server to remove a resource.|print('remove')|remove|HTTP method
status code|A status code is the three-digit result, such as 200 for success or 404 for not found.|print(200)|200|HTTP
header|A header is a named field on a request or a response, such as Content-Type.|print('Content-Type')|Content-Type|HTTP
JSON body|A JSON body is a request or response payload encoded as JSON.|import json\nprint(json.dumps({'ok': True}))|{"ok": true}|JSON
query string|A query string is the ?key=value part of a URL.|from urllib.parse import urlencode\nprint(urlencode({'q': 'Galle'}))|q=Galle|HTTP
path parameter|A path parameter is a piece of the URL path that names one resource, such as /cities/Galle.|print('/cities/Galle')|/cities/Galle|HTTP
REST|REST is a style that treats URLs as resources and uses HTTP methods to act on them.|print('resource')|resource|API
idempotent|An idempotent method can be repeated without a further effect, which GET, PUT, and DELETE are meant to be.|print('again is safe')|again is safe|HTTP method
safe method|A safe method, such as GET, must not change server state.|print('GET')|GET|GET
content type|Content-Type tells the receiver how to interpret the body.|print('application/json')|application/json|header
requests|requests is a third-party library that sends HTTP requests.|import requests|-|API
response status|response.status_code is the HTTP status the server sent.|import requests|-|status code
response json|response.json() parses a JSON body into Python objects.|import requests|-|JSON body
raise for status|raise_for_status raises when the status is an error code.|import requests|-|status code
timeout argument|A timeout stops a request that waits too long, so a call cannot hang forever.|import requests|-|requests
Session object|A requests Session reuses a connection and a set of headers across calls.|import requests|-|requests
FastAPI|FastAPI is a web framework that reads type hints to validate requests and to build an OpenAPI schema.|from fastapi import FastAPI|-|API
path operation|A path operation is a function FastAPI runs for one method and path.|from fastapi import FastAPI|-|FastAPI
APIRouter|An APIRouter groups path operations you can include in an app.|from fastapi import APIRouter|-|FastAPI
Pydantic model|A Pydantic model validates and parses structured data, which FastAPI uses for bodies.|from pydantic import BaseModel|-|type hint
dependency injection FastAPI|Depends runs a function and passes its result into a path operation.|from fastapi import Depends|-|FastAPI
OpenAPI|OpenAPI is a description of an HTTP API, and FastAPI generates one from your path operations.|from fastapi import FastAPI|-|REST
Uvicorn|Uvicorn is an ASGI server often used to run FastAPI.|print('ASGI server')|ASGI server|FastAPI
Flask|Flask is a small web framework built around a WSGI app and route decorators.|from flask import Flask|-|API
Flask route|A Flask route connects a URL rule to a function.|from flask import Flask|-|Flask
Blueprint|A Blueprint is a Flask group of routes you can register on an app.|from flask import Blueprint|-|Flask
Django|Django is a batteries-included framework with an ORM, an admin, templates, and URL routing.|import django|-|API
Django model|A Django model is a Python class that maps to a database table.|import django|-|Django
QuerySet|A QuerySet is a lazy description of a database query that runs when you iterate it.|import django|-|Django model
migration|A migration is a versioned change to the database schema.|import django|-|Django
Django admin|The Django admin is a generated interface for editing model rows.|import django|-|Django
WSGI|WSGI is the older synchronous interface between a Python web app and a server.|print('sync server')|sync server|Flask
ASGI|ASGI is the async interface used by FastAPI and modern Django.|print('async server')|async server|FastAPI
CORS|CORS is the browser rule that decides which other origins may read a response.|print('other origin')|other origin|HTTP
---
Scraping|9
web scraping|Web scraping reads pages or files and pulls out structured data.|print('read then parse')|read then parse|API
HTML|HTML is the tag language of web pages.|print('<p>')|<p>|web scraping
parser|A parser turns HTML or XML text into a tree you can search.|import html.parser\nprint(hasattr(html.parser, 'HTMLParser'))|True|HTML
Beautiful Soup|Beautiful Soup is a library that walks and searches parsed HTML.|from bs4 import BeautifulSoup|-|parser
CSS selector|A CSS selector such as div.city names elements by tag, class, or attribute.|print('div.city')|div.city|HTML
HTML tag|An HTML tag is one element, such as p or a.|print('a')|a|HTML
attribute HTML|An HTML attribute is a name and value on a tag, such as href.|print('href')|href|tag
robots.txt|robots.txt is a file where a site states which automated clients it welcomes.|print('/robots.txt')|/robots.txt|web scraping
user agent|A user agent is the name a client sends to identify itself.|print('PyDojo')|PyDojo|HTTP
rate limit polite|A polite crawler waits between requests and stops when a site asks it to.|print('wait')|wait|web scraping
charset|A charset is the encoding declared for a page, often UTF-8.|print('utf-8')|utf-8|encoding
link extraction|Link extraction collects URLs from href attributes.|print('href')|href|HTML
---
Data engineering|9
ETL|ETL extracts data from sources, transforms it, and loads it into a store.|print('extract, transform, load')|extract, transform, load|database
ELT|ELT loads raw data first and transforms it inside the warehouse.|print('load then transform')|load then transform|ETL
extract|Extract reads data out of a source system.|print('read source')|read source|ETL
transform step|A transform cleans, reshapes, or joins data on the way to its destination.|print('clean')|clean|ETL
load step|Load writes the result into the destination.|print('write')|write|ETL
DuckDB|DuckDB is an in-process analytical database that runs SQL on local files.|import duckdb|-|SQL
Parquet|Parquet is a columnar file format that stores each column together so analytical scans read less.|import pyarrow.parquet|-|DataFrame
Arrow|Apache Arrow is an in-memory columnar format that libraries such as pandas and DuckDB can share.|import pyarrow|-|Parquet
columnar storage|Columnar storage keeps one column's values together, which suits scans of a few fields.|print('column together')|column together|Parquet
partitioned dataset|A partitioned dataset splits files by a key, such as year, so a query can skip whole folders.|print('year=2026')|year=2026|Parquet
Airflow|Airflow schedules and monitors workflows described as DAGs of tasks.|import airflow|-|ETL
DAG|A DAG is a directed acyclic graph: tasks with edges that never loop.|print('no cycle')|no cycle|graph
Airflow operator|An operator is a template for one task, such as running Python or a SQL statement.|import airflow|-|DAG
scheduler|A scheduler decides when a task is ready and hands it to a worker.|print('when to run')|when to run|Airflow
dbt|dbt builds a warehouse by running SQL models in dependency order.|print('sql models')|sql models|SQL
dbt model|A dbt model is a SELECT statement that becomes a table or a view.|print('select')|select|dbt
dbt ref|ref names another model so dbt knows the dependency and the real table name.|print("ref('stops')")|ref('stops')|dbt model
dbt source|A source is a table dbt reads but does not build.|print('raw table')|raw table|dbt
dbt test|A dbt test is a query that should return zero failing rows.|print('zero rows')|zero rows|dbt
Spark|Spark runs data processing across a cluster, with a DataFrame API and SQL.|import pyspark|-|DataFrame
Spark transformation|A Spark transformation describes work and stays lazy until an action asks for a result.|import pyspark|-|Spark
Spark action|An action such as count or write launches the work a lazy plan described.|import pyspark|-|Spark transformation
Spark partition|A Spark partition is one slice of a dataset that a task can process.|import pyspark|-|Spark
Kafka|Kafka is a distributed log of messages organised into topics.|import kafka|-|queue
Kafka topic|A topic is a named stream of messages.|import kafka|-|Kafka
Kafka partition|A topic is split into partitions, and each partition is an ordered log.|import kafka|-|Kafka topic
offset|An offset is a message's position inside a partition.|import kafka|-|Kafka partition
consumer group|A consumer group shares the partitions of a topic so each partition is read by one member.|import kafka|-|Kafka
producer|A producer appends messages to a topic.|import kafka|-|Kafka
schema|A schema names fields and their types so writers and readers agree.|print('city: str')|city: str|table
data contract|A data contract is an agreement about a dataset's schema, freshness, and meaning.|print('agreed shape')|agreed shape|schema
idempotent load|An idempotent load can run twice and still leave the destination correct.|print('same result')|same result|load step
watermark|A watermark records how far a pipeline has read so a rerun can resume.|print('last id')|last id|ETL
backfill|A backfill reruns a pipeline over a past range of dates or keys.|print('past days')|past days|ETL
orchestration|Orchestration decides the order and the timing of pipeline tasks.|print('order the steps')|order the steps|DAG
---
GIS|9
EPSG|EPSG is the registry of coordinate reference system codes, such as 4326 for WGS 84.|print(4326)|4326|CRS
WGS 84|WGS 84 is the datum GPS uses, and EPSG:4326 is the geographic CRS of longitude and latitude on that datum.|print('EPSG:4326')|EPSG:4326|EPSG
Web Mercator|Web Mercator is the projected CRS EPSG:3857 used by many web maps, and it is a poor choice for measuring area.|print(3857)|3857|projection
geographic CRS|A geographic CRS locates positions with angular units, usually degrees of longitude and latitude.|print('degrees')|degrees|CRS
projected CRS|A projected CRS locates positions with linear units, usually metres, on a flat map.|print('metres')|metres|projection
datum|A datum fixes an ellipsoid and an origin so coordinates mean a place on Earth.|print('WGS 84')|WGS 84|CRS
ellipsoid|An ellipsoid is the smooth mathematical shape used to approximate the Earth.|print('smooth Earth')|smooth Earth|datum
lon lat order|GeoJSON and many GIS libraries store a position as longitude then latitude, which is x then y.|print([79.86, 6.93][0])|79.86|GeoJSON
lat lon order|Some APIs, including folium's map centre, take latitude then longitude.|import folium|-|lon lat order
axis order|Axis order is which number comes first, and mixing longitude with latitude moves a point far away.|print('check the order')|check the order|coordinate
pyproj|pyproj builds CRS objects and transforms coordinates between them.|import pyproj|-|CRS
Transformer|A pyproj Transformer converts coordinates from one CRS to another.|import pyproj|-|pyproj
always_xy|always_xy=True tells a pyproj Transformer to treat geographic coordinates as x=longitude, y=latitude.|import pyproj|-|Transformer
set CRS|Setting a CRS labels coordinates you already have and does not move them.|import geopandas|-|CRS
reproject|Reprojecting transforms the coordinates into another CRS.|import geopandas|-|projection
GeoDataFrame|A GeoDataFrame is a pandas DataFrame with an active geometry column.|import geopandas|-|GeoPandas
GeoSeries|A GeoSeries is a pandas Series of geometries.|import geopandas|-|GeoDataFrame
active geometry|The active geometry is the column spatial methods use, reached as .geometry.|import geopandas|-|GeoDataFrame
to_crs|to_crs transforms geometries into another CRS and updates the frame's CRS label.|import geopandas|-|reproject
sjoin|sjoin joins two GeoDataFrames by a spatial predicate such as intersects or within.|import geopandas|-|spatial join
spatial predicate|A spatial predicate is a yes or no relation between geometries, such as intersects, contains, or within.|print('intersects')|intersects|geometry
spatial index|A spatial index, often an R-tree, skips geometries whose boxes cannot meet the query.|import geopandas|-|bounding box
R-tree|An R-tree groups nearby bounding boxes so a spatial query can ignore distant groups.|print('box tree')|box tree|spatial index
STRtree|An STRtree is Shapely's query index over a sequence of geometries.|import shapely|-|spatial index
Shapely Point|A Shapely Point is a single coordinate in the CRS of the data.|import shapely|-|Shapely
LineString|A LineString is an ordered sequence of points joined by straight segments.|import shapely|-|geometry
Polygon geom|A polygon is a filled ring, optionally with holes.|import shapely|-|geometry
valid geometry|A valid geometry obeys the rules of its type, and an invalid one can make overlays lie.|import shapely|-|geometry
buffer operation|A buffer is the set of points within a distance of a geometry, in the units of its CRS.|import shapely|-|buffer
overlay|An overlay combines two layers with a set operation such as intersection or union.|import geopandas|-|geometry
dissolve|Dissolve merges geometries that share an attribute.|import geopandas|-|GeoDataFrame
total bounds|total_bounds is the min and max x and y of a layer.|import geopandas|-|bounding box
rasterio dataset|A rasterio dataset is an open raster file, with bands, a transform, and a CRS.|import rasterio|-|rasterio
raster band|A band is one layer of values in a raster, and rasterio numbers bands from 1.|import rasterio|-|raster
affine transform|An affine transform maps pixel row and column to coordinates in the dataset CRS.|import rasterio|-|raster
pixel|A pixel is one cell of a raster.|print('one cell')|one cell|raster
nodata|Nodata is the value that means a pixel has no measurement.|import rasterio|-|raster
window read|A window read loads a rectangle of pixels instead of the whole raster.|import rasterio|-|rasterio dataset
resampling|Resampling computes new pixel values when a raster is warped or scaled.|import rasterio|-|raster
folium|folium builds Leaflet maps in Python and expects the map centre as latitude then longitude.|import folium|-|latitude
choropleth|A choropleth shades areas by a number, such as population by district.|import folium|-|folium
marker|A marker is a point symbol on a web map.|import folium|-|folium
GeoJSON layer|A GeoJSON layer draws vector features on a web map.|import folium|-|GeoJSON
vector tile|A vector tile is a small packet of vector features for one square of a map at one zoom.|print('tile')|tile|vector data
raster tile|A raster tile is a small image for one square of a map at one zoom.|print('png tile')|png tile|raster
zoom level|A zoom level is how far in a web map is, and each step typically doubles the scale.|print(2 ** 2)|4|raster tile
bounding box filter|A bounding-box filter drops features whose boxes miss the query box before a precise test.|xs = [79.8, 80.6]\nprint(min(xs), max(xs))|79.8 80.6|bounding box
haversine step|A haversine distance treats the Earth as a sphere and is a fair estimate for city-scale lon/lat pairs.|import math\nprint(round(math.radians(180), 5))|3.14159|haversine
great circle|A great circle is the shortest path on a sphere between two points.|print('sphere path')|sphere path|haversine
geodesic|A geodesic is the shortest path on the ellipsoid a datum uses.|import pyproj|-|datum
topology|Topology is how geometries connect and share edges, separate from their exact coordinates.|print('shared edge')|shared edge|geometry
sliver|A sliver is a thin unwanted polygon left by an overlay of nearly matching edges.|print('thin gap')|thin gap|overlay
---
Machine learning|9
estimator|An estimator in scikit-learn is an object with fit, and usually predict or transform.|import sklearn|-|scikit-learn
fit|fit learns parameters from training data and stores them on the estimator.|import sklearn|-|estimator
predict|predict applies a fitted estimator to new rows and returns labels or numbers.|import sklearn|-|fit
transform method ML|transform applies a fitted preprocessor and returns the new features.|import sklearn|-|fit
Pipeline ML|A Pipeline chains preprocessing and a final estimator so fit and predict run every step in order.|import sklearn|-|estimator
train_test_split|train_test_split divides rows into a training set and a held-out test set.|from sklearn.model_selection import train_test_split|-|test
feature matrix|The feature matrix, usually called X, holds one row per example and one column per input.|import sklearn|-|machine learning
target vector|The target, usually called y, is what the model is asked to predict.|import sklearn|-|feature matrix
training set|The training set is the rows the model is allowed to learn from.|import sklearn|-|fit
test set|The test set is held out so you can estimate how the model does on unseen rows.|import sklearn|-|training set
leakage|Leakage is when information from the test set, or from the future, sneaks into training.|print('fit only on train')|fit only on train|test set
StandardScaler|StandardScaler subtracts the training mean and divides by the training standard deviation.|from sklearn.preprocessing import StandardScaler|-|transform method ML
one-hot encoding|One-hot encoding turns each category into a column of 0 and 1.|from sklearn.preprocessing import OneHotEncoder|-|feature matrix
LinearRegression model|LinearRegression fits a line, or a hyperplane, that minimises squared error.|from sklearn.linear_model import LinearRegression|-|estimator
LogisticRegression model|LogisticRegression is a classifier that models the log-odds of a class, despite the regression in its name.|from sklearn.linear_model import LogisticRegression|-|estimator
decision tree|A decision tree splits features with yes or no questions until it reaches a prediction.|from sklearn.tree import DecisionTreeClassifier|-|estimator
random forest|A random forest averages many trees trained on random subsets of rows and features.|from sklearn.ensemble import RandomForestClassifier|-|decision tree
KMeans|KMeans clusters rows by alternating assignment to the nearest centre and moving each centre.|from sklearn.cluster import KMeans|-|estimator
cross-validation|Cross-validation rotates which fold is held out so the score uses every row as a test row once.|from sklearn.model_selection import cross_val_score|-|test set
accuracy|Accuracy is the fraction of labels a classifier got right.|from sklearn.metrics import accuracy_score|-|test
precision metric|Precision is the fraction of positive predictions that were truly positive.|from sklearn.metrics import precision_score|-|accuracy
recall|Recall is the fraction of true positives that the model found.|from sklearn.metrics import recall_score|-|precision metric
F1 score|The F1 score is the harmonic mean of precision and recall.|from sklearn.metrics import f1_score|-|precision metric
confusion matrix|A confusion matrix counts true and false positives and negatives.|from sklearn.metrics import confusion_matrix|-|accuracy
overfitting|Overfitting means the model memorised the training rows and does worse on new ones.|print('train high, test low')|train high, test low|test set
underfitting|Underfitting means the model is too simple to capture the pattern, so both scores stay low.|print('both low')|both low|overfitting
input feature|An input feature is one column the model can use.|print('population')|population|feature matrix
label|A label is the answer for one training row in a classification problem.|print('residential')|residential|target vector
hyperparameter|A hyperparameter is a setting you choose, such as tree depth, rather than a value the model fits.|print('max_depth')|max_depth|estimator
random_state|random_state fixes the seed of a stochastic estimator so a rerun can match.|from sklearn.model_selection import train_test_split|-|random module
classification|Classification predicts a category.|print('class')|class|machine learning
regression ML|Regression predicts a number.|print('a number')|a number|machine learning
clustering|Clustering groups rows without using labels.|from sklearn.cluster import KMeans|-|KMeans
train score|The train score is the metric on the rows the model learned from, and it is an optimistic view.|print('optimistic')|optimistic|overfitting
holdout|A holdout is data you do not touch until the final estimate.|print('last look')|last look|test set
---
Docker|9
container|A container is a running instance of an image, with its own filesystem and process space.|print('running image')|running image|Docker
image|An image is a packed filesystem and a start command, built in layers.|print('packed app')|packed app|container
Dockerfile|A Dockerfile is the recipe that builds an image.|print('FROM python:3.12')|FROM python:3.12|image
image layer|A layer is one filesystem change in an image, and unchanged layers can be reused.|print('cached step')|cached step|Dockerfile
volume|A volume is storage that outlives a container.|print('kept data')|kept data|container
bind mount|A bind mount shows a host folder inside a container.|print('host path')|host path|volume
port mapping|Port mapping publishes a container port on a host port.|print('8000:8000')|8000:8000|container
Docker Compose|Compose starts a set of containers from a YAML file.|print('compose.yaml')|compose.yaml|Docker
registry|A registry stores images, and Docker Hub is a public one.|print('push and pull')|push and pull|image
image tag|A tag names a version of an image, such as app:0.3.0.|print('app:0.3.0')|app:0.3.0|image
base image|A base image is the FROM line your Dockerfile starts from.|print('python:3.12-slim')|python:3.12-slim|Dockerfile
entrypoint|ENTRYPOINT is the command that runs when the container starts.|print('python')|python|Dockerfile
cmd instruction|CMD is the default argument list of the container, and a docker run command can replace it.|print('app.py')|app.py|entrypoint
dockerignore|A dockerignore file lists paths that should not be sent as build context.|print('skip the cache')|skip the cache|Dockerfile
multi-stage build|A multi-stage build copies only what the final image needs out of earlier build stages.|print('smaller image')|smaller image|Dockerfile
container env|A container can receive environment variables at run time, which is a usual place for config.|print('pass config in')|pass config in|config
---
Design patterns|9
strategy pattern|The strategy pattern swaps one callable or object for another so the steps around it stay the same.|def run(fn):\n    return fn(3)\nprint(run(lambda n: n + 1))|4|function
factory function|A factory function builds and returns an object so callers do not call the class themselves.|def make(n):\n    return {'n': n}\nprint(make(2)['n'])|2|function
builder pattern|A builder assembles a complicated object one step at a time.|class B:\n    def __init__(self):\n        self.parts = []\n    def add(self, p):\n        self.parts.append(p)\n        return self\nprint(B().add('a').add('b').parts)|['a', 'b']|class
adapter pattern|An adapter wraps an object so it offers the interface a caller already expects.|class Old:\n    def raw(self):\n        return 1\nclass Adapter:\n    def __init__(self, inner):\n        self.inner = inner\n    def value(self):\n        return self.inner.raw()\nprint(Adapter(Old()).value())|1|class
facade pattern|A facade is a small interface in front of a more complicated set of calls.|def start(a, b):\n    return a + b\nprint(start(1, 2))|3|function
observer pattern|An observer registers a callback that the subject calls when something changes.|subs = []\ndef emit(n):\n    for fn in subs:\n        fn(n)\nseen = []\nsubs.append(seen.append)\nemit(4)\nprint(seen)|[4]|callback
singleton pattern|The singleton pattern allows one instance, and a module-level object is the usual Python way to get that.|class C:\n    pass\nONLY = C()\nprint(ONLY is ONLY)|True|class
repository pattern|A repository hides how objects are stored behind methods such as add and get.|class Repo:\n    def __init__(self):\n        self.rows = {}\n    def add(self, key, row):\n        self.rows[key] = row\nprint(Repo().rows)|{}|database
command pattern|The command pattern turns a request into an object you can queue or undo.|class Cmd:\n    def __init__(self, n):\n        self.n = n\n    def do(self):\n        return self.n + 1\nprint(Cmd(2).do())|3|class
template method pattern|A template method fixes the order of steps and lets a subclass replace one step.|class A:\n    def run(self):\n        return self.step() + 1\n    def step(self):\n        return 1\nclass B(A):\n    def step(self):\n        return 4\nprint(B().run())|5|inheritance
iterator pattern|The iterator pattern walks a collection without exposing how it is stored, which Python's for loop already does.|print([x for x in (1, 2)])|[1, 2]|iterator
dependency injection|Dependency injection passes a collaborator into an object instead of building it inside.|class C:\n    def __init__(self, add):\n        self.add = add\nprint(C(lambda n: n + 1).add(2))|3|factory function
composition over inheritance|Composition over inheritance prefers holding another object to building a deep class tree.|class Engine:\n    def go(self):\n        return 'go'\nclass Car:\n    def __init__(self):\n        self.engine = Engine()\nprint(Car().engine.go())|go|composition
decorator pattern|The decorator pattern wraps an object to add behaviour, which is the idea behind Python function decorators.|def wrap(f):\n    return lambda: f() + 1\nprint(wrap(lambda: 1)())|2|decorator
null object|A null object implements the same methods as a real one and does nothing, so callers skip a special case.|class Silent:\n    def log(self, msg):\n        return None\nprint(Silent().log('x'))|None|None
specification pattern|A specification object answers whether a value meets a rule.|def big(n):\n    return n > 10\nprint(big(12))|True|condition
---
System design|9
latency|Latency is how long one operation takes.|print('milliseconds')|milliseconds|profiling
throughput|Throughput is how much work finishes per unit of time.|print('rows per second')|rows per second|latency
availability|Availability is the fraction of time a service answers correctly.|print('uptime')|uptime|API
horizontal scaling|Horizontal scaling adds more machines.|print('more processes')|more processes|throughput
vertical scaling|Vertical scaling gives one machine more CPU or memory.|print('bigger box')|bigger box|horizontal scaling
load balancer|A load balancer spreads requests across several copies of a service.|print('spread')|spread|horizontal scaling
cache|A cache keeps a recent answer so the next identical request can skip the slow work.|seen = {}\ndef f(n):\n    if n not in seen:\n        seen[n] = n * 2\n    return seen[n]\nprint(f(3))|6|memoisation
cache invalidation|Invalidation drops or replaces a cached answer when the underlying data changes.|box = {'a': 1}\ndel box['a']\nprint('a' in box)|False|cache
CDN|A CDN stores copies of content near users so they travel a shorter network path.|print('edge copy')|edge copy|cache
replica|A replica is a copy of data or of a service kept for safety or for extra reads.|print('a copy')|a copy|database
shard|A shard is a split of data so each machine holds only some of the keys.|print('part of the keys')|part of the keys|database
consistent hashing|Consistent hashing places keys on a ring so adding a node moves only some of them.|print('ring')|ring|shard
rate limit|A rate limit caps how many requests a client may make in a window of time.|print('n per minute')|n per minute|API
backpressure|Backpressure slows producers when consumers cannot keep up.|print('slow down')|slow down|queue
pagination|Pagination returns a page of rows instead of the whole result.|rows = list(range(10))\nprint(rows[:3])|[0, 1, 2]|LIMIT
cursor pagination|Cursor pagination asks for the rows after a saved position, which stays stable when new rows arrive at the front.|print('after this id')|after this id|pagination
health check|A health check is an endpoint or command that reports whether a service can take work.|print('ok')|ok|API
stateless service|A stateless service keeps each request's data in the request or in a shared store, not in the process.|print('no local session')|no local session|API
CAP|CAP says a distributed store cannot promise consistency, availability, and partition tolerance all at once during a network split.|print('pick during a split')|pick during a split|database
idempotency key|An idempotency key lets a client retry a request without the server doing the work twice.|print('same key')|same key|idempotent
SLA|An SLA is the availability or latency promise written into an agreement.|print('promised uptime')|promised uptime|availability
timeout budget|A timeout budget is the time a request may spend across every downstream call.|print('stop waiting')|stop waiting|latency
circuit breaker|A circuit breaker stops calling a dependency that is failing, and tries again later.|fails = 3\nprint('open' if fails > 2 else 'closed')|open|API
bulkhead|A bulkhead isolates one dependency so its failures do not exhaust every thread or connection.|print('separate pool')|separate pool|thread
graceful shutdown|A graceful shutdown stops taking new work and finishes the work already in hand.|print('finish then exit')|finish then exit|event loop
---
Unicode|4
code point|A code point is one number in Unicode, written like U+0D9A.|print(hex(ord('ක')))|0xd9a|string
code unit|A code unit is one storage piece of an encoding, and in UTF-8 a code point may need several.|print(len('ක'.encode('utf-8')))|3|utf-8
BMP|The Basic Multilingual Plane is the first 65,536 code points, and many letters live there.|print(ord('A') < 65536)|True|code point
combining character|A combining character attaches to a base character instead of standing alone.|import unicodedata\nprint(len(unicodedata.normalize('NFD', 'é')))|2|code point
NFC|NFC composes characters into their shortest canonical form.|import unicodedata\nprint(unicodedata.normalize('NFC', 'e\u0301'))|é|combining character
NFD|NFD splits composed characters into a base plus combining marks.|import unicodedata\nprint(unicodedata.normalize('NFD', 'é') == 'e\u0301')|True|NFC
grapheme cluster|A grapheme cluster is what a reader sees as one character, which may be several code points.|print(len('é'))|1|combining character
Sinhala block|The Sinhala block runs from U+0D80 to U+0DFF.|print(0x0D80 <= ord('ක') <= 0x0DFF)|True|code point
Tamil block|The Tamil block runs from U+0B80 to U+0BFF.|print(0x0B80 <= ord('க') <= 0x0BFF)|True|code point
Sinhala letter ka|ක is SINHALA LETTER ALPAPRAANA KAYANNA, code point U+0D9A.|import unicodedata\nprint(unicodedata.name('ක'))|SINHALA LETTER ALPAPRAANA KAYANNA|Sinhala block
Tamil letter ka|க is TAMIL LETTER KA, code point U+0B95.|import unicodedata\nprint(unicodedata.name('க'))|TAMIL LETTER KA|Tamil block
Sinhala UTF-8|The Sinhala letter ක is the three UTF-8 bytes E0 B6 9A.|print('ක'.encode('utf-8').hex())|e0b69a|utf-8
Tamil UTF-8|The Tamil letter க is the three UTF-8 bytes E0 AE 95.|print('க'.encode('utf-8').hex())|e0ae95|utf-8
al-lakuna|The al-lakuna, U+0DCA, is the Sinhala sign that removes the inherent vowel.|import unicodedata\nprint(unicodedata.name('\u0dca'))|SINHALA SIGN AL-LAKUNA|Sinhala block
Tamil pulli|The Tamil pulli, U+0BCD, is the virama that removes the inherent vowel.|import unicodedata\nprint(unicodedata.name('\u0bcd'))|TAMIL SIGN VIRAMA|Tamil block
inherent vowel|In an abugida, a consonant letter includes a vowel unless a sign removes it.|print('abugida')|abugida|al-lakuna
abugida|Sinhala and Tamil are abugidas: consonant letters carry a vowel that marks can change.|print(ord('ක') != ord('க'))|True|Sinhala block
unicode category|unicodedata.category returns a two-letter class, and Lo means a letter with no case.|import unicodedata\nprint(unicodedata.category('ක'))|Lo|unicodedata module
casefold|casefold is the aggressive lowercase used for case-insensitive comparison.|print('Galle'.casefold())|galle|string
isalpha unicode|str.isalpha is true for letters in other scripts, not only A to Z.|print('ක'.isalpha(), 'க'.isalpha())|True True|string
encode utf-8|str.encode('utf-8') turns text into bytes.|print('A'.encode('utf-8'))|b'A'|utf-8
decode utf-8|bytes.decode('utf-8') turns bytes back into text, and raises UnicodeDecodeError when the bytes are not UTF-8.|print(b'A'.decode('utf-8'))|A|UnicodeDecodeError
surrogate|Surrogates are code points UTF-16 uses in pairs, and a lone surrogate is not valid Unicode scalar text.|print(0xD800 <= 0xD800 <= 0xDFFF)|True|code point
normalization form|A normalization form picks one way to write equivalent Unicode, so two spellings can compare equal.|import unicodedata\nprint(unicodedata.normalize('NFC', 'é') == unicodedata.normalize('NFC', 'e\u0301'))|True|NFC
unicode width|East Asian width is a property of a character, and it is not the same as the number of UTF-8 bytes.|import unicodedata\nprint(unicodedata.east_asian_width('A'))|Na|code point
byte vs text|bytes are numbers from 0 to 255, and str is text, and Python refuses to mix them with +.|try:\n    print(b'a' + 'b')\nexcept TypeError:\n    print('apart')|apart|bytes
locale encoding|The locale encoding is the default some operating systems use for text, which is why explicit UTF-8 is safer.|print('utf-8')|utf-8|encoding
mojibake|Mojibake is text that was decoded with the wrong encoding, so the letters come out as the wrong characters.|print('ක'.encode('utf-8').decode('latin-1') != 'ක')|True|encoding
bom utf-8|UTF-8 may start with the bytes EF BB BF, and utf-8-sig strips that mark on read.|print('ක'.encode('utf-8-sig')[:3].hex())|efbbbf|byte order mark
ordinal plane|ord returns the code point, and chr is the inverse.|print(chr(ord('க')) == 'க')|True|code point
'''
