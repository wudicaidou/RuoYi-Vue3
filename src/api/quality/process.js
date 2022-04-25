import request from '@/utils/request'

// 查询业务流程完整性问题修复列表
export function listProcess(query) {
  return request({
    url: '/quality/process/list',
    method: 'get',
    params: query
  })
}

// 查询业务流程完整性问题修复详细
export function getProcess(id) {
  return request({
    url: '/quality/process/' + id,
    method: 'get'
  })
}

// 新增业务流程完整性问题修复
export function addProcess(data) {
  return request({
    url: '/quality/process',
    method: 'post',
    data: data
  })
}

// 修改业务流程完整性问题修复
export function updateProcess(data) {
  return request({
    url: '/quality/process',
    method: 'put',
    data: data
  })
}

// 删除业务流程完整性问题修复
export function delProcess(id) {
  return request({
    url: '/quality/process/' + id,
    method: 'delete'
  })
}
