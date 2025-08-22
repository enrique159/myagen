export const mapObjectsFilters = <T extends Record<string, unknown>>(
  object: T,
) => {
  return Object.fromEntries(
    Object.entries(object).filter(
      ([_, value]) => value !== '' && value !== null,
    ),
  ) as Partial<T>
}
