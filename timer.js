const daysEl = document.querySelector('span[data-value="days"]');
const hoursEl = document.querySelector('span[data-value="hours"]');
const minsEl = document.querySelector('span[data-value="mins"]');
const secsEl = document.querySelector('span[data-value="secs"]');


class CountdownTimer {
  constructor(selector, targetDate, onTick) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.onTick = onTick;
  }
  
  start() {
    const targetTime = this.targetDate.getTime();
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = targetTime - currentTime;
      const time = this.getTimeComponents(deltaTime);
      this.onTick(time);
    }, 1000)
  }

  getTimeComponents(time) {
    const days = this.padDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return {days, hours, mins, secs};  
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
  
  padDays(value) {
    return String(value).padStart(3, '0');
  }
}

function updateClockCounter({days, hours, mins, secs}) {
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minsEl.textContent = mins;
    secsEl.textContent = secs;
}


const timer1 = new CountdownTimer('#timer-1', new Date('Jun 22 2021'), updateClockCounter);
console.log(timer1.start());
