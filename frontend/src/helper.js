const floors = [
  { id: 0 },
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
];

floors.reverse();

export const removeItem = (data, id, direction) => {
    return data.filter((item) => {
      if (item.id === id && item.direction === direction) {
        return false;
      } else {
        return true;
      }
    });
  };

export  const findAndRemoveByIndex = (arr, value) => {
    if (arr.indexOf(value) !== -1) {
      arr.splice(arr.indexOf(value), true);
    }
    return arr;
  };

export const isItemExits = (data, id, direction) => {
    return data.filter((item) => {
      if (item.id === id && item.direction === direction) {
        return true;
      } else {
        return false;
      }
    }).length;
  };

export const isRequestIdExists = (id, requests) => {
    return requests.map((request) => request.id).indexOf(id) > -1;
  };


export { floors };
