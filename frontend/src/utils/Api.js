const { URL } = require("../../config.js");

// Make an API request to get a random quote
export const getRandomQuote = async (user_id) => {
  const response = await fetch(URL + '/get-quote', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: user_id
    })
  });
  if (response.status == 200) {
    const data = await response.json();
    if (data) {
      return data;
    }
  }
};

// Make an API request to get a specific quote
export const getSpecificQuote = async (user_id, quote) => {
  const response = await fetch(URL + '/get-specific-quote', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      quote_id: quote.quote_id
    })
  });
  if (response.status == 200) {
    const data = await response.json();
    if (data) {
      return data;
    }
  }
};

// Make an API request to add quote to user's bookmarks
export const bookmarkQuote = async (user_id, quote) => {
  try {
    const response = await fetch(URL + '/add-favorite', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id,
        quote_id: quote.quote_id
      })
    });
    return response;
  } catch (error) {
    console.log("Error in bookmarkQuote:", error);
  }
};

// Make an API request to add a comment to the quote
export const addComment = async (user_id, quote, comment) => {
  try {
    const response = await fetch(URL + '/add-comment', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id,
        quote_id: quote.quote_id,
        comment_content: comment
      })
    });
    return response;
  } catch (error) {
    console.log("Error in addComment:", error);
  }
}

// Make an API request to add a rating to the quote
export const addRating = async (user_id, quote, rating) => {
  try {
    const response = await fetch(URL + '/modify-rating', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id,
        quote_id: quote.quote_id,
        rating: rating
      })
    });
    return response;
  } catch (error) {
    console.log("Error in addRating:", error);
  }
}

// Make an API request to get user's list of bookmarks
export const getBookmarks = async (user_id) => {
  try {
    const response = await fetch(URL + '/get-favorite-quotes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id
      })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error in getBookmarks:", error);
  }
}

// Make an API request to get list of available subject options
export const getSubjectOptions = async (user_id) => {
  try {
    const response = await fetch(URL + '/get-all-tags');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error in getSubjectOptions:", error)
  }
}

// Make an API request to get list of user's saved subjects
export const getUserSubjects = async (user_id) => {
  try {
    const response = await fetch(URL + '/get-tags', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id
      })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error in getUserSubjects:", error);
  }
};

// Make an API request to add a subject to list of user's saved subjects
export const addSubjectToDatabase = async (user_id, subject) => {
  try {
    const response = await fetch(URL + '/add-tag', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id,
        tag: subject.value
      })
    });
    return response;
  } catch (error) {
    console.log("Error in addSubjectToDatabase:", error);
  }
};

// Make an API request to remove a subject from list of user's saved subjects
export const removeSubjectFromDatabase = async (user_id, subject) => {
  try {
    const response = await fetch(URL + '/remove-tag', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id,
        tag: subject.value
      })
    });
    return response;
  } catch (error) {
    console.log("Error in removeSubjectFromDatabase:", error);
  }
}

// Make an API request to add a subject to list of user's saved subjects
export const addUserToDatabase = async (user_id) => {
  try {
    const response = await fetch(URL + '/add-user', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id
      })
    });
    return response;
  } catch (error) {
    console.log("Error in addUserToDatabase:", error);
  }
};