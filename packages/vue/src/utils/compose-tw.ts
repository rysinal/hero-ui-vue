export function composeTwClasses(
  userClass: string | undefined,
  variantClass: string | undefined,
): string {
  if (!userClass && !variantClass) return ''
  if (!userClass) return variantClass || ''
  if (!variantClass) return userClass
  return `${variantClass} ${userClass}`
}
