import axios from "axios";

export const axiosApi = async (req) => {
  try {
    const response = await axios({
      method: req?.method || 'GET',
      url: req.url,
      data: req.data,
      params: req.params,
      headers: {
        'Content-Type': 'application/json',
        ...req.headers
      }
    })
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}