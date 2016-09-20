/*
 * @Author: star 
 * @Date: 2016-09-18 22:06:54 
 * @Last Modified by: star
 * @Last Modified time: 2016-09-18 23:24:14
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define('jlauweather', ['jquery'], factory);
  } else {
    factory(jQuery);
  }
} (function ($) {
  'use strict';

  $.fn.extend({
    jlauweather: function (options) {
      var element = this;
      options = $.extend(true, {}, $.jlauweather.options, options);
      $(element)
        .empty()
        .append($.jlauweather.generateHtml(options.data));

      $('.btn-switch').on('click',function(){
        alert('switch city');
        //$('#m_date').css("display",'block');
      });

      $('.calendar').on('click',function(){
        //alert('calendar');
        
        $('#m_date').css('display',''); 
      });
      return $.fn.jlauweather;
    }
  });

  $.extend({
    jlauweather: {
      options: {
        data: {
          bgImgUrl: '',
          city: '',
          airQuality: '',
          weatherImg: '',
          temperature: '',
          lunarTerm: '',
          date: new Date(),
          remark: ''
        },
        weatherHtmlTemplate: '<div class="overview" style="background-image:url({{bgImgUrl}})"><div class="head"><div><p>{{city}}<span class="btn-switch">【切换】</span></p><p>空气质量&nbsp;&nbsp;<i>{{airQuality}}</i></p></div><img src="{{weatherImg}}"/><span class="weather">{{temperature}}</span></div><div class="detail"><span class="remark">{{lunarTerm}}</span><div class="content"><p>{{day}}</p><i>{{week}}</i></div><i>{{month}}</i><span class="calendar">万年历</span></div><div class="notice"><p class="notice_title">【农事提醒】</p><p class="notice_content">{{remark}}</p></div></div><div></div></div>'
      },
      generateHtml: function (data) {
        var html = this.options.weatherHtmlTemplate,
          date = data.date,
          weeks = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
          allKey;
        data.day = date.getDate();
        data.week = weeks[date.getDay()];
        data.month = date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
        allKey = Object.keys(data);
        allKey.forEach(function(value){
          html = html.replace('{{'+value+'}}' ,data[value])
        })
        return html;
      },
      update: function(data){
        return this.generateHtml(data);
      }
    }
  });
}));