import Bscroll from 'better-scroll'
import http from 'utils/http'
import {
  Toast
} from 'mint-ui'
export const scroll = ({
  el,
  data,
  vm,
}) => {
  let count = 8;
  //声明bscroll
  let bscroll = new Bscroll(el, {
    probeType: 1,
    click: true,
    pullUpLoad: {
      threshold: 50
    }
  })
  //监听 pullingUp 触发加载更多
  bscroll.on('pullingUp', async () => {
   
    let result = await http({
      method: 'get',
      url: "/restapi/shopping/v3/restaurants?latitude=31.230378&longitude=121.473657&offset=" + count + "&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=793f4acf7cdf43d5b9d12c8751eb8952&terminal=h5"
    })
    if (!!result) {
      console.log(6666)
      console.log(data)
      data.push(...result.items);
      console.log(data);
       
      vm.$nextTick(() => {
         bscroll.refresh()
         vm.$forceUpdate();
         count += 8
         bscroll.finishPullUp()
       }
       )
    } else {
      Toast({
        message: '到底了~',
        position: 'bottom',
        duration: 1000
      })
    }
  })
}