# Amazon_Web_Scrapping_ETL_EDA
 Embark on an engaging project that seamlessly combines the thrill of gaming with the tech-driven realms of web scraping, ETL (Extract, Transform, Load), and insightful exploratory data analysis (EDA). Dive into the Amazon ecosystem as you leverage these techniques to uncover hidden gems, transform raw data into meaningful insights, and create an immersive experience at the intersection of data exploration.



# Web Scraping with Beautiful Soup
# Data Visulizations with Plotly.js

Hey, Welcome to 'Amazon Dashboard,' where we bring together the forces of web scraping, Plotly, and a Flask-powered API to create an immersive data visualization experience. Uncover patterns, manipulate data, and interact with insights in real-time.


![Alt text](images/1_team.jpeg)


### Introduction 

As a global e-commerce giant and digital services provider, Amazon complements the tech experiences offered by both Samsung and iPhone.Together, the dynamic trio of Samsung, iPhone, and Amazon creates a seamless, interconnected digital experience. From the latest smartphones to smart home integration and effortless online shopping, this collaboration defines the modern intersection of technology and convenience.


![Alt text](images/2_amazon_logo.png)


This ETL process for 'Amazon ETL & Visualizations' break into three deliverables.

Deliverable 1: Web Scaping Using Beautiful Soup.

Deliverable 2: Data Cleaning Using Jupyter Notebook.

Deliverable 3: Data Visualizations Using Plotly.js


![Alt text](images/3_deliverables.jpg)



# Deliverable 1: Web Scaping Using Beautiful Soup

Hey, let's explore the data with web scrapping and analyze the data using Beautiful soup and Pandas Python Data Analysis.


![Alt text](images/4_webscraping.png)


### 1.1 Prerequisites

Before you begin, ensure you have the following installed:

Python 3.6 or higher

Beautiful Soup 4

Requests (for making HTTP requests)

Pandas (for data analysis)

### 1.2 Data Sources

We scrape data from the Amazon Website URLs for Apple & Samsung Smart Phones:

![Alt text](images/5_webscrap_data_scources.png)

The structre of the Webpages can view here: 


[Product Details](https://www.amazon.ca/Apple-iPhone-14-Pro-Max/dp/B0BN94DL3R/ref=sr_1_2?crid=T250NW0QDQDB&keywords=iphone%2B14%2Bpro%2Bmax&qid=1702312056&sprefix=%2Caps%2C81&sr=8-2&th=1)


![Alt text](images/6_details_structure.png)


[Customer Reviews](https://www.amazon.ca/Apple-iPhone-14-Pro-Max/dp/B0BN94DL3R/ref=sr_1_2?crid=T250NW0QDQDB&keywords=iphone%2B14%2Bpro%2Bmax&qid=1702312056&sprefix=%2Caps%2C81&sr=8-2&th=1#customerReviews)


![Alt text](images/7_customer_reviews_structure.png)


### 1.3 How We Extracted and Stored Data  

Defines a list of URLs for iPhone and Samsung products on Amazon.


Defines a function scrape_amazon_product to extract relevant information from Amazon product pages using BeautifulSoup and requests.

The function extracts product title, price, star ratings, number of global ratings, customer stars percentages, and features and ratings.

It also contains a function extract_model_number to extract the model number from the product title.

The script showcases a systematic approach to web scraping.


![Alt text](images/8_amazon_function.png)


Defines dictionaries 'iphone_scraped_data' and 'samsung_scraped_data' to store scraped data for iPhone & Samsung products.

Loops through each brand's URLs, calls the scrape_amazon_product function, and stores the scraped data in the dictionaries. Saves the scraped data to JSON and CSV files.

Creates DataFrames 'scraped_iphone_df' and 'scraped_samsung_df' from the scraped data. Splits the 'title' column into multiple columns based on commas. Saves the modified DataFrames to CSV files.


![Alt text](images/9_scraped_iphone_df.png)


![Alt text](images/10_scraped_samsung_df.png)































# Deliverable 2: Load the Data to Postgres Database




## Authors


## [Maira Syed GitHub](https://github.com/mairasyed)

## [Aruna  Venkatachalam GitHub](https://github.com/arunavenkatachalam)

## [Jalees Moeen GitHub](https://github.com/JaleesMoeen)