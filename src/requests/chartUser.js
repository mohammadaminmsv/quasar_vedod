import { axiosApi } from "src/axios/axiosApi";

export const getUserForCharts = async(total)=>{
try {
    const users = await axiosApi({
      method: 'GET',
      url: 'https://dummyjson.com/users',
      params : { limit: total }
    })
    console.log(users)
    return users
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
}