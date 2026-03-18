const properties = {
  server: (v: string) => v,
  token: (v: string) => v,
  last_handle: (v: string) => v,
} satisfies {
  [k in string]: (value: any) => string
}

export function setStoredProperty<T extends keyof typeof properties>(
  property: T,
  value: Parameters<typeof properties[T]>[0]
) {
  localStorage.setItem(property, properties[property](value));
}

export function getStoredProperty<T extends keyof typeof properties>(
  property: T
) {
  return localStorage.getItem(property);
}