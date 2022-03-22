import request from '@/utils/request'

// 重跑数据
export function reRunData(data) {
    return request({
        url: '/quality/comprehensive',
        method: 'post',
        data: data
    })
}