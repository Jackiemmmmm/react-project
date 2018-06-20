const identity = x => x;
const getUndefined = () => {};
const filter = () => true;
const createRavenMiddleware = (Raven, options = {}) => {
  const {
    breadcrumbDataFromAction = getUndefined,
    actionTransformer = identity,
    stateTransformer = identity,
    breadcrumbCategory = 'redux-action',
    filterBreadcrumbActions = filter,
  } = options;

  return (store) => {
    let lastAction;

    Raven.setDataCallback((data, original) => {
      const nData = data;
      nData.extra.lastAction = actionTransformer(lastAction);
      nData.extra.state = stateTransformer(store.getState());
      return original ? original(nData) : nData;
    });

    return next => (action) => {
      if (filterBreadcrumbActions(action)) {
        Raven.captureBreadcrumb({
          category: breadcrumbCategory,
          message: action.type,
          data: breadcrumbDataFromAction(action),
        });
      }

      lastAction = action;
      return next(action);
    };
  };
};

export default createRavenMiddleware;
