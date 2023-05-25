// $(".requestto-stock-btn").click(function () {
//   $(this).parent().toggleClass("d-none");

//   $(this).parent().next().toggleClass("d-none");
//   setTimeout(() => {
//     $(this).parent().toggleClass("d-none");
//     $(this).parent().next().toggleClass("d-none");
//   }, 5000);
// });

// $(".addtocart-btn").click(function () {
//   $(this).parent().toggleClass("d-none");

//   $(this).parent().next().toggleClass("d-none");
//   setTimeout(() => {
//     $(this).parent().toggleClass("d-none");
//     $(this).parent().next().toggleClass("d-none");
//   }, 5000);
// });

// $(".addto-quote-btn").click(function () {
//   $(this).parent().toggleClass("d-none");
//   $(this).parent().next().toggleClass("d-none");
//   setTimeout(() => {
//     $(this).parent().toggleClass("d-none");
//     $(this).parent().next().toggleClass("d-none");
//   }, 5000);
// });

// brand shop slider start from here
$('.brand-shop').slick({
  dots: true,
  infinite: false,
  slidesToShow: 5,
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
// brand shop slider end  here

// fruits-slider slider start from here
$('.fruits-slider').slick({
  dots: true,
  infinite: false,
  slidesToShow: 5,
  slidesToScroll: 2,
  autoplay: true,
  arrows: true,
  infinite: true,
  dots: false,
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

// fruits-slider slider end  here

// hotsale slider start from here
$('.hotsale-slider').slick({
  dots: true,
  infinite: false,
  slidesToShow: 5,
  slidesToScroll: 2,
  autoplay: false,
  arrows: true,
  infinite: true,
  dots: false,
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

// hotsale slider end  here

// popular product slider start from here
$('.popularproduct-slider').slick({
  dots: true,
  infinite: false,
  slidesToShow: 5,
  slidesToScroll: 2,
  autoplay: true,
  arrows: true,
  infinite: true,
  dots: false,
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
// popular product slider end  here

// homepage main slider start from here
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
$('.right-top-slider-wrapper').slick({
  dots: true,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
  infinite: true,
});

$('.right-bottom-slider-wrapper').slick({
  dots: true,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
  infinite: true,
});

// homepage main slider end here

// sidebar related script start from here
document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelectorAll('.sidebar .parent-link')
    .forEach(function (element) {
      element.addEventListener('click', function (e) {
        $(this).toggleClass('icon-rotate');
      });
    });
});

$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $('#content').toggleClass('fulll-width');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.sidebar .nav-link').forEach(function (element) {
    element.addEventListener('click', function (e) {
      let nextEl = element.parentElementSibling;
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
});
// DOMContentLoaded  end

// sidebar related script end here

// carrer page slider start from here
$('.main-slider-wrapper').slick({
  dots: true,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
  infinite: true,
});
// carrer page slider end here

// feature department slider for home page

$('.fd-wrapper').slick({
  dots: false,
  infinite: false,
  slidesToShow: 6,
  slidesToScroll: 2,
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
        slidesToShow: 5,
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

// testimonial slider start from here
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
        slidesToShow: 5,
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

function incrementValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('number').value = value;
}
function decrementValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  if (value <= 1) {
    return false;
  }
  value = isNaN(value) ? 0 : value;
  value--;

  document.getElementById('number').value = value;
}
$('.recipe-sm-slider-wrapper').slick({
  dots: false,
  infinite: false,
  slidesToShow: 8,
  slidesToScroll: 2,
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
        slidesToShow: 5,
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

$('.show-share').click(function () {
  $('.c-share-dropdown').toggleClass('d-none');
});
$('.show-rating').click(function () {
  $('.c-rating-dropdown').toggleClass('d-none');
});

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

$('.promotion-toggle-btn').click(function () {
  $('.offer-dropdown-main').toggleClass('d-none');
});

$('.brand-slider-wrapper').slick({
  dots: false,
  infinite: true,
  slidesToShow: 8,
  slidesToScroll: 2,
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
        slidesToShow: 5,
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

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// Calendar--------------------------------
!(function () {
  var today = moment();

  function Calendar(selector, events) {
    this.el = document.querySelector(selector);
    this.events = events;
    this.current = moment().date(1);
    this.draw();
    var current = document.querySelector('.today');
    if (current) {
      var self = this;
      window.setTimeout(function () {
        self.openDay(current);
      }, 500);
    }
  }

  Calendar.prototype.draw = function () {
    //Create Header
    this.drawHeader();

    //Draw Month
    this.drawMonth();

    this.drawLegend();
  };

  Calendar.prototype.drawHeader = function () {
    var self = this;
    if (!this.header) {
      //Create the header elements
      this.header = createElement('div', 'header');
      this.header.className = 'header';

      this.title = createElement('h1');

      var right = createElement('div', 'right');
      right.addEventListener('click', function () {
        self.nextMonth();
      });

      var left = createElement('div', 'left');
      left.addEventListener('click', function () {
        self.prevMonth();
      });

      //Append the Elements
      this.header.appendChild(this.title);
      this.header.appendChild(right);
      this.header.appendChild(left);
      this.el.appendChild(this.header);
    }

    this.title.innerHTML = this.current.format('MMMM YYYY');
  };

  Calendar.prototype.drawMonth = function () {
    var self = this;

    this.events.forEach(function (ev) {
      ev.date = self.current.clone().date(Math.random() * (29 - 1) + 1);
    });

    if (this.month) {
      this.oldMonth = this.month;
      this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
      this.oldMonth.addEventListener('webkitAnimationEnd', function () {
        self.oldMonth.parentNode.removeChild(self.oldMonth);
        self.month = createElement('div', 'month');
        self.backFill();
        self.currentMonth();
        self.fowardFill();
        self.el.appendChild(self.month);
        window.setTimeout(function () {
          self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
        }, 16);
      });
    } else {
      this.month = createElement('div', 'month');
      this.el.appendChild(this.month);
      this.backFill();
      this.currentMonth();
      this.fowardFill();
      this.month.className = 'month new';
    }
  };

  Calendar.prototype.backFill = function () {
    var clone = this.current.clone();
    var dayOfWeek = clone.day();

    if (!dayOfWeek) {
      return;
    }

    clone.subtract('days', dayOfWeek + 1);

    for (var i = dayOfWeek; i > 0; i--) {
      this.drawDay(clone.add('days', 1));
    }
  };

  Calendar.prototype.fowardFill = function () {
    var clone = this.current.clone().add('months', 1).subtract('days', 1);
    var dayOfWeek = clone.day();

    if (dayOfWeek === 6) {
      return;
    }

    for (var i = dayOfWeek; i < 6; i++) {
      this.drawDay(clone.add('days', 1));
    }
  };

  Calendar.prototype.currentMonth = function () {
    var clone = this.current.clone();

    while (clone.month() === this.current.month()) {
      this.drawDay(clone);
      clone.add('days', 1);
    }
  };

  Calendar.prototype.getWeek = function (day) {
    if (!this.week || day.day() === 0) {
      this.week = createElement('div', 'week');
      this.month.appendChild(this.week);
    }
  };

  Calendar.prototype.drawDay = function (day) {
    var self = this;
    this.getWeek(day);

    //Outer Day
    var outer = createElement('div', this.getDayClass(day));
    outer.addEventListener('click', function () {
      self.openDay(this);
    });

    //Day Name
    var name = createElement('div', 'day-name', day.format('ddd'));

    //Day Number
    var number = createElement('div', 'day-number', day.format('DD'));

    //Events
    var events = createElement('div', 'day-events');
    this.drawEvents(day, events);

    outer.appendChild(name);
    outer.appendChild(number);
    outer.appendChild(events);
    this.week.appendChild(outer);
  };

  Calendar.prototype.drawEvents = function (day, element) {
    if (day.month() === this.current.month()) {
      var todaysEvents = this.events.reduce(function (memo, ev) {
        if (ev.date.isSame(day, 'day')) {
          memo.push(ev);
        }
        return memo;
      }, []);

      todaysEvents.forEach(function (ev) {
        var evSpan = createElement('span', ev.color);
        element.appendChild(evSpan);
      });
    }
  };

  Calendar.prototype.getDayClass = function (day) {
    classes = ['day'];
    if (day.month() !== this.current.month()) {
      classes.push('other');
    } else if (today.isSame(day, 'day')) {
      classes.push('today');
    }
    return classes.join(' ');
  };

  Calendar.prototype.openDay = function (el) {
    var details, arrow;
    var dayNumber =
      +el.querySelectorAll('.day-number')[0].innerText ||
      +el.querySelectorAll('.day-number')[0].textContent;
    var day = this.current.clone().date(dayNumber);

    var currentOpened = document.querySelector('.details');

    //Check to see if there is an open detais box on the current row
    if (currentOpened && currentOpened.parentNode === el.parentNode) {
      details = currentOpened;
      arrow = document.querySelector('.arrow');
    } else {
      //Close the open events on differnt week row
      //currentOpened && currentOpened.parentNode.removeChild(currentOpened);
      if (currentOpened) {
        currentOpened.addEventListener('webkitAnimationEnd', function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('oanimationend', function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('msAnimationEnd', function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('animationend', function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.className = 'details out';
      }

      //Create the Details Container
      details = createElement('div', 'details in');

      //Create the arrow
      var arrow = createElement('div', 'arrow');

      //Create the event wrapper

      details.appendChild(arrow);
      el.parentNode.appendChild(details);
    }

    var todaysEvents = this.events.reduce(function (memo, ev) {
      if (ev.date.isSame(day, 'day')) {
        memo.push(ev);
      }
      return memo;
    }, []);

    this.renderEvents(todaysEvents, details);

    arrow.style.left = el.offsetLeft - el.parentNode.offsetLeft + 27 + 'px';
  };

  Calendar.prototype.renderEvents = function (events, ele) {
    //Remove any events in the current details element
    var currentWrapper = ele.querySelector('.events');
    var wrapper = createElement(
      'div',
      'events in' + (currentWrapper ? ' new' : '')
    );

    events.forEach(function (ev) {
      var div = createElement('div', 'event');
      var square = createElement('div', 'event-category ' + ev.color);
      var span = createElement('span', '', ev.eventName);

      div.appendChild(square);
      div.appendChild(span);
      wrapper.appendChild(div);
    });

    if (!events.length) {
      var div = createElement('div', 'event empty');
      var span = createElement('span', '', 'No Events');

      div.appendChild(span);
      wrapper.appendChild(div);
    }

    if (currentWrapper) {
      currentWrapper.className = 'events out';
      currentWrapper.addEventListener('webkitAnimationEnd', function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('oanimationend', function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('msAnimationEnd', function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('animationend', function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
    } else {
      ele.appendChild(wrapper);
    }
  };

  Calendar.prototype.drawLegend = function () {
    var legend = createElement('div', 'legend');
    var calendars = this.events
      .map(function (e) {
        return e.calendar + '|' + e.color;
      })
      .reduce(function (memo, e) {
        if (memo.indexOf(e) === -1) {
          memo.push(e);
        }
        return memo;
      }, [])
      .forEach(function (e) {
        var parts = e.split('|');
        var entry = createElement('span', 'entry ' + parts[1], parts[0]);
        legend.appendChild(entry);
      });
    this.el.appendChild(legend);
  };

  Calendar.prototype.nextMonth = function () {
    this.current.add('months', 1);
    this.next = true;
    this.draw();
  };

  Calendar.prototype.prevMonth = function () {
    this.current.subtract('months', 1);
    this.next = false;
    this.draw();
  };

  window.Calendar = Calendar;

  function createElement(tagName, className, innerText) {
    var ele = document.createElement(tagName);
    if (className) {
      ele.className = className;
    }
    if (innerText) {
      ele.innderText = ele.textContent = innerText;
    }
    return ele;
  }
})();

!(function () {
  var data = [
    { eventName: 'Lunch Meeting w/ Mark', calendar: 'Work', color: 'orange' },
    {
      eventName: 'Interview - Jr. Web Developer',
      calendar: 'Work',
      color: 'orange',
    },
    {
      eventName: 'Demo New App to the Board',
      calendar: 'Work',
      color: 'orange',
    },
    { eventName: 'Dinner w/ Marketing', calendar: 'Work', color: 'orange' },

    { eventName: 'Game vs Portalnd', calendar: 'Sports', color: 'blue' },
    { eventName: 'Game vs Houston', calendar: 'Sports', color: 'blue' },
    { eventName: 'Game vs Denver', calendar: 'Sports', color: 'blue' },
    { eventName: 'Game vs San Degio', calendar: 'Sports', color: 'blue' },

    { eventName: 'School Play', calendar: 'Kids', color: 'yellow' },
    {
      eventName: 'Parent/Teacher Conference',
      calendar: 'Kids',
      color: 'yellow',
    },
    {
      eventName: 'Pick up from Soccer Practice',
      calendar: 'Kids',
      color: 'yellow',
    },
    { eventName: 'Ice Cream Night', calendar: 'Kids', color: 'yellow' },

    { eventName: 'Free Tamale Night', calendar: 'Other', color: 'green' },
    { eventName: 'Bowling Team', calendar: 'Other', color: 'green' },
    { eventName: 'Teach Kids to Code', calendar: 'Other', color: 'green' },
    { eventName: 'Startup Weekend', calendar: 'Other', color: 'green' },
  ];

  function addDate(ev) {}

  var calendar = new Calendar('#calendar', data);
})();
// Calendar--------------------------------

// ------------ Multistep Form ------------------

$(document).ready(function () {
  var current_fs, next_fs, previous_fs; //fieldsets
  var opacity;

  $('.next').click(function () {
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //Add Class Active
    $('#progressbar li').eq($('fieldset').index(next_fs)).addClass('active');

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: 'none',
            position: 'relative',
          });
          next_fs.css({ opacity: opacity });
        },
        duration: 600,
      }
    );
  });

  $('.previous').click(function () {
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //Remove class active
    $('#progressbar li')
      .eq($('fieldset').index(current_fs))
      .removeClass('active');

    //show the previous fieldset
    previous_fs.show();

    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: 'none',
            position: 'relative',
          });
          previous_fs.css({ opacity: opacity });
        },
        duration: 600,
      }
    );
  });

  $('.radio-group .radio').click(function () {
    $(this).parent().find('.radio').removeClass('selected');
    $(this).addClass('selected');
  });

  $('.submit').click(function () {
    return false;
  });
});

// ------------ Multistep Form ------------------

// var btn = $('#backtotop');

