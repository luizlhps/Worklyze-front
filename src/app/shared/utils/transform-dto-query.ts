export function transformDtoQuery(dto: any) {
  if (!dto) return '';

  const query = recursiveQuery(dto);
  const queryHandled = '?' + query.slice(0, query.length - 1);

  return queryHandled;
}

function recursiveQuery(dto: any, path = '') {
  let query = '';

  Object.entries(dto).map(([key, value], i, arr) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const newPath = path + key + '.';
      query += recursiveQuery(value, newPath);
    } else if (value) {
      query += `${path}${key}=${value}&`;
    }
  });

  return query;
}
