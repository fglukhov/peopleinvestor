$(window).resize(function() {
	pupMakeup();
});

$(window).scroll(function() {

	var scrollPos = $(window).scrollTop();

  // Выделение активного пункта меню при прокрутке
	
	var sections = $(".page-section");
	
	sections.each(function() {
		if (($(this).offset().top - scrollPos) <= $(window).height()/2) {
			$(".main-menu a").removeClass("act");
			$(".main-menu a[href=#"+$(this).data("name")+"]").addClass("act")
		}
	});
	
})

$(document).ready(function() {
  
	handleForms();
	
	tabbedContent();
	galleryTabs();
	
	// Contacts map
	
	function initializeContactsMap() {
		var mapOptions = {
			zoom: 16,
			center: new google.maps.LatLng(55.778767, 37.59297),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true,
			scrollwheel: false
		}
		
		var map = new google.maps.Map(document.getElementById("contactsMap"),
				mapOptions);
				
		var image = 'images/map-pin.png';
		var myLatLng = new google.maps.LatLng(55.778767, 37.59297);
		var beachMarker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				icon: image
		});
	}
	
	var mapInit = 0;
	
	$(".tab[rel='contacts-2']").click(function() {
		if (!mapInit) {
			initializeContactsMap();
			mapInit = 1;
		}
	})
	
	function initializeContactsMap2() {
		var mapOptions = {
			zoom: 16,
			center: new google.maps.LatLng(55.775876, 37.612067),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true,
			scrollwheel: false
		}
		
		var map = new google.maps.Map(document.getElementById("howBlockMap"),
				mapOptions);
				
		var image = 'images/map-pin-2.png';
		var myLatLng = new google.maps.LatLng(55.775876, 37.612067);
		var beachMarker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				icon: image
		});
	}
	
	var mapInit2 = 0;
	
	$(".how-link").click(function() {
		$(".how-block-1").hide();
		$(".how-block-2").fadeIn(250);
		if (!mapInit) {
			initializeContactsMap2();
			mapInit2 = 1;
		}
	});
	
	$(".how-block-2 .close").click(function() {
		$(".how-block-2").hide();
		$(".how-block-1").fadeIn(250);
	})
	
	$(".fancybox").fancybox({
		padding: 0,
		helpers: {
			overlay: {
				locked: false
			}
		}
	});
	
	// Top menu
	
	$(".main-menu a, a.anchor-link").click(function() {
		
		var anchor = $(this).attr("href").replace("#","");
		
		var link = $(this);
		
		yDiff = 90
		
		$("html,body").animate({
			scrollTop: $("a[name='"+anchor+"']").offset().top - yDiff
		},1000);
		
		return false;
	});
	
	// Попапы жюри и экспертов
	
	$(".experts-item, .jury-item").click(function() {
		var pupId = "popup" + parseInt(1000*Math.random());
		if (!$("#"+pupId).length && $(this).find(".details").length) {
			$("body").append("<div class='popup person-popup' id='"+pupId+"'><div class='popup-content'><div class='close'></div>"+$(this).find(".details").html()+"</div></div>");
			openPopup(pupId)
		} else {
			openPopup(pupId)
		}
		
	});
	
	// Скролл логотипов участников
	
	$(".participants-list").css({
		width: $(".participants-list .col").length*116
	})
	
	$(".participants-content").mCustomScrollbar({
		mouseWheel:{ enable: false },
		axis:"x"
	});
	
	if (!$.support.transition) {
    $.fn.transition = $.fn.animate;
    var easeIn = "linear";
    var easeOut = "lenear";
  } else {
    var easeIn = "ease-in";
    var easeOut = "ease-out";
  }
	
	// Картинки экспертов при наведении
	
	$(".experts-item").on("mouseenter",function() {
		$(this).find(".pic").transition({
			rotateY:"360deg",
			scale:1.09
		},750)
	});
	
	$(".experts-item").on("mouseleave",function() {
		$(this).find(".pic").transition({
			rotateY:"0deg"
		},0).transition({
			scale:1
		},500)
	});
	
	// Картинки жюри при наведении
	
	$(".jury-item").on("mouseenter",function() {
		$(this).transition({
			scale:1.2
		},750);
		$(this).find(".pic").transition({
			rotateY:"360deg",
			scale:1.09
		},750)
	});
	
	$(".jury-item").on("mouseleave",function() {
		$(this).transition({
			scale:1
		},750);
		$(this).find(".pic").transition({
			rotateY:"0deg"
		},0).transition({
			scale:1
		},500)
	});
	
	$(".help-item").on("mouseenter",function() {
		$(this).transition({
			scale:1.15
		},750);
		$(this).find(".pic").transition({
			rotateY:"360deg",
			scale:1.09
		},750)
	});
	
	$(".help-item").on("mouseleave",function() {
		$(this).transition({
			scale:1
		},750);
		$(this).find(".pic").transition({
			rotateY:"0deg"
		},0).transition({
			scale:1
		},500);
	});
	
})

