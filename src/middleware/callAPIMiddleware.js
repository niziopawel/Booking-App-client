export function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const { types, callAPI, shouldCallAPI = () => true, navigate } = action;
    if (!types) {
      return next(action);
    }
    if (!Array.isArray(types) || types.length !== 3) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }

    if (!shouldCallAPI(getState())) {
      return;
    }

    const [requestType, successType, failureType] = types;

    dispatch(
      Object.assign(
        {},
        {
          type: requestType
        }
      )
    );

    return callAPI().then(
      response => {
        dispatch(
          Object.assign(
            {},
            {
              payload: response.data,
              type: successType
            }
          )
        );
        navigate();
      },
      error =>
        dispatch(
          Object.assign(
            {},
            {
              type: failureType,
              payload: error.response.data
            }
          )
        )
    );
  };
}
