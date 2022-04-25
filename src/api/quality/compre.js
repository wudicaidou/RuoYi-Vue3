import request from '@/utils/request'

// 查询全面性问题关闭列表
export function listCompre(query) {
  return request({
    url: '/quality/compre/list',
    method: 'get',
    params: query
  })
}

// 查询全面性问题关闭详细
export function getCompre(id) {
  return request({
    url: '/quality/compre/' + id,
    method: 'get'
  })
}

// 新增全面性问题关闭
export function addCompre(data) {
  return request({
    url: '/quality/compre',
    method: 'post',
    data: data
  })
}

// 修改全面性问题关闭
export function updateCompre(data) {
  return request({
    url: '/quality/compre',
    method: 'put',
    data: data
  })
}

// 删除全面性问题关闭
export function delCompre(id) {
  return request({
    url: '/quality/compre/' + id,
    method: 'delete'
  })
}

// 关闭全面性问题
export function closeCompre(id) {
  return request({
    url: '/quality/compre/as-close',
    method: 'put',
    data: { ids: id }
  })
}
