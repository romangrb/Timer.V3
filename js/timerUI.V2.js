(function ($) {
  
  var manipCtrl = $('#submit, #timer, #stopwatch, #countdown, #num'),
  timeStatusTXT = $('#timeStatus'),
  timerName = $('#timerName'),
  timeOutputMM = $('#timeOutputMM'),
  timeOutputSS = $('#timeOutputSS'),
  timeOutputMS = $('#timeOutputMS');
      
  regExp = /(^[0]{1}$)|(^[\s]{1}$)|(^[1-9]{1}[0-9]{1,}$)|(^[1-9]{0,}$)/;
  $('#stopwatch, #countdown').on('click change submit', function () {
    if ($(this).prop('checked') != false) {
      $('#num, #numlabel').css('display', 'block');
    }
  });
  $('#timer').on('click change submit', function () {
    if ($(this).prop('checked') != false) {
      $('#num, #numlabel').css('display', 'none');
    }
  });
  $('#cancel').on('click submit', function () {
    manipCtrl.prop('disabled', false);
    timeOutputMM.text('00');
    timeOutputSS.text('00');
    timeOutputMS.text('000');
  });
  $('#submit').on('click submit', function () {
    manipCtrl.prop('disabled', true);
    var valInput = $('#num').val();
    if (!regExp.test(valInput)) {
      timeStatusTXT.text('set time in digit');
      manipCtrl.prop('disabled', false);
      return;
    };
    if ($('#timer').prop('checked') != false) {
      var timer = new Timer();
      timerName.text('Timer');
    };
    if ($('#stopwatch').prop('checked') != false) {
      if (valInput != 0) {
        var timer = new StopwatchTimer(valInput);
        timerName.text('Stopwatch Timer');
      } else {
        cancelTriger();
        return;
      }
    };
    if ($('#countdown').prop('checked') != false) {
      if (valInput != 0) {
        var timer = new CountdownTimer(valInput);
        timerName.text('Countdown Timer');
      } else {
        cancelTriger();
        return;
      }
    };
    var fieldOutput = $('#timeOutput');
    var cycleIndex;
    (function () {
      var cicle = arguments.callee;
      cycleIndex = setTimeout(function () {
        timeOutputMM.text(formatTimeMM(timer.getTime()));
        timeOutputSS.text(formatTimeSS(timer.getTime()));
        timeOutputMS.text(formatTimeMS(timer.getTime()));
        fieldOutput.text();        
        cicle()
      }, 10)
    }) ();
    $('#continue').on('click submit', function () {
      timeStatusTXT.text('resuming..');
      timer.resume();
    });
    $('#pause').on('click submit', function () {
      timer.pause();
      timeStatusTXT.text('paused..');
    });
    $('#reset').on('click submit', function () {
      timer.reset();
      timeStatusTXT.text('reseted..');
    });
    $('#cancel').on('click submit', function () {
      timer.reset();
      clearTimeout(cycleIndex);
      timerName.text('Timer');
      timeStatusTXT.text('ready');
    });
  });
  
  function formatTimeMM (duration) {   
    var mm = parseInt((duration / (1000*60)) % 60),
    minutes = (mm < 10) ? '0' + mm : mm;   
    return minutes;
  };
  
  function formatTimeSS (duration) {   
    var ss = parseInt((duration / 1000)%60),      
    seconds = (ss < 10) ? '0' + ss : ss;    
    return seconds;
  };
  
  function formatTimeMS (duration) {
    var ms = parseInt(duration)%1000,    
    milliseconds = (ms < 10) ? '00' + ms : (ms < 100)?'0'+ms:ms;
    return milliseconds;
  };
 
  
  function cancelTriger() {
    manipCtrl.prop('disabled', false);
    timeStatusTXT.text('please set time more than 0');
    timerName.text('Timer');
  };
}) (jQuery);
