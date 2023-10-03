let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  navbar.classList.toggle('active');
  menu.classList.toggle('fa-times');
};

window.onscroll = () => {
  navbar.classList.remove('active');
  menu.classList.remove('fa-times');

  if (window.scrollY > 150) {
    document.querySelector('.header').classList.add('active');
    document.querySelector('.head').style.display = 'none';
  } else {
    document.querySelector('.header').classList.remove('active');
    document.querySelector('.head').style.display = 'flex';
  }
};

document.querySelector('#search-btn').onclick = () => {
  document.querySelector('.search').style.display = 'block';
};

document.querySelector('#close').onclick = () => {
  document.querySelector('.search').style.display = 'none';
};

var swiper = new Swiper('.home-slider', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  loop: true,
  grabCursor: true,
});

$(document).ready(function () {
  $('.count').each(function () {
    var $this = $(this),
      countTo = $this.attr('data-count');
    $({ countNum: $this.text() }).animate(
      {
        countNum: countTo,
      },
      {
        duration: 5000,
        step: function () {
          $this.text(Math.floor(this.countNum));
        },
        complete: function () {
          $this.text(this.countNum + '+');
        },
      }
    );
  });

  $('.gallery .btn').click(function () {
    $(this).addClass('active').siblings().removeClass('active');

    var filter = $(this).attr('data-filter');

    if (filter == 'all') {
      $('.gallery .box').show(400);
    } else {
      $('.gallery .box')
        .not('.' + filter)
        .hide(200);
      $('.gallery .box')
        .filter('.' + filter)
        .show(400);
    }
  });

  $('.gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    gallery: {
      enabled: true,
    },
  });
});

var swiper = new Swiper('.team-slider', {
  loop: true,
  grabCursor: true,
  spaceBetween: 10,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    991: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper('.logo-slider', {
  loop: true,
  grabCursor: true,
  spaceBetween: 10,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    991: {
      slidesPerView: 4,
    },
  },
});
