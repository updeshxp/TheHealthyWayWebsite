(function ($) {

  "use strict";

    // PRE LOADER
    $(window).load(function(){
      $('.preloader').fadeOut(1000); // set duration in brackets    
    });


    //Navigation Section
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });


    // Owl Carousel
    $('.owl-carousel').owlCarousel({
      animateOut: 'fadeOut',
      items:1,
      loop:true,
      autoplay:true,
    })


    // PARALLAX EFFECT
    $.stellar();  


    // SMOOTHSCROLL
    $(function() {
      $('.navbar-default a, #home a, footer a').on('click', function(event) {
        var $anchor = $(this);
          $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
          }, 1000);
            event.preventDefault();
      });
    });  


    // WOW ANIMATION
    new WOW({ mobile: false }).init();

})(jQuery);

function message(status, shake=false, id="") {
  if (shake) {
    $("#"+id).effect("shake", {direction: "right", times: 2, distance: 8}, 250);
  } 
  document.getElementById("feedback").innerHTML = status;
  $("#feedback").show().delay(2000).fadeOut();
}

function error(type) {
  $("."+type).css("border-color", "#E14448");
}

function shortenText(text,startingPoint ,maxLength) {
  text = text.replace(/<.+?>/gi, " ");
  return text.length > maxLength?text.slice(startingPoint, maxLength)+"...":text;
 }

function getImage(str){
  const regex = /<img.*?src="(.*?)"[^>]*>/m;
  let m;
  var imgsrc = 'images/news-image'+(Math.floor(Math.random() * 3)+1)+'.jpg';

  var res = str.match(regex);
  if(res[1]){
    imgsrc = res[1];
  }
  // if ((m = regex.exec(str)) !== null) {
  //   // The result can be accessed through the `m`-variable.
  //   m.forEach((match, groupIndex) => {
  //       console.log(`Found match, group ${groupIndex}: ${match}`);
  //       imgsrc = match;
  //   });
  // }
  return imgsrc;
}

function formDate(d){
var m_names = new Array("January", "February", "March", 
"April", "May", "June", "July", "August", "September", 
"October", "November", "December");

var curr_date = d.getDate();
var curr_month = d.getMonth();
var curr_year = d.getFullYear();
return m_names[curr_month] +" " + curr_date + ", " + curr_year;
}

function setNews(jsblog){
  let items = jsblog.items;
  let output = '';
  delay = 0.4;
  items.forEach(function(post) {
    //console.log('Delay is '+delay);
    let date = new Date(post.published);
    imgsrc = getImage(post.content);
    summary=shortenText(post.content,0,300);
    output += `<div class="col-md-4 col-sm-6">
                <!-- NEWS THUMB -->
                  <div class="news-thumb wow fadeInUp" data-wow-delay="${delay}s">
                    <a href="${post.url}">
                      <img src="${imgsrc}" style="width: 360px;height: 240px;object-fit: cover;" class="img-responsive" alt="${post.title}">
                    </a>
                    <div class="news-info">
                      <span>${formDate(date)}</span>
                      <h3><a href="${post.url}">${post.title}</a></h3>
                      <p>${summary}</p>
                      <div style="float:right;"><a class="more-btn btn btn-default smoothScroll" href="${post.url}">Read More</a></div>
                      <div class="author">
                        <img src="${post.author.image.url}" class="img-responsive" alt="${post.author.displayName}">
                          <div class="author-info">
                            <a href="${post.author.url}">
                              <h5>${post.author.displayName}</h5>
                            </a>
                          </div>
                      </div>
                    </div>
                  </div>
              </div>`;
    delay+=0.20;
  });
  document.getElementById('blogPosts').innerHTML = output;
}

function setFooterNews(jsblog){
      var items = jsblog.items;
      var fnews = '<h4 class="wow fadeInUp" data-wow-delay="0.4s">Latest News</h4>';
      var i=0;
      for (let i = 0; i < 2; i++) {
        post = items[i];
        let d = new Date(post.published);
        //console.log("Date is: "+d.toDateString());
        fnews += `<div class="latest-stories">
                    <div class="stories-image">
                      <a href="${post.url}"><img src="images/news-image.jpg" class="img-responsive" alt="${post.title}"></a>
                    </div>
                    <div class="stories-info">
                      <a href="${post.url}"><h5>${post.title}</h5></a>
                      <span>${d.toDateString()}</span>
                    </div>
                  </div>`;
      }
      document.getElementById('footer-art').innerHTML = fnews;
}

function fetchArticles(){
  url = "https://www.googleapis.com/blogger/v3/blogs/7084568612788196862/posts"
  key= atob("QUl6YVN5RGJ5eUk4Q2FxeV9oNDFGMVRFNEZhVGZreTVTOGtSNWhz");
  maxResults=3;
  $.ajax({
    url: url,
    type: "get",
    data: {
      key,
      maxResults
    },
    success: function (response) {
      // console.log(response);
      setNews(response);
      // setFooterNews(response);
    },
    error: function (xhr) {
      $("#blogPosts").html("<div>Request Failed, Please Try Again</div>");
      //Do Something to handle error
    }
  });
}

$('#appointmentInfo').on('submit', function (e) {

	e.preventDefault();
	const spmarr=['lena.tikhonova.2020@bk.ru','oeuyithlj@canadlanpharmacy.com']
	var email = document.getElementById("email").value;
	if(spmarr.indexOf(email)!=-1){
		alert("spam detected");
		return false;
	}
  $('.preloader').show();
	var url = "https://formdata.apzhub.in/thehealthyway/sendData";
    $.ajax({
      url: url,
      type: "post",
      data: $('#appointmentInfo').serialize(),
      timeout: 8000,
      success: function (response) {
			$('#appointmentInfo').trigger("reset");
      $('.preloader').fadeOut(0);
      alert(response.message);
      },
      error: function (x, textstatus, m) {
        $('#appointmentInfo').trigger("reset");
        $('.preloader').fadeOut(0);
        if (textstatus == "timeout") {
          alert("Request Timeout! Please try again later!")
        } else {
          alert("Oops! Looks like some issue from our end! Please contact us via my email/phone. "+textstatus+"  Thank You!")
        }
      }
    });

});
