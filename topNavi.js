$(function(){

$.fn.topNavi = function(options){
	var config = {
		allwrap : '',
    hdbanner : '',
		target : '',
		targetDep : '',
		tabletSize : '',
		gnbhover : '',
		mnavi : '',
		allbg : '',
		mmenu : '',
		mymenu : '',
		myclosem : '',
    myinfo : '',
    myscroll : '',
    headnTarget: '',
    headnClose : '',
    headtClose: '',
    msearch: '',
    msearchNavi:'',
    header : ''

	}
	
	if (options) $.extend(config, options); 
	this.each(function(){
		var Self = $(this),
			allWrap = $(config.allwrap),
      hdbanner = $(config.headerBanner),
			allBg = $(config.allbg),
			aTarget = Self.find(config.target),
			dTarget = Self.find(config.targetDep),
			tSize = Number(eval(config.tabletSize)),
			gnbHover = $(config.gnbhover),
			mobileNavi = $(config.mnavi),
			mobileMenu = $(config.mmenu),
			mobileMyMenu = $(config.mymenu),
			mobileMyClose = $(config.myclosem),
      myInfo = $(config.myinfo),
      myScroll = $(config.myscroll),
      hdNTarget = $(config.headnTarget),
      hdNCloase = $(config.headnClose),
      hdTCloase = $(config.headtClose),
      MSA = $(config.msearch),
      MSANAVI = $(config.msearchNavi),
      Header = $(config.header);
		
      

      // head banner
      function setCookies_head( name, value, expires ) {
        document.cookie = name + "=" + escape (value) +
        "; path=/; expires=" + expires.toGMTString();
      }

      function closeNavi(){
        var winHeight = $(window).height();
        var allHeight = winHeight - Self.css('padding-top').replace(/[^-\d\.]/g, '');
        Self.children('div').css('height',allHeight);

        var bodyPos = $('body').attr('data-pos');
        bodyPos = bodyPos - hdNTarget.height();
        $('body').attr( 'data-pos',bodyPos);
      }

      function closeMymenu(){
        var winHeight = $(window).height();
        var allHeight = winHeight - mobileMenu.css('padding-top').replace(/[^-\d\.]/g, '') - myInfo.outerHeight();
        myScroll.css({'height':allHeight});

        var bodyPos = $('body').attr('data-pos');
        bodyPos = bodyPos - hdNTarget.height();
        $('body').attr( 'data-pos',bodyPos);
      }

      hdTCloase.bind('click',function(){
        var pop = $(this).attr('date-target');
        var expdate = new Date();
        expdate.setTime(expdate.getTime() + 24*60*60*1000 );
        setCookies_head( pop, "done" , expdate );
        hdNTarget.stop().animate({'height':'0'},300);

        if (mobileNavi.is('.active')){ closeNavi(); }
        if (mobileMyClose.is('.active')){ closeMymenu(); }
      });

      hdNCloase.bind('click',function(){
        hdNTarget.stop().animate({'height':'0'},300);
        if (mobileNavi.is('.active')){ closeNavi(); }
        if (mobileMyClose.is('.active')){ closeMymenu(); }
      });

      function getCookies_head(Name) {
        var search = Name + "=";
        offset = document.cookie.indexOf(search);
        if (document.cookie.length > 0) {
        if (offset != -1) { 
          offset += search.length;
          end = document.cookie.indexOf(";", offset);
          if (end == -1)
          end = document.cookie.length;
          return unescape(document.cookie.substring(offset, end));
        }
        }
      }

      if (getCookies_head("headerNotice") != "done") {
        hdNTarget.css({'display':'block','height':'auto'});
      }

      

      // scroll div 
      var scrollDiv = function() {
        var $myTopH = Header.height()*1.4 + hdNTarget.height();
        var $tmp = $(window).scrollTop();
        $('html').removeClass('mFix')
        if ($tmp <= $myTopH){ Header.removeClass('fixed'); $('html').removeClass('wFix');
        } else { Header.addClass('fixed'); $('html').addClass('wFix');}
      }

      var mScrollDiv = function() {
        var $myTopH = hdNTarget.height();
        var mSearchTarget = MSA.offset().top;
        var $tmp = $(window).scrollTop();
        $('html').removeClass('wFix');
        if ($tmp <= $myTopH){ Header.removeClass('mfixed'); $('html').removeClass('mFix')
        } else { Header.addClass('mfixed'); $('html').addClass('mFix');}
        

        if (!$('html').hasClass('subHtml')){
          if ($tmp > mSearchTarget){
            MSANAVI.fadeIn();
          } else {
            MSANAVI.fadeOut();
          }
        }
      }

      // top search    
      MSANAVI.bind('click',function(){
        $(this).addClass('on');
        $('body').attr( 'data-pos', $(window).scrollTop() );
        $('html, body').css({'overflow-y':'hidden','position':'relative','height':'100%'});
        $('#tSearch').fadeIn(300)     
      });

      $('.tsearchClose').bind('click',function(){
        MSANAVI.removeClass('on');        
        $('html, body').css({'overflow-y':'auto','position':'static','height':'auto'})
        $(window).scrollTop( $('body').attr( 'data-pos' ) );
        $('#tSearch').fadeOut(300)     
      });
      

      
      // wheel
      $('html').bind('mousewheel', function(e){
        if (!$('html').is('.jmobile')){  
          if(e.originalEvent.wheelDelta < 0) { Header.removeClass('move');
          } else { Header.addClass('move'); }
        }
      });

      $(window).load(function() {
        if (!$('html').is('.jmobile')){
          scrollDiv();      
        } else {
          mScrollDiv();
        }
 
        $(window).scroll(function() { 
          if (!$('html').is('.jmobile')){
            scrollDiv(); 
          } else {
            mScrollDiv(); 
          }
        });
      });

      var headerRe = function(){
        Header.removeClass();
        if (!$('html').is('.jmobile')){
          scrollDiv(); 
        } else {
          mScrollDiv(); 
        }

        Header.removeAttr('style','');
        hdNTarget.css('opacity','1');
      }


      $(window).resize(function() {
        headerRe();
      });

      $('.hMypage').hover(function(){
        $('.webMypage').fadeIn();
      },function(){
        $('.webMypage').fadeOut();
      });


		// web menu show
		_menuBlock = function(){
			var depId = this.id;
			var depClass = depId.substr(0,7);
			var depNum = depId.substr(7,8);
			
			if (depClass == 'topNavi') {
				aTarget.removeClass('hover');
				dTarget.css({'top': '50px'});
				targetDiv = $(this).siblings();
				targetDiv.css({'display':'block'});
				targetDiv.stop().animate({'opacity':1.0, 'top':'38px'},300);
				$(this).addClass('hover');
			} else if (depClass == 'topSubm') {	
				aTarget.removeClass('hover');
				targetDiv = $(this);	
				targetDiv.addClass('hover');
				targetDiv.css({'display':'block'});
				targetDiv.stop().animate({'opacity':1.0, 'top':'38px'},300);
				$(this).siblings('a').addClass('hover');
			} else {
				
			}
		};
		
		// web menu hide
		_menuClear = function(){
			aTarget.removeClass('hover');
			dTarget.css({'display':'none'});
		};
		

		// mobile mode control
		mobileNavi.bind('click',function(){
			var winHeight = $(window).height();
      var $tmp = $(document).scrollTop()
			var allHeight = 0;
      
      if (hdbanner.is(':visible')){ hdNTarget.css('opacity','0');}
      allHeight = winHeight - parseInt(Self.css('padding-top').replace(/[^-\d\.]/g, ''));
      Header.css('position','absolute');

			if (!$(this).is('.active')){
        setTimeout( function(){ mobileNavi.addClass('active');}, 160);
				Self.stop().animate({'left':'0'},300);
				Self.children('div').css('height',allHeight);
				$(this).css('z-index','9999');

				$('body').attr( 'data-pos', $(window).scrollTop() );
        $('html, body').css({'overflow-y':'hidden','position':'relative','height':'100%'});
			} else {
        aTarget.removeClass('on');
				Self.stop().animate({'left':'-101%'},300);
        dTarget.removeAttr('style','');
        hdNTarget.css('opacity','1');
				 
        Header.removeAttr('style','');

				setTimeout( function(){mobileNavi.removeClass('active');}, 0);
				$('html, body').css({'overflow-y':'auto','position':'static','height':'auto'})
        $(window).scrollTop( $('body').attr( 'data-pos' ) );
			}
		});


    // mobile show
		_mnaviView = function (e){
      var depId = this.id;
      var depClass = depId.substr(0,7);
			var depNum = depId.substr(7,8);
      
      if (depClass == 'topNavi'){
        if (depNum == 1){
        } else {
          e.preventDefault ? e.preventDefault() : e.returnValue = false;
        }
      }
      
      if ($(this).is('.on')){
        $(this).removeClass('on');
        dTarget.stop().animate({'height':'0'},300);
      } else {
        aTarget.removeClass('on');
        $(this).addClass('on');
        dTarget.stop().animate({'height':'0'},300);

        var winWidth = $(window).width();
        if (winWidth > 640){ depUlMargin = 50; } else { depUlMargin = 25;}
        var depUlH = $(this).siblings('div').find('ul').height() + depUlMargin;
        $(this).siblings('div').stop().animate({'height':depUlH},300);
      }

		};



		// mymenu mode control
		mobileMenu.bind('click',function(){
			var winHeight = $(window).height();
			var allHeight = 0;
      
      if (hdbanner.is(':visible')){ hdNTarget.css('opacity','0');}
      mobileMyMenu.css('display','block');
      allHeight = winHeight - parseInt(mobileMyMenu.css('padding-top').replace(/[^-\d\.]/g, '')) - myInfo.outerHeight();
      Header.css('position','absolute');
			myScroll.css({'height':allHeight});
			mobileMyMenu.stop().animate({'right':'0'},300);
      mobileNavi.css('z-index','1');
			setTimeout( function(){	mobileMyClose.addClass('active');	}, 300);

      $('body').attr( 'data-pos', $(window).scrollTop() );
      $('html, body').css({'overflow-y':'hidden','position':'relative','height':'100%'});
		});
		
		// mobile mode close control
		mobileMyClose.bind('click',function(){
			mobileMyMenu.stop().animate({'right':'-100%'},300,function(){
        mobileMyMenu.css('display','none');
      });
			mobileMyClose.removeClass('active');	
      mobileNavi.removeAttr('style','');
      Header.removeAttr('style','');
      hdNTarget.css('opacity','1');
      $('.myInbox').removeAttr('style','');

			$('html, body').css({'overflow-y':'auto','position':'static','height':'auto'})
      $(window).scrollTop( $('body').attr( 'data-pos' ) );

		});
		


		// menu type event
		_menuEvent = function(){
			aTarget.each(function() {
				if($('html').is('.jweb') ){
					$(this).mouseenter(_menuBlock).focus(_menuBlock).mouseleave(_menuClear);
					$(this).unbind('click');
				} else {
          $(this).unbind('click');
					$(this).click(_mnaviView);
					$(this).unbind('mouseenter mouseleave focus')
				}
			});

			dTarget.each(function() {
				if($('html').is('.jweb') ){
					$(this).mouseenter(_menuBlock).focus(_menuBlock).mouseleave(_menuClear);
				} else {
					$(this).unbind('mouseenter mouseleave focus')
				}
			});

		};
		

		// menu type check
		_menuWchk = function(){			
			var winWidth =  $(window).width();			
			if(winWidth > tSize){ $('html').removeClass('jmobile').addClass('jweb');} 
			else { $('html').removeClass('jweb').addClass('jmobile');
			}
			_menuEvent();
		};		
	

		// menu reset
		_menuReset = function(){ 
			Self.removeAttr('style');

			mobileNavi.removeClass('active').removeAttr('style');
			mobileMenu.removeAttr('style');
			mobileMyMenu.removeAttr('style');
      aTarget.removeClass('on');

			dTarget.removeAttr('style');
      $('html, body').removeAttr('style');
		};
		
		// resize
		$(window).resize(function(){
			if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){ _menuReset();}

			_menuEvent();

			// ipad resize
			var isiPad = /ipad/i.test(navigator.userAgent.toLowerCase());
			if(jQuery.browser.mobile) { if ($(window).width() != windowWidth) { _menuWchk(); }}
			else if (isiPad){ if ($(window).width() != windowWidth) { _menuWchk(); }} 
			else { _menuWchk(); }
		});

		$(window).load(function(){ _menuWchk(); });

    _menuWchk();

		// orientation Control
		$(window).on( "orientationchange", function( event ) { _menuWchk(); } )

	});
	return this;
}


var options = {
	allwrap : '#allWrap',
	allbg : '#allBg',
  headerBanner : '#headerNotice',
	target : 'a[id^=topNavi]',
	targetDep : 'div[id^=topSubm]',
	tabletSize : '1060',
	gnbhover : '#gnb ul li',
	mnavi : '#mNavi',
	mmenu : '.mMyopen',
	mymenu : '#myMenu',
	myclosem : '.mCloseBtn',
  myinfo : '.myInfo',
  myscroll : '.myInbox',
  headnTarget : '#headerNotice',
  headnClose : '.pHClose',
  headtClose : '.aHClose',
  msearch :'#mSearchBox',
  msearchNavi :'.mMysearch',
  header : 'header'
 
}


if ($('#mainWrap').length  > 0){
  $('html').addClass('mainHtml');
} else {
  $('html').addClass('subHtml');
}

$('#gnb').topNavi(options);


});



