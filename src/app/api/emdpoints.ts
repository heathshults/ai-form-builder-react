export const fetchopts = {
  baseURL: `${process.env.API_BASE_URL}${process.env.API_PORT}`,
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization: `Bearer ${process.env.API_AUTH_TOKEN}`,
  'Api-Key': process.env.API_KEY
}
const apiurl = `${process.env.API_BASE_URL}${process.env.API_PORT}${process.env.API_PATH}`;


export const endpoints = {
  baseUrl: apiurl,
  hero: '/pages/home',
  aboutMe: '/pages/aboutme',
  quote: '/componentData/quotes',
  whatIDo: '/pages/whatido',
  portfolio: '/pages/portfolio',
  gallery: '/gallery',
  myResume: '/pages/resume',
  resumeData: '/componentData/resumedata',
  counter: '/componentData/counterdata',
  blog: '/pages/blogpage',
  comments: '/componentData/comments',
  contactMe: '/pages/contactpage',
  navigationBar: '/componentData/navbar',
  footer: '/componentData/footer',
  mysocialmedia: '/componentData/mysocialmedia',
  socialmedia: '/componentData/socialmediaicons',
};

export default endpoints