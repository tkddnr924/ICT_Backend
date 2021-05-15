const ParkHelper = require('./ParkHelper')

class ParkServices {
    constructor () {
        this.helper = new ParkHelper()
    }

    async park_car (park_seq) {
        const park = await this.helper.get_park(park_seq)

        if (park === null) return { status: false, park: null, message: "잘못된 요청입니다." }
        if (park.status === "PARK") return { status: false, park: park, message: "이미 주차된 자리입니다." }

        await this.helper.change_park_type("PARK", park_seq)
        return { status: true, park: park.id }
    }

    async empty_car (park_seq) {
        const park = await this.helper.get_park(park_seq)

        if (park === null) return { status: false, park: null, message: "잘못된 요청입니다." }
        if (park.status === "EMPTY") return { status: false, park: park, message: "이미 빈 자리입니다." }

        await this.helper.change_park_type("EMPTY", park_seq)
        return { status: true, park: park.id }
    }

    async reserve_car (park_seq, reserve) {
        const park = await this.helper.get_park(park_seq)

        if (park === null) return { status: false, park: null, message: "잘못된 요청입니다." }
        if (park.status === "RESERVE") return {status: false, park: park, message: "이미 예약된 자리입니다."}
        await this.helper.reserve_park(park_seq, reserve)

        return { status: true }
    }

    async get_reserve () {
        const result = await this.helper.get_reserve()

        if (!result.length) return { status: false, data: [] }

        return { status: true, data: result }
    }

    async get_park_status () {
        const result = await this.helper.get_status()

        return { status: true, data: result }
    }
}

module.exports = ParkServices
