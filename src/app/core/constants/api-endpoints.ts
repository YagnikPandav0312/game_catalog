export const API = {
    home_api: {
        get_casino_home: '/casino/get_casino_home',
        get_sport_home: '/sport/get_sport_home'
    },
    player_api: {
        register: '/player/register',
        login: '/player/login',
        profile: '/player/me',
        logout: '/player/logout'
    },
    games_api: {
        get_games: '/games/getGames'
    },
    providers_api: {
        get_providers: '/providers/getProviders'
    },
    categories_api: {
        get_categories: '/categories/getCategories'
    },
    filters_api: {
        get_filters: '/filters/filters'
    }
}