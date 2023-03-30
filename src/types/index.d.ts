import 'vue-router';

declare module 'vue-router' {
    interface RouteMeta {
        usePathKey?: boolean
        transition?: string
    }
}
