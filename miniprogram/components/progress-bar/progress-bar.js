// components/progress-bar/progress.js
let movableAreaWidth=0
let movableViewWidth=0
const backgroundAudioManager=wx.getBackgroundAudioManager()
let currentSec=-1
let duation=0
let isMoving=false
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    showTime:{
      currentTime:'00:00',
      totalTime:'00:00',
    },
    distance:0,
    progress:0,
  },
  lifetimes:{
    ready(){
      this._bindBGMEvent()
      this._getDistance()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event){
      if(event.detail.source=='touch'){
        this.data.progress=event.detail.x/(movableAreaWidth-movableViewWidth)*100
        this.data.distance=event.detail.x
        isMoving=true
      }
    },
    onTouchEnd(){
      const currentTimeFmt=this._timeFormat(Math.floor(backgroundAudioManager.currentTime))
      this.setData({
        distance:this.data.distance,
        progress:this.data.progress,
        ['showTime.currentTime']:currentTimeFmt.min+':'+currentTimeFmt.sec
      })
      backgroundAudioManager.seek(duation*this.data.progress/100)
      isMoving=false
    },
    _getDistance(){
      const query=this.createSelectorQuery()
      query.select('.movable-area').boundingClientRect()
      query.select('.movable-view').boundingClientRect()
      query.exec((rect)=>{
        console.log(rect)
        movableAreaWidth=rect[0].width
        movableViewWidth=rect[1].width
      })
    },
    _bindBGMEvent(){
      backgroundAudioManager.onPlay(()=>{
        console.log('onPlay')
      })
      backgroundAudioManager.onStop(()=>{
        console.log('onStop')
      })
      backgroundAudioManager.onPause(()=>{
        console.log('onPause')
      })
      backgroundAudioManager.onWaiting(()=>{
        console.log('onWaiting')
      })
      backgroundAudioManager.onCanplay(()=>{
        console.log('onCanplay')
        console.log(`歌曲的总时长:${backgroundAudioManager.duration}`)
        let duation=backgroundAudioManager.duration
        if(typeof duation!='undefined'){
          this._setTotalTime()
        }else{
          setTimeout(() => {
            this._setTotalTime()
          },1000);
        }
      })
      backgroundAudioManager.onTimeUpdate(()=>{
        if(!isMoving){
          console.log('onTimeUpdate')
          const duration=backgroundAudioManager.duration
          const currentTime=backgroundAudioManager.currentTime
          const currentTimeFmt=this._timeFormat(currentTime)
          const sec=currentTime.toString().split('.')[0]
          if(sec!=currentSec){
            const currentTimeFmt=this._timeFormat(currentTime)
            this.setData({
              distance:(movableAreaWidth-movableViewWidth)*currentTime/duration*1,
              progress:currentTime/duration*100,
              ['showTime.currentTime']:`${currentTimeFmt.min}:${currentTimeFmt.sec}`
            })
            currentSec=sec
          }
        }
      })
      backgroundAudioManager.onEnded(()=>{
        console.log('onEnded')
        this.triggerEvent('musicEnd')
      })
      backgroundAudioManager.onError((res)=>{
        console.log('onEnded')
        wx.showToast({
          title: '发生错误'+res.errMsg,
        })
      })
    },
    _setTotalTime(){
      duation=backgroundAudioManager.duration
      const duationFmt=this._timeFormat(duation)
      this.setData({
        ['showTime.totalTime']:`${duationFmt.min}:${duationFmt.sec}`
      })
    },
    _timeFormat(sec){
      const min=Math.floor(sec/60)
      sec=Math.floor(sec%60)
      return{
        'min':this._fillZero(min),
        'sec':this._fillZero(sec),
      }
    },
    _fillZero(num){
      return num<10?'0'+num:num
    }
  }
})
