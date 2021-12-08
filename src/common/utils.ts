import _ from 'lodash';

export function formatInputString(inputValue: string) {
  const val = encodeURIComponent(_.trim(inputValue));
  return val || undefined;
}

export function trimBlankToUndefined<T>(inputValue: T | T[]): T | T[] {
  if (!inputValue) {
    return inputValue;
  }

  if (_.isArray(inputValue)) {
    return inputValue.map((item: any) => {
      return trimBlankToUndefined(item);
    });
  }

  const current: any = {};
  Object.keys(inputValue).forEach((key: string) => {
    const value = inputValue[key];
    if (typeof value === 'string') {
      current[key] = formatInputString(value);
    } else {
      current[key] = value === null ? undefined : value;
    }
  });
  return current;
}
