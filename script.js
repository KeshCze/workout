let container = document.querySelector('body');

let workout = {
    _coeficient:{
        pushup:1,
        squat:1,
        pullup:0.6,
        plank: 2.3,
        cruch:1.2
    },
    _data: [
        {date: '3/25/2020 0:00:00',pushup:20,squat:20,pullup:8,plank:30,cruch:15}
    ],
    render() {
        let tempObj = workout._data[0];
        for (let index = 0; index < 30; index++) {
            let element = document.createElement('div');
            element.classList.add('day');

            if(index % 4 == 0)
            {
                element.innerHTML = this.restTemplate(tempObj);
            }
            else{
                element.innerHTML = this.dayTemplate(tempObj);
            }
            
            if(this.isCurrDay(tempObj.date))
            {
                element.classList.add('current');
            }

            container.appendChild(element);


            tempObj={
                date: new Date(tempObj.date).setDate(new Date(tempObj.date).getDate()+1),
                pushup: tempObj.pushup+this._coeficient.pushup,
                squat: tempObj.squat+this._coeficient.squat,
                pullup: tempObj.pullup+this._coeficient.pullup,
                plank: tempObj.plank+this._coeficient.plank,
                cruch: tempObj.cruch+this._coeficient.cruch,
            };
        }        
    },
    isCurrDay(date){
        let _date = new Date(date);
        if( _date.getDate() === new Date().getDate() && 
            _date.getMonth() === new Date().getMonth() && 
            _date.getFullYear() === new Date().getFullYear())
        {
            return true;
        }
        return false;
    },
    dayTemplate(dayRecord){
        // Format datetime
        const formatter = new Intl.DateTimeFormat('cs-CZ', {
            weekday: 'short',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
        const [{ value: shortDay }, , { value: day }, , { value: month }, , { value: hour }, , { value: minute }] = formatter.formatToParts(new Date(dayRecord.date));        
        return`
            <h4>${day}. ${month}.</h4>
            <ul>
                <li class="pushup"> <b>${Math.round(dayRecord.pushup)}</b>   kliků</li>
                <li class="squat">  <b>${Math.round(dayRecord.squat)} </b>  dřepů</li>
                <li class="pullup"> <b>${Math.round(dayRecord.pullup)}</b>   přítahů</li>
                <li class="plank">  <b>${Math.round(dayRecord.plank)} </b>  plank [s]</li>
                <li class="crunch"> <b>${Math.round(dayRecord.cruch)} </b>  sedylehy</li>
            </ul>
        `
    },
    restTemplate(dayRecord){
        // Format datetime
        const formatter = new Intl.DateTimeFormat('cs-CZ', {
            weekday: 'short',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
        const [{ value: shortDay }, , { value: day }, , { value: month }, , { value: hour }, , { value: minute }] = formatter.formatToParts(new Date(dayRecord.date));        
        return`
            <h4>${day}. ${month}.</h4>
            <p>REST</p>
        `
    }
};


if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('service worker registered'))
      .catch(err => console.log('service worker not registered', err));
}

workout.render();