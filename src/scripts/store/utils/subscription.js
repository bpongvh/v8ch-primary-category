export function updateList(current, updated) {
  const shouldUpdate = current && current.length !== updated.length;
  return shouldUpdate ? updated : current;
}

export function updateValue(current, updated) {
  const shouldUpdate = current && current !== updated;
  return shouldUpdate ? updated : current;
}
