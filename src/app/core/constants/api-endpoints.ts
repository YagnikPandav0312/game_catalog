export const API = {
    sport_api: {
        get_sport: '/sport/get_sport'
    },
    player_api: {
        register: '/player/register',
        login: '/player/login',
        profile: '/player/me',
        logout: '/player/logout'
    },
    recent_games: {
        save_history: '/recent-game/save_history',
        get_recent_games: '/recent-game/recent_games',
        get_recommendations: '/recent-game/recommendations'
    },
    games_api: {
        get_games: '/games/get_games'
    },
    providers_api: {
        get_providers: '/providers/get_providers'
    },
    categories_api: {
        get_categories: '/categories/get_categories'
    },
    country_api: {
        get_country_ddl: '/country/get_country_ddl'
    }
}