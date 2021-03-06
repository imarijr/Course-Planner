/**
 * @ngdoc service
 * @name common.service:MajorModel
 *
 * @description Model and helper methods for MajorModel parse object.
 */

class MajorModel {
    constructor(Parse) {
        this.Parse = Parse;
        this.data = {};
        this.collection = [];
        this.name = 'Major';
        this.fields = [
            'credits',
            'majorName',
            'college'
        ];
    }
    New(obj) {
        if (angular.isUndefined(obj)) {
            const parseObject = new this.Parse.Object(this.name)
            this.Parse.defineAttributes(parseObject, this.fields);
            return parseObject;
        } else {
            this.Parse.defineAttributes(obj, this.fields);
            return obj;
        }
    }
    getById(id) {
        return new this.Parse.Query(this.New())
            .get(id)
            .then(result => {
                console.log('result', result)
                this.Parse.defineAttributes(result, this.fields);
                this.data = result;
                return Promise.resolve(result);
            })
            .catch(error => Promise.reject(error));
    }
    getByName(name) {
        return new this.Parse.Query(this.New())
            .equalTo("majorName", name)
            .find().then(result => {
                console.log('result', result)
                this.Parse.defineAttributes(result, this.fields); 
                this.data = result; 
                return Promise.resolve(result); 
            })
            .catch(error => Promise.reject(error))
    }
    getMajors() {
        return new this.Parse.Query(this.New())
        .find().then(result => {
            this.data = result
            return Promise.resolve(result);
        })
        .catch(error => Promise.reject(error));
    }
}

angular
    .module('common')
    .service('MajorModel', MajorModel);
