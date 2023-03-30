import type { RouteMeta } from 'vue-router'

export function useRouteMeta(options?: RouteMeta) {
  const { transition = 'fade', usePathKey = true, ...rest } = options ?? {}
  return {
    transition,
    usePathKey,
    ...rest,
  }
}
