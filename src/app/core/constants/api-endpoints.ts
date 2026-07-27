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
    recent_games: {
        save_history: '/recent-game/save_history',
        get_recent_games: '/recent-game/recent_games'
    }
}