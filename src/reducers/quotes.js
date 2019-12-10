// has an initial state of [], but when a Quote is added it should look like this (we will be using the uuid node package for generating ids):
// [
// {
//   id: '23423424242-42342423424242-fafdb',
//     content: 'One Awesome Quote',
//       author: 'Luke Ghenco'
// }
// ]
// We will also need to extend out the Quotes Reducer to handle removing quotes, upvoting quotes, and downvoting quotes as well. Check out the test specs for how to build these.


export default (state = [], action) => {
  let index;
  let quote;

  switch (action.type) {

    case 'ADD_QUOTE':
      return state.concat(action.quote);

    case 'REMOVE_QUOTE':
      return state.filter(quote => quote.id !== action.quoteId);

    case 'UPVOTE_QUOTE':
      index = state.findIndex(quote => quote.id === action.quoteId);
      quote = state[index];

      return [
        ...state.slice(0, index),
        Object.assign({}, quote, { votes: quote.votes += 1 }),
        ...state.slice(index + 1)
      ];

    case 'DOWNVOTE_QUOTE':
      index = state.findIndex(quote => quote.id === action.quoteId);
      quote = state[index];
      if (quote.votes > 0) {
        return [
          ...state.slice(0, index),
          Object.assign({}, quote, { votes: quote.votes -= 1 }),
          ...state.slice(index + 1)
        ];
      }
      return state;

    default:
      return state;
  }
}