function handleForms() {

	if ($("input:checkbox").length) {
    $("input:checkbox").iCheck()
  }
  
  if ($("input:radio").length) {
    $("input:radio").iCheck()
  }
	
	$("input:checkbox").on('ifChecked', function(event){
		var inputHidden = $(this).parents(".form-checkboxes").find(".ch-hidden")
		if (inputHidden.length) {
			inputHidden.val(inputHidden.val() + $(this).attr("id") + "-")
		}
	})
	
	$("input:checkbox").on('ifUnchecked', function(event){
		var inputHidden = $(this).parents(".form-checkboxes").find(".ch-hidden")
		if (inputHidden.length) {
			inputHidden.val(inputHidden.val().replace($(this).attr("id")+"-",""))
		}
	})

  $("input[type=submit]").each(function() {
		var submitEl = $(this);
		submitEl.hide().after("<div class='submit-replacer " + $(this).attr("class") + "'>" + $(this).attr("value") + "</div>");
		var submitReplacer = submitEl.next(".submit-replacer");
		submitReplacer.on("click",function() {
			submitEl.click();
		})
	})
	
	$("input:text").each(function() {
    if ($(this).val()) {
      $(this).prev(".placeholder").hide();
    }
  });

  $("input.phone").mask("+7 (999) 999-99-99");

  validateForms();
	
	$("form").submit(function() {
    if ($(this).valid()) {
      
			$(this).find("input:text").val("");
			$(this).find("textarea").val("");
	  
			$(this).find(".placeholder").show();
		
    }
		return false;
	});
	
	$("input:text, input:password, textarea").each(function() {
    $(this).addClass("initial");
    
    if ($(this).prop("tagName") == "INPUT" || $(this).prop("tagName") == "TEXTAREA") {
      // if (!$(this).parents(".input-wrapper").length) $(this).wrap("<div class='input-wrapper'></div>");
      if ($(this).hasClass("phone") || $(this).hasClass("form-date")) {
        $(this).focus(function() {
          $(this).removeClass("initial");
          $(this).parents(".form-item").find(".placeholder").hide();
        });
      } else {
        $(this).focus(function() {
          $(this).parents(".form-item").find(".placeholder").addClass("placeholder-initial");
        });
        $(this).keydown(function() {
          $(this).removeClass("initial");
          $(this).parents(".form-item").find(".placeholder").hide();
        });
      }
      $(this).blur(function() {
        $(this).prev().prev(".placeholder").hide();
        $(this).parents(".form-item").find(".placeholder").removeClass("placeholder-initial");
        if (!$(this).val()) {
          $(this).addClass("initial");
          $(this).parents(".form-item").find(".placeholder").show();
        }
      });
    } else {
      $(this).focus(function() {
        $(this).removeClass("initial");
        $(this).parents(".form-item").find(".placeholder").hide();
      });
      $(this).blur(function() {
        if (!$(this).val()) {
          $(this).addClass("initial");
          $(this).parents(".form-item").find(".placeholder").show();
        }
      });
    }
      
    $(this).parents(".form-item").find(".placeholder").click(function() {
      $(this).focus();
    });
    
  });
	
}

