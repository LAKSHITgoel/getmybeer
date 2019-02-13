import axios from "axios";

const rootURL = "https://api.punkapi.com/v2";

export default class BeerAPI {
  static async getBeer(page) {
    let res = await axios.get(`${rootURL}/beers?page=${page}&per_page=20`);
    let data = res.data.map(obj => ({...obj,fav:false}));
    return data;
    // .then(res => res.data)
    // .then(data => {
    //   data.map(obj => {
    //     return (obj.fav = false);
    //   });
    //   //return data
    //   return data;
    // });
  }
}
