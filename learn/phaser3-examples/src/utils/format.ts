export function firstUpCase(str: string) {
  return str.replace(/^\S/, function (s) {
    return s.toUpperCase()
  })
}
