import { DAYS, MONTHS, get_cookie } from './util.js'

const VIEWSTATE = parseInt(get_cookie('viewstate')) || 640

const svg = document.getElementById('svg')

// Set dimensions
/*document.documentElement.style.width = VIEWSTATE + 'px'
document.documentElement.style.height = VIEWSTATE + 'px'*/
document.body.style.width = VIEWSTATE + 'px'
document.body.style.height = VIEWSTATE + 'px'
svg.setAttribute('width', VIEWSTATE)
svg.setAttribute('height', VIEWSTATE)

// Temps update
window.nzxt = {
    v1: {
        onMonitoringDataUpdate: (data) => {
            const { cpus, gpus, ram } = data // https://github.com/NZXTCorp/web-integrations-types/blob/main/v1/index.d.ts
            update_cpu(cpus[0].temperature)
            update_gpu(gpus[0].temperature)
        }
    }
}

const cpu_temp = document.getElementById('cpu_temp')

function update_cpu (temp) {
    cpu_temp.innerText = `${Math.round(temp)}°C`

}

const gpu_temp = document.getElementById('gpu_temp')

function update_gpu (temp) {
    gpu_temp.innerText = `${Math.round(temp)}°C`
}

// Rainbow
function draw_rainbow (width, start_x, start_y, end_x, end_y) {
    const hw = width / 2
    const o = end_y - start_y
    const a = start_x - end_x
    const h = Math.sqrt(o ** 2 + a ** 2)
    const angle_1 = Math.PI / 2 + Math.asin(o / h)
    const angle_2 = angle_1 + Math.PI
    const angle_3 = angle_1 + Math.PI / 2

    const x1 = start_x + hw * Math.cos(angle_1)
    const y1 = start_y - hw * Math.sin(angle_1)
    const x2 = end_x + hw * Math.cos(angle_3) + hw * Math.cos(angle_1)
    const y2 = end_y - hw * Math.sin(angle_3) - hw * Math.sin(angle_1)

    // Clip Path
    document.getElementById('clip_path').setAttribute('d', `
    M ${x1}, ${y1}
    L ${end_x + hw * Math.cos(angle_1)}, ${end_y - hw * Math.sin(angle_1)}
    A ${hw}, ${hw} 0, 0, 0 ${end_x + hw * Math.cos(angle_2)}, ${end_y - hw * Math.sin(angle_2)}
    L ${start_x + hw * Math.cos(angle_2)}, ${start_y - hw * Math.sin(angle_2)}
    Z`)

    // Rays
    for (let i of [0, 1, 2, 3]) {
        const offset = width / 8 + width / 4 * i
        set_ray(`ray_${i + 1}`, x1 + offset * Math.cos(angle_2), y1 - offset * Math.sin(angle_2), x2 + offset * Math.cos(angle_2), y2 - offset * Math.sin(angle_2), width / 4)
    }

    // Date (follow the rainbow)
    const dist = hw + 2 // We add the distance to the rainbow bottom to the rainbow half width
    document.getElementById('date_path').setAttribute('d', `
    M ${end_x + dist * Math.cos(angle_2)}, ${end_y - dist * Math.sin(angle_2)}
    L ${start_x + dist * Math.cos(angle_2)}, ${start_y - dist * Math.sin(angle_2)}`)
}

function set_ray (name, start_x, start_y, end_x, end_y, width) {
    const ray = document.getElementById(name)
    ray.setAttribute('x1', start_x)
    ray.setAttribute('y1', start_y)
    ray.setAttribute('x2', end_x)
    ray.setAttribute('y2', end_y)
    ray.setAttribute('stroke-width', width)
}

draw_rainbow(30, 100, 0, 50, 50)


// Date
const YEAR_OFFSET = 300

function update_date () {
    const now = new Date()
    document.getElementById('date').innerHTML = `${DAYS[now.getDay()]} ${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear() + YEAR_OFFSET} CE`
    const tomorrow = new Date()
    tomorrow.setHours(24, 0, 0, 0)
    setTimeout(update_date, tomorrow - now)
}

update_date()