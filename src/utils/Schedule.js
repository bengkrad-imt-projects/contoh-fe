export class ScheduleItem {
  constructor(day, time, isSelected = false) {
    this.day = day;
    this.time = time;
    this.isSelected = isSelected;
  }
}

export class Schedule {
  constructor(data = []) {
    this.schedule = data;
  }

  generateScheduleFromApi(apiData, days, times) {
    const scheduleData = [];
    days.forEach((day) => {
      const dayData = apiData.find(item => Object.keys(item)[0] === day);
      if (dayData) {
        const timeData = dayData[day];
        times.forEach((time) => {
          scheduleData.push(new ScheduleItem(day, time, timeData[time] === 1));
        });
      }
    });
    return new Schedule(scheduleData);
  }

  toggleTime(day, time) {
    const updatedSchedule = this.schedule.map((item) =>
      item.day === day && item.time === time
        ? new ScheduleItem(item.day, item.time, !item.isSelected)
        : item
    );
    return new Schedule(updatedSchedule);
  }

  isSelected(day, time) {
    return this.schedule.some(
      (item) => item.day === day && item.time === time && item.isSelected
    );
  }

  toDatabaseFormat(days, times) {
    const jadwal = days.map((day) => {
      const daySchedule = times.reduce((acc, time) => {
        acc[time] = this.isSelected(day, time) ? 1 : 0;
        return acc;
      }, {});

      return { [day]: daySchedule };
    });

    return {
      id: "0",
      jadwal,
    };
  }
}
