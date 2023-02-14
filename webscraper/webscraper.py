from bs4 import BeautifulSoup
import requests
from csv import writer
NUM_PAGES = 3

# Store user input as tag to search
tag = input("Enter tag: ")

# Open file
with open("../csv/" + tag + ".csv", "w", encoding="utf8") as file:

    # Initialize writer
    writer = writer(file)

    # Write header
    header = ["Quote", "Author"]
    writer.writerow(header)

    # Loop through number of pages
    for page_num in range(1, NUM_PAGES+1):

        # Arrays to hold quotes and authors
        quotes_text = []
        authors = []

        # Store the URL as a string
        url = "http://goodreads.com/quotes/tag/" + str(tag) + "?page=" + str(page_num)

        # Store the target webpage as a variable
        page = requests.get(url)

        # Store the webpage html as a variable
        soup = BeautifulSoup(page.text, "html.parser")

        # List of quotes
        quotes = soup.findAll("div", attrs={"class":"quoteText"})

        # Parse list of quotes per page
        for quote in quotes:

            # Count number of <br> tags
            num_br = len(quote.find_all("br"))

            # Only add quote if number of <br> tags is 1 or less
            if num_br <= 1:

                # Add quote text and author to arrays
                quotes_text.append(quote.find(string=True, recursive=False).strip())
                authors.append(quote.find("span", attrs={"class":"authorOrTitle"}).find(string=True).strip().rstrip(","))

        # Write quote followed by author
        for quote, author in zip(quotes_text, authors):
            line = [quote, author]
            writer.writerow(line)
            