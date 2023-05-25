import { useEffect } from 'react';

export const BrandSlider = () => {
  useEffect(() => {
    $('.brand-shop').slick({
      dots: true,
      infinite: false,
      slidesToShow: 6,
      slidesToScroll: 2,
      autoplay: true,
      arrows: true,
      infinite: true,
      dots: true,
      prevArrow:
        "<button type='button' class='slick-prev'><i class='fa-solid fa-chevron-left'></i></button>",
      nextArrow:
        "<button type='button' class='slick-next'><i class='fa-solid fa-chevron-right'></i></button>",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }, []);
  return null;
};

export const QuotesSlider = () => {
  useEffect(() => {
    $('.testimonial-wrapper').slick({
      dots: false,
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      arrows: true,
      infinite: true,
      prevArrow:
        "<button type='button' class='slick-prev'><i class='fa-solid fa-chevron-left'></i></button>",
      nextArrow:
        "<button type='button' class='slick-next'><i class='fa-solid fa-chevron-right'></i></button>",

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }, []);
  return null;
};

export const AlwaysOfferMain = () => {
  useEffect(() => {
    $('.always-offer-main').slick({
      dots: false,
      infinite: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 10,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }, []);
  return null;
};
export const MainSliderWrapper = () => {
  useEffect(() => {
    $('.main-slider-wrapper').slick({
      dots: true,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      infinite: true,
    });
  }, []);
  return null;
};
export const RightTopSliderWrapper = () => {
  useEffect(() => {
    $('.right-top-slider-wrapper').slick({
      dots: true,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      infinite: true,
    });
  }, []);
  return null;
};
export const RightBottomSliderWrapper = () => {
  useEffect(() => {
    $('.right-bottom-slider-wrapper').slick({
      dots: true,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      infinite: true,
    });
  }, []);
  return null;
};
export const SecondaryFirstWraper = () => {
  useEffect(() => {
    $('.secondary-first-wraper').slick({
      dots: false,
      infinite: false,
      slidesToShow: 8,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      infinite: true,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }, []);
  return null;
};
export const HomeSliderWrapper = () => {
  useEffect(() => {
    $('.homeslider-wrapper').slick({
      dots: true,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: true,
      infinite: true,
      prevArrow:
        "<button type='button' class='slick-prev'><i class='fa-solid fa-chevron-left'></i></button>",
      nextArrow:
        "<button type='button' class='slick-next'><i class='fa-solid fa-chevron-right'></i></button>",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }, []);
  return null;
};

//for sidebar
export const SidebarJS = () => {
  useEffect(() => {
    // document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.sidebar .nav-link').forEach(function (element) {
      element.addEventListener('click', function (e) {
        let nextEl = element.nextElementSibling;
        let parentEl = element.parentElement;

        if (nextEl) {
          e.preventDefault();
          let mycollapse = new bootstrap.Collapse(nextEl);

          if (nextEl.classList.contains('show')) {
            mycollapse.hide();
          } else {
            mycollapse.show();
            // find other submenus with class=show
            var opened_submenu =
              parentEl.parentElement.querySelector('.submenu.show');
            // if it exists, then close all of them
            if (opened_submenu) {
              new bootstrap.Collapse(opened_submenu);
            }
          }
        }
      });
    });
    // sidebar related script start from here

    document
      .querySelectorAll('.sidebar .parent-link')
      .forEach(function (element) {
        element.addEventListener('click', function (e) {
          $(this).toggleClass('icon-rotate');
        });
      });
    // });
  }, []);
  return null;
};
export const SidebarCollapse = () => {
  useEffect(() => {
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
      $('#content').toggleClass('fulll-width');
    });
  }, []);
  return null;
};

export const Select2JS = () => {
  useEffect(() => {
    $('.select2').select2();
  }, []);
  return null;
};

//for recipe details show ration and share rating
export const ShowShare = () => {
  useEffect(() => {
    $('.show-share').click(function () {
      $('.c-share-dropdown').toggleClass('d-none');
    });
  }, []);
  return null;
};
export const ShowRating = () => {
  useEffect(() => {
    $('.show-rating').click(function () {
      $('.c-rating-dropdown').toggleClass('d-none');
    });
  }, []);
  return null;
};

export const SliderFor = () => {
  useEffect(() => {
    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.slider-nav',
    });
    $('.slider-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: false,
      centerMode: true,
      focusOnSelect: true,
      autoplay: false,
      prevArrow:
        "<button type='button' class='slick-prev'><i class='fa-solid fa-chevron-left'></i></button>",
      nextArrow:
        "<button type='button' class='slick-next'><i class='fa-solid fa-chevron-right'></i></button>",
    });
  }, []);
  return null;
};

export const ProductPromotionAdd = () => {
  useEffect(() => {
    $('.promotion-toggle-btn').click(function () {
      $('.offer-dropdown-main').toggleClass('d-none');
    });
  }, []);
  return null;
};

export const SliderReactJs = () => {
  useEffect(() => {
    document.addEventListener('DOMContentLoaded', function () {
      new Splide('#thumbnail-carousel', {
        fixedWidth: 100,
        gap: 10,
        rewind: true,
        pagination: false,
      }).mount();
    });
  }, []);
  return null;
};
export const ZoomImage = ({ selectedImage }) => {
  useEffect(() => {
    $(document).ready(function () {
      $('.parent').css('width', $('img').width());
      $('.parent img')
        .parent()
        .zoom({
          magnify: 1,
          target: $('.contain').get(0),
        });
    });
  }, [selectedImage]);
  return null;
};
