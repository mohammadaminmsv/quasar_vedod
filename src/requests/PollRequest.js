import { axiosApi } from "src/axios/axiosApi";

export const getPolls = async(poll_id)=>{
try {
    const users = await axiosApi({
      method: 'GET',
      url: `https://api.strawpoll.com/v3/polls/${poll_id}`,
    headers : {
        'X-API-Key': 'd53a23c6-cc51-11f0-b023-6a2c8e717338',
    }
    })
    console.log(users)
    return users
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
}

export const postPolls = async(poll_id , option_id)=>{
try {
    const users = await axiosApi({
      method: 'POST',
      url: `https://api.strawpoll.com/v3/polls/${poll_id}/vote`,
      data: {
        "poll_options" : [option_id]
      },
    headers : {
        'X-API-Key': 'd53a23c6-cc51-11f0-b023-6a2c8e717338',
    }
    })
    console.log(users)
    return users
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
}
export const postRes = async(poll_id)=>{
try {
    const users = await axiosApi({
      method: 'GET',
      url: `https://api.strawpoll.com/v3/polls/${poll_id}/results`,
    headers : {
        'X-API-Key': 'd53a23c6-cc51-11f0-b023-6a2c8e717338',
    }
    })
    console.log(users)
    return users
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
}