function validateForms() {
  
  $("form").each(function() {
    $(this).validate({
      focusInvalid: false,
      sendForm : false,
      errorPlacement: function(error, element) {
        // element.parents(".input-wrapper").addClass("input-wrapper-error");
        if (element.attr("errortext")) {
          error.html(element.attr("errortext"))
        }
        error.insertAfter(element);
        element.prev(".placeholder").addClass("placeholder-error")
        if (element[0].tagName == "SELECT") {
          element.parents(".form-item").find(".param-selector").addClass("param-sel-error")
        }
        
      },
      unhighlight: function(element, errorClass, validClass) {
        // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
        $(element).removeClass(errorClass);
        $(element).next(".error").remove();
        $(element).prev(".placeholder").removeClass("placeholder-error");
        if ($(element)[0].tagName == "SELECT") {
          $(element).parents(".form-item").find(".param-selector").removeClass("selector-error")
        }
      },
      invalidHandler: function(form, validatorcalc) {
          var errors = validatorcalc.numberOfInvalids();
          if (errors && validatorcalc.errorList[0].element.tagName == "INPUT") {                    
              validatorcalc.errorList[0].element.focus();
          }
      }
    });
    
    if ($(this).find("input.email").length) {
      $(this).find("input.email").rules('add', {
        email: true,
        messages: {
          required:  "Введите правильный e-mail"
        }
      });
    }
    
    if ($(this).find(".form-date").length) {
      $(this).find(".form-date").rules('add', {
        messages: {
          required:  "Выберите дату!"
        }
      });
    }
    
    if ($(this).find("input.email").length && $(this).find("input.phone").length) {
      var thisField = $(this).find("input.phone");
      var relatedField = $(this).find("input.email");
      thisField.rules('add', {
        required: function(element) {
          if (relatedField.val() == "") {
            return true;
          } else {
            return false;
          }
        }
      });
      var thisField2 = $(this).find("input.email");
      var relatedField2 = $(this).find("input.phone");
      thisField2.rules('add', {
        required: function(element) {
          if (relatedField2.val() == "") {
            return true;
          } else {
            return false;
          }
        }
      });
    }
    
    $(document).mouseup(function (e) {
      var container = $("form");

      if (!container.is(e.target) // if the target of the click isn't the container...
          && container.has(e.target).length === 0) // ... nor a descendant of the container
      {
          $(".error-wrapper").remove();
      }
    });
		
		$(document).mouseup(function (e) {
      var container = $(".tooltip");

      if (!container.is(e.target) // if the target of the click isn't the container...
          && container.has(e.target).length === 0) // ... nor a descendant of the container
      {
          $(".tooltip").fadeOut(150);
      }
    });
    
  });  
    
}

