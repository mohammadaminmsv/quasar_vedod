import { axiosApi } from "src/axios/axiosApi";

export const getRainForCharts = async(from , to)=>{
try {
    const users = await axiosApi({
      method: 'GET',
      url: 'https://meteostat.p.rapidapi.com/stations/daily',
       params: {
      station: '40754',    
      start: from,
      end: to
    },
    headers : {
        'X-RapidAPI-Key': 'a6efce2dc3mshc0689afc1452b0fp1e06fbjsne14817c90e27',
      'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
    }
    })
    console.log(users)
    return users
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
}