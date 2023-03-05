def construct_tag_list(rows):
    tags = []
    for row in rows:
        tags.append({"key": row[0], "value": row[1]})
    return tags

def construct_quote_list(rows):
    quotes = []
    for row in rows:
        quotes.append(construct_quote_json(row))
    
    return quotes

def construct_quote_json(row):
    quote = {
        "quote_id": row[0],
        "quote_content": row[1],
        "author": row[2],
        "rating": row[3],
        "tag": row[4]
    }
    return quote

def construct_comment_json(rows):
    comments = []
    for comment in rows:
        comments.append({"user_id": comment[0], "comment_content": comment[1]})

    return comments