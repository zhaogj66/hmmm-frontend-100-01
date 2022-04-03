/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:57:26
 *
 * 标签有关的接口：自己写吧~~  已经被张老师删了 ^_^
 */
import { createAPI } from '@/utils/request'

// 标签列表
export const tagList = data => createAPI('/tags', 'get', data)

// 标签简单列表
export const simple = data => createAPI('/tags/simple', 'get', data)

// 标签详情
export const detail = data => createAPI(`/tags/${data.id}`, 'get', data)

// 标签添加
export const add = data => createAPI('/tags', 'post', data)

// 标签修改
export const update = data => createAPI(`/tags/${data.id}`, 'put', data)

// 标签删除
export const remove = data => createAPI(`/tags/${data.id}`, 'delete', data)

// 标签状态
export const changeState = data => createAPI(`/tags/${data.id}/${data.state}`, 'post', data)
