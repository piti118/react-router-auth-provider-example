// @flow

import axios from 'axios'
import type { AxiosPromise } from 'axios'

export function login(username:string, password:string): AxiosPromise<any>{
  return axios.post('/api/login',{username, password})
}

export function whoami(): AxiosPromise<any> {
  return axios.get('/api/whoami')
}

export function logout(): AxiosPromise<any> {
  return axios.get('/api/logout')
}