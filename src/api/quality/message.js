import request from '@/utils/request'

// 查询公开信息完整性问题关闭列表
export function listMessage(query) {
  return request({
    url: '/quality/message/list',
    method: 'get',
    params: query
  })
}

// 查询公开信息完整性问题关闭详细
export function getMessage(id) {
  return request({
    url: '/quality/message/' + id,
    method: 'get'
  })
}

// 新增公开信息完整性问题关闭
export function addMessage(data) {
  return request({
    url: '/quality/message',
    method: 'post',
    data: data
  })
}

// 修改公开信息完整性问题关闭
export function updateMessage(data) {
  return request({
    url: '/quality/message',
    method: 'put',
    data: data
  })
}

// 删除公开信息完整性问题关闭
export function delMessage(id) {
  return request({
    url: '/quality/message/' + id,
    method: 'delete'
  })
}
