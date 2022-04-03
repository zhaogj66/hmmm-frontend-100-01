/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:53:23
 *
 * 学科有关的接口：自己写吧~~  已经被张老师删了 ^_^
 */
import { createAPI } from '@/utils/request'

// 学科列表
export const list = data => createAPI('/subjects', 'get', data)

// 学科简单列表
export const simple = data => createAPI('/subjects/simple', 'get', data)

// 学科详情
export const detail = data => createAPI(`/subjects/${data.id}`, 'get', data)

// 学科添加
export const add = data => createAPI('/subjects', 'post', data)

// 学科修改
export const update = data => createAPI(`/subjects/${data.id}`, 'put', data)

// 学科删除
export const remove = data => createAPI(`/subjects/${data.id}`, 'delete', data)
