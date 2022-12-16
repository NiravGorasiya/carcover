var Country = require('country-state-city').Country;
var State = require('country-state-city').State;
var City = require('country-state-city').City


const getMonthName = (monthIndex) => {
    let monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthsArray[monthIndex];
}
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


var changeDateFormatTo = date => {
    var date = date.toISOString().slice(0, 10)
    var [yy, mm, dd] = date.split(/-/g);
    return `${dd}-${mm}-${yy}`;
};


const country_all = (req, res) => {
    let country = []
    var a = Country.getAllCountries()
    a.map(i => { country.push(i.name) })
    return res.status(200).json({ result: country });
}

const state_all = (req, res) => {
    var state = []
    var a = Country.getAllCountries()
    a.map(i => {
        if (i.name === req.body.country) {
            var s = State.getStatesOfCountry(i.isoCode)
            s.map(s => { state.push(s.name) })
        }
    })
    return res.status(200).json({ result: state });

}

const city_all = (req, res) => {
    var city = []
    var a = State.getAllStates()
    a.map(i => {
        if (i.name === req.body.state) {
            var c = City.getCitiesOfState(i.countryCode, i.isoCode)
            c.map(c => { city.push(c.name) })
        }
    })
    return res.status(200).json({ result: city });
}


module.exports = { getMonthName, days, changeDateFormatTo, country_all, state_all, city_all } 