import { combineReducers } from 'redux'
import { apiRequestInitState, apiRequestInit } from './helpers'
import { REQUEST_GET_MY_TRENDING_DISCUSSIONS,
  SUCCESS_GET_MY_TRENDING_DISCUSSIONS,
  FAILURE_GET_MY_TRENDING_DISCUSSIONS,
  REQUEST_DASH_USER_INFO,
  SUCCESS_DASH_USER_INFO,
  FAILURE_DASH_USER_INFO,
  REQUEST_DASH_USERS_RANK,
  SUCCESS_DASH_USERS_RANK,
  FAILURE_DASH_USERS_RANK } from '../actions/dashAction'

function myTrendingDiscussions(state = apiRequestInitState, action) {
  return apiRequestInit(state, action, REQUEST_GET_MY_TRENDING_DISCUSSIONS, SUCCESS_GET_MY_TRENDING_DISCUSSIONS, FAILURE_GET_MY_TRENDING_DISCUSSIONS)
}

function dashUserInfo(state = apiRequestInitState, action) {
  return apiRequestInit(state, action, REQUEST_DASH_USER_INFO, SUCCESS_DASH_USER_INFO, FAILURE_DASH_USER_INFO)
}

function dashUsersRank(state = apiRequestInitState, action) {
  return apiRequestInit(state, action, REQUEST_DASH_USERS_RANK, SUCCESS_DASH_USERS_RANK, FAILURE_DASH_USERS_RANK)
}

export let dash = combineReducers({
  myTrendingDiscussions,
  dashUserInfo,
  dashUsersRank
})