import * as schedule from 'node-schedule';

export function addJob(date: Date, job: Function){
    schedule.scheduleJob(date, () => {
        job();
    });
}