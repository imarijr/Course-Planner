/**
 * @ngdoc service
 * @name common.service:CourseModel
 *
 * @description Model and helper methods for CourseModel parse object.
 */

class CourseModel {
    constructor(Parse, MajorModel) {
        this.Parse = Parse;
        this.MajorModel = MajorModel
        this.data = {};
        this.collection = [];
        this.name = 'Course';
        this.fields = [
            'courseName',
            'corequisites',
            'semesterDefault', 
            'courseId',
            'semesterRequired',
            'attributes',
            'defaultMajor',
            'credits',
            'prerequisites'
        ];
    }
    New(obj) {
        if (angular.isUndefined(obj)) {
            const parseObject = new this.Parse.Object(this.name);
            this.Parse.defineAttributes(parseObject, this.fields);
            // parseObject.major = new this.Parse.Object(this.MajorModel.name)
            // this.Parse.defineAttributes(parseObject.major); 
            return parseObject;
        } else {
            this.Parse.defineAttributes(obj, this.fields);
            // this.Parse.defineAttributes(obj.major, this.MajorModel.fields); 
            return obj;
        }
    }
    getById(id) {
        console.log(id)
        return new this.Parse.Query(this.New())
            .equalTo("objectId", id)
            .find()
            .then(result => {
                console.log('result', result)
                this.Parse.defineAttributes(result, this.fields);
                this.data = result;
                return Promise.resolve(result);
            })
            .catch(error => Promise.reject(error));
    }

    getByName(name) {
        console.log("name passed in: ", name)
        return new this.Parse.Query(this.New())
            .equalTo("courseName", name)
            .find()
            .then(result => {
                console.log('result: ', result[0]);         // no two courses should have the same name
                                                                    // so should only be one result
                //this.Parse.defineAttributes(result[0], this.fields); 
                //this.data = result[0]; 
                return Promise.resolve(result[0]); 
            })
            .catch(error => Promise.reject(error))
    }

    getByMajor(major) {
        return new this.Parse.Query(this.New())
            .include('major')
            .equalTo('major', major)
            .find()
            .then(courses => {
                courses.forEach(course => {
                    this.Parse.defineAttributes(course, this.fields);
                    this.Parse.defineAttributes(course.major, this.CourseModel.fields);
                })
                this.collection = courses;
                console.log("getByMajor", this.collection)
                return Promise.resolve(courses);
            })
            .catch(error => Promise.reject(error));
    }

    setSemesterDefault(id, sem) {
        myobj = new this.Parse.Query(this.New())
            .get(id)
            .then(result => {
                // this.Parse.defineAttributes(result, this.fields);
                // this.data = result; 
                result.set("semesterDefault", sem); 
                console.log('new default should be 3: ', result); 
                result.save(); 
                return Promise.resolve(result); 
            }).catch(error => Promise.reject(error))
    }

    getCourseBySem(semDef) {
        return new this.Parse.Query(this.New())
            .equalTo("semesterDefault", semDef)
            .find().then(result => {
                this.data = result;
                return Promise.resolve(result);
            })
            .catch(error => Promise.reject(error));
        }
}

angular
    .module('common')
    .service('CourseModel', CourseModel);
