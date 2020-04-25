const Nightmare = require('nightmare')
const nightmare = Nightmare({
    show: true
})
const Parse = require('parse/node');
Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
    'UZwpFbGYPWGGKsVAt5vRzPbH1lSdX6u77OF3KrD5', // This is your Application ID
    'IpK6jyzdSSOGfqfM5SbA90UmakjLChfbEjcaPFBS', // This is your Javascript key
    'BKF9XH33Ijf8pAA3VDOzrRSjLPEIXKw0tqScKNz9' // This is your Master key (never use it in the frontend)
);

selector = '#resulttable tr:nth-of-type(n) td:nth-of-type(-n+2)'
subject = "CSE"
nightmare
    .goto('https://class-search.nd.edu/reg/srch/ClassSearchServlet')
    .wait(2000)
    .select("#SUBJ", subject)
    .click('INPUT')
    .wait(2000)
    .evaluate(selector => {
        var query = document.querySelectorAll(selector)
        var classNames = {}
        temp = ''
        values = []
        query.forEach(element => {
            if (element.innerText.includes("CSE")) {
                classNames[temp] = values
                values = []
                temp = element.innerText.split(" ")[0]
            } else {
                values.push(element.innerText.split("\n")[0])
            }
        })
        return classNames
    }, selector)
    .end()
    .then(data => {
        const courses = data;
        for (let elem in courses) {
            // if not all required data is present  
            if (!courses[elem][0] || !elem) {
                continue;
            }
            var Course = Parse.Object.extend("Course");
            var q = new Parse.Query("Course");
            // check whether course is already in DB 
            q.equalTo("courseName", courses[elem][0]);
            q.find().then(result => {
                if (!result[0]) {   
                    // if not found in DB, add it 
                    var myCourse = new Course();
                    var data = {
                        "courseName": courses[elem][0],
                        "courseId": elem,
                        "credits": 3
                    };
                    myCourse.save(data).then((obj) => {
                        console.log("Save SUCCESS: " + obj.id);
                    }, (error) => {
                        console.log("Save FAIL: " + error);
                    })
                }
            })
        }
    })
    .catch(error => {
        console.error('Search failed:', error)
    })