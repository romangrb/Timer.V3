var Timer = function () { 
  this.curTime=new Date();
  this.remain=0;
  this.isPaused=false; 
  this.getTime = function () {
    var date;
    if (this.isPaused) {
      date = this.remain;
    } else {
      date = new Date() - this.curTime;
    }
    return date;
  }
};
var CountdownTimer = function (ms){ 
  this.curTime=new Date();
  this.setInitTime = new Date().setTime(ms);
  this.remain=0;
  this.isPaused = false;
  this.getTime = function () {
    var date;    
    if (this.isPaused) {
      date = this.setInitTime-this.remain;
    } else {
      date = this.setInitTime-(new Date()-this.curTime);     
    }
    if (date>0){
      return date;      
    }else{
      return 0;     
    }    
  }
};
var StopwatchTimer = function (ms){ 
  this.curTime=new Date();
  this.ceilTime = new Date().setTime(ms);
  this.isPaused = false;
  this.getTime = function () {
    var date;    
    if (this.isPaused) {      
      date = this.remain;      
    } else {
      date = new Date()-this.curTime;     
    }
    if (date<=this.ceilTime){
      return date;      
    }else{    
      return this.ceilTime;     
    }    
  }
};
var timeMethods = {  
  reset: function () {
    this.curTime=new Date();
    this.remain = 0;
  },
  resume: function () {
    if (this.isPaused) {
      this.isPaused = false;
      this.curTime = new Date() - this.remain;
    }
  },
  pause: function () {
    if (!this.isPaused) {
      this.remain = new Date() - this.curTime;
      this.curTime = this.remain;
      this.isPaused = true;
    }
  }
};
  Timer.prototype = timeMethods;
  CountdownTimer.prototype = timeMethods;
  StopwatchTimer.prototype = timeMethods;