jQuery.extend(jQuery.validator.messages, {
    required: "Пожалуйста, заполните это поле!",
    remote: "Please fix this field.",
    email: "Введите правильный e-mail",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

function tabbedContent() {
  $(".tabbed-content").each(function() {
	
		if ($(this).hasClass("tabbed-content-fixed")) {
			var fadeOutTime = 250
		} else {
			var fadeOutTime = 0
		}
		
    var tabs = $(this).find(".tabs").find(".tab");
    var tabContents = $(this).find(".tabs-content").find(".tab-content");
    
    if (!tabs.hasClass("act")) {
      tabs.first().addClass("act");
    }
    
    tabContents.hide();
    tabContents.filter("[rel='"+tabs.filter(".act").attr("rel")+"']").show();
    
    tabs.click(function() {
			if (!$(this).hasClass("act")) {
				
				tabs.removeClass("act");
				$(this).addClass("act");
				
				// window.location.hash = $(this).attr("rel");
				
				tabContents.fadeOut(fadeOutTime);
				
				tabContents.filter("[rel='"+$(this).attr("rel")+"']").fadeIn(250)
			}
      
    });
    
  
    if ($(this).find(".tabs-nav").length) {
      $(".tabbed-content").each(function() {
        var prev = $(this).find(".tabs-nav .prev");
        var next = $(this).find(".tabs-nav .next");
        
        var tabs = $(this).find(".tabs");
        
        if (tabs.find(".act").prev(".tab").length) {
          prev.show();
          prev.find("span").html(tabs.find(".act").prev(".tab").find("span").html());
        } else {
          prev.fadeOut(fadeOutTime);
        }
        
        if (tabs.find(".act").next(".tab").length) {
          next.show();
          next.find("span").html(tabs.find(".act").next(".tab").find("span").html());
        } else {
          next.fadeOut(fadeOutTime);
        }
        
        prev.click(function() {
          tabs.find(".act").prev(".tab").click();
          if (tabs.find(".act").prev(".tab").length) {
            next.show();
            $(this).find("span").html(tabs.find(".act").prev(".tab").find("span").html());
            next.find("span").html(tabs.find(".act").next(".tab").find("span").html());
          } else {
            $(this).fadeOut(fadeOutTime);
            next.find("span").html(tabs.find(".act").next(".tab").find("span").html());
          }
        });
        
        next.click(function() {
          tabs.find(".act").next(".tab").click();
          if (tabs.find(".act").next(".tab").length) {
            prev.show();
            $(this).find("span").html(tabs.find(".act").next(".tab").find("span").html());
            prev.find("span").html(tabs.find(".act").prev(".tab").find("span").html());
          } else {
            $(this).fadeOut(fadeOutTime);
            prev.find("span").html(tabs.find(".act").prev(".tab").find("span").html());
          }
        })
        
        tabs.find(".tab").click(function() {
          next.find("span").html($(this).next(".tab").find("span").html());
          prev.find("span").html($(this).prev(".tab").find("span").html());
          if ($(this).prev(".tab").length) {
            prev.show();
          } else {
            prev.fadeOut(fadeOutTime);
          }
          if ($(this).next(".tab").length) {
            next.show();
          } else {
            next.fadeOut(fadeOutTime);
          }
        })

      });
    }
  });
}

function galleryTabs() {
  $(".gallery-tabs").each(function() {
	
		if ($(this).hasClass("tabbed-content-fixed")) {
			var fadeOutTime = 250
		} else {
			var fadeOutTime = 0
		}
		
    var tabs = $(this).find(".tabs").find(".tab");
    var tabContents = $(this).find(".tabs-content").find(".tab-content");
    
    if (!tabs.hasClass("act")) {
      tabs.first().addClass("act");
    }
    
    tabContents.hide();
    tabContents.filter("[rel='"+tabs.filter(".act").attr("rel")+"']").show().addClass("tab-content-act");
    
		var gallery = tabContents.find(".in-tab-gallery");
		
    tabs.click(function() {
			
			if (!$(this).hasClass("act")) {
			
				tabs.removeClass("act");
				$(this).addClass("act");
				
				tabContents.removeClass("tab-content-act")
				
				// window.location.hash = $(this).attr("rel");
				
				tabContents.fadeOut(fadeOutTime);
				
				tabContents.filter("[rel='"+$(this).attr("rel")+"']").fadeIn(250).addClass("tab-content-act");
				
				tabContents.find(".fancybox").hide();
			
				$(".tab-content-act").find(".fancybox").each(function() {
					$(this).show().css({
						perspective:"1000px",
						rotateX:"90deg",
						opacity:0,
						scale:.8
					}).delay(Math.random()*1000).transition({
						perspective:"1000px",
						rotateX:"0deg",
						opacity:1,
						scale:1
					},500)
				})
				
			}
      
    });
    
  });
}

function openPopup(pupId) {
  var popup = $("#"+pupId);
  $("body").append("<div class='tint' style='display:none;' />");
  popup.addClass("popup-act").fadeTo(500,1);
  
  $(".tint").fadeTo(300,1);
  pupMakeup();
  
  if (!popup.children(".popup-shadow").length) {
    popup.append("<div class='popup-shadow' />");
  } 
  
  jQuery(document).keydown(function(e){
    if (e == null) { // ie
      keycode = event.keyCode;
    } else { // mozilla
      keycode = e.which;
    }
    
    if(keycode == 27){ // escape, close box
      closePopup()
    }
    
  });
  
  $(".tint").on("click", function () {
    closePopup()
  });
  
  $(".popup .close, .popup .cancel").on("click", function () {
    closePopup()
  });
}

function pupMakeup() {
  var popup = $(".popup-act");
  var pupTop = $(window).scrollTop() + ($(window).height() - popup.outerHeight(true))/2;
  if (pupTop < $(window).scrollTop() + 20) pupTop = $(window).scrollTop() + 20;  $(".tint").css("height",$(window).height()).css("width",$("body").width());
  if (!popup.hasClass("price-popup")) {
    popup.css("top",pupTop).css("left",($(window).width()-popup.outerWidth(true))/2);
  } else {
    popup.css("margin-top",$(window).scrollTop() - popup.parent().offset().top - popup.parent().outerHeight(true) + ($(window).height()-popup.outerHeight(true))/2);
  }
  
}

function closePopup() {
  $(".tint").fadeTo(500,0,function() {
    $(this).remove();
  });
  $(".popup-act").removeClass("popup-act").fadeTo(300,0,function() {
    $(this).hide();
  });
}
