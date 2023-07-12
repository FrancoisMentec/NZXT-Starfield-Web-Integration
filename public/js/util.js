export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export function get_cookie (cookie_name) {
    const cookies = document.cookie.split(';')
    for (let cookie of cookies) {
        cookie = cookie.trim()
        if (cookie.length > 0) {
            let name, value;
            [name, value] = cookie.split('=')
            if (name === cookie_name) return value
        }
    }
    return null
}

export function th (number) {
    let res = number
    if (number % 10 === 1) res += 'st'
    else if (number % 10 === 2) res += 'nd'
    else if (number % 10 === 3) res += 'rd'
    else res += 'th'
    return res
}