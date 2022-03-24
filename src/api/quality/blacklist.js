import request from '@/utils/request'

// 查询测试数据黑名单列表
export function listBlacklist(query) {
  return request({
    url: '/quality/blacklist/list',
    method: 'get',
    params: query
  })
}

// 查询测试数据黑名单详细
export function getBlacklist(id) {
  return request({
    url: '/quality/blacklist/' + id,
    method: 'get'
  })
}

// 新增测试数据黑名单
export function addBlacklist(data) {
  return request({
    url: '/quality/blacklist',
    method: 'post',
    data: data
  })
}

// 修改测试数据黑名单
export function updateBlacklist(data) {
  return request({
    url: '/quality/blacklist',
    method: 'put',
    data: data
  })
}

// 删除测试数据黑名单
export function delBlacklist(id) {
  return request({
    url: '/quality/blacklist/' + id,
    method: 'delete'
  })
}


// 排除测试数据
export function excludeBlacklist() {
  return request({
    url: '/quality/blacklist/exclude',
    method: 'put',
    data: {}
  })
}
